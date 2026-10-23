# ControllerSilhouette

An empty controller body with soft shading and quiet wells where the controls sit, for the app to draw its own glyphs, labels and lines on.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ControllerSilhouette } from '@drizztdourden08/tessera';
```

The source is `src/composites/ControllerSilhouette/ControllerSilhouette.tsx`. Its gallery page is Composites · Input devices/ControllerSilhouette (`#/story/composites-controllersilhouette--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? Controller or keyboard input. What about the input? A blank controller to draw on.

ControllerSilhouette draws only the body of a pad, so each app places its own marks at shared anchors.

## Use it when

- A bindings screen points from each control of a pad to the action it does, with its own glyphs and leader lines.
- A tutorial or a help card shows a pad and marks the few controls it talks about.

## Use something else when

- A test screen that lights every input of a pad live, from its state. Use [ControllerLayout](ControllerLayout.md) instead.
- One button or stick glyph inline, such as a prompt in a sentence. Use `InputIcon` instead.
- A keyboard with keys marked or held. Use `KeyboardLayout` instead.

## Rules

- Pick the variant from the pad family: offset for Xbox shapes, symmetric for PlayStation shapes, nintendo for Switch Pro shapes and pad for a pad with no sticks or triggers.
- Draw on it with children made of the Svg primitives. They sit inside the SVG on top of the body, in viewBox units.
- The viewBox is CONTROLLER_SILHOUETTE_VIEW_BOX, 0 0 400 260, for every variant. It never changes, so coordinates stay valid.
- Place marks from CONTROLLER_SILHOUETTE_ANCHORS, never from numbers of your own. The wells are drawn from the same anchors.
- A stick, the d-pad, the face cluster and each meta button have a centre and a radius r. Shoulders and triggers have a centre only.
- A variant leaves out the anchors its shape has none of: pad has no sticks, no triggers and no capture, symmetric has no capture.
- Anchors in viewBox units. offset: stick.left 112,112 r23, stick.right 248,166 r23, dpad 152,166 r24, face 288,112 r34, shoulder.left 90,38, shoulder.right 310,38, trigger.left 96,22, trigger.right 304,22, meta.view 172,104 r6, meta.menu 228,104 r6, meta.guide 200,80 r11, meta.capture 200,128 r5.
- Symmetric: stick.left 154,164 r22, stick.right 246,164 r22, dpad 106,110 r26, face 294,110 r33, shoulder.left 86,44, shoulder.right 314,44, trigger.left 88,22, trigger.right 312,22, meta.view 140,76 r5, meta.menu 260,76 r5, meta.guide 200,164 r8.
- Nintendo: stick.left 122,112 r21, stick.right 242,160 r21, dpad 158,160 r21, face 278,112 r30, shoulder.left 108,46, shoulder.right 292,46, trigger.left 106,30, trigger.right 294,30, meta.view 172,92 r5, meta.menu 228,92 r5, meta.guide 224,124 r6, meta.capture 176,124 r5.
- Pad: dpad 112,142 r30, face 288,142 r36, shoulder.left 97,54, shoulder.right 303,54, meta.view 180,150 r6, meta.menu 220,150 r6, meta.guide 200,112 r7.

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

It draws on `--border-width-thick`, `--border-width-thin`, `--c-lift`, `--c-scrim`, `--c-sunken`, `--c-surface`, `--c-text`, `--c-text-muted`, `--size-6`.

## Also exported from this folder

`CONTROLLER_SILHOUETTE_ANCHORS`, `CONTROLLER_SILHOUETTE_ANCHOR_IDS`, `CONTROLLER_SILHOUETTE_VARIANTS`, `CONTROLLER_SILHOUETTE_VIEW_BOX`.
