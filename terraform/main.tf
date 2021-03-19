terraform {
  backend "gcs" {
    bucket = "fullstack-bazel-306720-terraform"
    prefix = "/state/fullbazel"
  }
}

module "sql" {
  source  = "./modules/cloudsql"
  project = var.gcp_project_id
}

module "gke" {
  source       = "./modules/gke"
  project      = var.gcp_project_id
  region       = var.gke_region
  node_count   = var.gke_node_count
  preemptible  = var.gke_preemptible
  disk_size_gb = var.gke_disk_size_gb
  machine_type = var.gke_machine_type
}

module "ingress" {
  source = "./modules/k8s-ingress"
}

module "cert-manager" {
  source = "./modules/k8s-cert-manager"
}

module "dns" {
  source  = "./modules/dns"
  ip      = module.ingress.ip
  zone_id = var.aws_zone_id
  domain  = var.domain
}
