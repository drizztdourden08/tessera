/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A number field you can drag by its label, step with the wheel and the arrow keys, step finely with Shift, walk along a ladder of fixed stops and fill from a menu of quick values.',
  useWhen: [
    'An editor sets a size, an opacity, an offset or a zoom, and the user tries values quickly by dragging or turning the wheel.',
    'The value has fixed stops people expect, such as zoom steps from 25 to 12800 percent.',
    'A tool option sits in a Toolbar and the number must stay compact, with a unit beside it.',
  ],
  avoidWhen: [
    { case: 'A plain number is typed once in a form, with stepper buttons.', use: 'NumberInput' },
    { case: 'The number is a position on a track, such as a volume.', use: 'Slider' },
    { case: 'The number is an angle that needs a dial.', use: 'AngleField' },
  ],
  rules: [
    'Pass value and onChange; the app keeps the value. min, max and step work as on NumberInput, and step defaults to 1.',
    'label draws text before the field. Drag it sideways to scrub: one step for every six pixels. scrub false keeps the label and turns the drag off.',
    'The wheel steps the value while the field has focus, and Up and Down do the same; wheel false turns the wheel off. Shift makes every step fine.',
    'fineStep is the step while Shift is down. It defaults to a tenth of step.',
    'ladder is a list of stops. A step, a wheel turn or a scrub step moves to the next stop above or below the value, whatever it is now. Shift leaves the ladder for the fine step.',
    'presets add a menu of quick values beside the field, as numbers or as { value, label }. Picking one sets the value.',
    'suffix draws a unit after the number, such as % or px.',
    'mixed shows the word Mixed instead of a number, for values that differ across a selection. Any new value, typed, stepped or picked, calls onChange, and the app clears mixed.',
    'A ZoomField is this part with ladder [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800], suffix % and a few presets; it is a recipe, not a part.',
    'A value typed outside min and max is clamped as you type, and the field shows the clamped value when it loses focus.',
  ],
  a11y: [
    'The number input keeps its own role and takes its name from label, or from aria-label when there is no label.',
    'The label is hidden from readers, since the input already has the name; scrubbing is for pointers, and the arrow keys do the same for the keyboard.',
    'Up and Down step the value; Shift with them steps finely. Escape in a Toolbar moves focus back to the item before.',
    'The presets button is named Quick values and opens a menu with one radio item for each preset.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'a number stepped up or down'],
    rule: 'NumberField is the number you drag, turn the wheel on, walk along a ladder or fill from quick values.',
  },
  example: `import { useState } from 'react';
import { NumberField } from '@drizztdourden08/tessera';

const ZOOM = [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];

const Zoom = () => {
  const [zoom, setZoom] = useState(100);
  return <NumberField aria-label="Zoom" suffix="%" ladder={ZOOM} presets={[100, 400, 1600]} value={zoom} onChange={setZoom} />;
};

const Opacity = () => {
  const [opacity, setOpacity] = useState(80);
  return <NumberField label="Opacity" suffix="%" min={0} max={100} step={5} value={opacity} onChange={setOpacity} />;
};
`,
  propsHash: '0d0741633e74bab2',
} satisfies ComponentUsage;

export { usage };
