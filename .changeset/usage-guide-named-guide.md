---
'@drizztdourden08/tessera': minor
---

The usage guide tooling is now named guide, with no alias: the `guide` object of `tessera.config.json` (`guide.usage`, `guide.out`, `guide.tree`, `guide.tsconfig`, also under `apps`), the `tessera guide` command, the `pnpm guide` script, the shipped `guide/` folder with its `./guide/*` export, and the `GuideUsage` type. `RENAMES.json` gains a `configKeys` group for the moved settings. Tessera moves to `@drizztdourden08/standards` 0.6.0: `.gitignore` ignores every dot-folder with `.*/` and lists the tracked ones, and `pnpm lint` runs `standards knip`.
