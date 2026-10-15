/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { DisabledOverlay, ListItemRow } from '../../src/composites';
import type { DisabledOverlayPlacement, DisabledOverlayTone } from '../../src/composites';
import { Box, Text, Toggle } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { OverlayTopDemo } from './_samples/OverlayTopDemo';
import { PLAYERS } from './_samples/sessions';
import './DisabledOverlay.stories.css';

type DisabledArgs = {
  active: boolean;
  message: string;
  tone: DisabledOverlayTone;
  placement: DisabledOverlayPlacement;
  actionLabel: string;
  contained: boolean;
  withAction: boolean;
};

const noop = () => {};

const TONES: readonly DisabledOverlayTone[] = ['secondary', 'primary', 'info', 'success', 'warning', 'danger'];

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
    tone: 'secondary',
    placement: 'center',
    contained: false,
    withAction: true,
  };

const ARG_TYPES: PlaygroundArgTypes<DisabledArgs> = {
    message: { group: 'Content', control: 'text' },
    actionLabel: { group: 'Content', control: 'text' },
    withAction: { group: 'Content', control: 'boolean' },
    tone: { group: 'Appearance', control: 'select', options: [...TONES], description: 'The colour of the scrim, its edge, the message and the button.' },
    contained: { group: 'Layout', control: 'boolean' },
    placement: { group: 'Layout', control: 'select', options: ['center', 'top'], description: 'Where the message sits; top keeps it in view while the covered body scrolls.' },
    active: { group: 'State', control: 'boolean' },
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
      tone={args.tone}
      placement={args.placement}
      actionLabel={args.actionLabel}
      contained={args.contained}
      onOpenSettings={args.withAction ? noop : undefined}
    >
      <HostingControls />
    </DisabledOverlay>
  ),
} satisfies PlaygroundStory<DisabledArgs>;

const ContainedList = {
  name: 'Contained in a scrolling list',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ContainedDemo {...args} message="The player list is hidden while the session is private." />,
} satisfies PlaygroundStory<DisabledArgs>;

const NoAction = {
  name: 'Lock with no way out here',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <OverlayDemo {...args} withAction={false} message="Read-only while the session is running." />
  ),
} satisfies PlaygroundStory<DisabledArgs>;

const Tones = {
  name: 'Tones',
  render: () => (
    <Demonstrator
      rows={axis(TONES)}
      cell={(tone) => (
        <Box className="disabled-overlay-story__pad">
          <DisabledOverlay active tone={tone} message="Build the language once to edit its strings." onOpenSettings={noop} actionLabel="Build now">
            <HostingControls />
          </DisabledOverlay>
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<DisabledArgs>;

const TopOfLongList = {
  name: 'Message at the top of a long list',
  render: () => <OverlayTopDemo />,
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
  description: 'A scrim over an area that a setting turns off, which keeps the area in sight and says why it is out of reach.',
  points: [
    'Use it where hiding the area would leave the user wondering where it went.',
    '`active` shows the scrim and `message` says why; `actionLabel` and `onOpenSettings` add a settings button.',
    '`contained` insets the scrim for content inside a scrolling or clipped box.',
    '`tone` colours the scrim, its edge, the message and the button; `secondary` by default, or `warning`.',
    '`placement="top"` holds the message at the top, in view while a long covered body scrolls.',
    'Inside a compact [DensityScope] the scrim has less padding and the message is not bold.',
  ],
  instead: '[Overlay] to block a panel while something runs.',
  playground: Playground,
  variants: [DefaultMessage, NoAction, ContainedList, TopOfLongList, Tones],
});

export default meta;
export { ContainedList, DefaultMessage, NoAction, Overview, Playground, Tones, TopOfLongList };
