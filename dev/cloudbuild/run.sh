#!/usr/bin/env bash
TAG=gcr.io/fullstack-bazel-306720/cloudbuild

docker run \
  -v ~/Desktop/fullstack-bazel-306720:/workspace \
  $TAG