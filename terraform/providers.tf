provider "google" {
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

# $ export AWS_ACCESS_KEY_ID="anaccesskey"
# $ export AWS_SECRET_ACCESS_KEY="asecretkey"
provider "aws" {
  region = "eu-central-1"
}

provider "random" {}
