<div align="center">
  <a href="https://github.com/flolu/fullstack-bazel">
    <img width="180px" height="auto" src="./services/client/assets/icons/icon-192x192.png" />
  </a>
  <br>
  <h1>Fullstack Bazel</h1>
  <p>
    Fullstack example monorepo for building web apps with <a href="https://bazel.build">Bazel</a>
  </p>
</div>

<br>

<!-- TODO update features-->

<!--
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
-->

# Requirements

Linux, Node.Js, Docker Compose, Kubectl, Helm, Yarn

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

**Production**

```
yarn client:ssr
yarn server
```

<br>

# Issues

- Upgrade from NgRx v9 to v11 ([rules_nodejs/issues/2320](https://github.com/bazelbuild/rules_nodejs/issues/2320))
- Upgrade from Karma v4 to v5 ([rules_nodejs/issues/2093](https://github.com/bazelbuild/rules_nodejs/issues/2093))
- Upgrade from rules_docker v14 to v15 with Bazel v4 ([rules_docker/issues/1716](https://github.com/bazelbuild/rules_docker/issues/1716))

<br>

## Special Thanks to all the people listed below!

[@rayman1104](https://github.com/rayman1104) [@marcus-sa](https://github.com/marcus-sa) [@alexeagle](https://github.com/alexeagle) [@joeljeske](https://github.com/joeljeske)

<br>
<br>
<br>

<!-- # Reminders For Myself

**TODO's**

- Fullstack integration tests
- Backend unit tests
- Documentation + Code comments
- Second client without server side rendering
- Deploy app to local Kubernetes cluster
- Prerendering
- Upgrade core-js and systemjs
- Minify html
- README image with all used technologies' logos
- Upgrade core-js to v3
- Download all 'my' information (gpdr conformaty)
- Terms of Service, Privacy Policy, Legal Notice placeholders
- Fix circular dependency warning when building prod bundles
- Chrome log: Site cannot be installed: Page does not work offline. Starting in Chrome 93, the installability criteria is changing, and this site will not be installable. See https://goo.gle/improved-pwa-offline-detection for more information.
- Consider renaming the project to "Fullbazel"
- Keep user authenticated when server side rendering
- Check design in other browsers
- Install node_modules once as first job and then reuse in other jobs for .github/workflows/ci.yaml

**Ideas**

- Building into a Desktop App (e.g. with Electron)
- Static website example (e.g docs or homepage)
- Other frontend frameworks
- Other server languages (e.g. Go, Python) -->
