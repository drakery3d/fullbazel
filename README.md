<div align="center">
  <a href="https://github.com/drakery3d/fullstack-bazel">
    <img width="180px" height="auto" src="./services/client/assets/icons/icon-192x192.png" />
  </a>
  <br>
  <h1>Fullstack Bazel</h1>
  <p>
    Fullstack example monorepo for building web apps with <a href="https://bazel.build">Bazel</a>
  </p>
</div>

# Usage

Requirements

- Ubuntu 20.04 LTS

Setup

- `make setup` (Install required software and sets up project)

Development

- `make client` (Start Angular development server, http://localhost:8080)
- `make server` (Start development backend)
- `make test` (Unit tests with Bazel)
- `make lint` (Check linting)
- `make test-integration` (Integration tests with Jasmine and Testcontainers)
- `make check-dependencies` (Check npm dependencies)

Infrastructure

- `make create-infrastructure` (Create infrastructure in Google Cloud)
- `make update-infrastructure` (Update infrastructure)
- `make destroy-infrastructure` (Destroy infrastructure)

Deploy

- `make deploy` (Build and push Docker containers and deploy to Kubernetes cluster)

# Issues

- Upgrade from NgRx v9 to v11 ([rules_nodejs/issues/2320](https://github.com/bazelbuild/rules_nodejs/issues/2320))
- Upgrade from Karma v4 to v5 ([rules_nodejs/issues/2093](https://github.com/bazelbuild/rules_nodejs/issues/2093))

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
- Try Google Kubernetes Autopilot when this is fixed: https://github.com/jetstack/cert-manager/issues/3717

**Ideas**

- Building into a Desktop App (e.g. with Electron)
- Static website example (e.g docs or homepage)
- Other frontend frameworks
- Other server languages (e.g. Go, Python) -->

<!-- TODO fix errors and warnings when running `yarn check` -->
<!-- TODO move deps from WORKSPACE into a deps.bzl file -->
