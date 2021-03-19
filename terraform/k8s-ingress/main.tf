resource "helm_release" "nginx-ingress" {
  name             = var.ingress_name
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  version          = "3.24.0"
  force_update     = true
  cleanup_on_fail  = true
  namespace        = var.ingress_namespace
  create_namespace = true
}

data "kubernetes_service" "service_ingress" {
  metadata {
    name      = "${var.ingress_name}-controller"
    namespace = var.ingress_namespace
  }
  depends_on = [helm_release.nginx-ingress]
}
