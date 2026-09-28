/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ConfirmIconButton, ListItemRow } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { NAV_ICONS } from './_samples/nav';
import { SESSIONS } from './_samples/sessions';
import type { SampleSession } from './_samples/sessions';

type ConfirmArgs = {
  label: string;
  confirmLabel: string;
  cancelLabel: string;
  disabled: boolean;
};

const trash = <Icon name={NAV_ICONS.trash} size={14} />;

const CountingDemo = (props: ConfirmArgs) => {
  const [count, setCount] = useState(0);
  return (
    <Box className="story-row">
      <ConfirmIconButton {...props} icon={trash} onConfirm={() => setCount(count + 1)} />
      <Text className="story-label">Confirmed {count} times</Text>
    </Box>
  );
};

const RowsDemo = (props: ConfirmArgs) => {
  const [rows, setRows] = useState<readonly SampleSession[]>(SESSIONS);
  return (
    <Box className="story-column">
      {rows.map((session) => (
        <ListItemRow
          key={session.id}
          name={session.name}
          meta={`${session.players} players, ${session.server}`}
          action={(
            <ConfirmIconButton
              {...props}
              icon={trash}
              label={`Remove ${session.name}`}
              onConfirm={() => setRows(rows.filter((row) => row.id !== session.id))}
            />
          )}
        />
      ))}
      {rows.length === 0 && <Text className="story-label">Every session removed. Reload the story to start over.</Text>}
    </Box>
  );
};

const ARGS: Partial<ConfirmArgs> = { label: 'Remove session', confirmLabel: 'Yes, remove it', cancelLabel: 'Keep it', disabled: false };

const ARG_TYPES: StoryLiteArgTypes<ConfirmArgs> = {
    label: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Dialogs/ConfirmIconButton',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ConfirmArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ConfirmIconButton
      label={args.label}
      confirmLabel={args.confirmLabel}
      cancelLabel={args.cancelLabel}
      disabled={args.disabled}
      icon={trash}
      onConfirm={() => undefined}
    />
  ),
} satisfies StoryLiteStoryDefinition<ConfirmArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Box className="story-row">
      <Box className="story-column">
        <Text className="story-label">Resting</Text>
        <CountingDemo label="Remove session" confirmLabel="Yes, remove it" cancelLabel="Keep it" disabled={false} />
      </Box>
      <Box className="story-column">
        <Text className="story-label">Disabled</Text>
        <CountingDemo label="Cannot remove a running session" confirmLabel="Yes, remove it" cancelLabel="Keep it" disabled />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ConfirmArgs>;

const InListRows = {
  name: 'In list rows',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RowsDemo {...args} />,
} satisfies StoryLiteStoryDefinition<ConfirmArgs>;

const Disabled = {
  name: 'Disabled',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <CountingDemo {...args} label="Cannot remove a running session" disabled />,
} satisfies StoryLiteStoryDefinition<ConfirmArgs>;

const Overview = overviewStory({
  component: 'ConfirmIconButton',
  description: 'An icon action that asks before it runs. Reach for it on a row action that cannot be undone, such as removing an entry, where a dialog over the page would be too much. At rest it is one glyph; pressing it swaps in a red cancel and a green confirm, with focus on cancel. Escape backs out, and disabling it drops a pending question.',
  playground: Playground,
  variants: [AllVariants],
});

export default meta;
export { AllVariants, Disabled, InListRows, Overview, Playground };
