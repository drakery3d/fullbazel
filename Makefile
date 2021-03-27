SHELL := /usr/bin/env bash

.PHONY: auto-all
auto-all: setup

.PHONY: setup
setup:
	@source development/scripts/install-requirements.sh
	@source development/scripts/setup-project.sh
	@source development/scripts/ensure-credentials.sh

.PHONY: ensure-credentials
ensure-credentials:
	@source development/scripts/ensure-credentials.sh


.PHONY: init-infrastructure
init-infrastructure: ensure-credentials
	@source infrastructure/scripts/init-infrastructure.sh

.PHONY: plan-infrastructure
plan-infrastructure: ensure-credentials
	@source infrastructure/scripts/plan-infrastructure.sh

.PHONY: update-infrastructure
update-infrastructure: ensure-credentials plan-infrastructure
	@source infrastructure/scripts/update-infrastructure.sh

.PHONY: destroy-infrastructure
destroy-infrastructure: ensure-credentials
	@source infrastructure/scripts/destroy-infrastructure.sh


.PHONY: test-all
test-all: lint check-dependencies test test-integration

.PHONY: lint
lint:
	@source development/scripts/lint.sh

.PHONY: check-dependencies
check-dependencies:
	@source development/scripts/check-dependencies.sh

.PHONY: test
test:
	@source development/scripts/test.sh

.PHONY: test-integration
test-integration:
	@source development/scripts/test-integration.sh


.PHONY: client
client:
	@source development/scripts/start-client.sh

.PHONY: client-ssr
client-ssr:
	@source development/scripts/start-client-ssr.sh

.PHONY: server
server:
	@source development/scripts/start-server.sh


.PHONY: deploy
deploy:
	@source infrastructure/scripts/deploy.sh


.PHONY: create-terraform-bucket
create-terraform-bucket:
	@source infrastructure/scripts/create-terraform-bucket.sh

.PHONY: upgrade-bazel-npm-deps
upgrade-bazel-npm-deps:
	@source development/scripts/upgrade-bazel-npm-deps.sh