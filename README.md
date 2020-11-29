<div align="center">
  <a href="https://github.com/flolu/angular-bazel-starter">
    <img width="180px" height="auto" src="./services/client/assets/icons/icon-192x192.png" />
  </a>
  <br>
  <h1>Angular Bazel Starter</h1>
  <p>
    Full stack starter Monorepo for building modern web apps with <a href="https://angular.io/">Angular</a> and <a href="https://bazel.build/">Bazel</a>
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
- Bazel <!-- TODO check if actually needed, maybe bazelisk is enough -->
- Yarn
- Docker Compose
- Kubectl

# Commands

**Setup**

- Just run: `yarn`
- Optionally modify secrets in `libs/config/secrets`

**Development**

- Start client: `yarn client:dev`
- Start server: `yarn server:dev`

**Local Production**

- Start client: `yarn client`
- Start backend: `yarn server`

**Deploy**

> Read [docs](docs/gke-deployment.md) first

- To Kubernetes cluster: `yarn deploy`

# TODO

- Differential Loading
- Unit Tests
- Integration Tests
- Documentation
- Server Side Rendering doesn't seem to work yet

## Thanks to all the people listed below!

[@rayman1104](https://github.com/rayman1104) [@marcus-sa](https://github.com/marcus-sa) [@joeljeske](https://github.com/joeljeske)

<!--
# TODO upgrade ngrx to v10... currently causes errors
-->
