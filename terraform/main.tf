terraform {
  backend "gcs" {
    bucket = "fullstack-bazel-306720-terraform"
    prefix = "/state/fullbazel"
  }
}

resource "google_compute_network" "vpc" {
  name                    = "${var.gcp_project_id}-vpc"
  auto_create_subnetworks = "false"
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${var.gcp_project_id}-subnet"
  region        = var.gcp_region
  network       = google_compute_network.vpc.name
  ip_cidr_range = "10.10.0.0/24"
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
  region     = "europe-west3-a"
  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
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
}
