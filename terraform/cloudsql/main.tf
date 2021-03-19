resource "google_service_account" "gke_cloudsql" {
  account_id  = "gke-cloudsql"
  description = "Connect to CloudSQL from a GKE cluster"
}

resource "google_project_iam_member" "cloud_sql_client" {
  role   = "roles/cloudsql.client"
  member = "serviceAccount:${google_service_account.gke_cloudsql.email}"
}

resource "google_service_account_iam_binding" "cloud_sql_gke" {
  service_account_id = google_service_account.gke_cloudsql.name
  role               = "roles/iam.workloadIdentityUser"

  members = [
    "serviceAccount:${var.project_id}.svc.id.goog[default/${var.gke_cloudsql_service_account}]",
  ]
}

resource "kubernetes_service_account" "cloudsql_service_account" {
  metadata {
    name = var.gke_cloudsql_service_account
    annotations = {
      "iam.gke.io/gcp-service-account" = google_service_account.gke_cloudsql.email
    }
  }
}

resource "random_id" "db_name_suffix" {
  byte_length = 4
}

resource "google_sql_database_instance" "mysql" {
  name             = "mysql-instance-${random_id.db_name_suffix.hex}"
  database_version = "MYSQL_8_0"

  settings {
    tier = "db-f1-micro"
  }
}

resource "google_sql_user" "users" {
  name     = "nonroot"
  instance = google_sql_database_instance.mysql.name
  # password = var.sql_nonroot_password
  password = "changeme"
}

resource "google_sql_database" "database" {
  # name     = var.db_name
  name     = "db"
  instance = google_sql_database_instance.mysql.name
}
