/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { PinnedPanel, Placements, ScrollBox } from './_samples/anchored-demos';
import type { AnchoredArgs } from './_samples/anchored-demos';
import './Anchored.stories.css';

type Story = StoryLiteStoryDefinition<AnchoredArgs>;

const ARGS: Partial<AnchoredArgs> = { placement: 'bottom-start', flip: true, open: true };

const ARG_TYPES: StoryLiteArgTypes<AnchoredArgs> = {
  placement: { control: 'select', options: ['bottom-start', 'bottom-center', 'bottom-end', 'top-start', 'top-center', 'top-end', 'right-start'] },
  flip: { control: 'boolean', description: 'Let the browser flip the panel to the other side when it runs out of room.' },
  open: { control: 'boolean' },
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
} satisfies Story;

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
  description: 'A popup pinned to the element that opened it by the browser itself. It opens in the top layer as a manual popover, so no scroll box clips it and no z-index hides it, and it stays in the page next to its trigger. CSS anchor positioning places it, so it moves with its trigger in the same frame as a scroll, with no lag, inside scroll boxes too. placement picks the side and the edge it lines up with, and flip lets the browser move it to the other side when it runs out of room. Where the browser has no anchor positioning, it falls back to a Portal placed from script with fallback. Select, Combobox, TagInput, Tooltip, DropdownMenu and the other popups are built on it.',
  playground: Playground,
  variants: [PlacementGrid, Scrolling],
  code: CODE,
});

export default meta;
export { Overview, Playground };
