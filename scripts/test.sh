# bin/bash

CONTEXT=""
REPO=""

command yarn bazelisk test \
  --test_output=errors \
  --define "cluster=${CONTEXT}" \
  --define "repo=${REPO}" \
  //...