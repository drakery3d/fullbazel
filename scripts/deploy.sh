# bin/bash

CLUSTER_PREFIX=cluster-
PROJECT=$(gcloud config get-value project)
CONTEXT=$(kubectl config get-contexts -o=name | \
	grep "$PROJECT.*$CLUSTER_PREFIX")
REPO=gcr.io/$PROJECT

echo "Cluster: ${CONTEXT}"
echo "Repository: ${REPO}"

command yarn bazelisk run \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //:kubernetes.apply