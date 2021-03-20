locals {
  name      = "ingress-nginx"
  namespace = "ingress-nginx"
  chart     = "ingress-nginx"
}

resource "kubernetes_namespace" "ingress_ns" {
  metadata {
    name = local.namespace
  }
}

resource "helm_release" "nginx_ingress" {
  name            = local.name
  repository      = "https://kubernetes.github.io/ingress-nginx"
  chart           = local.chart
  version         = "3.24.0"
  force_update    = true
  cleanup_on_fail = true
  namespace       = local.namespace

  depends_on = [kubernetes_namespace.ingress_ns]
}

data "kubernetes_service" "service_ingress" {
  metadata {
    name      = "${local.name}-controller"
    namespace = local.namespace
  }
  depends_on = [helm_release.nginx_ingress]
}

resource "kubernetes_ingress" "ingress" {
  metadata {
    name = "ingress"
    annotations = {
      "kubernetes.io/tls-acme"         = "true"
      "kubernetes.io/ingress.class"    = "nginx"
      "cert-manager.io/cluster-issuer" = "letsencrypt"
    }
  }

  spec {
    tls {
      hosts       = [var.domain, "api.${var.domain}"]
      secret_name = "fullbazel-cert"
    }

    rule {
      host = var.domain
      http {
        path {
          backend {
            service_name = "client"
            service_port = 8080
          }
        }
      }
    }

    rule {
      host = "api.${var.domain}"
      http {
        path {
          backend {
            service_name = "server"
            service_port = 3000
          }
        }
      }
    }
  }

  depends_on = [helm_release.nginx_ingress]
}

# TODO adding data fields to existing configmap throws error
# Error: configmaps "ingress-nginx-controller" already exists
# resource "kubernetes_config_map" "config_ingress" {
#   metadata {
#     name      = "${local.name}-controller"
#     namespace = local.namespace
#   }

#   data = {
#     "use-gzip"   = "true"
#     "gzip-types" = "*"
#   }

#   depends_on = [helm_release.nginx_ingress]
# }
