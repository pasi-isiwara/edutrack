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

resource "digitalocean_droplet" "vm" {
  name   = "my-first-vm"
  region = "blr1"          # Bangalore (closest to SL)
  size   = "s-1vcpu-1gb"
  image  = "ubuntu-22-04-x64"
}

output "droplet_id" {
  value       = digitalocean_droplet.vm.id
  description = "The ID of the droplet"
}

output "droplet_ip" {
  value       = digitalocean_droplet.vm.ipv4_address
  description = "The public IPv4 address of the droplet"
}

