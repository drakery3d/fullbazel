terraform {
  backend "gcs" {
    bucket = "fullstack-bazel-306720-terraform"
    prefix = "/state/fullbazel"
  }
}
