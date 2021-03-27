# bin/bash

PROJECT=$(gcloud config get-value project)
REPO=gcr.io/$PROJECT
IMAGE=${REPO}/nextjs-client:latest

command cd nextjs-client
command docker build . -t $IMAGE
command docker push ${REPO}/nextjs-client:latest