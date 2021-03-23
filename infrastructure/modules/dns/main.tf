resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = var.domain
  type    = "A"
  ttl     = "300"
  records = [var.ip]
}

resource "aws_route53_record" "api" {
  zone_id = var.zone_id
  name    = "api.${var.domain}"
  type    = "A"
  ttl     = "300"
  records = [var.ip]
}
