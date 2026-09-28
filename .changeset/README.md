<!-- @layer docs @kind doc -->
# Changesets

Every change that should reach the published package carries a changeset: `pnpm changeset`, pick the bump, write one plain sentence.

On `main`, the release workflow opens a version pull request from the pending changesets; merging it publishes `@drizztdourden08/tessera` to GitHub Packages.
