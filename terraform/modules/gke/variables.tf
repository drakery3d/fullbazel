variable "project" {
  type = string
}

variable "region" {
  type = string
}

variable "node_count" {
  type = number
}

variable "preemptible" {
  type = bool
}

variable "disk_size_gb" {
  type = number
}

variable "machine_type" {
  type = string
}
