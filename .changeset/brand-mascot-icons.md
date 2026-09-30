---
'@drizztdourden08/tessera': minor
---

Relic of the Past's mark is its new pixel logo, and its mascot is Sentri, built in code from its separate pieces with `Mascot`, `BrandScene` and `sceneMarkup`; the Hookshop variant has Sentri pull a shop bag in with its hookshot. `BrandMark` and `Logo` take `variant="app-icon"` in place of `tile`, drawing the app icon the new `appIcon` brand field describes: none for Tessera, the mark straight for Relic of the Past and Brock, the tile for Archipelia. `pnpm icons` writes every brand's files from the brand data, with PNG ladders from 16 to 512, whole-pixel scaling for pixel art and a .ico from 16 to 256. See MIGRATION.md.
