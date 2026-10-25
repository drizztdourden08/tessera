# ControllerSilhouette

The outline of a controller, one stroked line with no fill, for the app to draw its own glyphs, labels and lines on.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ControllerSilhouette } from '@drizztdourden08/tessera';
```

The source is `src/composites/ControllerSilhouette/ControllerSilhouette.tsx`. Its gallery page is Composites · Input devices/ControllerSilhouette (`#/story/composites-controllersilhouette--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? Controller or keyboard input. What about the input? A blank controller to draw on.

ControllerSilhouette draws only the outline of a pad, so each app places its own marks at shared anchors.

## Use it when

- A bindings screen points from each control of a pad to the action it does, with its own glyphs and leader lines.
- A tutorial or a help card shows a pad and marks the few controls it talks about.

## Use something else when

- One button or stick glyph inline, such as a prompt in a sentence. Use `InputIcon` instead.
- A keyboard with keys marked or held. Use `KeyboardLayout` instead.

## Rules

- A live layout that lights every input of a pad from its state belongs to the app to build: draw it on CONTROLLER_SILHOUETTE_PATHS, place its marks from CONTROLLER_SILHOUETTE_ANCHORS inside CONTROLLER_SILHOUETTE_VIEW_BOX, and use InputIcon for the glyphs.
- Pick the variant from the pad family: offset for Xbox shapes, symmetric for PlayStation shapes, nintendo for Switch Pro shapes and pad for a pad with no sticks or triggers.
- Draw on it with children made of the Svg primitives. They sit inside the SVG on top of the outline, in viewBox units.
- The viewBox is CONTROLLER_SILHOUETTE_VIEW_BOX, 0 0 400 260, for every variant. It never changes, so coordinates stay valid.
- To draw the outline in your own SVG, take its path d from CONTROLLER_SILHOUETTE_PATHS[variant], in the same viewBox.
- Place marks from CONTROLLER_SILHOUETTE_ANCHORS, never from numbers of your own. Nothing is drawn at an anchor, it only says where the control sits on the real pad.
- A stick, the d-pad, the face cluster and each meta button have a centre and a radius r. A stick r is its well, the d-pad and face r hold the whole cluster, and a meta r is half the longest side of the button. Shoulders sit on the top edge. Triggers sit above their shoulder, outside the outline, since a trigger hides behind it from the front.
- A variant leaves out the anchors its pad has none of: pad has no sticks, no triggers, no guide and no capture, symmetric has no capture.
- Anchors in viewBox units, measured from front photos of the real pads and scaled by their published sizes. offset: stick.left 121,72 r23, stick.right 240,113 r23, dpad 158,120 r26, face 278,76 r32, shoulder.left 126,31, shoulder.right 274,31, trigger.left 126,14, trigger.right 274,14, meta.view 178,74 r7, meta.menu 222,74 r7, meta.guide 200,48 r12, meta.capture 200,88 r9.
- Symmetric: stick.left 145,117 r23, stick.right 255,117 r23, dpad 95,77 r29, face 305,77 r36, shoulder.left 94,30, shoulder.right 306,30, trigger.left 94,14, trigger.right 306,14, meta.view 121,46 r7, meta.menu 279,46 r7, meta.guide 200,117 r11.
- Nintendo: stick.left 105,92 r26, stick.right 251,138 r26, dpad 149,138 r27, face 295,92 r39, shoulder.left 108,35, shoulder.right 292,35, trigger.left 108,14, trigger.right 292,14, meta.view 158,68 r8, meta.menu 242,68 r8, meta.guide 225,93 r9, meta.capture 175,93 r7.
- Pad: dpad 93,132 r33, face 307,132 r50, shoulder.left 95,49, shoulder.right 305,49, meta.view 165,143 r14, meta.menu 205,143 r14.
- Sources. offset, symmetric and nintendo are drawn by hand with reference to Noun Project icons: XBOX Controller (icon 5652517) by Daniel Finnegan, pro controller (icon 5602909) by Eliran Bensadoun and playstation controller (icon 1751312) by dinnerchief. No path data is taken from them. pad is traced from SNES-Controller-Flat.jpg by Evan-Amos, Wikimedia Commons, public domain. Each outline is one mirrored half of smooth curves, with no brand marks. Anchors are measured on Wikimedia Commons front photos of each pad, aligned to the outline by body width and grip ends; no photo ships.

## Accessibility

- The figure is named by label, Controller by default.
- The SVG is hidden from screen readers, children included. Give what the marks say in text outside it too, such as a list of bindings.

## Example

```tsx
import { CONTROLLER_SILHOUETTE_ANCHORS, ControllerSilhouette, SvgCircle, SvgText } from '@drizztdourden08/tessera';

const anchors = CONTROLLER_SILHOUETTE_ANCHORS.offset;

const JumpHint = () => {
  const face = anchors.face;
  if (!face?.r) return null;
  return (
    <ControllerSilhouette variant="offset" label="Jump is the bottom face button">
      <SvgCircle cx={face.x} cy={face.y + face.r / 2} r={face.r / 3} />
      <SvgText x={face.x} y={face.y + face.r + 14} textAnchor="middle">Jump</SvgText>
    </ControllerSilhouette>
  );
};
```

## Props

- `variant`: `ControllerSilhouetteVariant`, one of `'nintendo'`, `'offset'`, `'pad'`, `'symmetric'`.
- `label` (optional): `string`.
- `className` (optional): `string`. Default `''`.
- `children` (optional): `ReactNode`.

## Tokens

It draws on `--border-width-thick`, `--c-controller-line`.

## Also exported from this folder

`CONTROLLER_SILHOUETTE_ANCHORS`, `CONTROLLER_SILHOUETTE_ANCHOR_IDS`, `CONTROLLER_SILHOUETTE_PATHS`, `CONTROLLER_SILHOUETTE_VARIANTS`, `CONTROLLER_SILHOUETTE_VIEW_BOX`.
