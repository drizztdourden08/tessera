---
"@drizztdourden08/tessera": minor
---

BackdropLayer draws an image, a colour or a scene of your own behind a block from one `Backdrop` value, the value Hero's `backdrop` takes, and `backdropStyle(backdrop)` returns its background style for an element you draw yourself. Pass a BackdropLayer as the `backdrop` of ScreenPage, SettingsPage or ContentHeader to show an image or a colour behind the header. Hero draws its backdrop through it, with the same look. `HeroBackdrop` is renamed `Backdrop` and `HeroImageFit` is renamed `BackdropFit`, both now exported from `primitives` and the package root; the layer classes `hero__backdrop--node`, `--image`, `--color` and `--pixelated` are now `backdrop-layer--node`, `--image`, `--color` and `--pixelated`. RENAMES.json carries all of these. BackdropLayer has a usage file, so the guide answers a picture, a colour or a scene behind a block with it.
