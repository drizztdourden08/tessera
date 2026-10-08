/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The line between two panels that the user drags, or moves with the keys, to resize the panel beside it, such as the outline and inspector of an editor.',
  useWhen: [
    'A side panel keeps its own width in pixels and the user drags its edge to change it, such as an outline or an inspector.',
    'A part draws its own panes and needs the one resize line every Tessera layout draws.',
  ],
  avoidWhen: [
    { case: 'Two panes share the room by ratio and one can fold behind a rail.', use: 'SplitPane' },
    { case: 'A list sits beside the detail of the picked item.', use: 'ListDetailLayout' },
    { case: 'The user moves panels around and docks them.', use: 'DockLayout' },
  ],
  rules: [
    'Pair it with usePaneSize and spread its handle: the hook keeps the size, its limits and storageKey, and the handle wires the line.',
    'Size the panel from usePaneSize size, as an inline width: the line moves nothing by itself.',
    'Pass edge="end" for a panel after the line, such as an inspector on the right, so dragging toward it shrinks it.',
    'Pass orientation="vertical" for panes stacked one above the other; the line then lies across and moves up and down.',
    'Pick look grip between two panes, line where room is tight such as a header, and ghost where the panes already show their edges.',
    'Pass onCollapse when the panel folds away; Enter then folds it, and onReset still runs on Space and a double click.',
  ],
  a11y: [
    'It is a focusable separator with aria-valuenow, aria-valuemin and aria-valuemax; name the panel in label, such as Resize outline.',
    'Pass controls with the id of the panel it resizes, for aria-controls.',
    'The arrow keys move it by step, Shift by largeStep, and Home and End jump to the limits.',
  ],
  tree: {
    path: ['layout', 'a side panel the user drags wider'],
    rule: 'ResizeHandle is the one resize line of every Tessera layout: drag, keys, value and range, with usePaneSize to keep a width in pixels.',
  },
  example: `import { Box, ResizeHandle, usePaneSize } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const EditorRails = ({ outline, canvas, inspector }: { outline: ReactNode; canvas: ReactNode; inspector: ReactNode }) => {
  const outlineSize = usePaneSize({ initial: 224, min: 160, max: 360, storageKey: 'hud.outline' });
  const inspectorSize = usePaneSize({ initial: 256, min: 192, max: 400, storageKey: 'hud.inspector' });
  return (
    <Box className="hud-editor">
      <Box as="aside" id="hud-outline" style={{ inlineSize: outlineSize.size }}>{outline}</Box>
      <ResizeHandle label="Resize outline" controls="hud-outline" {...outlineSize.handle} />
      <Box as="main" className="hud-editor__canvas">{canvas}</Box>
      <ResizeHandle label="Resize inspector" controls="hud-inspector" edge="end" {...inspectorSize.handle} />
      <Box as="aside" id="hud-inspector" style={{ inlineSize: inspectorSize.size }}>{inspector}</Box>
    </Box>
  );
};
`,
  propsHash: 'e69e5583c2063ff0',
} satisfies ComponentUsage;

export { usage };
