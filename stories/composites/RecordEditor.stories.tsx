/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { RecordEditor } from '../../src/composites';
import type { SchemaConfig } from '../../src/data';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { PLAYERS, PLAYER_CONFIG, PLAYER_SCHEMA } from './_samples/data-players';
import type { PlayerRow } from './_samples/data-players';
import {
  createTag, hintsFor, pretendSave, resolvePlayerBounds, resolvePlayerOptions, resolveTags,
} from './_samples/data-editor';

type RecordEditorArgs = {
  slot: string;
  readOnly: boolean;
  disabled: boolean;
  showReferencedBy: boolean;
  markServerChanges: boolean;
  failSave: boolean;
};

const SLOTS = PLAYERS.map((player) => player.id);
const SERVER_CHANGES: readonly string[] = ['checked', 'connection.ping'];

const EditorDemo = (args: RecordEditorArgs) => {
  const { slot, readOnly, disabled, showReferencedBy, markServerChanges, failSave } = args;
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
      />
    </Box>
  );
};

const ARGS: Partial<RecordEditorArgs> = {
    slot: 'slot-1', readOnly: false, disabled: false, showReferencedBy: true, markServerChanges: false, failSave: false,
  };

const ARG_TYPES: StoryLiteArgTypes<RecordEditorArgs> = {
    slot: { control: 'select', options: SLOTS },
    readOnly: { control: 'boolean', description: 'Omit onSave: every control renders disabled, no footer' },
    disabled: { control: 'boolean' },
    showReferencedBy: { control: 'boolean', description: 'List the hints that point at this slot' },
    markServerChanges: { control: 'boolean', description: 'Mark fields the server changed before any edit here' },
    failSave: { control: 'boolean', description: 'Make the next save reject, to see the error line' },
  };

const meta = {
  title: 'Composites · Data views/RecordEditor',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RecordEditorArgs>;

const Playground = {
  name: 'Edit a player slot',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <EditorDemo {...args} />,
} satisfies StoryLiteStoryDefinition<RecordEditorArgs>;

const STATE_PATHS: string[] = ['status', 'checked', 'total'];
const STATE_SCHEMA = PLAYER_SCHEMA.filter((field) => STATE_PATHS.includes(field.path));
const STATE_CONFIG: SchemaConfig = { groups: [{ id: 'progress', label: 'Progress', paths: STATE_PATHS }] };
const CHANGED_ELSEWHERE: readonly string[] = ['checked'];
const saveNothing = () => Promise.resolve();

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
  description: 'A form built from a schema for one record, with the layout worked out from the fields. Reach for it to edit or inspect any record the app stores, such as a player slot. With onSave it tracks edits, marks dirty fields and offers Save and Revert, and a failed save shows its error; without onSave every control renders disabled and there is no footer. Given the lookups, it also marks fields another source changed, lists what still points at the record, and turns reference fields into searchable pickers.',
  playground: Playground,
  variants: [],
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
export { Overview, Playground };
