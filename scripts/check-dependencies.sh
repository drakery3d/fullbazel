# bin/bash

IGNORES=(
  "core-js"
  "depcheck"
  "systemjs"
  "tslib"
  "@babel/*"
  "@bazel/*"
  "@types/jasmine"
  "history-server"
  "html-insert-assets"
  "jasmine"
  "karma"
  "karma-*"
  "requirejs"
  "terser"
  "ts-node-dev"
  "tsconfig-paths"
  )
IFS=,

IGNORE_STRING="${IGNORES[*]}"

command yarn depcheck --ignores="$IGNORE_STRING" --skip-missing=true