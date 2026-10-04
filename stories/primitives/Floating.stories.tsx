/* @layer stories @kind story */
import { useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Floating, Text, useAnchorTracking } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Floating.stories.css';

type FloatingArgs = {
  top: number;
  left: number;
  label: string;
};

const ARGS: Partial<FloatingArgs> = { top: 120, left: 160, label: 'Pinned to the window' };

const ARG_TYPES: PlaygroundArgTypes<FloatingArgs> = {
  label: { group: 'Content', control: 'text' },
  top: { group: 'Layout', control: 'number', description: 'Distance from the top of the window, in pixels.' },
  left: { group: 'Layout', control: 'number', description: 'Distance from the left of the window, in pixels.' },
};

const meta = {
  title: 'Primitives · Layout/Floating',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FloatingArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Text className="story-label">The panel sits at the top and left below, measured from the frame this story draws in.</Text>
      <Floating className="floating-demo__panel" placement={{ top: args.top, left: args.left }}>
        <Text>{args.label}</Text>
      </Floating>
    </Box>
  ),
} satisfies PlaygroundStory<FloatingArgs>;

const UnderItsButtonDemo = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  const { position } = useAnchorTracking({
    active: open,
    anchorRef,
    compute: (rect) => ({ top: rect.bottom + 4, left: rect.left }),
  });
  return (
    <Box className="story-column">
      <Box ref={anchorRef} className="floating-demo__anchor">
        <Button size="sm" variant="secondary" onClick={() => setOpen((value) => !value)}>
          {open ? 'Hide the hint' : 'Show the hint'}
        </Button>
      </Box>
      {open && (
        <Floating className="floating-demo__panel" placement={position}>
          <Text>Hint cost: 10% of your checks.</Text>
        </Floating>
      )}
    </Box>
  );
};

const UnderItsButton = {
  name: 'Under its button',
  render: () => <UnderItsButtonDemo />,
} satisfies StoryLiteStoryDefinition<FloatingArgs>;

const CODE = `import { Floating, Portal, useAnchorTracking } from '@drizztdourden08/tessera';

const { position } = useAnchorTracking({
  active: open,
  anchorRef,
  compute: (rect) => ({ top: rect.bottom + 4, left: rect.left }),
});

<Portal layer="popover">
  <Floating className="hint-panel" placement={position}>
    Hint cost: 10% of your checks.
  </Floating>
</Portal>`;

const Overview = overviewStory({
  component: 'Floating',
  description: 'A panel pinned to the window at a measured place: a menu under its button, a picker beside its swatch, a settings panel beside its widget. Pass the place as placement (top, left, right, bottom, width), usually from useAnchorTracking, and put it in a Portal so it sits above the page. Every popup in the design system takes its position from here, so none of them writes an inline style of its own. Without a placement it renders unplaced for the frame before its anchor is measured.',
  playground: Playground,
  variants: [UnderItsButton],
  code: CODE,
});

export default meta;
export { Overview, Playground, UnderItsButton };
