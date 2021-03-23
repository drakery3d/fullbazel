output "instance" {
  value = google_sql_database_instance.mysql.connection_name
}

output "user" {
  value = google_sql_user.user.name
}

output "password" {
  value = google_sql_user.user.password
}

output "database" {
  value = google_sql_database.database.name
}
