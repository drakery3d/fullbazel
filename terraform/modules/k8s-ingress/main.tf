locals {
  name      = "ingress-nginx"
  namespace = "ingress-nginx"
}

resource "helm_release" "nginx_ingress" {
  name             = local.name
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  version          = "3.24.0"
  force_update     = true
  cleanup_on_fail  = true
  namespace        = local.namespace
  create_namespace = true
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
}

resource "kubernetes_config_map" "config_ingress" {
  metadata {
    name      = "${local.name}-controller"
    namespace = local.namespace
  }

  data = {
    "use-gzip"   = "true"
    "gzip-types" = "*"
  }
}
