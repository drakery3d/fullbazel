# bin/bash

PROJECT=$(gcloud config get-value project)
CLUSTER=cluster
# TODO dont hardcode zone
ZONE=europe-west3-a
CONTEXT=gke_${PROJECT}_${ZONE}_${CLUSTER}
REPO=gcr.io/$PROJECT

command gcloud container clusters get-credentials ${CLUSTER} --zone ${ZONE} --project ${PROJECT}
command gcloud --quiet auth configure-docker

echo "Cluster: ${CONTEXT}"
echo "Repository: ${REPO}"

command yarn bazelisk run \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //:kubernetes.apply