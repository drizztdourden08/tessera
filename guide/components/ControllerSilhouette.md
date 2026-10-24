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
- A stick, the d-pad, the face cluster and each meta button have a centre and a radius r. Shoulders sit on the top edge. Triggers sit above their shoulder, outside the outline, since a trigger hides behind it from the front.
- A variant leaves out the anchors its pad has none of: pad has no sticks, no triggers, no guide and no capture, symmetric has no capture.
- Anchors in viewBox units. offset: stick.left 120,90 r20, stick.right 240,137 r20, dpad 159,141 r24, face 279,92 r31, shoulder.left 128,30, shoulder.right 272,30, trigger.left 128,14, trigger.right 272,14, meta.view 176,88 r6, meta.menu 224,88 r6, meta.guide 200,61 r13, meta.capture 200,106 r5.
- Symmetric: stick.left 142,141 r30, stick.right 258,141 r30, dpad 91,96 r30, face 309,96 r39, shoulder.left 95,30, shoulder.right 305,30, trigger.left 95,14, trigger.right 305,14, meta.view 126,58 r8, meta.menu 274,58 r8, meta.guide 200,142 r10.
- Nintendo: stick.left 113,94 r22, stick.right 241,139 r22, dpad 152,139 r27, face 282,95 r32, shoulder.left 110,35, shoulder.right 290,35, trigger.left 110,14, trigger.right 290,14, meta.view 160,72 r6, meta.menu 240,72 r6, meta.guide 222,95 r6, meta.capture 178,95 r6.
- Pad: dpad 92,132 r33, face 307,132 r43, shoulder.left 94,51, shoulder.right 306,51, meta.view 165,144 r11, meta.menu 205,144 r11.
- Sources. offset, symmetric and nintendo are drawn by hand with reference to Noun Project icons: XBOX Controller (icon 5652517) by Daniel Finnegan, pro controller (icon 5602909) by Eliran Bensadoun and playstation controller (icon 1751312) by dinnerchief. No path data is taken from them. pad is traced from SNES-Controller-Flat.jpg by Evan-Amos, Wikimedia Commons, public domain. Each outline is one mirrored half of smooth curves, with no brand marks.

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
