# bin/bash

CONTEXT=""
REPO=""

command cp -n services/client/environment/dev.ts services/client/environment/prod.ts

command yarn bazelisk test \
  --test_output=errors \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //...