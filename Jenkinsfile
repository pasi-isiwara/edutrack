pipeline {
    agent any

    environment {
        GIT_REPO        = "https://github.com/pasi-isiwara/edutrack.git"
        FRONTEND_IMAGE  = "pasinduisiwara/frontend-app"
        BACKEND_IMAGE   = "pasinduisiwara/backend-app"
    }

    stages {

        // =========================
        // Clone Repo
        // =========================
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }

        // =========================
        // Build Docker Images
        // =========================
        stage('Build Docker Images') {
            parallel {

                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ."
                            sh "docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest"
                        }
                    }
                }

                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ."
                            sh "docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest"
                        }
                    }
                }
            }
        }

        // =========================
        // Login + Push to DockerHub
        // =========================
        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {

                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${BACKEND_IMAGE}:latest
                        docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${FRONTEND_IMAGE}:latest
                        docker logout
                    """
                }
            }
        }

        // =========================
        // Terraform Init
        // =========================
        stage('Terraform Init') {
            steps {
                dir('do-terraform') {
                    sh 'terraform init'
                }
            }
        }

        // =========================
        // Terraform Plan
        // =========================
        stage('Terraform Plan') {
            steps {
                dir('do-terraform') {
                    withCredentials([string(credentialsId: 'do-api-token', variable: 'DO_TOKEN')]) {
                        sh 'terraform plan -var="do_token=${DO_TOKEN}" -out=tfplan'
                    }
                }
            }
        }

        // =========================
        // Terraform Apply (Only main branch)
        // =========================
        stage('Terraform Apply') {
            when {
                branch 'main'
            }
            steps {
                dir('do-terraform') {
                    withCredentials([string(credentialsId: 'do-api-token', variable: 'DO_TOKEN')]) {
                        input message: 'Apply Terraform changes?', ok: 'Apply'
                        sh 'terraform apply -var="do_token=${DO_TOKEN}" -auto-approve tfplan'
                    }
                }
            }
        }

        // =========================
        // Deploy to Droplet
        // =========================
        stage('Deploy to Droplet') {
            when {
                branch 'main'
            }
            steps {
                script {

                    def dropletIP = sh(
                        script: 'cd do-terraform && terraform output -raw droplet_ip',
                        returnStdout: true
                    ).trim()

                    sshagent(['droplet-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no root@${dropletIP} '
                                docker pull ${BACKEND_IMAGE}:latest
                                docker pull ${FRONTEND_IMAGE}:latest
                                cd /opt/edutrack
                                docker-compose down
                                docker-compose up -d
                            '
                        """
                    }
                }
            }
        }
    }

    // =========================
    // Post Actions
    // =========================
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
