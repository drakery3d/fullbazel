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
command cp -n services/client/environment/dev.ts services/client/environment/prod.ts

command yarn bazelisk build \
  # --remote_cache=https://storage.googleapis.com/fullbazel-bazel-cache \
  # --google_default_credentials \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //...