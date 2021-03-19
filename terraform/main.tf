terraform {
  backend "gcs" {
    bucket = "fullstack-bazel-306720-terraform"
    prefix = "/state/fullbazel"
  }
}

module "sql" {
  source = "./cloudsql"
  # gke_cloudsql_service_account = module.gke.gke_cloudsql_service_account
  project_id = var.gcp_project_id
}

module "gke" {
  source  = "./gke"
  project = var.gcp_project_id
  # region     = var.gcp_region
  region = "europe-west3-a"
}

module "ingress" {
  source = "./k8s-ingress"
}

module "cert-manager" {
  source = "./k8s-cert-manager"
}

module "dns" {
  source = "./dns"
  ip     = module.ingress.ip
  # TODO dont hardcode
  zone_id = "Z1TFW0OTMX8EE8"
}
