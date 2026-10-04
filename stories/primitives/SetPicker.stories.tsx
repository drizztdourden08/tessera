/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import type { SetPickerDemoProps } from './_samples/option-demos.type';
import { SetPickerDemo } from './_samples/SetPickerDemo';
import './SetPicker.stories.css';

type SetPickerArgs = {
  chosen: boolean;
  disabled: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<SetPickerArgs> = {
  chosen: { group: 'Value', control: 'boolean', description: 'Start with Moon Pearl and Hookshot chosen.' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Primitives · Inputs/SetPicker',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SetPickerArgs>;

const Playground = {
  name: 'Playground',
  args: { chosen: true, disabled: false },
  argTypes: ARG_TYPES,
  render: (args) => <SetPickerDemo key={String(args.chosen)} start={args.chosen ? undefined : []} disabled={args.disabled} />,
} satisfies PlaygroundStory<SetPickerArgs>;

const Hints = {
  name: 'Start hints: chosen items as tags, a checklist to search',
  render: () => <SetPickerDemo />,
} satisfies StoryLiteStoryDefinition<SetPickerArgs>;

const Empty = {
  name: 'Nothing chosen yet',
  render: () => <SetPickerDemo start={[]} />,
} satisfies StoryLiteStoryDefinition<SetPickerArgs>;

const CODE = `import { SetPicker } from '@drizztdourden08/tessera';

<SetPicker options={items} value={startHints} onChange={setStartHints} aria-label="Start hints" />`;

const Overview = overviewStory({
  component: 'SetPicker',
  description: 'Several choices from a long list: the chosen ones as tags on top, a search and a checklist under them.',
  points: [
    '`options` lists every choice; `value` holds the chosen ones and keeps the order of `options`.',
    'The search narrows the checklist, which scrolls past 192 px; a tag takes a choice out.',
    'Each row is a [Checkbox], so Space checks it, and the whole picker is one named group.',
  ],
  instead: '[TagPicker] for tags from a small grouped list, or [Combobox] to pick several by typing.',
  playground: Playground,
  variants: [Hints, Empty],
  states: {
    render: (props: StateProps) => <SetPickerDemo {...(props as Partial<SetPickerDemoProps>)} />,
    list: [STATE.idle, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Empty, Hints, Overview, Playground };
