# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
PLAN="infrastructure.plan"
GOOGLE_KEY_FILE=$ROOT/infrastructure/google-sa.json

if [ -f ${GOOGLE_KEY_FILE} ]; then
  export GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_KEY_FILE
fi

command cd "$ROOT/infrastructure"

command terraform apply -input=false -auto-approve "${PLAN}"