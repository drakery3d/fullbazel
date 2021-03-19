resource "kubernetes_namespace" "ingress_ns" {
  metadata {
    name = var.ingress_namespace
  }
}

resource "helm_release" "ingress" {
  name            = var.ingress_name
  repository      = "https://kubernetes.github.io/ingress-nginx"
  chart           = "ingress-nginx"
  version         = "3.24.0"
  force_update    = true
  cleanup_on_fail = true
  namespace       = var.ingress_namespace

  depends_on = [kubernetes_namespace.ingress_ns]
}
