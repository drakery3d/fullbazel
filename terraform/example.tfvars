app_name="fullbazel"
gcp_project_id="fullstack-bazel-306720"
gcp_region="europe-west3"
gke_region="europe-west3-a"
gke_machine_type="e2-medium"
gke_node_count=2
gke_preemptible=true
gke_disk_size_gb=10
domain="fullbazel.drakery.com"

# Sensitive values
# Please change them!
# TODO consider reading from google secret manager
aws_zone_id="change_me"
web_push_vapid_public_key="change_me"
web_push_vapid_private_key="change_me"
google_sign_in_client_id="change_me"
google_sign_in_client_secret="change_me"
auth_token_secret="change_me"