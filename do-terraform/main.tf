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

