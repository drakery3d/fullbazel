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
