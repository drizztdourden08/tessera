---
'@drizztdourden08/tessera': minor
---

The bright and dim accent greys of the Tessera palette are neutral instead of slightly pink, and the light colour set is removed: Tessera has one colour set, and each app's palette is its look. `--brand-backdrop-gradient`, built by `backdropGradientCss(BACKDROP_GRADIENT)`, is the shared backdrop each palette paints its own way, and `Hero` draws it. `InteractiveTessera` callouts show the logo alone and open the wordmark on focus, never overlapping the T. `pnpm icons` writes a `mark.ico` for Tessera, the gallery favicon, and draws the maskable, Android background and splash layers of a straight app icon on transparent ground. See MIGRATION.md.
