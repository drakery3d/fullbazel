output "name" {
  description = "The name of the cluster master."
  value       = google_container_cluster.primary[*].name
}

# output "endpoint" {
#   description = "The IP address of the cluster master."
#   value       = google_container_cluster.primary[*].endpoint
#   depends_on = [
#     google_container_cluster.primary,
#     google_container_node_pool.primary_nodes,
#   ]
#   sensitive = true
# }

output "endpoint" {
  value = "https://${google_container_cluster.primary.endpoint}"
  depends_on = [
    google_container_cluster.primary,
  ]
}

output "client_certificate" {
  description = "Public certificate used by clients to authenticate to the cluster endpoint."
  value       = base64decode(join(",", google_container_cluster.primary[*].master_auth[0].client_certificate))
  sensitive   = true
}

output "client_key" {
  description = "Private key used by clients to authenticate to the cluster endpoint."
  value       = base64decode(join(",", google_container_cluster.primary[*].master_auth[0].client_key))
  sensitive   = true
}

# output "cluster_ca_certificate" {
#   description = "The public certificate that is the root of trust for the cluster."
#   value       = base64decode(join(",", google_container_cluster.primary[*].master_auth[0].cluster_ca_certificate))
#   sensitive   = true
# }

output "cluster_ca_certificate" {
  value     = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
  sensitive = true
}

output "token" {
  value     = data.google_client_config.provider.access_token
  sensitive = true
}

# output "gke_cloudsql_service_account" {
#   value = kubernetes_service_account.cloudsql_service_account.metadata[0].name
# }
