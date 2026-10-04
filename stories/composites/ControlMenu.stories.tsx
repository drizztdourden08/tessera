/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ControlMenuDemo } from './_samples/ControlMenuDemo';
import type { ControlMenuDemoProps } from './_samples/ControlMenuDemo';

type ControlMenuArgs = Required<ControlMenuDemoProps>;

const ARGS: Partial<ControlMenuArgs> = { label: 'View options', filter: false, sub: false, every: false, align: 'auto', defaultOpen: false };

const ARG_TYPES: PlaygroundArgTypes<ControlMenuArgs> = {
  label: { group: 'Content', control: 'text', description: 'The trigger label, and the name of the panel for screen readers.' },
  every: { group: 'Content', control: 'boolean', description: 'Adds a Board group with a NumberStepper and a Select.' },
  sub: { group: 'Content', control: 'boolean', description: 'Adds a Sounds row that opens a sub-panel beside the panel.' },
  filter: { group: 'Behaviour', control: 'boolean', description: 'A filter field at the top narrows the rows by label; rows in sub-panels show inline.' },
  align: { group: 'Layout', control: 'select', options: ['auto', 'start', 'end'], description: 'Which edge of the trigger the panel lines up with; auto takes the side with more room.' },
  defaultOpen: { group: 'State', control: 'boolean', description: 'Opens the panel on first render.' },
};

const meta = {
  title: 'Composites · Menus/ControlMenu',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ControlMenuArgs>;

const story = (name: string, patch: Partial<ControlMenuArgs>) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ControlMenuDemo {...args} {...patch} />,
} satisfies PlaygroundStory<ControlMenuArgs>);

const Playground = story('Playground', {});
const Plain = story('Plain', {});
const WithFilter = story('With a filter', { filter: true, every: true, sub: true });
const WithSub = story('With a sub-panel', { sub: true });
const EveryControl = story('Every kind of compact control', { every: true });

const CODE = `import { ControlMenu, ControlMenuRow, ControlMenuSub } from '@drizztdourden08/tessera';
import { SegmentedControl, Slider, Toggle } from '@drizztdourden08/tessera';

<ControlMenu trigger={{ label: 'View options', icon: 'sliders-horizontal' }} filter>
  <ControlMenuRow label="Density" hint={{ label: 'Density', description: 'How much room each row takes' }}>
    <SegmentedControl size="sm" aria-label="Density" value={density} options={DENSITY} onChange={setDensity} />
  </ControlMenuRow>
  <ControlMenuRow label="Zoom">
    <Slider size="sm" value={zoom} min={50} max={200} onChange={setZoom} />
  </ControlMenuRow>
  <ControlMenuSub label="Sounds" icon="volume-2">
    <ControlMenuRow label="Play sounds">
      <Toggle size="sm" checked={sounds} onChange={setSounds} aria-label="Play sounds" />
    </ControlMenuRow>
  </ControlMenuSub>
</ControlMenu>`;

const Overview = overviewStory({
  component: 'ControlMenu',
  description: 'A dropdown of settings, each a compact control with a label, opened from a button it joins like a [DropdownMenu].',
  points: [
    'A `ControlMenuRow` holds one small control: [SegmentedControl], [Toggle], [Slider], [Select] or [NumberStepper].',
    'A row takes a `hint` for the hint line at the bottom, and `about` for an info tooltip by its label.',
    '`ControlMenuSub` opens a sub-panel beside the panel, joined at its row like a sub-menu.',
    '`filter` adds a field at the top that narrows the rows by label; rows in sub-panels show inline.',
    'It sits in the top layer and stays inside the window; [[Esc]], a press outside or a window blur closes it.',
  ],
  instead: 'Use [DropdownMenu] when every entry is an action, a check or a choice of one item.',
  playground: Playground,
  variants: [Plain, WithFilter, WithSub, EveryControl],
  code: CODE,
});

export default meta;
export { EveryControl, Overview, Playground, Plain, WithFilter, WithSub };
