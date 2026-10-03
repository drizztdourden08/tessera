/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { WindowHeader } from '../../src/composites';
import { Box, Button, Icon, StatRow, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './WindowHeader.stories.css';

type WindowHeaderArgs = {
  title: string;
  subtitle: string;
  withClose: boolean;
  withExtra: boolean;
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

const SaveFilesWindow = (props: WindowHeaderArgs) => {
  const { title, subtitle, withClose, withExtra } = props;
  const [closed, setClosed] = useState(0);
  return (
    <Box className="window-header-story__window">
      <WindowHeader
        title={title}
        subtitle={subtitle || undefined}
        extra={withExtra ? HEADER_EXTRA : undefined}
        onClose={withClose ? () => setClosed(closed + 1) : undefined}
      />
      <Box className="window-header-story__body">
        {SAVES.map((save) => <StatRow key={save.place} label={save.place} value={save.when} />)}
        {withClose && <Text className="story-label">Close pressed {closed} times</Text>}
      </Box>
    </Box>
  );
};

const ARGS: Partial<WindowHeaderArgs> = { title: 'Save files', subtitle: "Mira's profile", withClose: true, withExtra: true };

const ARG_TYPES: StoryLiteArgTypes<WindowHeaderArgs> = {
  title: { control: 'text' },
  subtitle: { control: 'text' },
  withClose: { control: 'boolean' },
  withExtra: { control: 'boolean', description: 'A Status and a button before the close button.' },
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
        onClose={args.withClose ? ignoreClose : undefined}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<WindowHeaderArgs>;

const InWindow = {
  name: 'On top of a window',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SaveFilesWindow {...args} />,
} satisfies StoryLiteStoryDefinition<WindowHeaderArgs>;

const Narrow = {
  name: 'Less room: the subtitle shortens, the extras go, then the title shortens',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      {NARROW_WIDTHS.map((width) => (
        <Box key={width} className={`window-header-story__strip window-header-story__strip--${width}`}>
          <WindowHeader title={args.title} subtitle={args.subtitle || undefined} extra={HEADER_EXTRA} onClose={ignoreClose} />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<WindowHeaderArgs>;

const TitleOnly = {
  name: 'Title only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SaveFilesWindow {...args} subtitle="" withClose={false} withExtra={false} />,
} satisfies StoryLiteStoryDefinition<WindowHeaderArgs>;

const Overview = overviewStory({
  component: 'WindowHeader',
  description: 'The title bar shared by windows, dialogs and drawers. The title sits on the left in gold capitals, an optional subtitle follows it in plain case, and extra content such as a Status or a button sits before the close button. The close button shows only when onClose is set. It stays one row at any width: as room runs out the subtitle shortens with an ellipsis, then the extra content hides as a whole, then the title shortens. The close button always stays.',
  playground: Playground,
  variants: [InWindow, Narrow, TitleOnly],
});

export default meta;
export { InWindow, Narrow, Overview, Playground, TitleOnly };
