# 0. Prepare

```
make gcloud-init
```

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

**Ip address**

Get the load balander `endpoint` from https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list

Create two A records

| Type | Domain                    | Value        |
| ---- | ------------------------- | ------------ |
| A    | fullbazel.drakery.com     | `<endpoint>` |
| A    | api.fullbazel.drakery.com | `<endpoint>` |

<br>

**Cluster Role Binding**

`make gke-clusterrolebinding`

<br>

**NGINX Ingress Controller**

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
