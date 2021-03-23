variable "app_name" {
  default = "fullbazel"
  type    = string
}

variable "domain" {
  default = "fullbazel.drakery.com"
  type    = string
}

# Google Cloud
variable "gcp_project_id" {
  default = "fullstack-bazel-306720"
  type    = string
}
variable "gcp_region" {
  default = "europe-west3"
  type    = string
}

# Google Kubernetes Engine
variable "gke_region" {
  default = "europe-west3-a"
  type    = string
}
variable "gke_machine_type" {
  default = "e2-medium"
  type    = string
}
variable "gke_node_count" {
  default = 2
  type    = number
}
variable "gke_preemptible" {
  default = true
  type    = bool
}
variable "gke_disk_size_gb" {
  default = 10
  type    = number
}

# Cloud SQL
variable "network_name" {
  default = "mysql-privat"
  type    = string
}
variable "db_name" {
  default = "db"
  type    = string
}

# Amazon Web Services
variable "aws_access_key_id" {
  type      = string
  sensitive = true
}
variable "aws_secret_access_key" {
  type      = string
  sensitive = true
}
variable "aws_zone_id" {
  type      = string
  sensitive = true
}

# Web Push
variable "web_push_vapid_public_key" {
  type = string
}
variable "web_push_vapid_private_key" {
  type      = string
  sensitive = true
}

# Google Sing In
variable "google_sign_in_client_id" {
  type = string
}
variable "google_sign_in_client_secret" {
  type      = string
  sensitive = true
}

# Token Secrets
variable "auth_token_secret" {
  type      = string
  sensitive = true
}
