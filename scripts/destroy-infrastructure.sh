# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

command cd "$ROOT/infrastructure"

command terraform destroy -input=false -auto-approve