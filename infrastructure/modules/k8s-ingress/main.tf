locals {
  name      = "ingress-nginx"
  namespace = "ingress-nginx"
  chart     = "ingress-nginx"
}

resource "kubernetes_namespace" "ingress_namespace" {
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

  depends_on = [kubernetes_namespace.ingress_namespace]
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

    # TODO why not host api on /api ?
    # https://github.com/GoogleCloudPlatform/gke-bazel-demo/blob/e0d3856092c09c74f9e75e9307a24496c5f67eb6/js-client/manifests/deployment.yaml#L66
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
# https://stackoverflow.com/q/59989660/8586803

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
