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

command cp -n libs/config/example.config libs/config/dev.config
command cp -n angular-client/environment/dev.ts angular-client/environment/prod.ts

command yarn bazelisk build \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //...