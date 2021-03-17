PROJECT_ID=fullstack-bazel-306720
GKE_ZONE=europe-west3-b
GKE_CLUSTER=cluster
GKE_CLOUDSQL_SERVICE_ACCOUNT=gke-cloudsql
GKE_CLOUDSQL_KSA=cloudsql-service-account
GCLOUD_USER_EMAIL=flo@drakery.com

gcloud-init:
	gcloud auth login && \
	gcloud config set project ${PROJECT_ID}

gke-create-cluster:
	gcloud beta container --project "${PROJECT_ID}" clusters create "${GKE_CLUSTER}" \
		--zone "${GKE_ZONE}" \
		--no-enable-basic-auth \
		--machine-type "e2-medium" \
		--disk-size "10" \
		--preemptible \
		--num-nodes "2" \
		--enable-autoscaling \
		--min-nodes "0" \
		--max-nodes "3" \
		--workload-pool=${PROJECT_ID}.svc.id.goog

gke-connect:
	gcloud container clusters get-credentials ${GKE_CLUSTER} --zone ${GKE_ZONE} --project ${PROJECT_ID}

gke-describe:
	gcloud container clusters describe ${GKE_CLUSTER} --zone ${GKE_ZONE} --project ${PROJECT_ID}

gke-cluster:
	echo gke_${PROJECT_ID}_${GKE_ZONE}_${GKE_CLUSTER}

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

gke-delete:
	gcloud container clusters delete cluster --zone europe-west3-b

gke-clusterrolebinding:
	kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user ${GCLOUD_USER_EMAIL}

nginx-ingress:
	helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx && \
	helm repo update && \
	helm install ingress ingress-nginx/ingress-nginx \
  --namespace ingress \
	--create-namespace

cert-manager:
	kubectl create namespace cert-manager --dry-run=client -o yaml | kubectl apply -f - && \
	helm repo add jetstack https://charts.jetstack.io && \
	helm repo update && \
	helm install cert-manager jetstack/cert-manager \
  --version v0.16.1 \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true

remove-nginx-ingress:
	helm uninstall ingress-nginx -n ingress

remove-cert-manager:
	helm uninstall cert-manager -n cert-manager