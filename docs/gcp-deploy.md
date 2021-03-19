> This documentation assumes you are using Ubuntu 20.04 LTS

# 1. Install Tools

**Node**

```
sudo snap install node
```

**Yarn**

<!-- TODO check if this works -->

```
npm i -g --force yarn
```

**Google Cloud SDK**

Install via [official instructions](https://cloud.google.com/sdk/docs/install#deb) and then run

```
gcloud init
```

**Terraform**

```
sudo snap install --candidate  terraform
```

**Kubectl**

```
sudo snap install kubectl --classic
```

**Helm**

```
sudo snap install helm --classic
```

# 2. Setup Google Cloud Project

Create a Google Cloud project and set `PROJECT_ID` in the `Makefile`

# 3. Setup Terraform Service Account

Create a service account for Terraform with necessary permissions

```
make terraform-service-account
```

Enable required API's

```
make gcp-enable-apis
```

# 4. Cloud Storage Bucket for Terraform State

```
make create-tf-bucket
```
