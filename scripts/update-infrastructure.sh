# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
PLAN="infrastructure.plan"
PROJECT_ID=$(gcloud config get-value core/project)

function get_secret() {
  echo $(gcloud secrets versions access latest --secret=$1 --project=${PROJECT_ID})
}

command cd "$ROOT/infrastructure"

AWS_ACCESS_KEY_ID=$(get_secret aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(get_secret aws_secret_access_key)
AWS_ZONE_ID=$(get_secret aws_zone_id)
WEB_PUSH_VAPID_PUBLIC_KEY=$(get_secret web_push_vapid_public_key)
WEB_PUSH_VAPID_PRIVATE_KEY=$(get_secret web_push_vapid_private_key)
GOOGLE_SIGN_IN_CLIENT_ID=$(get_secret google_sign_in_client_id)
GOOGLE_SIGN_IN_CLIENT_SECRET=$(get_secret google_sign_in_client_secret)
AUTH_TOKEN_SECRET=$(get_secret auth_token_secret)

command terraform plan -out=${PLAN} -input=false \
  -var="aws_access_key_id=${AWS_ACCESS_KEY_ID}" \
  -var="aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}" \
  -var="aws_zone_id=${AWS_ZONE_ID}" \
  -var="web_push_vapid_public_key=${WEB_PUSH_VAPID_PUBLIC_KEY}" \
  -var="web_push_vapid_private_key=${WEB_PUSH_VAPID_PRIVATE_KEY}" \
  -var="google_sign_in_client_id=${GOOGLE_SIGN_IN_CLIENT_ID}" \
  -var="google_sign_in_client_secret=${GOOGLE_SIGN_IN_CLIENT_SECRET}" \
  -var="auth_token_secret=${AUTH_TOKEN_SECRET}"

command terraform apply -input=false -auto-approve "${PLAN}"