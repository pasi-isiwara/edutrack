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

variable "ssh_public_key" {
  type        = string
  description = "SSH public key content to inject into the droplet"
}

# Register the SSH key with DigitalOcean via API
# This makes DO inject the key at platform level (no password setup)
resource "digitalocean_ssh_key" "jenkins" {
  name       = "jenkins-deploy-key"
  public_key = var.ssh_public_key
}

resource "digitalocean_droplet" "vm" {
  name     = "my-first-vm"
  region   = "blr1"
  size     = "s-1vcpu-1gb"
  image    = "ubuntu-22-04-x64"
  ssh_keys = [digitalocean_ssh_key.jenkins.fingerprint]

  user_data = <<-EOF
#!/bin/bash
set -e

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
