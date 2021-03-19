provider "google" {
  credentials = file("terraform-sa-key.json")
  project     = var.gcp_project_id
  region      = var.gcp_region
}

provider "google-beta" {
  credentials = file("terraform-sa-key.json")
  project     = var.gcp_project_id
  region      = var.gcp_region
}

provider "kubernetes" {
  host                   = module.gke.endpoint
  cluster_ca_certificate = module.gke.cluster_ca_certificate
  token                  = module.gke.token
}

provider "helm" {
  kubernetes {
    host                   = module.gke.endpoint
    cluster_ca_certificate = module.gke.cluster_ca_certificate
    token                  = module.gke.token
  }
}

provider "random" {}
