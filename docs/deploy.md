<!-- TODO improve like: https://dzone.com/articles/google-gke-and-sql-with-terraform-ion-medium -->

# 0. Prepare

- Authenticate to Google Cloud `make gcloud-init`
- Configure variables in `Makefile`
- Create a bucket for Terraform resources `make create-tf-bucket`
- Create a service account for Terraform https://console.cloud.google.com/iam-admin/serviceaccounts
- Add `Storage Object Admin` role
- Add `Service Account Admin` role
- Add `Compute Network Admin` role
- Add `Kubernetes Engine Cluster Admin` role
- Add `Service Account User` role
- Create a key and download the JSON file into `terraform/terraform-sa-key.json`
- Change directory to `cd terraform`
- Run `export GOOGLE_APPLICATION_CREDENTIALS=$PWD/terraform-sa-key.json`
- Run `make create-tf-workspace`
- Run `make terraform-init`

Configure `libs/config/configs/prod.config.json` and `libs/config/secrets/prod.secrets.json`

# 1. CloudSQL Database

Create a MySQL v8 instance

Create a `nonroot` user

# 2. Kafka Cluster

- create confluent cluster
- create all required topics
- create api key and secret
- update configs

# 3. Kubernetes Cluster

**Create cluster and connect**

```
make gke-create-cluster && \
make gke-connect
```

<br>

**Cluster Role Binding**

`make gke-clusterrolebinding`

<br>

**NGINX Ingress Controller**

Install via Helm `make nginx-ingress`

<br>

**Ip address**

Get the load balander `endpoint`: `make get-endpoint`

Create two A records

| Type | Domain                    | Value        |
| ---- | ------------------------- | ------------ |
| A    | fullbazel.drakery.com     | `<endpoint>` |
| A    | api.fullbazel.drakery.com | `<endpoint>` |

<br>

**Cert Manager**

Install via Helm `make cert-manager`

<br>

**CloudSQL Proxy**

Enable the Cloud SQL Admin API:
`gcloud services enable sqladmin.googleapis.com`

Create a service account with `Cloud SQL Client` role: `make gke-cloudsql-service-account`

Add service account to cluster: `make gke-annotate-cloudsql-service-account`

<br>

**Build and deploy**

In `WORKSPACE` set `k8s_defaults` cluster field to output of `make gke-cluster`.

Then run `yarn deploy`
