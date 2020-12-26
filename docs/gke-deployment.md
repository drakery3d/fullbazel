# Deploy to Google Cloud

**Create [GKE][1] cluster and connect to it**

```bash
gcloud auth login

gcloud config set project fullstack-bazel

gcloud beta container --project "fullstack-bazel" clusters create "cluster"\
  --zone "europe-west3-b" \
  --no-enable-basic-auth \
  --machine-type "n1-standard-1" \
  --disk-size "30" \
  --preemptible \
  --num-nodes "1" \
  --enable-autoscaling \
  --min-nodes "0" \
  --max-nodes "3"

gcloud container clusters get-credentials cluster --zone europe-west3-b --project fullstack-bazel
```

**[Helm][2]**

```bash
helm repo add stable https://charts.helm.sh/stable && \
helm repo add jetstack https://charts.jetstack.io && \
helm repo update
```

**Create an [NGINX Ingress][3]**

```bash
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user $(gcloud config get-value account) && \
helm install nginx-ingress stable/nginx-ingress
```

**Setup Domain**

Go to the created [Load Balancer][4] and point your domain to this IP address via an "A" record.

| Record Type | Domain                        | Value        |
| ----------- | ----------------------------- | ------------ |
| A           | fullstack-bazel.flolu.com     | <ip-address> |
| A           | api.fullstack-bazel.flolu.com | <ip-address> |

**Setup [Cert Manager][5]**

```bash
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v0.16.1 \
  --set installCRDs=true
```

**Deploy**

```bash
yarn deploy
```

[1]: https://cloud.google.com/kubernetes-engine
[2]: https://helm.sh
[3]: https://github.com/kubernetes/ingress-nginx
[4]: https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list
[5]: https://github.com/helm/charts/tree/master/stable/cert-manager
