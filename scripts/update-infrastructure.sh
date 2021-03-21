# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
PLAN="infrastructure.plan"

command cd "$ROOT/terraform"

command terraform plan -out=${PLAN} -input=false
command terraform apply -input=false -auto-approve "${PLAN}"