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

cat > $ROOT/services/client/environment/prod.ts << EOF
export default {
  environment: 'prod',
  api: '$(terraform output -raw api_url)',
  websocket: '$(terraform output -raw websocket_url)',
}
EOF

command cat $ROOT/services/client/environment/prod.ts

command cd $ROOT

command yarn bazelisk run \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //:kubernetes.apply