/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ListItemRow, ScreenWindow } from '../../src/composites';
import { Button, Icon, ScrollArea } from '../../src/primitives';
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
  withHeader: boolean;
  withBack: boolean;
  square: boolean;
};

type WindowTop = { withHeader: boolean; players: boolean; subtitle: string; extra: ReactNode; goBack?: () => void };

const SessionList = ({ padded }: { padded: boolean }) => (
  <ScrollArea className={`screen-window-story__list${padded ? ' screen-window-story__list--padded' : ''}`}>
    {SESSIONS.map((s) => <ListItemRow key={s.id} name={s.name} meta={`${STATUS_LABEL[s.status]}, ${s.players} players`} />)}
  </ScrollArea>
);

const PlayerList = ({ padded }: { padded: boolean }) => (
  <ScrollArea className={`screen-window-story__list${padded ? ' screen-window-story__list--padded' : ''}`}>
    {PLAYERS.map((p) => <ListItemRow key={p.slot} name={p.name} meta={`${p.game}, ${p.checks} checks`} />)}
  </ScrollArea>
);

const windowTop = (top: WindowTop) => {
  const { withHeader, players, subtitle, extra, goBack } = top;
  if (!withHeader) return { subtitle: subtitle || undefined, extra, onBack: goBack };
  return { header: { icon: <Icon name={players ? 'users' : 'layers'} />, actions: extra, back: goBack && { label: 'Home', onSelect: goBack } } };
};

const WindowDemo = (props: WindowArgs) => {
  const { title, subtitle, withExtra, withFloating, withHeader, withBack, square } = props;
  const [hidden, setHidden] = useState(false);
  const { view, floating } = useWindowSwitch(withFloating);
  const players = withFloating && view === 'players';
  const shownTitle = players ? 'Players' : 'Sessions';
  const extra = withExtra ? <Button size="sm">New session</Button> : undefined;
  const goBack = withBack ? () => setHidden(true) : undefined;
  const top = windowTop({ withHeader, players, subtitle, extra, goBack });
  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="The close button hides the window">
      <ScreenWindow
        title={withFloating ? shownTitle : title}
        {...top}
        floating={floating}
        hidden={hidden}
        square={square}
        onClose={() => setHidden(true)}
      >
        {players ? <PlayerList padded={withHeader} /> : <SessionList padded={withHeader} />}
      </ScreenWindow>
    </ScreenDemo>
  );
};

const ARGS: Partial<WindowArgs> = { title: 'Sessions', subtitle: 'Profile: mira', withExtra: true, withFloating: false, withHeader: false, withBack: false, square: false };

const ARG_TYPES: PlaygroundArgTypes<WindowArgs> = {
  title: { group: 'Content', control: 'text' },
  subtitle: { group: 'Content', control: 'text' },
  withExtra: { group: 'Content', control: 'boolean' },
  withFloating: { group: 'Content', control: 'boolean' },
  withBack: { group: 'Content', control: 'boolean', description: 'onBack, or header.back with a page header: here it goes back to the page behind.' },
  withHeader: { group: 'Appearance', control: 'boolean', description: 'A page header with an icon is the top of the window, in place of the title bar.' },
  square: { group: 'Appearance', control: 'boolean', description: 'No corner radius and no outer border, for a window shown fullscreen.' },
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

const WithHeader = {
  name: 'With a page header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} withHeader />,
} satisfies PlaygroundStory<WindowArgs>;

const WithBack = {
  name: 'With a back button',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} withBack />,
} satisfies PlaygroundStory<WindowArgs>;

const TitleOnly = {
  name: 'Title only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} subtitle="" withExtra={false} />,
} satisfies PlaygroundStory<WindowArgs>;

const CODE = `import { Button, Icon, ScreenWindow } from '@drizztdourden08/tessera';

<ScreenWindow title="Sessions" subtitle="Profile: mira" onClose={close}>
  <SessionList />
</ScreenWindow>

<ScreenWindow title="Sessions" header={{ icon: <Icon name="layers" />, actions: <Button size="sm">New session</Button> }} onClose={close}>
  <SessionList />
</ScreenWindow>`;

const Overview = overviewStory({
  component: 'ScreenWindow',
  description: 'A building block: a ScreenLayer with a title, a close button and an empty container, the window of every screen kind.',
  points: [
    'The title bar takes a `subtitle`, `extra` controls before the close button and `onBack` for a back button.',
    '`header` swaps the title bar for a [ContentHeader] at the top edge, with the close button at its end.',
    'The padding is xl, lg under 960 by 600 px, and md once the card fills the layer; `header` drops it.',
    'The content is an empty column that fills the card and never scrolls: the content picks how it scrolls.',
    '`floating`, `hidden` and `size` pass through to the [ScreenLayer]; `square` drops the corners for fullscreen.',
  ],
  instead: '[WorkspaceScreen], [InfoScreen], [UtilityScreen] or [StageScreen] first; this only when none of them fits.',
  playground: Playground,
  variants: [WithHeader, SiblingWindows, WithBack, TitleOnly],
  code: CODE,
});

export default meta;
export { Overview, Playground, SiblingWindows, TitleOnly, WithBack, WithHeader };
