/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Sets how dense the form parts inside it are, once for a whole panel, such as an inspector beside a canvas.',
  useWhen: [
    'A panel holds many small controls in little room, such as the inspector of a layout editor or a tool window.',
    'Every input, Field and Button of the panel should be the small size without passing size to each one.',
  ],
  avoidWhen: [
    { case: 'One control should be small in an otherwise usual form.', use: 'Field' },
    { case: 'A row grid of inputs should be tighter.', use: 'RowGrid' },
  ],
  rules: [
    'Wrap the panel once with density="compact"; every part inside without its own size draws at sm.',
    'A size on a part or on a Field still wins, so a part can stay md inside a compact panel.',
    'Compact also tightens the gaps inside Slider, Checkbox, SegmentedControl, ToggleGroup and DisabledOverlay.',
    'Put a comfortable scope inside a compact one for a section that needs the usual size again.',
    'It draws no box of its own, so put it around the panel without changing the layout.',
  ],
  a11y: [
    'It changes sizes and gaps only: names, roles and keys of the parts stay the same.',
    'A compact control is 28 px tall; keep compact for pointer tools, not for touch screens.',
  ],
  tree: {
    path: ['a value the user sets', 'smaller form parts for a whole panel'],
    rule: 'DensityScope makes the form parts of one panel compact at once, with the same small size in every app.',
  },
  example: `import { Card, DensityScope, Field, Select, Slider } from '@drizztdourden08/tessera';
import { useState } from 'react';

const ANCHORS = [{ value: 'top-left', label: 'Top left' }, { value: 'top-right', label: 'Top right' }];

const Inspector = () => {
  const [anchor, setAnchor] = useState('top-left');
  const [width, setWidth] = useState(160);
  return (
    <DensityScope density="compact">
      <Card title="Health bar">
        <Field label="Anchor">
          <Select options={ANCHORS} value={anchor} onChange={setAnchor} />
        </Field>
        <Field label="Width">
          <Slider value={width} max={400} onChange={setWidth} />
        </Field>
      </Card>
    </DensityScope>
  );
};
`,
  propsHash: 'd949bfe0715e0a5d',
} satisfies ComponentUsage;

export { usage };
