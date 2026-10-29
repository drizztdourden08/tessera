/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { NumberField } from '../../src/composites';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { sizesStory } from '../_template/sizes-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { NUMBER_FIELD_ARG_TYPES, NUMBER_FIELD_ARGS, NUMBER_FIELD_CODE, OPACITY_PRESETS, ZOOM_LADDER, ZOOM_PRESETS } from './_samples/number-field-story.constants';
import type { NumberFieldArgs } from './_samples/number-field-story.type';
import { StatefulNumberField } from './_samples/StatefulNumberField';

const meta = {
  title: 'Composites · Inputs/NumberField',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NumberFieldArgs>;

const Playground = {
  name: 'Playground',
  args: NUMBER_FIELD_ARGS,
  argTypes: NUMBER_FIELD_ARG_TYPES,
  render: (args) => <StatefulNumberField key={String(args.mixed)} initial={80} {...args} />,
} satisfies PlaygroundStory<NumberFieldArgs>;

const SCRUBS: Readonly<Record<string, ReactNode>> = {
  'Drag the label: one step for every six pixels': <StatefulNumberField initial={40} label="Opacity" suffix="%" min={0} max={100} step={5} />,
  'Hold Shift while dragging, or while the wheel turns, for a tenth of the step': <StatefulNumberField initial={1} label="Scale" min={0} max={10} step={1} />,
  'Scrub off: the label only moves focus to the field': <StatefulNumberField initial={40} label="Opacity" suffix="%" min={0} max={100} step={5} scrub={false} />,
};

const Scrub = {
  name: 'Scrub by the label, and a fine step with Shift',
  render: () => <Demonstrator rows={axis(Object.keys(SCRUBS))} align="stretch" cell={(row) => SCRUBS[row]} />,
} satisfies StoryLiteStoryDefinition<NumberFieldArgs>;

const Zoom = {
  name: 'Zoom recipe: a ladder from 25 to 12800 percent, with presets',
  render: () => <StatefulNumberField initial={100} label="Zoom" suffix="%" ladder={ZOOM_LADDER} presets={ZOOM_PRESETS} fineStep={1} min={25} max={12800} />,
} satisfies StoryLiteStoryDefinition<NumberFieldArgs>;

const Presets = {
  name: 'Presets: quick values in a menu beside the field',
  render: () => <StatefulNumberField initial={50} label="Opacity" suffix="%" min={0} max={100} step={5} presets={OPACITY_PRESETS} />,
} satisfies StoryLiteStoryDefinition<NumberFieldArgs>;

const Mixed = {
  name: 'Mixed: the layers differ, and a new value clears it',
  render: () => <StatefulNumberField initial={60} label="Opacity" suffix="%" min={0} max={100} step={5} mixed />,
} satisfies StoryLiteStoryDefinition<NumberFieldArgs>;

const Sizes = sizesStory<NumberFieldArgs>((size) => <StatefulNumberField initial={50} label="Opacity" suffix="%" size={size} />);

const renderState = (props: StateProps) => (
  <NumberField
    label="Opacity"
    suffix="%"
    value={60}
    onChange={() => undefined}
    mixed={props.mixed === true}
    disabled={props.disabled === true}
  />
);

const Overview = overviewStory({
  component: 'NumberField',
  description: 'A number field with a label you drag to scrub, a wheel step, a fine step with Shift, a ladder and quick values.',
  points: [
    'Drag the `label` sideways to scrub the value; one step for every six pixels, a tenth of it with Shift.',
    'The wheel steps the value while the field has focus; Up and Down do the same and Shift makes the step fine.',
    '`ladder` steps through fixed stops such as 25, 50, 100 and 200; the zoom recipe runs 25 to 12800 percent.',
    '`presets` adds a menu of quick values; `suffix` shows a unit beside the number, such as % or px.',
    '`mixed` shows Mixed for values that differ; the next value you set clears it.',
  ],
  instead: '[NumberInput] when a plain number box with stepper buttons is enough.',
  playground: Playground,
  variants: [Scrub, Zoom, Presets, Mixed, Sizes],
  states: {
    render: renderState,
    list: [STATE.idle, { name: 'Mixed', props: { mixed: true } }, STATE.disabled],
  },
  code: NUMBER_FIELD_CODE,
});

export default meta;
export { Mixed, Overview, Playground, Presets, Scrub, Sizes, Zoom };
