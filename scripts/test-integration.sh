# bin/bash

DEBUG="testcontainers*"

command yarn ts-node \
  --project tsconfig.test.json \
  -r tsconfig-paths/register \
  node_modules/jasmine/bin/jasmine \
  --config=dev/jasmine.json