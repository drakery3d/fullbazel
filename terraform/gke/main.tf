data "google_client_config" "provider" {}

resource "google_container_cluster" "primary" {
  name                     = "${var.project}-gke"
  location                 = var.region
  remove_default_node_pool = true
  initial_node_count       = 2
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "${google_container_cluster.primary.name}-node-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = 2

  node_config {
    preemptible  = true
    disk_size_gb = 10
    machine_type = "e2-medium"
    # TODO custom service account for gke cluster like here:
    # https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/container_cluster#example-usage---with-a-separately-managed-node-pool-recommended
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }
}
