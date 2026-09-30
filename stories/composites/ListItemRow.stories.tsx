/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ListItemRow } from '../../src/composites';
import { Badge, Box, Button, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LabelledRows } from '../_template/LabelledRows';
import { NAV_ICONS } from './_samples/nav';
import { SESSIONS, STATUS_LABEL } from './_samples/sessions';

type RowArgs = {
  name: string;
  meta: string;
  aside: string;
  withIcon: boolean;
  selected: boolean;
  withAction: boolean;
};

const sessionIcon = <Icon name={NAV_ICONS.sessions} />;

const SelectableList = () => {
  const [selectedId, setSelectedId] = useState(SESSIONS[0].id);
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <Box className="story-column">
      {SESSIONS.map((s) => (
        <ListItemRow
          key={s.id}
          icon={sessionIcon}
          name={s.name}
          meta={`${STATUS_LABEL[s.status]}, ${s.players} players`}
          selected={s.id === selectedId}
          onClick={() => setSelectedId(s.id)}
          onDoubleClick={() => setOpened(s.name)}
        />
      ))}
      <Text className="story-label">{opened ? `Opened ${opened}` : 'Click to select, double-click to open'}</Text>
    </Box>
  );
};

const ARGS: Partial<RowArgs> = { name: 'Friday async', meta: '8 players, eu-west-2', aside: '2 days ago', withIcon: true, selected: false, withAction: true };

const ARG_TYPES: StoryLiteArgTypes<RowArgs> = {
    name: { control: 'text' },
    meta: { control: 'text' },
    aside: { control: 'text' },
    withIcon: { control: 'boolean' },
    selected: { control: 'boolean' },
    withAction: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/ListItemRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ListItemRow
      name={args.name}
      meta={args.meta || undefined}
      aside={args.aside || undefined}
      icon={args.withIcon ? sessionIcon : undefined}
      selected={args.selected}
      action={args.withAction ? <Button size="sm" variant="secondary">Join</Button> : undefined}
    />
  ),
} satisfies StoryLiteStoryDefinition<RowArgs>;

const FORMS = ['name only', 'icon and meta', 'with aside', 'with action'] as const;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <LabelledRows
      items={FORMS}
      render={(form) => (
        <ListItemRow
          name="Friday async"
          meta={form === 'name only' ? undefined : '8 players, eu-west-2'}
          icon={form === 'name only' ? undefined : sessionIcon}
          aside={form === 'with aside' ? '2 days ago' : undefined}
          action={form === 'with action' ? <Button size="sm" variant="secondary">Join</Button> : undefined}
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<RowArgs>;

const Selectable = {
  name: 'Selectable list',
  render: () => <SelectableList />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const RichContent = {
  name: 'Rich name and meta',
  render: () => (
    <Box className="story-column">
      {SESSIONS.map((s) => (
        <ListItemRow
          key={s.id}
          icon={sessionIcon}
          name={s.name}
          meta={<Badge variant={s.status === 'running' ? 'success' : 'neutral'}>{STATUS_LABEL[s.status]}</Badge>}
          action={<Button size="sm" variant="ghost">Details</Button>}
        />
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<RowArgs>;

const renderState = (props: StateProps) => (
  <ListItemRow
    name="Friday async"
    meta="8 players, eu-west-2"
    icon={sessionIcon}
    action={<Button size="sm" variant="secondary">Join</Button>}
    onClick={() => undefined}
    {...props}
  />
);

const Overview = overviewStory({
  component: 'ListItemRow',
  description: 'One row of a list: an optional icon, a name, a line of meta under it, a short aside such as a date at the right, and an action slot on the right that shows on hover. Reach for it for lists of records the user picks from, such as sessions or players. It takes a selected state, plus click and double-click handlers for selecting and opening. The name and meta take any content, such as a status badge.',
  playground: Playground,
  variants: [AllVariants],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.list-item-row__main' },
      STATE.selected,
    ],
  },
});

export default meta;
export { AllVariants, Overview, Playground, RichContent, Selectable };
