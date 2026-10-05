/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ActionBar, ListItemRow } from '../../src/composites';
import type { ActionBarAlign, ActionItem } from '../../src/composites';
import { Box } from '../../src/primitives';
import type { ButtonSize } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { PRESET_ACTIONS, RUN_ACTIONS, TEMPLATE_ACTIONS } from './_samples/action-bar-samples.constants';
import { ActionBarDemo } from './_samples/ActionBarDemo';
import './ActionBar.stories.css';

type ActionBarArgs = {
  width: string;
  size: ButtonSize;
  keep: number;
  align: ActionBarAlign;
  danger: boolean;
  primary: boolean;
};

const ARGS: Partial<ActionBarArgs> = { width: '480', size: 'md', keep: -1, align: 'start', danger: true, primary: true };

const ARG_TYPES: PlaygroundArgTypes<ActionBarArgs> = {
  danger: { group: 'Content', control: 'boolean', description: 'Adds Delete, a danger action that asks first.' },
  primary: { group: 'Content', control: 'boolean', description: 'Adds Save, the primary action that never folds.' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
  width: { group: 'Layout', control: 'select', options: ['320', '480', '640', '896'], description: 'The width of the box around the bar, in pixels.' },
  align: { group: 'Layout', control: 'select', options: ['start', 'end'] },
  keep: { group: 'Behaviour', control: 'number', min: -1, max: 6, description: 'The most actions shown before More; -1 shows as many as fit.' },
};

const meta = {
  title: 'Composites · Actions/ActionBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ActionBarArgs>;

const pick = (args: ActionBarArgs): ActionItem[] => PRESET_ACTIONS.filter((action) => (
  (args.danger || action.kind !== 'danger') && (args.primary || action.kind !== 'primary')
));

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="action-bar-story-box" data-width={args.width}>
      <ActionBar actions={pick(args)} size={args.size} align={args.align} keep={args.keep < 0 ? undefined : args.keep} label="Keysanity" />
    </Box>
  ),
} satisfies PlaygroundStory<ActionBarArgs>;

const Narrow = {
  name: 'A header 480 px wide',
  render: () => <Box className="action-bar-story"><ActionBar actions={PRESET_ACTIONS} label="Keysanity" /></Box>,
} satisfies StoryLiteStoryDefinition<ActionBarArgs>;

const Rows = {
  name: 'List rows, one line at any width',
  render: () => (
    <Box className="action-bar-story--rows">
      <ListItemRow
        name="Friday run"
        meta="Timespinner, A Link to the Past, Hollow Knight · 3 players"
        action={<ActionBar size="sm" keep={1} align="end" actions={TEMPLATE_ACTIONS} label="Friday run" />}
      />
      <ListItemRow
        name="Friday run"
        meta="2 hours ago · This computer · stopped"
        action={<ActionBar size="sm" keep={1} align="end" actions={RUN_ACTIONS} label="Friday run" />}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ActionBarArgs>;

const Wide = {
  name: 'Room for every action',
  render: () => <Box className="action-bar-story--wide"><ActionBar actions={PRESET_ACTIONS} label="Keysanity" /></Box>,
} satisfies StoryLiteStoryDefinition<ActionBarArgs>;

const Asks = {
  name: 'Delete asks first',
  render: () => <ActionBarDemo />,
} satisfies StoryLiteStoryDefinition<ActionBarArgs>;

const SAVE_OFF = PRESET_ACTIONS.map((action) => (action.kind === 'primary' ? { ...action, disabled: true } : action));

const CODE = `import { ActionBar } from '@drizztdourden08/tessera';

<ActionBar
  label="Keysanity"
  actions={[
    { id: 'reset', label: 'Reset all', icon: 'rotate-ccw', onSelect: resetAll },
    { id: 'duplicate', label: 'Duplicate', icon: 'copy', onSelect: duplicate },
    { id: 'delete', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: remove },
    { id: 'save', label: 'Save', icon: 'save', kind: 'primary', onSelect: save },
  ]}
/>`;

const Overview = overviewStory({
  component: 'ActionBar',
  description: 'The actions on one item in a single row, with the ones that do not fit folded into a More menu.',
  points: [
    '`actions` keep their order; a `primary` action sits last and never folds.',
    'When the row runs out of width, the last actions move into More, a [DropdownMenu] under the bar.',
    'More takes the height, look and icon size of the buttons beside it, at `sm` and at `md`.',
    '`keep` caps how many actions show before More, such as one in a list row.',
    'A `danger` action takes the danger look and always asks first, in place, with a green check and a cross.',
    '`confirm` sets the question and the name of the check, and makes any other action ask too.',
  ],
  instead: '[ConfirmIconButton] for one icon action that asks, or [ButtonRow] for buttons that never fold.',
  playground: Playground,
  variants: [Narrow, Rows, Wide, Asks],
  states: {
    render: (props: StateProps) => <Box className="action-bar-story--wide"><ActionBar actions={PRESET_ACTIONS} label="Keysanity" {...props} /></Box>,
    list: [
      { name: 'Idle', props: {} },
      { name: 'Folded', props: { keep: 1 } },
      { name: 'Save off', props: { actions: SAVE_OFF } },
    ],
  },
  code: CODE,
});

export default meta;
export { Asks, Narrow, Overview, Playground, Rows, Wide };
