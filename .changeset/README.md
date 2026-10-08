<!-- @layer docs @kind doc -->
# Changesets and releases

Every change that should reach the published package carries a changeset: `pnpm changeset`, pick the bump, write one plain sentence. Changesets write `CHANGELOG.md` and the version; each version also has a release note, `release-notes/v<version>.md`, written by hand for the people who build apps with Tessera. The format is the release note standard of `@drizztdourden08/standards` (its `docs/release-notes.md`): a `# Tessera v<version>` title, one summary paragraph, `##` sections of plain sentences, `Fixes` last.

## The release routine

1. **Merge the features.** Each lands on `main` with its changeset.
2. **The version pull request opens with a drafted note.** On every push to `main` with changesets pending, the release workflow builds the `release: version packages` pull request (branch `changeset-release/main`). It runs `pnpm release:version`, which bumps `package.json`, writes `CHANGELOG.md` and stamps `RENAMES.json`, then drafts `release-notes/v<next>.md` from the new changelog entry. The draft opens with `<!-- release-notes: draft -->` and holds the changeset sentences as they are.
3. **Rewrite the note in that pull request.** Wait until nothing else is going into the release: every push to `main` rebuilds the pull request from `main` and drops edits made on its branch. Then, on `changeset-release/main`, rewrite `release-notes/v<next>.md` for app makers: keep the title, write the summary, sort the bullets into sections (`New`, `Changes`, `Upgrading`, `Fixes` and the other names of the standard), one plain sentence each, with no commit hashes or pull request numbers. Delete the `<!-- release-notes: draft -->` line.
4. **The check passes.** Run `pnpm exec standards release-notes check <next>` on the branch: it must end with `0 finding(s)`. Pushing the edit from your own account also runs CI on the pull request, which runs the same check; the pull request the workflow opens runs none by itself.
5. **Merge to publish.** The release run checks the note again and stops while it is missing, a draft or malformed. Otherwise it publishes `@drizztdourden08/tessera` to GitHub Packages and creates the GitHub release `v<next>` with the note as its body. If it stops, fix the note on `main` and the next run publishes.

`pnpm exec standards release-notes body <version>` prints the body a release gets, and `pnpm exec standards release-notes draft <version>` drafts a note by hand when one is missing.
