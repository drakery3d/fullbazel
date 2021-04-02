<div align="center">
  <a href="https://github.com/drakery3d/fullstack-bazel">
    <img width="180px" height="auto" src="./angular-client/assets/icons/icon-192x192.png" />
  </a>
  <br>
  <h1>Fullstack Bazel</h1>
  <p>
    Fullstack example monorepo for building web apps with <a href="https://bazel.build">Bazel</a>
  </p>
</div>

# Usage

**Recommended Operating System**: Ubuntu 20.04 LTS

Setup

- `make setup` (Install required software and sets up project)

Angular Client

- `make angular` (Start Angular development server, http://localhost:8080)
- `make angular-ssr` (Start Angular Production server, http://localhost:8080)

Next.js Client

- `make next` (Start Next.js development server, http://localhost:3000)
- `make next-prod` (Start Next.js production server, http://localhost:3000)

Development

- `make server` (Start development backend services)
- `make test` (Unit tests with Bazel)
- `make lint` (Check linting)
- `make test-integration` (Integration tests with Jasmine and Testcontainers)
- `make check-dependencies` (Check npm dependencies)

Deployment

- `make init-infrastructure` (Initialize infrastructure)
- `make plan-infrastructure` (Plan infrastructure)
- `make update-infrastructure` (Update infrastructure)
- `make destroy-infrastructure` (Destroy infrastructure)
- `make deploy` (Deploy to Kubernetes cluster)

# Codebase

**Services**

- [`angular-client`](angular-client) **Angular**, web application
- [`nextjs-client`](nextjs-client) **Next.js**, web application
- [`nodejs-server`](nodejs-server) **Node.js**, http server

**Libraries**

- [`angular-tools`](libraries/angular-tools) **Bazel**, tooling for Angular
- [`config`](libraries/config) **Typescript**, runtime configuration management and build time config generation
- [`enums`](libraries/enums) **Typescript**, shared enumerations
- [`kubernetes`](libraries/kubernetes) **Yaml**, Kubernetes configurations
- [`schema`](libraries/schema) **Typescript**, shared Typescript interfaces
- [`testing`](libraries/testing) **Typescript**, testing utilities
- [`types`](libraries/types) **Typescript**, shared types
- [`ui-elements`](libraries/ui-elements) **Typescript, Angular**, shared user interface components
- [`websocket-store`](libraries/websocket-store) **Typescript, Angular**, NgRx module for web sockets

**Miscellaneous**

- [`development`](development), tooling, configurations and scripts for development
- [`infrastructure`](infrastructure), Terraform configurations to deploy application in the cloud

<!-- TODO Upgrade core-js and systemjs -->
<!-- TODO move services/* into root, but keep libraries in libs/* -->
<!-- TODO fix errors and warnings when running `yarn check` -->
<!-- TODO Fix circular dependency warning when building angular prod bundles -->

<!-- FIXME documentation / wiki -->
<!-- FIXME local kubernetes cluster with minikube / microk8s -->
<!-- FIXME angular pre-rendering -->
<!-- FIXME angular minify main.html in production builds -->
<!-- FIXME gdpr compliance -->
<!-- FIXME Terms of Service, Privacy Policy, Legal Notice placeholders -->
<!-- FIXME Chrome log: Site cannot be installed: Page does not work offline. Starting in Chrome 93, the installability criteria is changing, and this site will not be installable. See https://goo.gle/improved-pwa-offline-detection for more information. -->
<!-- FIXME Keep user authenticated when server side rendering -->
<!-- FIXME Check design in other browsers -->
<!-- FIXME Install node_modules once as first job and then reuse in other jobs for .github/workflows/ci.yaml -->
<!-- FIXME Try Google Kubernetes Autopilot when this is fixed: https://github.com/jetstack/cert-manager/issues/3717 -->
<!-- FIXME Bundling into a desktop app (e.g. with Electron) -->
<!-- FIXME Also use other technologies (e.g. other client frameworks and other backend languages) -->
