# bin/bash

# Check for system requirements silently and install missing if needed.
command sudo apt-get -qqq update

# gcloud
command gcloud version >/dev/null 2>&1 || {
  # https://cloud.google.com/sdk/docs/install#deb
  echo "Download Google Cloud SDK"
  command echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
  command curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
  echo "Install Google Cloud SDK"
  command sudo apt-get -qqq update && sudo apt-get -qqq -y install google-cloud-sdk
  echo "Done"
}
echo "Google Cloud SDK already installed"

# kubectl
command kubectl version --client >/dev/null 2>&1 || {
  echo "Install kubectl"
  command sudo snap install kubectl --classic
  echo "Done"
  command kubectl version --client
}
echo "Kubectl already installed"

# helm
command helm version >/dev/null 2>&1 || {
  echo "Install Helm"
  command sudo snap install helm --classic
  echo "Done"
  command helm version
}
echo "Helm already installed"

# terraform
command terraform version >/dev/null 2>&1 || {
  echo "Install Terraform"
  command sudo snap terraform --candidate
  echo "Done"
  command terraform version
}
echo "Terraform already installed"

# docker-compose
command docker-compose -v >/dev/null 2>&1 || {
  echo "Install Docker Compose"
  command sudo apt install docker-compose -y
  command sudo gpasswd -a $USER docker
  command newgrp docker
  echo "Done"
  command docker-compose -v
}
echo "Docker Compose already installed"

# node
command node -v >/dev/null 2>&1 || {
  echo "Install Node.js"
  command sudo apt install nodejs -y
  echo "Done"
  command node -v
  command npm -v
}
echo "Node.js already installed"

# yarn
command yarn -v >/dev/null 2>&1 || {
  echo "Install Yarn"
  command npm i -g --force yarn
  echo "Done"
  command yarn -v
}
echo "Yarn already installed"