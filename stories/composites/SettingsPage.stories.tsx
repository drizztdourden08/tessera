/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SettingsPage, SettingsSection } from '../../src/composites';
import { Box, Button, Icon, Paragraph } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { SESSION_SECTIONS } from './_samples/nav';
import { generalSections } from './_samples/settings-sample-sections';
import { useSampleSettings } from './_samples/settings-sample-state';
import './SettingsPage.stories.css';

type PageArgs = {
  title: string;
  withBackdrop: boolean;
  withActions: boolean;
  withBack: boolean;
};

const backdrop = <Box className="settings-page-story__backdrop" />;

const STATE_ANCHORS = [{ id: 'startup', label: 'Startup' }, { id: 'tray', label: 'Tray' }];

const ignore = () => undefined;

const PageDemo = (props: PageArgs & { narrow?: boolean }) => {
  const { title, withBackdrop, withActions, withBack, narrow } = props;
  const sections = generalSections(useSampleSettings());
  return (
    <Box className={`story-frame settings-page-story__frame${narrow === true ? ' settings-page-story__frame--narrow' : ''}`}>
      <SettingsPage
        icon={<Icon name="settings" />}
        title={title}
        back={withBack ? { label: 'Settings', onSelect: ignore } : undefined}
        backdrop={withBackdrop ? backdrop : undefined}
        anchors={sections.map((section) => ({ id: section.id, label: section.title ?? section.id }))}
        actions={withActions ? <Button size="sm" variant="secondary">Export</Button> : undefined}
      >
        {sections.map((section) => <SettingsSection key={section.id} {...section} />)}
      </SettingsPage>
    </Box>
  );
};

const TabsDemo = () => {
  const [view, setView] = useState('players');
  return (
    <Box className="story-frame settings-page-story__frame">
      <SettingsPage
        icon={<Icon name="layers" />}
        title="Friday async"
        tabs={{ items: SESSION_SECTIONS, activeId: view, onSelect: setView }}
        scroll={false}
      >
        <Paragraph tone="muted">The host swaps this body for the {view} view. With scroll off the body holds its own scrolling.</Paragraph>
      </SettingsPage>
    </Box>
  );
};

const ARGS: Partial<PageArgs> = { title: 'General', withBackdrop: true, withActions: false, withBack: false };

const ARG_TYPES: PlaygroundArgTypes<PageArgs> = {
  title: { group: 'Content', control: 'text' },
  withActions: { group: 'Content', control: 'boolean' },
  withBack: { group: 'Content', control: 'boolean', description: 'A way back to the parent page, Settings, before the icon.' },
  withBackdrop: { group: 'Appearance', control: 'boolean' },
};

const meta = {
  title: 'Composites · Settings/SettingsPage',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PageArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PageDemo {...args} />,
} satisfies PlaygroundStory<PageArgs>;

const PlainWithActions = {
  name: 'No backdrop, with actions',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PageDemo {...args} withBackdrop={false} withActions />,
} satisfies PlaygroundStory<PageArgs>;

const SubPage = {
  name: 'A sub-page with a way back to its parent',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PageDemo {...args} withBack />,
} satisfies PlaygroundStory<PageArgs>;

const ViewTabs = {
  name: 'View tabs, fixed body',
  render: () => <TabsDemo />,
} satisfies StoryLiteStoryDefinition<PageArgs>;

const InNarrowBox = {
  name: 'In a narrow box',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PageDemo {...args} withActions narrow />,
} satisfies PlaygroundStory<PageArgs>;

const renderState = (props: StateProps) => (
  <Box className="settings-page-story__state">
    <SettingsPage icon={<Icon name="settings" />} title="General" backdrop={backdrop} anchors={STATE_ANCHORS} compact={props.compact === true}>
      <Paragraph tone="muted">Settings scroll here.</Paragraph>
    </SettingsPage>
  </Box>
);

const CODE = `import { SettingsPage } from '@drizztdourden08/tessera';

<SettingsPage
  icon={<Icon name="settings" />}
  title="General"
  backdrop={<SceneArt />}
  anchors={[{ id: 'startup', label: 'Startup' }, { id: 'tray', label: 'Tray' }]}
>
  {sections.map((section) => <SettingsSection key={section.id} {...section} />)}
</SettingsPage>`;

const Overview = overviewStory({
  component: 'SettingsPage',
  description: 'One page of settings: a header with an icon, the title and a strip of tabs, over a body that scrolls.',
  points: [
    '`anchors` makes the strip jump between the [SettingsSection] blocks of the body and follow the scroll.',
    '`tabs` shows the host\'s own views in the strip instead.',
    'The header compacts once the body scrolls; `compact` holds either look.',
    '`actions` sit at the far end of the header; `back` leads to the parent page, as on [ScreenPage].',
    '`scroll={false}` leaves the scrolling to the content of the body.',
    'Short of room the tabs move to a row under the title and wrap there, so the title stays whole.',
  ],
  instead: '[WorkspaceScreen] to build a whole settings screen with its side list and search.',
  playground: Playground,
  variants: [PlainWithActions, SubPage, ViewTabs, InNarrowBox],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Compact', props: { compact: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { InNarrowBox, Overview, PlainWithActions, Playground, SubPage, ViewTabs };
