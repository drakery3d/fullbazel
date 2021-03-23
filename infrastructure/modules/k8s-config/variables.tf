variable "environment" {
  type = string
}

variable "api_url" {
  type = string
}
variable "websocket_url" {
  type = string
}
variable "client_url" {
  type = string
}

variable "auth_token_secret" {
  type      = string
  sensitive = true
}

variable "web_push_vapid_public_key" {
  type = string
}
variable "web_push_vapid_private_key" {
  type      = string
  sensitive = true
}

variable "google_sign_in_client_id" {
  type = string
}
variable "google_sign_in_client_secret" {
  type      = string
  sensitive = true
}

variable "cloudsql_instance" {
  type = string
}
variable "mysql_host" {
  type = string
}
variable "mysql_port" {
  type = string
}
variable "mysql_user" {
  type = string
}
variable "mysql_database" {
  type = string
}
variable "mysql_password" {
  type      = string
  sensitive = true
}

variable "kafka_seed_broker" {
  type = string
}
