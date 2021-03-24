locals {
  name      = "cert-manager"
  namespace = "cert-manager"
}

resource "helm_release" "cert_manager" {
  name             = local.name
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = "1.2.0"
  force_update     = true
  cleanup_on_fail  = true
  namespace        = local.namespace
  create_namespace = true

  set {
    name  = "installCRDs"
    value = true
  }
}

resource "kubernetes_manifest" "cluster_issuer" {
  provider = kubernetes-alpha
  manifest = {
    "apiVersion" = "cert-manager.io/v1alpha2"
    "kind" = "ClusterIssuer"
    "metadata" = {
      "name" = "letsencrypt"
    }
    "spec" = {
      "acme" = {
        "email" = "flo@drakery.com"
        "privateKeySecretRef" = {
          "name" = "letsencrypt"
        }
        "server" = "https://acme-v02.api.letsencrypt.org/directory"
        "solvers" = [
          {
            "http01" = {
              "ingress" = {
                "class" = "nginx"
              }
            }
          },
        ]
      }
    }
  }
  depends_on = [helm_release.cert_manager]
}