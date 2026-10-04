/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ActionTile } from '../../src/composites';
import type { ActionTileAction, ActionTileSize } from '../../src/composites';
import type { StatusTone } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ActionTileBoard } from './_samples/ActionTileBoard';
import './ActionTile.stories.css';

type ActionKind = 'none' | 'run' | 'copy' | 'danger';

type ActionTileArgs = {
  label: string;
  value: string;
  unit: string;
  meta: string;
  status: StatusTone | 'none';
  tone: StatusTone | 'none';
  action: ActionKind;
  folder: boolean;
  open: boolean;
  size: ActionTileSize;
};

const TONES: readonly (StatusTone | 'none')[] = ['none', 'success', 'warning', 'danger', 'info'];

const noop = () => undefined;

const ACTIONS: Readonly<Record<Exclude<ActionKind, 'none'>, ActionTileAction>> = {
  run: { label: 'Clean old runs', icon: 'trash-2', onSelect: noop },
  copy: { label: 'Copy size', copy: '1.6 GB' },
  danger: { label: 'Stop', icon: 'square', variant: 'danger', onSelect: noop },
};

const ARGS: Partial<ActionTileArgs> = {
  label: 'Session runs', value: '1.6 GB', unit: '', meta: '14 runs, oldest 3 months ago', status: 'none', tone: 'none', action: 'run', folder: true, open: false, size: 'md',
};

const ARG_TYPES: PlaygroundArgTypes<ActionTileArgs> = {
  label: { group: 'Content', control: 'text' },
  value: { group: 'Content', control: 'text' },
  unit: { group: 'Content', control: 'text', description: 'A short word after the value. Empty hides it.' },
  meta: { group: 'Content', control: 'text', description: 'A quiet line under the value. Empty hides it.' },
  status: { group: 'Value', control: 'select', options: [...TONES], description: 'A status word beside the label, in this tone.' },
  tone: { group: 'Value', control: 'select', options: [...TONES], description: 'Colours the value, for a reading in alarm.' },
  action: { group: 'Behaviour', control: 'select', options: ['none', 'run', 'copy', 'danger'], description: 'The one button at the foot of the tile.' },
  folder: { group: 'Behaviour', control: 'boolean', description: 'An open folder tool in the top corner.' },
  open: { group: 'Behaviour', control: 'boolean', description: 'onOpen: a chevron in the top corner that leads to the full view.' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
};

const meta = {
  title: 'Composites · Content/ActionTile',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ActionTileArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ActionTile
      className="action-tile-story__one"
      label={args.label}
      icon="history"
      value={args.value}
      unit={args.unit || undefined}
      meta={args.meta || undefined}
      status={args.status === 'none' ? undefined : { label: args.status, tone: args.status }}
      tone={args.tone === 'none' ? undefined : args.tone}
      action={args.action === 'none' ? undefined : ACTIONS[args.action]}
      tools={args.folder ? [{ label: 'Open the runs folder', icon: 'folder-open', onSelect: noop }] : undefined}
      onOpen={args.open ? noop : undefined}
      size={args.size}
    />
  ),
} satisfies PlaygroundStory<ActionTileArgs>;

const Session = {
  name: 'Session tiles',
  render: () => <ActionTileBoard set="session" />,
} satisfies StoryLiteStoryDefinition<ActionTileArgs>;

const Storage = {
  name: 'Storage domains',
  render: () => <ActionTileBoard set="storage" />,
} satisfies StoryLiteStoryDefinition<ActionTileArgs>;

const Small = {
  name: 'Small tiles',
  render: () => <ActionTileBoard set="small" />,
} satisfies StoryLiteStoryDefinition<ActionTileArgs>;

const renderState = (props: StateProps) => (
  <ActionTile
    className="action-tile-story__one"
    label="Engine"
    icon="cpu"
    value="288 MB"
    meta="Archipelago 0.6.7"
    status={props.failing === true ? { label: 'failing', tone: 'danger' } : { label: 'ready', tone: 'success' }}
    tone={props.failing === true ? 'danger' : undefined}
    action={{ label: 'Rebuild engine', icon: 'refresh-cw', onSelect: noop, disabled: props.disabled === true }}
  />
);

const CODE = `import { ActionTile } from '@drizztdourden08/tessera';

<ActionTile
  label="Players"
  icon="users"
  value="2 / 3"
  unit="connected"
  meta="Cleo is offline"
  onOpen={() => showWidget('players')}
  openLabel="Show the Players widget"
/>
<ActionTile label="Address" icon="link" value={address} action={{ label: 'Copy address', copy: address }} />
<ActionTile
  label="Session runs"
  icon="history"
  value="1.6 GB"
  tools={[{ label: 'Open the runs folder', icon: 'folder-open', onSelect: openRunsFolder }]}
  action={{ label: 'Clean old runs', icon: 'trash-2', onSelect: cleanOldRuns }}
/>`;

const Overview = overviewStory({
  component: 'ActionTile',
  description: 'A tile with one headline value that also does one thing: a button, a copy, or a way to the full view.',
  points: [
    '`label`, `value`, `unit` and `meta` set the reading; `status` adds a toned word beside the label.',
    '`action` is one button at the foot; give it `copy` in place of `onSelect` and it copies, with a check.',
    '`tools` puts small icon buttons in the top corner, such as open the folder or copy the path.',
    '`onOpen` adds a chevron that leads to the full view, such as the widget the tile sums up.',
    'Tiles fill their grid cell and keep the action at the foot, so a row of tiles lines up.',
  ],
  instead: '[StatTile] for a reading with no action, with its trend, its change and a small chart.',
  playground: Playground,
  variants: [Session, Storage, Small],
  states: {
    render: renderState,
    list: [
      { name: 'ready', props: {} },
      { name: 'failing', props: { failing: true } },
      { name: 'action disabled', props: { disabled: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Overview, Playground, Session, Small, Storage };
