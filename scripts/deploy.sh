# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
PROJECT=$(gcloud config get-value project)
CLUSTER=cluster
# TODO dont hardcode zone
ZONE=europe-west3-a
CONTEXT=gke_${PROJECT}_${ZONE}_${CLUSTER}
REPO=gcr.io/$PROJECT
GOOGLE_KEY_FILE=$ROOT/infrastructure/google-sa.json

if [ -f ${GOOGLE_KEY_FILE} ]; then
  export GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_KEY_FILE
fi

command gcloud container clusters get-credentials ${CLUSTER} --zone ${ZONE} --project ${PROJECT}
command gcloud --quiet auth configure-docker

echo "Cluster: ${CONTEXT}"
echo "Repository: ${REPO}"

command cd "$ROOT/infrastructure"
API_URL=$(terraform output -raw api_url)
WEBSOCKET_URL=$(terraform output -raw websocket_url)
if [ -z $API_URL ] || [ -z $WEBSOCKET_URL ]; then
  exit 1
fi

command cd $ROOT
CLIENT_PROD_ENV_FILE=$ROOT/services/client/environment/prod.ts
cat <<EOF > "${CLIENT_PROD_ENV_FILE}"
export default {
  environment: 'prod',
  api: '${API_URL}',
  websocket: '${WEBSOCKET_URL}',
}
EOF

command yarn bazelisk run \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //:kubernetes.apply