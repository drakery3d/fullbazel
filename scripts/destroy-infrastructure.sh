# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

command cd "$ROOT/terraform"

command terraform destroy -input=false -auto-approve