# bin/bash

CONTEXT=""
REPO=""

command cp -n services/client/environment/dev.ts services/client/environment/prod.ts

# Run with remote cache in GitHub actions and
# without otherwise
if [ -z ${GITHUB_ACTIONS} ]; then
  echo "Run tests without remote cache"
  command yarn bazelisk test \
    --test_output=errors \
    --define "cluster=${CONTEXT}" \
    --define "repo=${REPO}" \
    //...
else
  echo "Run tests with remote cache"
  command yarn bazelisk test \
    --remote_cache=https://storage.googleapis.com/fullbazel-bazel-cache \
    --google_default_credentials \
    --test_output=errors \
    --define "cluster=${CONTEXT}" \
    --define "repo=${REPO}" \
    //...
fi