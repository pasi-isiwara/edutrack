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
#cloud-config
chpasswd:
  expire: false
ssh_pwauth: false
disable_root: false
ssh_authorized_keys:
  - ${var.ssh_public_key}
runcmd:
  - apt-get update -y
  - apt-get install -y apt-transport-https ca-certificates curl software-properties-common
  - curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  - echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  - apt-get update -y
  - apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  - systemctl enable docker
  - systemctl start docker
  - mkdir -p /opt/edutrack
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

