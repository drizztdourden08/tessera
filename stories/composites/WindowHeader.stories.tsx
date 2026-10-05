/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { WindowHeader } from '../../src/composites';
import { Box, Button, Icon, StatRow, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './WindowHeader.stories.css';

type WindowHeaderArgs = {
  title: string;
  subtitle: string;
  withClose: boolean;
  withExtra: boolean;
  withBack: boolean;
};

const HEADER_EXTRA = (
  <>
    <Status tone="success" variant="pill" dot>Synced</Status>
    <Button size="sm" variant="secondary" icon={<Icon name="download" size={14} />}>Import</Button>
  </>
);

const SAVES = [
  { place: 'Hyrule Castle, before Agahnim', when: 'Tue, Sep 29, 21:14' },
  { place: 'Kakariko Village', when: 'Mon, Sep 28, 19:02' },
  { place: 'Eastern Palace', when: 'Sun, Sep 27, 15:40' },
] as const;

const NARROW_WIDTHS = ['wide', 'medium', 'narrow', 'tiny'] as const;

const ignoreClose = () => undefined;

const narrowRows = (args: WindowHeaderArgs, onBack: (() => void) | undefined) => (
  <Box className="story-column">
    {NARROW_WIDTHS.map((width) => (
      <Box key={width} className={`window-header-story__strip window-header-story__strip--${width}`}>
        <WindowHeader title={args.title} subtitle={args.subtitle || undefined} extra={HEADER_EXTRA} back={onBack && { onSelect: onBack }} onClose={ignoreClose} />
      </Box>
    ))}
  </Box>
);

const SaveFilesWindow = (props: WindowHeaderArgs) => {
  const { title, subtitle, withClose, withExtra, withBack } = props;
  const [closed, setClosed] = useState(0);
  const [back, setBack] = useState(0);
  return (
    <Box className="window-header-story__window">
      <WindowHeader
        title={title}
        subtitle={subtitle || undefined}
        extra={withExtra ? HEADER_EXTRA : undefined}
        back={withBack ? { onSelect: () => setBack(back + 1) } : undefined}
        onClose={withClose ? () => setClosed(closed + 1) : undefined}
      />
      <Box className="window-header-story__body">
        {SAVES.map((save) => <StatRow key={save.place} label={save.place} value={save.when} />)}
        {withClose && <Text className="story-label">Close pressed {closed} times</Text>}
        {withBack && <Text className="story-label">Back pressed {back} times</Text>}
      </Box>
    </Box>
  );
};

const ARGS: Partial<WindowHeaderArgs> = { title: 'Save files', subtitle: "Mira's profile", withClose: true, withExtra: true, withBack: false };

const ARG_TYPES: PlaygroundArgTypes<WindowHeaderArgs> = {
  title: { group: 'Content', control: 'text' },
  subtitle: { group: 'Content', control: 'text' },
  withClose: { group: 'Content', control: 'boolean' },
  withExtra: { group: 'Content', control: 'boolean', description: 'A Status and a button before the close button.' },
  withBack: { group: 'Content', control: 'boolean', description: 'Pass back: a back button before the title.' },
};

const meta = {
  title: 'Composites · Windows/WindowHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WindowHeaderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="window-header-story__strip">
      <WindowHeader
        title={args.title}
        subtitle={args.subtitle || undefined}
        extra={args.withExtra ? HEADER_EXTRA : undefined}
        back={args.withBack ? { onSelect: ignoreClose } : undefined}
        onClose={args.withClose ? ignoreClose : undefined}
      />
    </Box>
  ),
} satisfies PlaygroundStory<WindowHeaderArgs>;

const InWindow = {
  name: 'On top of a window',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SaveFilesWindow {...args} />,
} satisfies PlaygroundStory<WindowHeaderArgs>;

const Narrow = {
  name: 'Less room: the subtitle shortens, the extras go, then the title shortens',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => narrowRows(args, undefined),
} satisfies PlaygroundStory<WindowHeaderArgs>;

const WithBack = {
  name: 'A back button for the screen before',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SaveFilesWindow {...args} title="Save files" withBack />,
} satisfies PlaygroundStory<WindowHeaderArgs>;

const NarrowBack = {
  name: 'With a back button, less room narrows it the same way',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => narrowRows(args, ignoreClose),
} satisfies PlaygroundStory<WindowHeaderArgs>;

const TitleOnly = {
  name: 'Title only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SaveFilesWindow {...args} subtitle="" withClose={false} withExtra={false} />,
} satisfies PlaygroundStory<WindowHeaderArgs>;

const Overview = overviewStory({
  component: 'WindowHeader',
  description: 'The title bar of windows, dialogs and drawers: a title, an optional subtitle, extra content and a close button.',
  points: [
    'The close button shows only when `onClose` is set.',
    '`extra` takes content such as a [Status] or a button, before the close button.',
    '`back` draws a back button before the title; the host wires [[Alt+Left]] and the mouse back button.',
    'It stays one row: the subtitle shortens first, then `extra` hides, then the title shortens.',
  ],
  instead: '[WindowTitleBar] for the title bar of a whole app window.',
  playground: Playground,
  variants: [InWindow, Narrow, WithBack, NarrowBack, TitleOnly],
});

export default meta;
export { InWindow, Narrow, NarrowBack, Overview, Playground, TitleOnly, WithBack };
