# bin/bash

command yarn install

command yarn bazelisk version >/dev/null 2>&1 || {
  echo "Download Bazelisk"
  command yarn bazelisk
  echo "Done"
  command yarn bazelisk version
}
echo "Bazelisk already downloaded"

CONTEXT=""
REPO=""

command yarn bazelisk build \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //...

command cp -n terraform/example.tfvars infrastructure/terraform.tfvars
echo "Please change sensitive values in infrastructure/terraform.tfvars"