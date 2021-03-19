resource "aws_route53_zone" "primary" {
  name = "fullbazel.drakery.com"
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "fullbazel.drakery.com"
  type    = "A"
  ttl     = "300"
  records = [var.ip]
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "api.fullbazel.drakery.com"
  type    = "A"
  ttl     = "300"
  records = [var.ip]
}
