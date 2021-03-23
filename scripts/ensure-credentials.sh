# bin/bash

command -v gcloud > /dev/null 2>&1 || { \
 echo >&2 "gcloud required but it's not installed. Run: make setup "; exit 1;
}

TOKEN=$(gcloud auth application-default print-access-token)
if [ -z "${TOKEN}" ]; then
    echo "Authenticate gcloud for terraform"
    command gcloud auth application-default login
fi
echo "Google Cloud SDK authenticated"