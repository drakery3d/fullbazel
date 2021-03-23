locals {
  service_account_name = "cloudsql-service-account"
}

resource "google_service_account" "gke_cloudsql" {
  account_id = "gke-cloudsql"
}

resource "google_project_iam_member" "cloud_sql_client" {
  role   = "roles/cloudsql.client"
  member = "serviceAccount:${google_service_account.gke_cloudsql.email}"
}

resource "google_service_account_iam_binding" "cloud_sql_gke" {
  service_account_id = google_service_account.gke_cloudsql.name
  role               = "roles/iam.workloadIdentityUser"

  members = [
    "serviceAccount:${var.project}.svc.id.goog[default/${local.service_account_name}]",
  ]
}

resource "kubernetes_service_account" "cloudsql_service_account" {
  metadata {
    name = local.service_account_name
    annotations = {
      "iam.gke.io/gcp-service-account" = google_service_account.gke_cloudsql.email
    }
  }
}

resource "google_sql_database_instance" "mysql" {
  name                = "fullbazel-mysql"
  database_version    = "MYSQL_8_0"
  deletion_protection = false

  settings {
    tier = "db-f1-micro"
  }
}

resource "google_sql_user" "user" {
  name     = "nonroot"
  instance = google_sql_database_instance.mysql.name
  password = "changeme"
}

resource "google_sql_database" "database" {
  name     = "db"
  instance = google_sql_database_instance.mysql.name
}
