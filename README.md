<div align="center">
  <a href="https://github.com/flolu/fullstack-bazel">
    <img width="180px" height="auto" src="./services/client/assets/icons/icon-192x192.png" />
  </a>
  <br>
  <h1>Fullstack Bazel</h1>
  <p>
    Fullstack starter Monorepo for <strong>building</strong> modern web apps with built with <a href="https://bazel.build">Bazel</a>
  </p>
</div>

<br>

# Features

**General**

Deployment to Kubernetes, monorepo, libraries can be shared between server and client

**Frontend**

Development server with hot reload, lazy loading modules, PWA support, service worker, server side rendering, perfect Lighthouse score, realtime messages with Web Sockets, NgRx for state management, push notifications, differential loading, unit tests, e2e tests

**Backend**

Docker compose for local development with hot reload

<br>

# Documentation

Coming soon

<br>

# Requirements

Linux, Node.Js, Docker Compose, Kubectl, Yarn

<br>

# Commands

**Setup**

```
yarn install && yarn build
```

**Development**

```
yarn client
yarn server
```

**Deploy**

Read [docs/gke-deployment.md](docs/gke-deployment.md)

<br>
<br>

# Reminders For Myself

**TODO's**

- Run tests in Google Cloud Build
- Fullstack integration tests
- Backend unit tests
- Documentation + Code comments
- Second client without server side rendering
- Client dark and light theme
- API with Database
- Deploy app to local Kubernetes cluster
- Prerendering
- Upgrade core-js and systemjs
- Minify html
- README image with all used technologies' logos

**Issues**

- Upgrade from NgRx v9 to v10 ([rules_nodejs/issues/2320](https://github.com/bazelbuild/rules_nodejs/issues/2320))
- Upgrade from Karma v4 to v5 ([rules_nodejs/issues/2093](https://github.com/bazelbuild/rules_nodejs/issues/2093))
- Insert Manifest with html-insert-assets ([html-insert-assets/issues/17](https://github.com/jbedard/html-insert-assets/issues/17))
- Comments are not removed in Javascript bundles

**Ideas**

- Building into a Desktop App (e.g. with Electron)
- Static website example (e.g docs or homepage)
- Other frontend frameworks
- Other server languages (e.g. Go, Python)

<br>

## Special Thanks to all the people listed below!

[@rayman1104](https://github.com/rayman1104) [@marcus-sa](https://github.com/marcus-sa) [@alexeagle](https://github.com/alexeagle) [@joeljeske](https://github.com/joeljeske)
