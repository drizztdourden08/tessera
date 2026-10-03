/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DisabledOverlay, ListItemRow } from '../../src/composites';
import { Box, Text, Toggle } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { PLAYERS } from './_samples/sessions';
import './DisabledOverlay.stories.css';

type DisabledArgs = {
  active: boolean;
  message: string;
  actionLabel: string;
  contained: boolean;
  withAction: boolean;
};

const noop = () => {};

const HostingControls = () => {
  const [relay, setRelay] = useState(true);
  const [spectators, setSpectators] = useState(false);
  return (
    <Box className="disabled-overlay-story__block">
      <Toggle checked={relay} onChange={setRelay} label="Relay through the server" description="Players never see each other's address." />
      <Toggle checked={spectators} onChange={setSpectators} label="Allow spectators" />
    </Box>
  );
};

const OverlayDemo = (props: DisabledArgs) => {
  const { withAction, ...overlay } = props;
  const [clicks, setClicks] = useState(0);
  return (
    <Box className="story-column">
      <Box className="disabled-overlay-story__pad">
        <DisabledOverlay {...overlay} onOpenSettings={withAction ? () => setClicks(clicks + 1) : undefined}>
          <HostingControls />
        </DisabledOverlay>
      </Box>
      {withAction && <Text className="story-label">Settings link pressed {clicks} times</Text>}
    </Box>
  );
};

const ContainedDemo = (props: DisabledArgs) => {
  const { withAction, ...overlay } = props;
  return (
    <Box className="disabled-overlay-story__scroller">
      <DisabledOverlay {...overlay} contained onOpenSettings={withAction ? noop : undefined}>
        <Box className="disabled-overlay-story__block">
          {PLAYERS.map((p) => <ListItemRow key={p.slot} name={p.name} meta={p.game} />)}
        </Box>
      </DisabledOverlay>
    </Box>
  );
};

const ARGS: Partial<DisabledArgs> = {
    active: true,
    message: 'Hosting is off. Turn it on in Settings to change these options.',
    actionLabel: 'Open Settings',
    contained: false,
    withAction: true,
  };

const ARG_TYPES: StoryLiteArgTypes<DisabledArgs> = {
    active: { control: 'boolean' },
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    contained: { control: 'boolean' },
    withAction: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Overlays/DisabledOverlay',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DisabledArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DisabledOverlay
      active={args.active}
      message={args.message}
      actionLabel={args.actionLabel}
      contained={args.contained}
      onOpenSettings={args.withAction ? noop : undefined}
    >
      <HostingControls />
    </DisabledOverlay>
  ),
} satisfies StoryLiteStoryDefinition<DisabledArgs>;

const ContainedList = {
  name: 'Contained in a scrolling list',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ContainedDemo {...args} message="The player list is hidden while the session is private." />,
} satisfies StoryLiteStoryDefinition<DisabledArgs>;

const NoAction = {
  name: 'Lock with no way out here',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <OverlayDemo {...args} withAction={false} message="Read-only while the session is running." />
  ),
} satisfies StoryLiteStoryDefinition<DisabledArgs>;

const DefaultMessage = {
  name: 'Default message',
  render: () => (
    <Box className="disabled-overlay-story__pad">
      <DisabledOverlay active>
        <HostingControls />
      </DisabledOverlay>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<DisabledArgs>;

const Overview = overviewStory({
  component: 'DisabledOverlay',
  description: 'A scrim over a setting-gated surface: a locked control, a widget whose master toggle is off, a list for a disabled feature. Use it where hiding the surface would leave the user wondering where it went. The content stays visible but out of reach, the scrim says why, and an optional button links back to the setting that turns it on. The contained variant insets the scrim for content inside a scrolling or clipped box.',
  playground: Playground,
  variants: [DefaultMessage, NoAction, ContainedList],
});

export default meta;
export { ContainedList, DefaultMessage, NoAction, Overview, Playground };
