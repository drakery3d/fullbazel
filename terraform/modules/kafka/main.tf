locals {
  name      = "strimzi-kafka"
  namespace = "strimzi-kafka"
  chart     = "strimzi-kafka-operator"
}

resource "kubernetes_namespace" "kafka_namespace" {
  metadata {
    name = local.namespace
  }
}

resource "helm_release" "strimzi_kafka" {
  name            = local.name
  repository      = "https://strimzi.io/charts"
  chart           = local.chart
  version         = "0.22.0"
  force_update    = true
  cleanup_on_fail = true
  namespace       = local.namespace

  depends_on = [kubernetes_namespace.kafka_namespace]
}

# TODO try to manage kafka crd with k8s-alpha provider
