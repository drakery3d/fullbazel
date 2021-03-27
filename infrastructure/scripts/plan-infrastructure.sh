# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." && pwd )"
PLAN="infrastructure.plan"
PROJECT_ID=$(gcloud config get-value core/project)
GOOGLE_KEY_FILE=$ROOT/infrastructure/google-sa.json

if [ -f ${GOOGLE_KEY_FILE} ]; then
  export GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_KEY_FILE
fi

command cd "$ROOT/infrastructure"

echo "Google Cloud Project: ${PROJECT_ID}"

AWS_ACCESS_KEY_ID=$(gcloud secrets versions access latest --secret=aws_access_key_id --project=${PROJECT_ID})
AWS_SECRET_ACCESS_KEY=$(gcloud secrets versions access latest --secret=aws_secret_access_key --project=${PROJECT_ID})
AWS_ZONE_ID=$(gcloud secrets versions access latest --secret=aws_zone_id --project=${PROJECT_ID})
WEB_PUSH_VAPID_PUBLIC_KEY=$(gcloud secrets versions access latest --secret=web_push_vapid_public_key --project=${PROJECT_ID})
WEB_PUSH_VAPID_PRIVATE_KEY=$(gcloud secrets versions access latest --secret=web_push_vapid_private_key --project=${PROJECT_ID})
GOOGLE_SIGN_IN_CLIENT_ID=$(gcloud secrets versions access latest --secret=google_sign_in_client_id --project=${PROJECT_ID})
GOOGLE_SIGN_IN_CLIENT_SECRET=$(gcloud secrets versions access latest --secret=google_sign_in_client_secret --project=${PROJECT_ID})
AUTH_TOKEN_SECRET=$(gcloud secrets versions access latest --secret=auth_token_secret --project=${PROJECT_ID})

command terraform plan -out=${PLAN} -input=false \
  -var="aws_access_key_id=${AWS_ACCESS_KEY_ID}" \
  -var="aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}" \
  -var="aws_zone_id=${AWS_ZONE_ID}" \
  -var="web_push_vapid_public_key=${WEB_PUSH_VAPID_PUBLIC_KEY}" \
  -var="web_push_vapid_private_key=${WEB_PUSH_VAPID_PRIVATE_KEY}" \
  -var="google_sign_in_client_id=${GOOGLE_SIGN_IN_CLIENT_ID}" \
  -var="google_sign_in_client_secret=${GOOGLE_SIGN_IN_CLIENT_SECRET}" \
  -var="auth_token_secret=${AUTH_TOKEN_SECRET}"