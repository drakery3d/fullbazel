variable "app_name" {
  type = string
}

variable "domain" {
  type = string
}

# Google Cloud
variable "gcp_project_id" {
  type = string
}
variable "gcp_region" {
  type = string
}

# Google Kubernetes Engine
variable "gke_region" {
  type = string
}
variable "gke_machine_type" {
  type = string
}
variable "gke_node_count" {
  type = number
}
variable "gke_preemptible" {
  type = bool
}
variable "gke_disk_size_gb" {
  type = number
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
variable "aws_zone_id" {
  type = string
}
