SHELL := /usr/bin/env bash

.PHONY: auto-all
auto-all: setup

.PHONY: setup
setup:
	@source scripts/install-requirements.sh
	@source scripts/upsert-secrets.sh
	@source scripts/setup-project.sh
	@source scripts/ensure-credentials.sh

.PHONY: ensure-credentials
ensure-credentials:
	@source scripts/ensure-credentials.sh

.PHONY: upsert-secrets
upsert-secrets:
	@source scripts/upsert-secrets.sh


.PHONY: create-infrastructure
create-infrastructure: ensure-credentials
	@echo "This will take ~10 minutes"
	@source scripts/create-infrastructure.sh

.PHONY: update-infrastructure
update-infrastructure: ensure-credentials
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

.PHONY: server
server:
	@source scripts/start-server.sh


.PHONY: deploy
deploy:
	@source scripts/deploy.sh

# "---------------------------------------------------------"
# Misc, eventually remove
# "---------------------------------------------------------"

PROJECT_ID=fullstack-bazel-306720
TERRAFORM_SA=terraform
TERRAFORM_CREDENTIALS=./terraform/terraform-sa-key.json
GCP_REGION=europe-west3

GKE_REGION=europe-west3
GKE_CLUSTER=cluster
GKE_CLOUDSQL_SERVICE_ACCOUNT=gke-cloudsql
GKE_CLOUDSQL_KSA=cloudsql-service-account
GCLOUD_USER_EMAIL=flo@drakery.com
ENV=staging

# Terraform Service Account

terraform-service-account: gcp-create-tf-sa gcp-tf-sa-keys gcp-tf-sa-iam

gcp-create-tf-sa:
	gcloud iam service-accounts create ${TERRAFORM_SA}

gcp-tf-sa-keys:
	gcloud iam service-accounts keys create ${TERRAFORM_CREDENTIALS} \
		--iam-account terraform@${PROJECT_ID}.iam.gserviceaccount.com && \
	export GOOGLE_APPLICATION_CREDENTIALS=$PWD/${TERRAFORM_CREDENTIALS}

gcp-tf-sa-iam:
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/compute.networkAdmin && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/container.admin && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/iam.serviceAccountAdmin && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/iam.serviceAccountUser && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/storage.admin && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/storage.objects.list && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/cloudsql.admin && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/container.clusterAdmin && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
		--member serviceAccount:${TERRAFORM_SA}@${PROJECT_ID}.iam.gserviceaccount.com \
		--role roles/iam.securityAdmin

gcp-enable-apis:
	gcloud services enable cloudresourcemanager.googleapis.com && \
	gcloud services enable cloudbilling.googleapis.com && \
	gcloud services enable iam.googleapis.com && \
	gcloud services enable compute.googleapis.com && \
	gcloud services enable sqladmin.googleapis.com && \
	gcloud services enable container.googleapis.com

# Bucket for Terraform State

create-tf-bucket:
	gsutil mb -p ${PROJECT_ID} -l ${GCP_REGION} gs://${PROJECT_ID}-terraform

###

gcloud-init:
	gcloud auth login && \
	gcloud config set project ${PROJECT_ID}

create-tf-workspace:
	cd terraform && \
		terraform workspace new ${ENV}

terraform-init:
	cd terraform && \
		terraform workspace select ${ENV} && \
		terraform init

terraform-plan:
	cd terraform && \
		terraform workspace select ${ENV} && \
		terraform plan \
		-var-file="./environments/common.tfvars" \
		-var-file="./environments/${ENV}/config.tfvars"

terraform-apply:
	cd terraform && \
		terraform workspace select ${ENV} && \
		terraform apply \
		-var-file="./environments/common.tfvars" \
		-var-file="./environments/${ENV}/config.tfvars"

terraform-show:
	cd terraform && \
		terraform workspace select ${ENV} && \
		terraform show

terraform-destroy:
	cd terraform && \
		terraform workspace select ${ENV} && \
		terraform destroy \
		-var-file="./environments/common.tfvars" \
		-var-file="./environments/${ENV}/config.tfvars"