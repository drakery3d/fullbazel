# bin/bash

DEBUG="testcontainers*"

command yarn bazelisk build //libs/config:flat_config_keys

command yarn ts-node \
  --project tsconfig.test.json \
  -r tsconfig-paths/register \
  node_modules/jasmine/bin/jasmine \
  --config=dev/jasmine.json