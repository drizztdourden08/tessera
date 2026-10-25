/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The outline of a controller, one stroked line with no fill, for the app to draw its own glyphs, labels and lines on.',
  useWhen: [
    'A bindings screen points from each control of a pad to the action it does, with its own glyphs and leader lines.',
    'A tutorial or a help card shows a pad and marks the few controls it talks about.',
  ],
  avoidWhen: [
    { case: 'One button or stick glyph inline, such as a prompt in a sentence.', use: 'InputIcon' },
    { case: 'A keyboard with keys marked or held.', use: 'KeyboardLayout' },
  ],
  rules: [
    'A live layout that lights every input of a pad from its state belongs to the app to build: draw it on CONTROLLER_SILHOUETTE_PATHS, place its marks from anchor data from the app or from Brock (brock-input exports CONTROLLER_SILHOUETTE_ANCHORS) inside CONTROLLER_SILHOUETTE_VIEW_BOX, and use InputIcon for the glyphs.',
    'Pick the variant from the pad family: offset for Xbox shapes, symmetric for PlayStation shapes, nintendo for Switch Pro shapes and pad for a pad with no sticks or triggers.',
    'Draw on it with children made of the Svg primitives. They sit inside the SVG on top of the outline, in viewBox units.',
    'The viewBox is CONTROLLER_SILHOUETTE_VIEW_BOX, 0 0 400 260, for every variant. It never changes, so coordinates stay valid.',
    'To draw the outline in your own SVG, take its path d from CONTROLLER_SILHOUETTE_PATHS[variant], in the same viewBox.',
    'Marks are placed from the anchor data of an app or of Brock, never from Tessera, which ships no anchors. The package @drizztdourden08/brock-input exports CONTROLLER_SILHOUETTE_ANCHORS and the anchor ids. Nothing is drawn at an anchor, it only says where a control sits on the real pad, in viewBox units.',
    'Sources. offset, symmetric and nintendo are drawn by hand with reference to Noun Project icons: XBOX Controller (icon 5652517) by Daniel Finnegan, pro controller (icon 5602909) by Eliran Bensadoun and playstation controller (icon 1751312) by dinnerchief. No path data is taken from them. pad is traced from SNES-Controller-Flat.jpg by Evan-Amos, Wikimedia Commons, public domain. Each outline is one mirrored half of smooth curves, with no brand marks.',
  ],
  a11y: [
    'The figure is named by label, Controller by default.',
    'The SVG is hidden from screen readers, children included. Give what the marks say in text outside it too, such as a list of bindings.',
  ],
  tree: {
    path: ['data', 'controller or keyboard input', 'a blank controller to draw on'],
    rule: 'ControllerSilhouette draws only the outline of a pad, so each app places its own marks from its own anchor data.',
  },
  example: `import { ControllerSilhouette, SvgCircle, SvgText } from '@drizztdourden08/tessera';

const face = { x: 278, y: 76, r: 32 };

const JumpHint = () => {
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
