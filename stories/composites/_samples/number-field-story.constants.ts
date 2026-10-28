/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { NumberFieldArgs } from './number-field-story.type';

const ZOOM_LADDER: readonly number[] = [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];

const ZOOM_PRESETS = [{ value: 100, label: 'Actual size' }, { value: 400, label: '4 times' }, { value: 1600, label: '16 times' }] as const;

const OPACITY_PRESETS: readonly number[] = [0, 25, 50, 75, 100];

const NUMBER_FIELD_ARGS: NumberFieldArgs = { label: 'Opacity', suffix: '%', min: 0, max: 100, step: 5, scrub: true, wheel: true, disabled: false, mixed: false, size: 'md' };

const NUMBER_FIELD_ARG_TYPES: PlaygroundArgTypes<NumberFieldArgs> = {
  label: { group: 'Content', control: 'text', description: 'Drag the label sideways to change the value.' },
  suffix: { group: 'Content', control: 'text' },
  min: { group: 'Value', control: 'number' },
  max: { group: 'Value', control: 'number' },
  step: { group: 'Value', control: 'number', description: 'One press of Up or Down, one turn of the wheel, six pixels of scrub. Shift uses a tenth of it.' },
  scrub: { group: 'Behaviour', control: 'boolean' },
  wheel: { group: 'Behaviour', control: 'boolean', description: 'The wheel steps the value while the field has focus.' },
  mixed: { group: 'State', control: 'boolean', description: 'The values differ; a new value clears it.' },
  disabled: { group: 'State', control: 'boolean' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
};

const NUMBER_FIELD_CODE = `import { useState } from 'react';
import { NumberField } from '@drizztdourden08/tessera';

const [opacity, setOpacity] = useState(80);
<NumberField label="Opacity" suffix="%" min={0} max={100} step={5} value={opacity} onChange={setOpacity} />

const ZOOM = [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];
<NumberField aria-label="Zoom" suffix="%" ladder={ZOOM} presets={[100, 400]} value={zoom} onChange={setZoom} />`;

export { NUMBER_FIELD_ARG_TYPES, NUMBER_FIELD_ARGS, NUMBER_FIELD_CODE, OPACITY_PRESETS, ZOOM_LADDER, ZOOM_PRESETS };
