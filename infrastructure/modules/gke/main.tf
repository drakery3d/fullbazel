data "google_client_config" "provider" {}

resource "google_container_cluster" "primary" {
  # name                     = "cluster-${terraform.workspace}"
  name                     = "cluster"
  location                 = var.region
  initial_node_count       = var.node_count
  remove_default_node_pool = true
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "${google_container_cluster.primary.name}-node-pool"
  cluster    = google_container_cluster.primary.name
  location   = var.region
  node_count = var.node_count

  node_config {
    image_type   = "COS"
    preemptible  = var.preemptible
    disk_size_gb = var.disk_size_gb
    machine_type = var.machine_type
    # TODO custom service account for gke cluster like here:
    # https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/container_cluster#example-usage---with-a-separately-managed-node-pool-recommended
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }
}
