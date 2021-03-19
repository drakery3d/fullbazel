terraform {
  required_version = "~> 0.14"
  required_providers {
    google      = "~> 3.60"
    google-beta = "~> 3.60"
    kubernetes  = "~> 2.0.3"
    helm        = "~> 2.0.3"
    random      = "~> 3.1.0"
    aws         = "~> 3.33.0"
  }
}
