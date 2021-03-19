variable "app_name" {
  default = "fullbazel"
  type    = string
}

# Google Cloud
variable "gcp_project_id" {
  type = string
}

variable "gcp_region" {
  default = "europe-west3"
  type    = string
}

# Google Kubernetes Engine
variable "gke_username" {
  default = ""
  type    = string
}

variable "gke_password" {
  default = ""
  type    = string
}

variable "gke_num_nodes" {
  default = 1
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

variable "sql_nonroot_password" {
  type = string
}
