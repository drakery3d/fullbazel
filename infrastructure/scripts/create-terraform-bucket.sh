# bin/bash

PROJECT_ID=$(gcloud config get-value project)
LOCATION=EUROPE-WEST3 # Frankfurt

if [[ -z "${BUCKET_PREFIX}" ]]; then
  BUCKET_PREFIX=fullbazel
fi

BUCKET_URI=gs://${BUCKET_PREFIX}-terraform-state

# create bucket if it does not exist
command gsutil ls -b ${BUCKET_URI} || gsutil mb -p ${PROJECT_ID} -l ${LOCATION} ${BUCKET_URI}

command gsutil versioning set on ${BUCKET_URI}
