/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { DropSlotSample } from './_samples/DropSlotSample';
import './DropSlot.stories.css';

type DropSlotArgs = {
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
};

const ARGS: Partial<DropSlotArgs> = { size: 'md', disabled: false };

const ARG_TYPES: PlaygroundArgTypes<DropSlotArgs> = {
  size: { group: 'Layout', control: 'select', options: ['sm', 'md', 'lg'], description: 'The square the slot fills.' },
  disabled: { group: 'State', control: 'boolean', description: 'Takes no drop, no click and no key.' },
};

const meta = {
  title: 'Composites · Data views/DropSlot',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DropSlotArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DropSlotSample size={args.size} disabled={args.disabled} />,
} satisfies PlaygroundStory<DropSlotArgs>;

const Empty = {
  name: 'Empty: a dashed slot with its label',
  render: () => <DropSlotSample />,
} satisfies StoryLiteStoryDefinition<DropSlotArgs>;

const Filled = {
  name: 'Filled: holds one node and a clear button',
  render: () => <DropSlotSample startFilled />,
} satisfies StoryLiteStoryDefinition<DropSlotArgs>;

const CODE = `import { DropSlot } from '@drizztdourden08/tessera';

<Button draggable onDragStart={(event) => event.dataTransfer.setData('application/x-account', id)}>Account</Button>

<DropSlot label="From" accept="application/x-account" onDrop={setAccount} onClear={clear} onPick={openMenu}>
  {account}
</DropSlot>`;

const Overview = overviewStory({
  component: 'DropSlot',
  description: 'A dashed container that takes one dragged card, or a pick when the user clicks or presses Enter.',
  points: [
    '`label` shows while the slot is empty and names the group.',
    '`children` is the filled node; `filled` says the slot is full without children.',
    '`onDrop` gives the payload of the drag, read with `accept` as the data type.',
    '`onClear` shows a clear button on a filled slot.',
    '`onPick` runs on a click and on Enter, so a menu can choose instead of a drag.',
    'The slot highlights while a matching drag is over it.',
  ],
  instead: '[DragGhost] for the picture that follows the pointer while dragging.',
  playground: Playground,
  variants: [Empty, Filled],
  states: {
    render: (props: StateProps) => <DropSlotSample {...props} />,
    list: [
      { name: 'Empty', props: {} },
      { name: 'Filled', props: { startFilled: true } },
      { name: 'Disabled', props: { disabled: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Empty, Filled, Overview, Playground };
