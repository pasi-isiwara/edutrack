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
        // FIX: Use single quotes to prevent Groovy interpolation of secrets
        // =========================
        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    // Single quotes: shell resolves $DOCKER_PASS, not Groovy (secure)
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                    sh "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                    sh 'docker logout'
                }
            }
        }

        // =========================
        // Terraform Init
        // Persist state outside workspace so cleanWs() doesn't destroy it
        // =========================
        stage('Terraform Init') {
            steps {
                dir('do-terraform') {
                    sh '''
                        mkdir -p /var/lib/jenkins/terraform-state
                        cp -n terraform.tfstate /var/lib/jenkins/terraform-state/ 2>/dev/null || true
                        ln -sf /var/lib/jenkins/terraform-state/terraform.tfstate terraform.tfstate
                        cp -n terraform.tfstate.backup /var/lib/jenkins/terraform-state/ 2>/dev/null || true
                        ln -sf /var/lib/jenkins/terraform-state/terraform.tfstate.backup terraform.tfstate.backup
                        terraform init
                    '''
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
                        sh 'terraform plan -var="do_token=$DO_TOKEN" -out=tfplan'
                    }
                }
            }
        }

        // =========================
        // Terraform Apply
        // =========================
        stage('Terraform Apply') {
            steps {
                dir('do-terraform') {
                    withCredentials([string(credentialsId: 'do-api-token', variable: 'DO_TOKEN')]) {
                        input message: 'Apply Terraform changes?', ok: 'Apply'
                        sh 'terraform apply -var="do_token=$DO_TOKEN" -auto-approve tfplan'
                    }
                }
            }
        }

        // =========================
        // Deploy to Droplet
        // =========================
        stage('Deploy to Droplet') {
            steps {
                script {
                    def dropletIP = sh(
                        script: 'cd do-terraform && terraform output -raw droplet_ip',
                        returnStdout: true
                    ).trim()

                    withCredentials([sshUserPrivateKey(credentialsId: 'droplet-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                        // Wait for SSH to become available (droplet may still be booting)
                        sh """
                            echo 'Waiting for SSH on ${dropletIP}...'
                            SSH_READY=false
                            for i in \$(seq 1 30); do
                                if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 -i \$SSH_KEY root@${dropletIP} 'echo SSH_OK' 2>/dev/null; then
                                    echo 'SSH is ready!'
                                    SSH_READY=true
                                    break
                                fi
                                echo "Attempt \$i/30 - SSH not ready, waiting 10s..."
                                sleep 10
                            done
                            if [ "\$SSH_READY" = "false" ]; then
                                echo 'ERROR: SSH never became available after 30 attempts!'
                                echo 'Check that the Jenkins SSH key matches the DigitalOcean droplet SSH key.'
                                exit 1
                            fi
                        """

                        // Wait for cloud-init (user_data) to finish installing Docker
                        sh """
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY root@${dropletIP} '
                                echo "Waiting for cloud-init to finish..."
                                cloud-init status --wait || true
                                echo "Cloud-init done. Checking Docker..."
                                for i in \$(seq 1 12); do
                                    if command -v docker &>/dev/null; then
                                        echo "Docker is installed!"
                                        break
                                    fi
                                    echo "Attempt \$i/12 - Docker not ready, waiting 10s..."
                                    sleep 10
                                done
                            '
                        """

                        // Copy docker-compose.yml to the droplet
                        sh """
                            scp -o StrictHostKeyChecking=no -i \$SSH_KEY docker-compose.yml root@${dropletIP}:/opt/edutrack/docker-compose.yml
                        """
                        // Pull latest images and deploy
                        sh """
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY root@${dropletIP} '
                                cd /opt/edutrack
                                docker pull ${BACKEND_IMAGE}:latest
                                docker pull ${FRONTEND_IMAGE}:latest
                                docker compose down || true
                                docker compose up -d
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
