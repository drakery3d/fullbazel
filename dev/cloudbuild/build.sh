#!/usr/bin/env bash
TAG=eu.gcr.io/fullstack-bazel/cloudbuild

cd ../../ && \
docker build -t $TAG -f dev/cloudbuild/Dockerfile .