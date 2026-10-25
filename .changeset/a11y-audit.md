---
"@drizztdourden08/tessera": patch
---

DocumentTabs draws a tablist that owns only the tabs, by id, and keeps each close button outside it, so a tablist no longer holds buttons.

Stepper names each step with its visible label and summary first, then the step number and state, so the accessible name contains the visible text.

CollapseToggle and the edge button never draw under the 24 px minimum target, with the larger hit area kept around it.

ColorSwatch focus draws a light ring over a dark one inside the swatch edge, so it shows on any swatch colour.

`--c-text-faint` and `--c-text-muted` move up to 4.5:1 or more on the main ground, faint still under muted; the old faint grey is now `--c-text-disabled`, and the `tessera/no-faint-text` rule is now `tessera/no-disabled-text`.

Toast stops its exit animation under reduced motion.

The Brock palette grey lifts slightly, from #8a8b8d to #9b9c9e, so faint text reaches 4.5:1 on its surface too.
