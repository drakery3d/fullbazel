output "ip" {
  value = data.kubernetes_service.service_ingress.status[0].load_balancer[0].ingress[0].ip
}
