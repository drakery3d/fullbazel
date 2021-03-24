locals {
  name         = "strimzi-kafka"
  namespace    = "strimzi-kafka"
  chart        = "strimzi-kafka-operator"
  cluster_name = "kafka-cluster"
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

# FIXME apply kafka cluster with terraform when this is fixed
# https://github.com/hashicorp/terraform-provider-kubernetes-alpha/issues/181
# resource "kubernetes_manifest" "kafka_cluster" {
#   provider = kubernetes-alpha
#   manifest = {
#     "apiVersion" = "kafka.strimzi.io/v1beta2"
#     "kind" = "Kafka"
#     "metadata" = {
#       "name" = "kafka-cluster"
#       "namespace" = "strimzi-kafka"
#     }
#     "spec" = {
#       "entityOperator" = {
#         "topicOperator" = {}
#         "userOperator" = {}
#       }
#       "kafka" = {
#         "config" = {
#           "inter.broker.protocol.version" = "2.7"
#           "log.message.format.version" = "2.7"
#           "offsets.topic.replication.factor" = 3
#           "transaction.state.log.min.isr" = 2
#           "transaction.state.log.replication.factor" = 3
#         }
#         "listeners" = [
#           {
#             "name" = "plain"
#             "port" = 9092
#             "tls" = false
#             "type" = "internal"
#           },
#         ]
#         "replicas" = 3
#         "storage" = {
#           "type" = "ephemeral"
#         }
#         "version" = "2.7.0"
#       }
#       "zookeeper" = {
#         "replicas" = 3
#         "storage" = {
#           "type" = "ephemeral"
#         }
#       }
#     }
#   }
#   depends_on = [helm_release.strimzi_kafka]
# }