/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ReleaseNotesPanel } from '../../src/composites';
import { Box, Callout, Icon, IconButton, Paragraph } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type NotesArgs = {
  title: string;
  long: boolean;
};

const SHORT_NOTES = `Fixed
- The tracker no longer loses a player who rejoins on another slot.
- Hints cost the right number of points again.`;

const LONG_NOTES = `New
- Profiles sync between computers when you sign in.
- The search box finds settings and screens, and flips a switch in place.
- A pin in the title bar keeps the window on top.

Changed
- The log shows warnings and errors in their own colours.
- The About screen copies its debug text in one click.
- Updates can go back to any earlier version.

Fixed
- The tracker no longer loses a player who rejoins on another slot.
- Hints cost the right number of points again.
- Full screen no longer leaves a gap where the title bar was.
- Closing to the tray remembers the window size.
- The input tester reads the second stick on older pads.`;

const ARGS: Partial<NotesArgs> = { title: 'Release notes', long: true };

const ARG_TYPES: StoryLiteArgTypes<NotesArgs> = {
  title: { control: 'text' },
  long: { control: 'boolean', description: 'Enough notes to scroll.' },
};

const meta = {
  title: 'Composites · Content/ReleaseNotesPanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NotesArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <ReleaseNotesPanel title={args.title}>{args.long ? LONG_NOTES : SHORT_NOTES}</ReleaseNotesPanel>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<NotesArgs>;

const Short = {
  name: 'A few lines',
  render: () => <ReleaseNotesPanel>{SHORT_NOTES}</ReleaseNotesPanel>,
} satisfies StoryLiteStoryDefinition<NotesArgs>;

const InUpdateDialog = {
  name: 'In an update dialog, with callouts',
  render: () => (
    <Box className="story-column">
      <Paragraph>Version 1.5.0-beta.2 is available</Paragraph>
      <Callout>This is a pre-release. It ships before the usual testing, so expect rough edges the stable builds do not have.</Callout>
      <ReleaseNotesPanel>{LONG_NOTES}</ReleaseNotesPanel>
      <Callout
        variant="footnote"
        action={<IconButton tone="danger" size="sm" label="Report a bug"><Icon name="bug" size={14} /></IconButton>}
      >
        Any earlier version can be picked above if something stops working. Please report it either way, so it gets fixed.
      </Callout>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<NotesArgs>;

const Overview = overviewStory({
  component: 'ReleaseNotesPanel',
  description: 'Release notes in a box with a title bar in the primary colour, for an update dialog or a what is new screen. Plain text keeps its line breaks; any other content is drawn as it is. Past a fixed height the notes scroll inside the box, so the dialog around them keeps its size. Pair it with a Callout for a pre-release warning and a footnote.',
  playground: Playground,
  variants: [Short, InUpdateDialog],
});

export default meta;
export { InUpdateDialog, Overview, Playground, Short };
