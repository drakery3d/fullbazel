#!/usr/bin/env bash
TAG=gcr.io/fullstack-bazel-306720/cloudbuild

cd ../../ && \
docker build -t $TAG -f dev/cloudbuild/Dockerfile .