SHELL := /usr/bin/env bash

.PHONY: auto-all
auto-all: setup

.PHONY: setup
setup:
	@source scripts/install-requirements.sh
	@source scripts/setup-project.sh
	@source scripts/ensure-credentials.sh

.PHONY: ensure-credentials
ensure-credentials:
	@source scripts/ensure-credentials.sh


.PHONY: init-infrastructure
init-infrastructure: ensure-credentials
	@source scripts/init-infrastructure.sh

.PHONY: plan-infrastructure
plan-infrastructure: ensure-credentials
	@source scripts/plan-infrastructure.sh

.PHONY: update-infrastructure
update-infrastructure: ensure-credentials plan-infrastructure
	@source scripts/update-infrastructure.sh

.PHONY: destroy-infrastructure
destroy-infrastructure: ensure-credentials
	@source scripts/destroy-infrastructure.sh


.PHONY: test-all
test-all: lint check-dependencies test test-integration

.PHONY: lint
lint:
	@source scripts/lint.sh

.PHONY: check-dependencies
check-dependencies:
	@source scripts/check-dependencies.sh

.PHONY: test
test:
	@source scripts/test.sh

.PHONY: test-integration
test-integration:
	@source scripts/test-integration.sh


.PHONY: client
client:
	@source scripts/start-client.sh

.PHONY: client-ssr
client-ssr:
	@source scripts/start-client-ssr.sh

.PHONY: server
server:
	@source scripts/start-server.sh


.PHONY: deploy
deploy:
	@source scripts/deploy.sh


.PHONY: create-terraform-bucket
create-terraform-bucket:
	@source scripts/create-terraform-bucket.sh