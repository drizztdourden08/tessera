/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SettingsSection } from '../../src/composites';
import { Box, Paragraph } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { audioSections, generalSections } from './_samples/settings-sample-sections';
import { useSampleSettings } from './_samples/settings-sample-state';

type SectionArgs = {
  compact: boolean;
  readOnly: boolean;
  withReset: boolean;
  flash: string;
};

const SectionsDemo = (props: SectionArgs & { audio?: boolean }) => {
  const { compact, readOnly, withReset, flash, audio = false } = props;
  const state = useSampleSettings();
  const sections = audio ? audioSections(state) : generalSections(state);
  return (
    <Box className="story-column">
      {sections.map((section) => (
        <SettingsSection
          key={section.id}
          {...section}
          onReset={withReset ? section.onReset : undefined}
          compact={compact}
          readOnly={readOnly}
          flash={flash || undefined}
        />
      ))}
    </Box>
  );
};

const ARGS: Partial<SectionArgs> = { compact: false, readOnly: false, withReset: true, flash: '' };

const ARG_TYPES: StoryLiteArgTypes<SectionArgs> = {
  compact: { control: 'boolean', description: 'One line per row, for a dense page or a side panel.' },
  readOnly: { control: 'boolean', description: 'Every value as text.' },
  withReset: { control: 'boolean', description: 'The reset button in the heading, faint until the heading is hovered.' },
  flash: { control: 'select', options: ['', 'restore', 'language', 'tray-icon', 'startup'], description: 'A row key, group id or section id to pulse, as a search does when it jumps.' },
};

const meta = {
  title: 'Composites · Settings/SettingsSection',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SectionArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SectionsDemo {...args} />,
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const Audio = {
  name: 'Sliders, segments and a pattern',
  args: ARGS,
  render: (args) => <SectionsDemo {...args} audio />,
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const Compact = {
  name: 'Compact',
  args: ARGS,
  render: (args) => <SectionsDemo {...args} audio compact />,
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const ReadOnly = {
  name: 'Read only',
  args: ARGS,
  render: (args) => <SectionsDemo {...args} readOnly withReset={false} />,
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const Content = {
  name: 'Free content in the box',
  render: () => (
    <Box className="story-column">
      <SettingsSection title="About" description="A section can hold any content in place of rows.">
        <Paragraph tone="muted">Version 2.4.1, released on 3 October.</Paragraph>
        <Paragraph tone="muted">Every child gets the row padding and a divider.</Paragraph>
      </SettingsSection>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const StateSection = (props: StateProps) => {
  const [startup] = generalSections(useSampleSettings());
  if (startup === undefined) return null;
  const rows = (startup.rows ?? []).slice(0, 2).map((row) => ({ ...row, lock: props.locked === true ? 'Managed by your organisation' : null }));
  return <SettingsSection {...startup} rows={rows} changedCount={props.changed === true ? 1 : 0} flash={typeof props.flash === 'string' ? props.flash : undefined} />;
};

const CODE = `import { SettingsSection } from '@drizztdourden08/tessera';

<SettingsSection
  id="tray"
  title="Tray"
  changedCount={1}
  onReset={resetTray}
  groups={[{
    id: 'tray-icon',
    title: 'Icon',
    rows: [
      { id: 'tray', title: 'Show a tray icon', input: { kind: 'toggle', value: tray, onChange: setTray } },
      { id: 'close', title: 'Close to the tray', lock: tray ? null : 'Turn on the tray icon first', input: { kind: 'toggle', value: close, onChange: setClose } },
    ],
  }]}
/>`;

const Overview = overviewStory({
  component: 'SettingsSection',
  description: 'One section of a settings page, drawn from data. The title is large and underlined; with onReset a reset button sits at its end, faint until the heading is hovered, which asks once and says how many settings differ from their defaults. Under it come groups of rows: a group can have its own small uppercase title, and its rows sit in a sunken box with a divider between them. rows draws one untitled group, groups draws several. A row is SettingsRow data, or { id, content } for anything else. Rows next to each other that share a lock cause run together under one DisabledOverlay that says why. compact and readOnly reach every row. flash pulses a row, a group or the whole section, for a search that jumps to it. The section carries data-section and every row data-setting-key, so SettingsPage can follow the scroll and a search can find a row. Children, when given, fill one more box, a row each.',
  points: [
    'Stack sections one after another; each one after the first keeps its distance on its own.',
    'filterSettingsSections(sections, query) keeps the rows that match, which is how the search results draw the same sections.',
  ],
  playground: Playground,
  variants: [Audio, Compact, ReadOnly, Content],
  states: {
    render: (props) => <StateSection {...props} />,
    list: [
      { ...STATE.idle, name: 'At defaults' },
      { name: 'Changed', props: { changed: true } },
      { name: 'Heading hover', pseudo: 'hover', target: '.settings-section__heading', props: { changed: true } },
      { name: 'Locked run', props: { locked: true } },
      { name: 'Search hit', props: { flash: 'restore' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Audio, Compact, Content, Overview, Playground, ReadOnly };
