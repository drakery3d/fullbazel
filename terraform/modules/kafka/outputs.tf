output "seed_broker" {
  value = "${local.cluster_name}-kafka-bootstrap.${local.namespace}.svc.cluster.local:9092"
}
