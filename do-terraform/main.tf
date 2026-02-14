terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

variable "do_token" {
  type      = string
  sensitive = true
}

variable "ssh_key_fingerprint" {
  type        = string
  description = "SSH key fingerprint for droplet access"
  default     = ""
}

variable "ssh_public_key" {
  type        = string
  description = "SSH public key content to inject into the droplet"
  default     = ""
}

resource "digitalocean_droplet" "vm" {
  name     = "my-first-vm"
  region   = "blr1"          # Bangalore (closest to SL)
  size     = "s-1vcpu-1gb"
  image    = "ubuntu-22-04-x64"
  ssh_keys = var.ssh_key_fingerprint != "" ? [var.ssh_key_fingerprint] : []

  user_data = <<-EOF
    #!/bin/bash
    set -e

    # Inject SSH public key for root access
    mkdir -p /root/.ssh
    chmod 700 /root/.ssh
    echo "${var.ssh_public_key}" >> /root/.ssh/authorized_keys
    chmod 600 /root/.ssh/authorized_keys

    # Install Docker
    apt-get update -y
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update -y
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

    # Enable and start Docker
    systemctl enable docker
    systemctl start docker

    # Create app directory
    mkdir -p /opt/edutrack
  EOF
}

output "droplet_id" {
  value       = digitalocean_droplet.vm.id
  description = "The ID of the droplet"
}

output "droplet_ip" {
  value       = digitalocean_droplet.vm.ipv4_address
  description = "The public IPv4 address of the droplet"
}

