---
"@drizztdourden08/tessera": minor
---

`ControllerSilhouette` draws the outline of a controller for the app to draw on. It is one closed, stroked line with no fill, no shading and nothing drawn for a button, stick or trigger. Shoulders show only where they stick out past the body, as on a real pad seen from the front. `variant` picks the outline: `offset` for Xbox shapes, `symmetric` for PlayStation shapes, `nintendo` for Switch Pro shapes and `pad` for a pad with no sticks or triggers. Each outline is symmetric left to right and follows the proportions of the real pad. `children` render inside the SVG on top of the outline, so the app places its own glyphs, labels and leader lines. The viewBox is fixed at `0 0 400 260` for every variant and is exported as `CONTROLLER_SILHOUETTE_VIEW_BOX`. `CONTROLLER_SILHOUETTE_ANCHORS` gives where each control sits per variant in viewBox units, such as `stick.left`, `dpad`, `face`, `shoulder.right` and `meta.guide`, with a radius for the round controls. Triggers sit above their shoulder, outside the outline. `CONTROLLER_SILHOUETTE_PATHS` gives the SVG path `d` of each variant's outline, the same string the component draws, for an app that draws the outline inside its own SVG. The SVG overflow is visible, so children may draw past the box. The figure is named by `label` and the drawing is hidden from screen readers.

## Attribution

- The `offset` outline is traced from "Xbox Series Controller Gold Shadow Special Edition" by Serhio Magpie, Wikimedia Commons, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Changes: silhouette traced, mirrored into one symmetric half and refitted as curves.
- The `symmetric` outline is traced from "Dualshock 4 Layout.svg" by Tokyoship, Wikimedia Commons, CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/). Changes: outer silhouette only, mirrored into one symmetric half and refitted as curves.
- The `nintendo` outline is drawn by hand from the proportions of "Nintendo.Swtich.Pro.Controller.Black.jpg" by Tim Whitehouse, Wikimedia Commons, CC0. The `pad` outline is traced from "SNES-Controller-Flat.jpg" by Evan-Amos, Wikimedia Commons, public domain.
