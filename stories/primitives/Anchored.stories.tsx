/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { PinnedPanel, Placements, ScrollBox } from './_samples/anchored-demos';
import type { AnchoredArgs } from './_samples/anchored-demos';
import './Anchored.stories.css';

type Story = StoryLiteStoryDefinition<AnchoredArgs>;

const ARGS: Partial<AnchoredArgs> = { placement: 'bottom-start', flip: true, open: true };

const ARG_TYPES: PlaygroundArgTypes<AnchoredArgs> = {
  placement: { group: 'Layout', control: 'select', options: ['bottom-start', 'bottom-center', 'bottom-end', 'top-start', 'top-center', 'top-end', 'right-start'] },
  open: { group: 'State', control: 'boolean' },
  flip: { group: 'Behaviour', control: 'boolean', description: 'Let the browser flip the panel to the other side when it runs out of room.' },
};

const meta = {
  title: 'Primitives · Layout/Anchored',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<AnchoredArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PinnedPanel {...args} />,
} satisfies PlaygroundStory<AnchoredArgs>;

const PlacementGrid = { name: 'Placements', render: () => <Placements /> } satisfies Story;

const Scrolling = { name: 'Inside a scroll box', render: () => <ScrollBox /> } satisfies Story;

const CODE = `import { useRef } from 'react';
import { Anchored } from '@drizztdourden08/tessera';

const triggerRef = useRef<HTMLButtonElement>(null);

<Button ref={triggerRef}>Options</Button>
{open && (
  <Anchored anchorRef={triggerRef} placement="bottom-start" className="my-panel">
    Panel content
  </Anchored>
)}`;

const Overview = overviewStory({
  component: 'Anchored',
  description: 'A popup pinned to the element that opened it, kept beside it by the browser as the page scrolls.',
  points: [
    'Pass the trigger as `anchorRef`; `placement` picks the side and the edge the popup lines up with.',
    '`flip` lets the browser move it to the other side when it runs out of room.',
    'It opens in the top layer, so no scroll box clips it and no z-index hides it.',
    'Where the browser has no anchor positioning, it falls back to a [Portal] placed from `fallback`.',
  ],
  instead: '[Tooltip], [Select] or [DropdownMenu] when one of them already fits; they are built on it.',
  playground: Playground,
  variants: [PlacementGrid, Scrolling],
  code: CODE,
});

export default meta;
export { Overview, Playground };
