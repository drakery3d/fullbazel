variable "app_name" {
  default = "fullbazel"
  type    = string
}

variable "gcp_project_id" {
  type = string
}

variable "gcp_region" {
  type = string
}

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
