---
"@drizztdourden08/tessera": minor
---

`DensityScope` sets a whole panel compact at once: every input, Field and Button inside without its own `size` draws at `sm`, and the gaps inside Slider, Checkbox, SegmentedControl, ToggleGroup and DisabledOverlay tighten through the `--density-gap`, `--density-pad` and `--density-message-weight` tokens; `useDensity` and the `Density` type are exported. Public options replace styling Tessera's classes: `className` on SegmentedControl, `strong` on a LogPanel kind, and `titleWrap` on DialogShell. Nothing changes where they are not used.
