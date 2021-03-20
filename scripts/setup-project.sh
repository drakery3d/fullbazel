# bin/bash

# npm dependencies
command yarn install

# bazelisk
command yarn bazelisk version >/dev/null 2>&1 || {
  echo "Download Bazelisk"
  command yarn bazelisk
  echo "Done"
  command yarn bazelisk version
}
echo "Bazelisk already downloaded"

# ensure secret files exist
command cp -n libs/config/secrets/example.secrets.json libs/config/secrets/dev.secrets.json
command cp -n libs/config/secrets/example.secrets.json libs/config/secrets/prod.secrets.json

# build with bazel
command yarn build