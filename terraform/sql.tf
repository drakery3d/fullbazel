# resource "random_id" "db_name_suffix" {
#   byte_length = 4
# }

# resource "google_sql_database_instance" "mysql" {
#   name             = "mysql-instance-${random_id.db_name_suffix.hex}"
#   database_version = "MYSQL_8_0"

#   settings {
#     tier = "db-f1-micro"
#   }
# }

# resource "google_sql_user" "users" {
#   name     = "nonroot"
#   instance = google_sql_database_instance.mysql.name
#   password = var.sql_nonroot_password
# }

# resource "google_sql_database" "database" {
#   name     = var.db_name
#   instance = google_sql_database_instance.mysql.name
# }
