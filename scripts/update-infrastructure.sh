# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
PLAN="infrastructure.plan"
export GOOGLE_APPLICATION_CREDENTIALS=$ROOT/infrastructure/google-sa.json

command cd "$ROOT/infrastructure"

command terraform apply -input=false -auto-approve "${PLAN}"