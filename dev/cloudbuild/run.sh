#!/usr/bin/env bash
TAG=eu.gcr.io/fullstack-bazel/cloudbuild

docker run \
  -v ~/Desktop/fullstack-bazel:/workspace \
  $TAG

# docker run -v ~/Desktop/fullstack-bazel:/workspace  eu.gcr.io/fullstack-bazel/cloudbuild test --test_output=all //...