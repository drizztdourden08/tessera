/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ListItemRow, ScreenWindow } from '../../src/composites';
import { Button, ScrollArea } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ScreenDemo } from './_samples/ScreenDemo';
import { PLAYERS, SESSIONS, STATUS_LABEL } from './_samples/sessions';
import { useWindowSwitch } from './_samples/useWindowSwitch';
import './ScreenWindow.stories.css';

type WindowArgs = {
  title: string;
  subtitle: string;
  withExtra: boolean;
  withFloating: boolean;
};

const SessionList = () => (
  <ScrollArea className="screen-window-story__list">
    {SESSIONS.map((s) => <ListItemRow key={s.id} name={s.name} meta={`${STATUS_LABEL[s.status]}, ${s.players} players`} />)}
  </ScrollArea>
);

const PlayerList = () => (
  <ScrollArea className="screen-window-story__list">
    {PLAYERS.map((p) => <ListItemRow key={p.slot} name={p.name} meta={`${p.game}, ${p.checks} checks`} />)}
  </ScrollArea>
);

const WindowDemo = (props: WindowArgs) => {
  const { title, subtitle, withExtra, withFloating } = props;
  const [hidden, setHidden] = useState(false);
  const { view, floating } = useWindowSwitch(withFloating);
  const players = withFloating && view === 'players';
  const shownTitle = players ? 'Players' : 'Sessions';
  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="The close button hides the window">
      <ScreenWindow
        title={withFloating ? shownTitle : title}
        subtitle={subtitle || undefined}
        extra={withExtra ? <Button size="sm">New session</Button> : undefined}
        floating={floating}
        hidden={hidden}
        onClose={() => setHidden(true)}
      >
        {players ? <PlayerList /> : <SessionList />}
      </ScreenWindow>
    </ScreenDemo>
  );
};

const ARGS: Partial<WindowArgs> = { title: 'Sessions', subtitle: 'Profile: mira', withExtra: true, withFloating: false };

const ARG_TYPES: PlaygroundArgTypes<WindowArgs> = {
  title: { group: 'Content', control: 'text' },
  subtitle: { group: 'Content', control: 'text' },
  withExtra: { group: 'Content', control: 'boolean' },
  withFloating: { group: 'Content', control: 'boolean' },
};

const meta = {
  title: 'Composites · Screens/ScreenWindow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WindowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} />,
} satisfies PlaygroundStory<WindowArgs>;

const SiblingWindows = {
  name: 'Sibling windows with a floating switch',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} withFloating />,
} satisfies PlaygroundStory<WindowArgs>;

const TitleOnly = {
  name: 'Title only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} subtitle="" withExtra={false} />,
} satisfies PlaygroundStory<WindowArgs>;

const CODE = `import { ScreenWindow } from '@drizztdourden08/tessera';

<ScreenWindow title="Sessions" subtitle="Profile: mira" onClose={close}>
  <SessionList />
</ScreenWindow>`;

const Overview = overviewStory({
  component: 'ScreenWindow',
  description: 'A building block: the plain screen window that every screen kind is made of. It is a ScreenLayer with a title, a close button and an empty container, and nothing else. Reach for a screen kind first: WorkspaceScreen for pages with a side list, InfoScreen for About and credits, UtilityScreen for a short task such as an update check, StageScreen for one big custom surface. Use ScreenWindow alone only when none of them fits. The title bar takes a subtitle and extra controls before the close button; the floating slot, hidden and size pass through to the ScreenLayer.',
  playground: Playground,
  points: [
    'The space inside the card is the same on all four sides: an xl space, or an md space when the card fills a tiny room or a phone.',
    'An lg gap separates the title bar from the content.',
    'The content container is an empty column that fills the rest of the card. It does not scroll: the content picks how it scrolls.',
    'The card is a dialog named by the title.',
  ],
  variants: [SiblingWindows, TitleOnly],
  code: CODE,
});

export default meta;
export { Overview, Playground, SiblingWindows, TitleOnly };
