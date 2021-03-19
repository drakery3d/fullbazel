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
		--role roles/container.clusterAdmin

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

# create-tf-bucket:
# 	gsutil mb -p ${PROJECT_ID} gs://${PROJECT_ID}-terraform

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

gke-create-cluster:
	gcloud beta container --project "${PROJECT_ID}" clusters create "${GKE_CLUSTER}" \
	--region "${GKE_REGION}" \
	--machine-type "e2-small" \
	--disk-size "10" \
	--num-nodes "1" \
	--enable-autoscaling \
	--min-nodes "0" \
	--max-nodes "2" \
	--preemptible \
	--workload-pool=${PROJECT_ID}.svc.id.goog

gke-connect:
	gcloud container clusters get-credentials ${GKE_CLUSTER} --region ${GKE_REGION} --project ${PROJECT_ID}

gke-describe:
	gcloud container clusters describe ${GKE_CLUSTER} --region ${GKE_REGION} --project ${PROJECT_ID}

gke-cluster:
	echo gke_${PROJECT_ID}_${GKE_REGION}_${GKE_CLUSTER}

gke-delete:
	gcloud container clusters delete cluster --region ${GKE_REGION}

gke-cloudsql-service-account:
	gcloud iam service-accounts create ${GKE_CLOUDSQL_SERVICE_ACCOUNT} \
	--description="Connect to CloudSQL from a GKE cluster" \
	--display-name="${GKE_CLOUDSQL_SERVICE_ACCOUNT}" && \
	gcloud projects add-iam-policy-binding ${PROJECT_ID} \
	--member="serviceAccount:${GKE_CLOUDSQL_SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com" \
	--role="roles/cloudsql.client" && \
	gcloud iam service-accounts add-iam-policy-binding \
	--role roles/iam.workloadIdentityUser \
	--member "serviceAccount:${PROJECT_ID}.svc.id.goog[default/${GKE_CLOUDSQL_KSA}]" \
	${GKE_CLOUDSQL_SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com

gke-annotate-cloudsql-service-account:
	kubectl apply -f libs/kubernetes/cloudsql-service-account.yaml && \
	kubectl annotate serviceaccount \
   ${GKE_CLOUDSQL_KSA} \
   iam.gke.io/gcp-service-account=${GKE_CLOUDSQL_SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com

gke-clusterrolebinding:
	kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user ${GCLOUD_USER_EMAIL}

nginx-ingress:
	helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx && \
	helm repo update && \
	helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
	--create-namespace

get-endpoint:
	kubectl describe svc ingress-nginx-controller -n ingress-nginx | grep "LoadBalancer Ingress"

cert-manager:
	helm repo add jetstack https://charts.jetstack.io && \
	helm repo update && \
	helm install cert-manager jetstack/cert-manager \
  --version v1.2.0 \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true

remove-nginx-ingress:
	helm uninstall ingress-nginx -n ingress

remove-cert-manager:
	helm uninstall cert-manager -n cert-manager