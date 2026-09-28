/* @layer stories @kind story */
import { useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Button, ButtonRow, Floating, Portal, ScrollArea, Text, useAnchorTracking } from '../../src/primitives';
import type { PortalLayer } from '../../src/primitives';
import { dropPanelPositionFor } from '../../src/primitives/Portal';
import { overviewStory } from '../_template/overview-story';
import './Portal.stories.css';

type PortalArgs = {
  layer: PortalLayer;
  open: boolean;
  message: string;
};

const LAYERS: readonly PortalLayer[] = ['overlay', 'modal', 'popover', 'toast', 'tooltip'];

const PANEL_OPTIONS = { roomForDropDown: 200, gap: 4, minPanelWidth: 240 };

const ARGS: Partial<PortalArgs> = { layer: 'toast', open: true, message: 'Aria found the Hookshot in your world.' };

const ARG_TYPES: StoryLiteArgTypes<PortalArgs> = {
    layer: { control: 'select', options: [...LAYERS] },
    open: { control: 'boolean' },
    message: { control: 'text' },
  };

const meta = {
  title: 'Primitives · Layout/Portal',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PortalArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Text variant="subtitle">
        The panel renders into the shared portal root, outside this canvas, in the bottom right corner.
      </Text>
      {args.open && (
        <Portal layer={args.layer}>
          <Box className="portal-demo__panel portal-demo__panel--corner">
            <Text className="story-label">{`layer: ${args.layer}`}</Text>
            <Text>{args.message}</Text>
          </Box>
        </Portal>
      )}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<PortalArgs>;

const AnchoredPopoverDemo = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  const { position } = useAnchorTracking({
    active: open,
    anchorRef,
    compute: (rect) => dropPanelPositionFor(rect, PANEL_OPTIONS),
    onOutOfView: () => setOpen(false),
  });

  return (
    <Box className="story-column">
      <Text variant="subtitle">Open the panel, then scroll the box. It follows its trigger and closes once the trigger leaves view.</Text>
      <ScrollArea className="portal-demo__scroller">
        <Box className="portal-demo__track">
          <Text className="portal-demo__filler">Session settings for the Saturday multiworld.</Text>
          <Box ref={anchorRef}>
            <Button size="sm" variant="secondary" onClick={() => setOpen((value) => !value)}>
              {open ? 'Hide player list' : 'Show player list'}
            </Button>
          </Box>
          {['Room code', 'Release mode', 'Hint cost', 'Item pool', 'Goal', 'Password'].map((row) => (
            <Text key={row} className="portal-demo__filler">{row}</Text>
          ))}
        </Box>
      </ScrollArea>
      {open && position && (
        <Portal layer="popover">
          <Floating
            className={`portal-demo__panel${position.dropUp ? ' portal-demo__panel--up' : ''}`}
            placement={{ top: position.top, left: position.left, width: position.width }}
          >
            <Text className="story-label">Players</Text>
            <Text>Aria, Brom, Cadence, Dov</Text>
            <ButtonRow>
              <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Close</Button>
            </ButtonRow>
          </Floating>
        </Portal>
      )}
    </Box>
  );
};

const AnchoredPopover = {
  name: 'Anchored popover',
  render: () => <AnchoredPopoverDemo />,
} satisfies StoryLiteStoryDefinition<PortalArgs>;

const CODE = `import { Box, Portal } from '@drizztdourden08/tessera';

{open && (
  <Portal layer="toast">
    <Box className="toast-panel">Aria found the Hookshot in your world.</Box>
  </Portal>
)}`;

const Overview = overviewStory({
  component: 'Portal',
  description: 'Renders its children into a shared layer outside the component tree, so a panel can sit above the rest of the page. Reach for it for popovers, toasts, tooltips and modals. The layer picks one of five stacked layers, from overlay at the bottom to tooltip on top. The layers ignore the pointer, so the content inside opts back in, and useAnchorTracking keeps a panel beside its trigger as the page scrolls.',
  playground: Playground,
  variants: [AnchoredPopover],
  code: CODE,
});

export default meta;
export { AnchoredPopover, Overview, Playground };
