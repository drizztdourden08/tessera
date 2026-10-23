---
"@drizztdourden08/tessera": minor
---

No app in the family has a light theme, so every variant made for a light background is removed. BrandMark, Logo and Logo.Combined lose their `ground` prop; inside Splash a mark still takes its dark look by itself. The `rim` prop and BrandRim and BrandRimTone lose the value `'dark'`, so a rim is `'none'` or `'light'`. The token `--brand-rim-dark` and the class `.brand-rim--dark` are removed. The light gradient pair, `--p-gradient-light-from`, `--p-gradient-light-to`, `--c-gradient-light-from` and `--c-gradient-light-to`, is removed from every palette, and `gradientLightFrom` and `gradientLightTo` from `tokens.json` and `splash-tokens.css`. The folders `brand/light-ground` and `brand/dark-rim` are deleted; `brand/dark-ground` and `brand/light-rim` stay as they were. The gallery drops its light cells and options, and its demo menus no longer list a Light theme. See MIGRATION.md section 271 for how an app upgrades.
