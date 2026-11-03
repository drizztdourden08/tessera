/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A zoom value in percent that you type, step with buttons and the wheel, or jump to from a row of preset chips, with room for extra buttons such as fit.',
  useWhen: [
    'An editor zooms a canvas, a timeline or a preview, and the user wants exact steps, round presets and a fit button in one place.',
    'The zoom value runs on stops that grow by doubling, such as 25, 50, 100, 200 and 400 percent.',
  ],
  avoidWhen: [
    { case: 'The value is any other number, such as a size or an offset.', use: 'NumberField' },
    { case: 'The number is a position on a track, such as a volume.', use: 'Slider' },
  ],
  rules: [
    'Pass value in percent and onChange; the app keeps the value. min and max are the lowest and highest zoom, and a typed value outside them is clamped.',
    'label names the field and is drawn before it; it defaults to Zoom.',
    'The minus and plus buttons, the wheel and the arrow keys move along the stops. The stops are min, max and the presets, or min doubled up to max when there are no presets.',
    'presets is a list of percent values, such as [25, 50, 100, 200, 400]. Each draws as a chip, the chip for the current value is pressed, and a press sets the value. Values outside min and max are left out.',
    '`slider` draws a log slider on the same range, `beside` the field or `below` it; it needs a `min` above 0 and shares the stops of the field.',
    'actions is a node drawn after the chips, such as a Fit button; the app handles its press.',
    'disabled turns the field, the chips and the buttons off.',
  ],
  a11y: [
    'The number input is named by label, and the minus and plus buttons are named Zoom out and Zoom in.',
    'The chips are in a group named Zoom levels, and the chip for the current value is pressed.',
    'The slider is named Zoom slider and moves along the same stops with the arrow keys.',
    'Every control is a native button or input with its own Tab stop.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'a number stepped up or down'],
    rule: 'ZoomField is the zoom in percent you type, step along round stops and jump to from preset chips.',
  },
  example: `import { useState } from 'react';
import { Button, ZoomField } from '@drizztdourden08/tessera';

const CanvasZoom = ({ fit }: { fit: () => void }) => {
  const [zoom, setZoom] = useState(100);
  return (
    <ZoomField
      value={zoom}
      onChange={setZoom}
      min={25}
      max={1600}
      presets={[25, 50, 100, 200, 400]}
      actions={<Button size="xs" variant="ghost" onClick={fit}>Fit</Button>}
    />
  );
};
`,
  propsHash: '5b12dd8bb79e26eb',
} satisfies ComponentUsage;

export { usage };
