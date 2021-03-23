# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
PLAN="infrastructure.plan"

command cd "$ROOT/infrastructure"

command terraform init -input=false
command terraform plan -out=${PLAN} -input=false
command terraform apply -input=false -auto-approve "${PLAN}"