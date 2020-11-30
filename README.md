<div align="center">
  <a href="https://github.com/flolu/angular-bazel-starter">
    <img width="180px" height="auto" src="./services/client/assets/icons/icon-192x192.png" />
  </a>
  <br>
  <h1>Angular Bazel Starter</h1>
  <p>
    Full stack starter Monorepo for building modern web apps with <a href="https://angular.io">Angular</a> and <a href="https://bazel.build">Bazel</a> deployed to a Kubernetes Cluster
  </p>
</div>

# Features

- Development server with hot reload
- Lazy Loading
- Progressive Web App
- Service Worker
- Server Side Rendering
- Sass for styling
- Shared libraries
- Perfect Lighthouse score
- Realtime messages from server with Web Sockets
- NgRx for state management
- Push Notifications
- Deployment to Kubernetes
- Configuration and Secret management for different environments
- Docker compose for local development with hot reload

# Requirements

- Linux
- Yarn
- Docker Compose
- Kubectl

# Commands

**Setup**

- Just run: `yarn`
- Then build the project once: `yarn build:dev`

**Development**

- Start client: `yarn client`
- Start server: `yarn server`

**Deploy**

> Read [docs](docs/gke-deployment.md) first

- To Kubernetes cluster: `yarn deploy`

# TODO

- Differential Loading
- Tests
- Documentation
- Upgrade from NgRx v9 to v10 ([rules_nodejs/issues/2320](https://github.com/bazelbuild/rules_nodejs/issues/2320))
- Second client without server side rendering (also add loading screen back in)

## Thanks to all the people listed below!

[@rayman1104](https://github.com/rayman1104) [@marcus-sa](https://github.com/marcus-sa) [@joeljeske](https://github.com/joeljeske)
