/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { ScreenPage } from '../../src/composites';
import { Box, Button, Icon, Paragraph, Status } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { SESSIONS, STATUS_LABEL } from './_samples/sessions';
import './ScreenPage.stories.css';

type HeaderArgs = {
  title: string;
  backdrop: boolean;
  strip: boolean;
  actions: boolean;
  footer: boolean;
};

const SessionLines = () => (
  <Box className="screen-page-story__lines">
    {[...SESSIONS, ...SESSIONS].map((s, index) => <Paragraph key={`${s.id}-${index}`} tone="dim">{`${s.name}: ${STATUS_LABEL[s.status]}, ${s.players} players`}</Paragraph>)}
  </Box>
);

const HeaderDemo = (props: HeaderArgs & { compact?: boolean }) => {
  const { title, backdrop, strip, actions, footer, compact } = props;
  return (
    <Box className="story-frame screen-page-story__frame">
      <ScreenPage
        icon={<Icon name="layers" />}
        title={title}
        backdrop={backdrop ? undefined : null}
        strip={strip ? <Status tone="success" variant="pill">3 running</Status> : undefined}
        actions={actions ? <Button size="sm" variant="secondary">New session</Button> : undefined}
        footer={footer ? <Paragraph tone="muted">Sessions end on their own after a day without players.</Paragraph> : undefined}
        compact={compact}
      >
        <SessionLines />
      </ScreenPage>
    </Box>
  );
};

const ARGS: Partial<HeaderArgs> = { title: 'Friday async', backdrop: true, strip: true, actions: true, footer: false };

const ARG_TYPES: PlaygroundArgTypes<HeaderArgs> = {
  title: { group: 'Content', control: 'text' },
  backdrop: { group: 'Appearance', control: 'boolean', description: 'The default art behind the header. Off passes null for a plain header.' },
  strip: { group: 'Content', control: 'boolean', description: 'A few controls after the title.' },
  actions: { group: 'Content', control: 'boolean', description: 'Controls at the end of the header.' },
  footer: { group: 'Content', control: 'boolean', description: 'A row under the body that stays in view.' },
};

const meta = {
  title: 'Composites · Screens/ScreenPage',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<HeaderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <HeaderDemo {...args} />,
} satisfies PlaygroundStory<HeaderArgs>;

const Plain = {
  name: 'Plain header with a footer',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <HeaderDemo {...args} backdrop={false} strip={false} actions={false} footer />,
} satisfies PlaygroundStory<HeaderArgs>;

const renderState = (props: StateProps) => (
  <HeaderDemo title="Friday async" backdrop strip={false} actions={false} footer={false} compact={props.compact === true} />
);

const CODE = `import { Icon, ScreenPage, ScreenWindow } from '@drizztdourden08/tessera';

<ScreenWindow title="Sessions" onClose={close}>
  <ScreenPage icon={<Icon name="layers" />} title="Friday async" actions={<Button size="sm">New session</Button>}>
    <SessionList />
  </ScreenPage>
</ScreenWindow>`;

const Overview = overviewStory({
  component: 'ScreenPage',
  description: 'A building block: the page header container that every screen kind shows. It is a card with a header line, a glowing icon and a title over a backdrop that fades out behind the title, and a body that scrolls under it. Once the body scrolls, the header compacts in place; compact holds either look. WorkspaceScreen shows one per page, through SettingsPage; InfoScreen, UtilityScreen and StageScreen show one around their content. None of them can turn it off: a screen without the header is a custom screen built from ScreenWindow. strip holds a few controls after the title, actions sit at the far end, and footer is a row under the body that stays in view.',
  playground: Playground,
  points: [
    'icon and title are required; with either missing it warns in development.',
    'Leave backdrop out for the default art, pass a scene of your own, or pass null for a plain header.',
    'scroll={false} leaves the scrolling to the content, and the header then stays full size.',
  ],
  variants: [Plain],
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
export { Overview, Plain, Playground };
