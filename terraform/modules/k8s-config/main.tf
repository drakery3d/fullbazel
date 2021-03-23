# For simplicity we treat configuration values just as secrets
# and also store non-sensitive values in kubernetes secrets
resource "kubernetes_secret" "k8s_config" {
  metadata {
    name = "application-config"
  }

  data = {
    ENVIRONMENT = var.environment

    API_URL       = var.api_url
    WEBSOCKET_URL = var.websocket_url
    CLIENT_URL    = var.client_url

    AUTH_TOKEN_SECRET = var.auth_token_secret

    WEB_PUSH_VAPID_PUBLIC_KEY  = var.web_push_vapid_public_key
    WEB_PUSH_VAPID_PRIVATE_KEY = var.web_push_vapid_private_key

    GOOGLE_SIGN_IN_CLIENT_ID     = var.google_sign_in_client_id
    GOOGLE_SIGN_IN_CLIENT_SECRET = var.google_sign_in_client_secret

    CLOUDSQL_INSTANCE = var.cloudsql_instance
    MYSQL_HOST        = var.mysql_host
    MYSQL_PORT        = var.mysql_port
    MYSQL_USER        = var.mysql_user
    MYSQL_DATABASE    = var.mysql_database
    MYSQL_PASSWORD    = var.mysql_password

    KAFKA_SEED_BROKER = var.kafka_seed_broker
  }
}
