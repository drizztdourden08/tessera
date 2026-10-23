/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The outline of a controller, one stroked line with no fill, for the app to draw its own glyphs, labels and lines on.',
  useWhen: [
    'A bindings screen points from each control of a pad to the action it does, with its own glyphs and leader lines.',
    'A tutorial or a help card shows a pad and marks the few controls it talks about.',
  ],
  avoidWhen: [
    { case: 'A test screen that lights every input of a pad live, from its state.', use: 'ControllerLayout' },
    { case: 'One button or stick glyph inline, such as a prompt in a sentence.', use: 'InputIcon' },
    { case: 'A keyboard with keys marked or held.', use: 'KeyboardLayout' },
  ],
  rules: [
    'Pick the variant from the pad family: offset for Xbox shapes, symmetric for PlayStation shapes, nintendo for Switch Pro shapes and pad for a pad with no sticks or triggers.',
    'Draw on it with children made of the Svg primitives. They sit inside the SVG on top of the outline, in viewBox units.',
    'The viewBox is CONTROLLER_SILHOUETTE_VIEW_BOX, 0 0 400 260, for every variant. It never changes, so coordinates stay valid.',
    'To draw the outline in your own SVG, take its path d from CONTROLLER_SILHOUETTE_PATHS[variant], in the same viewBox.',
    'Place marks from CONTROLLER_SILHOUETTE_ANCHORS, never from numbers of your own. Nothing is drawn at an anchor, it only says where the control sits on the real pad.',
    'A stick, the d-pad, the face cluster and each meta button have a centre and a radius r. Shoulders sit on the top edge. Triggers sit above their shoulder, outside the outline, since a trigger hides behind it from the front.',
    'A variant leaves out the anchors its pad has none of: pad has no sticks, no triggers, no guide and no capture, symmetric has no capture.',
    'Anchors in viewBox units. offset: stick.left 117,70 r23, stick.right 242,112 r23, dpad 155,120 r24, face 281,75 r32, shoulder.left 124,34, shoulder.right 276,34, trigger.left 124,14, trigger.right 276,14, meta.view 176,73 r7, meta.menu 222,73 r7, meta.guide 200,48 r13, meta.capture 200,88 r6.',
    'symmetric: stick.left 144,140 r30, stick.right 256,140 r30, dpad 89,90 r37, face 311,90 r39, shoulder.left 89,37, shoulder.right 311,37, trigger.left 89,14, trigger.right 311,14, meta.view 127,56 r6, meta.menu 273,56 r6, meta.guide 200,144 r8.',
    'nintendo: stick.left 105,83 r26, stick.right 250,134 r26, dpad 150,134 r28, face 295,83 r36, shoulder.left 98,40, shoulder.right 302,40, trigger.left 98,14, trigger.right 302,14, meta.view 158,62 r8, meta.menu 242,62 r8, meta.guide 225,86 r9, meta.capture 175,86 r7.',
    'pad: dpad 92,132 r33, face 307,132 r43, shoulder.left 94,51, shoulder.right 306,51, meta.view 165,144 r11, meta.menu 205,144 r11.',
    'Sources, all on Wikimedia Commons. offset is traced from the photo Xbox Series Controller Gold Shadow Special Edition by Serhio Magpie, CC BY 4.0. symmetric is traced from Dualshock 4 Layout.svg by Tokyoship, CC BY 3.0. nintendo is drawn by hand from the proportions of Nintendo.Swtich.Pro.Controller.Black.jpg by Tim Whitehouse, CC0, and the published 152 by 106 mm size. pad is traced from SNES-Controller-Flat.jpg by Evan-Amos, public domain. Each trace is mirrored into one symmetric half and refitted, with no brand marks.',
  ],
  a11y: [
    'The figure is named by label, Controller by default.',
    'The SVG is hidden from screen readers, children included. Give what the marks say in text outside it too, such as a list of bindings.',
  ],
  tree: {
    path: ['data', 'controller or keyboard input', 'a blank controller to draw on'],
    rule: 'ControllerSilhouette draws only the outline of a pad, so each app places its own marks at shared anchors.',
  },
  example: `import { CONTROLLER_SILHOUETTE_ANCHORS, ControllerSilhouette, SvgCircle, SvgText } from '@drizztdourden08/tessera';

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
`,
  propsHash: '1478dbd854e14e32',
} satisfies ComponentUsage;

export { usage };
