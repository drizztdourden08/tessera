/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ConfirmIconButton, ListItemRow } from '../../src/composites';
import type { ConfirmIconButtonPlacement } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LogToolbarDemo, PresetCardDemo } from './_samples/ConfirmPlacementDemos';
import { NAV_ICONS } from './_samples/nav';
import { SESSIONS } from './_samples/sessions';
import type { SampleSession } from './_samples/sessions';
import './ConfirmIconButton.stories.css';

type ConfirmArgs = {
  label: string;
  confirmLabel: string;
  cancelLabel: string;
  placement: ConfirmIconButtonPlacement;
  disabled: boolean;
};

const trash = <Icon name={NAV_ICONS.trash} size={14} />;

const RowsDemo = (props: ConfirmArgs) => {
  const [rows, setRows] = useState<readonly SampleSession[]>(SESSIONS);
  return (
    <Box className="story-column">
      {rows.map((session) => (
        <ListItemRow
          key={session.id}
          name={session.name}
          meta={`${session.players} players, ${session.server}`}
          actionVisibility="always"
          action={(
            <ConfirmIconButton
              {...props}
              placement="end"
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

const ARGS: Partial<ConfirmArgs> = {
  label: 'Remove session', confirmLabel: 'Yes, remove it', cancelLabel: 'Keep it', placement: 'start', disabled: false,
};

const ARG_TYPES: PlaygroundArgTypes<ConfirmArgs> = {
  label: { group: 'Content', control: 'text' },
  confirmLabel: { group: 'Content', control: 'text' },
  cancelLabel: { group: 'Content', control: 'text' },
  placement: {
    group: 'Layout',
    control: 'select',
    options: ['start', 'center', 'end'],
    description: 'Which edge stays put when the question opens: the start, the centre or the end.',
  },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Actions/ConfirmIconButton',
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
      placement={args.placement}
      disabled={args.disabled}
      icon={trash}
      onConfirm={() => undefined}
    />
  ),
} satisfies PlaygroundStory<ConfirmArgs>;

const InListRows = {
  name: 'At the end of a list row',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RowsDemo {...args} />,
} satisfies PlaygroundStory<ConfirmArgs>;

const InToolbar = {
  name: 'At the start of a toolbar',
  render: () => <LogToolbarDemo />,
} satisfies StoryLiteStoryDefinition<ConfirmArgs>;

const InCardFooter = {
  name: 'In a centred card footer',
  render: () => <PresetCardDemo />,
} satisfies StoryLiteStoryDefinition<ConfirmArgs>;

const renderState = (props: StateProps) => (
  <ConfirmIconButton label="Remove session" confirmLabel="Yes, remove it" cancelLabel="Keep it" icon={trash} onConfirm={() => undefined} {...props} />
);

const Overview = overviewStory({
  component: 'ConfirmIconButton',
  description: 'An icon button that asks before it acts, for a row action that cannot be undone, such as removing an entry.',
  points: [
    'A press swaps the icon for a red cancel and a green confirm, with focus on cancel.',
    'Cancel takes the place of the icon, so a second click backs out, and so does [[Esc]].',
    '`placement` picks the edge that stays put: `start`, `center` or `end`.',
    'Disabling it drops a question that is waiting.',
  ],
  instead: '[Dialog] when the action needs a message to explain it.',
  playground: Playground,
  variants: [InListRows, InToolbar, InCardFooter],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Armed', props: { defaultArmed: true } },
      { name: 'Armed at the end', props: { defaultArmed: true, placement: 'end' } },
      { ...STATE.disabled, props: { disabled: true, label: 'Cannot remove a running session' } },
    ],
  },
});

export default meta;
export { InCardFooter, InListRows, InToolbar, Overview, Playground };
