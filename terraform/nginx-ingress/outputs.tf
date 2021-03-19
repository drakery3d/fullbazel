# output "ingress" { value = helm_release.ingress }
# output "public_ips" { value = data.kubernetes_service.ingress_controller.load_balancer_ingress.*.ip }
# output "version" { value = helm_release.ingress.version }
