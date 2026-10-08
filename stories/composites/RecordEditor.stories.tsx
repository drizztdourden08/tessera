/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { RecordEditor } from '../../src/composites';
import { buildSchema } from '../../src/data';
import type { SchemaConfig } from '../../src/data';
import { Box, Text } from '../../src/primitives';
import type { ControlSize } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { sizesStory } from '../_template/sizes-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { NarrowedReference } from './_samples/NarrowedReference';
import { PLAYERS, PLAYER_CONFIG, PLAYER_SCHEMA } from './_samples/data-players';
import type { PlayerRow } from './_samples/data-players';
import {
  createTag, hintsFor, pretendSave, resolvePlayerBounds, resolvePlayerOptions, resolveTags,
} from './_samples/data-editor';
import { SIZE_ARG } from '../_template/control-sizes.constants';

type RecordEditorArgs = {
  slot: string;
  readOnly: boolean;
  disabled: boolean;
  showReferencedBy: boolean;
  markServerChanges: boolean;
  failSave: boolean;
  size: ControlSize;
};

const SLOTS = PLAYERS.map((player) => player.id);
const SERVER_CHANGES: readonly string[] = ['checked', 'connection.ping'];

const EditorDemo = (args: RecordEditorArgs) => {
  const { slot, readOnly, disabled, showReferencedBy, markServerChanges, failSave, size } = args;
  const [records, setRecords] = useState<readonly PlayerRow[]>(PLAYERS);
  const [message, setMessage] = useState('No changes saved yet.');
  const record = records.find((player) => player.id === slot) ?? records[0];

  const handleSave = async (next: PlayerRow) => {
    await pretendSave(600);
    if (failSave) throw new Error('The server refused the update: slot is locked while the host is saving.');
    setRecords((prev) => prev.map((player) => (player.id === next.id ? next : player)));
    setMessage(`Saved ${next.name} at ${new Date().toLocaleTimeString()}.`);
  };

  if (!record) return null;

  return (
    <Box className="story-column">
      <Text className="story-label">{message}</Text>
      <RecordEditor
        key={record.id}
        record={record}
        schema={PLAYER_SCHEMA}
        config={PLAYER_CONFIG}
        onSave={readOnly ? undefined : handleSave}
        disabled={disabled}
        changedPaths={markServerChanges ? SERVER_CHANGES : undefined}
        resolveIdRefOptions={resolvePlayerOptions}
        resolveTagSuggestions={resolveTags}
        onCreateTag={createTag}
        resolveNumberBounds={resolvePlayerBounds}
        referencedBy={showReferencedBy ? hintsFor(record.id) : undefined}
        size={size}
      />
    </Box>
  );
};

const ARGS: Partial<RecordEditorArgs> = {
    slot: 'slot-1', readOnly: false, disabled: false, showReferencedBy: true, markServerChanges: false, failSave: false, size: 'md',
  };

const ARG_TYPES: PlaygroundArgTypes<RecordEditorArgs> = {
    slot: { group: 'Content', control: 'select', options: SLOTS },
    showReferencedBy: { group: 'Appearance', control: 'boolean', description: 'List the hints that point at this slot' },
    readOnly: { group: 'State', control: 'boolean', description: 'Omit onSave: every control renders disabled, no footer' },
    disabled: { group: 'State', control: 'boolean' },
    markServerChanges: { group: 'Behaviour', control: 'boolean', description: 'Mark fields the server changed before any edit here' },
    failSave: { group: 'Behaviour', control: 'boolean', description: 'Make the next save reject, to see the error line' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Composites · Forms/RecordEditor',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RecordEditorArgs>;

const Playground = {
  name: 'Edit a player slot',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <EditorDemo {...args} />,
} satisfies PlaygroundStory<RecordEditorArgs>;

const STATE_PATHS: string[] = ['status', 'checked', 'total'];
const STATE_SCHEMA = PLAYER_SCHEMA.filter((field) => STATE_PATHS.includes(field.path));
const STATE_CONFIG: SchemaConfig = { groups: [{ id: 'progress', label: 'Progress', paths: STATE_PATHS }] };
const CHANGED_ELSEWHERE: readonly string[] = ['checked'];
const saveNothing = () => Promise.resolve();

const SIZE_PATHS: string[] = ['name', 'game', 'tags', 'checked'];
const SIZE_SCHEMA = PLAYER_SCHEMA.filter((field) => SIZE_PATHS.includes(field.path));
const SIZE_CONFIG: SchemaConfig = { groups: [{ id: 'player', label: 'Player', paths: SIZE_PATHS }] };
const SIZE_CHANGES: readonly string[] = ['name', 'game', 'checked'];

const Sizes = sizesStory<RecordEditorArgs>((size) => (
  <RecordEditor
    record={PLAYERS[0]}
    schema={SIZE_SCHEMA}
    config={SIZE_CONFIG}
    onSave={saveNothing}
    changedPaths={SIZE_CHANGES}
    resolveTagSuggestions={resolveTags}
    size={size}
  />
), { align: 'stretch' });

const ROOM = { flags: 260, door: 9, music: 17 };
const ROOM_CONFIG: SchemaConfig = {
  formats: { flags: 'hex4', door: 'hex2' },
  groups: [{ id: 'room', label: 'Room', paths: ['flags', 'door', 'music'] }],
};
const ROOM_SCHEMA = buildSchema([ROOM], ROOM_CONFIG);

const HexNumbers = {
  name: 'Hex numbers',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">flags and door are formatted hex4 and hex2: the hint shows the hex text of the decimal value</Text>
      <RecordEditor record={ROOM} schema={ROOM_SCHEMA} config={ROOM_CONFIG} onSave={saveNothing} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<RecordEditorArgs>;

const Narrowed = {
  name: 'A reference narrowed by a sibling field',
  render: () => <NarrowedReference />,
} satisfies StoryLiteStoryDefinition<RecordEditorArgs>;

const renderState = (props: StateProps) => (
  <RecordEditor
    record={PLAYERS[0]}
    schema={STATE_SCHEMA}
    config={STATE_CONFIG}
    onSave={props.readOnly === true ? undefined : saveNothing}
    disabled={props.disabled === true}
    changedPaths={props.changed === true ? CHANGED_ELSEWHERE : undefined}
  />
);

const CODE = `import { RecordEditor } from '@drizztdourden08/tessera';

<RecordEditor
  record={player}
  schema={PLAYER_SCHEMA}
  config={PLAYER_CONFIG}
  onSave={(next) => savePlayer(next)}
/>`;

const Overview = overviewStory({
  component: 'RecordEditor',
  description: 'A form for one record, built from its schema, to edit or inspect anything the app stores, such as a player slot.',
  points: [
    'Give it a `record` and a `schema`; the layout comes from the fields.',
    'With `onSave` it marks changed fields and offers Save and Revert; a failed save shows its error.',
    '**Without `onSave` it is read only:** every control is disabled and there is no footer.',
    '`changedPaths` marks fields another source changed; `referencedBy` lists what points at the record.',
    'The resolvers make reference fields pickers; the options resolver gets the form, so a pick can narrow another.',
    'Without `size`, it follows the size of the [Field] around it.',
  ],
  instead: '[CreateRecordDialog] to add a new record.',
  playground: Playground,
  variants: [Sizes, HexNumbers, Narrowed],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Changed elsewhere', props: { changed: true } },
      STATE.readOnly,
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { HexNumbers, Narrowed, Overview, Playground, Sizes };
