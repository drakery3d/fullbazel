<div align="center">
  <a href="https://github.com/flolu/fullstack-bazel">
    <img width="180px" height="auto" src="./services/client/assets/icons/icon-192x192.png" />
  </a>
  <br>
  <h1>Fullstack Bazel</h1>
  <p>
    Fullstack starter Monorepo for building modern web apps with built with <a href="https://bazel.build">Bazel</a>
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
- Unit tests
- Integration tests
- Documentation + Code comments
- Upgrade from NgRx v9 to v10 ([rules_nodejs/issues/2320](https://github.com/bazelbuild/rules_nodejs/issues/2320))
- Second client without server side rendering
- Client dark and light theme
- Do we need systemjs and corejs for older browsers? like [here](https://github.com/bazelbuild/rules_nodejs/blob/c344401524dd29882bccd1123e3691b1e27b5c82/examples/angular/src/BUILD.bazel#L254)
- API with Database
- Find a better solution than `string_flag` for multiple environments (https://www.youtube.com/watch?t=1859&v=keT8ixRS6Fk)

# Future Ideas

- Building into a Desktop App (e.g. with Electron)
- Static website example (e.g docs or homepage)
- Other frontend frameworks
- Other server languages (e.g. Go, Python)

## Thanks to all the people listed below!

[@rayman1104](https://github.com/rayman1104) [@marcus-sa](https://github.com/marcus-sa) [@joeljeske](https://github.com/joeljeske)
