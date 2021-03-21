# bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

command cd "$ROOT"

command cp -n libs/config/secrets/example.secrets.json libs/config/secrets/dev.secrets.json
command cp -n libs/config/secrets/example.secrets.json libs/config/secrets/prod.secrets.json