/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { CompactRecordView } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { PLAYERS, PLAYER_CONFIG, PLAYER_SCHEMA } from './_samples/data-players';
import { HINTS, HINT_CONFIG, HINT_SCHEMA, resolveSlotDefault } from './_samples/data-hints';
import { overviewStory } from '../_template/overview-story';
import './CompactRecordView.stories.css';

type GroupChoice = 'everything' | 'progress only' | 'name and progress';

type CompactArgs = {
  slot: string;
  groups: GroupChoice;
  showLiveDiffs: boolean;
};

const SLOTS = PLAYERS.map((player) => player.id);

const GROUPS_BY_CHOICE: Record<GroupChoice, readonly string[] | undefined> = {
  everything: undefined,
  'progress only': ['progress'],
  'name and progress': ['name', 'game', 'progress'],
};

const LIVE_DIFFS = new Map([
  ['checked', { status: 'mismatch', shown: { dataset: '212', live: '219' }, source: 'tracker:locations' }],
  ['status', { status: 'mismatch', shown: { dataset: 'playing', live: 'idle' }, source: 'server:presence' }],
]);

const ARGS: Partial<CompactArgs> = { slot: 'slot-1', groups: 'everything', showLiveDiffs: false };

const ARG_TYPES: StoryLiteArgTypes<CompactArgs> = {
    slot: { control: 'select', options: SLOTS },
    groups: { control: 'select', options: ['everything', 'progress only', 'name and progress'], description: 'Allow-list of group ids or field paths' },
    showLiveDiffs: { control: 'boolean', description: 'Bracket the live value beside fields that disagree' },
  };

const meta = {
  title: 'Composites · Data views/CompactRecordView',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CompactArgs>;

const Player = {
  name: 'Player slot',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => {
    const record = PLAYERS.find((player) => player.id === args.slot) ?? PLAYERS[0];
    return (
      <Box className="compact-record-story">
        <CompactRecordView
          record={record}
          schema={PLAYER_SCHEMA}
          config={PLAYER_CONFIG}
          groups={GROUPS_BY_CHOICE[args.groups]}
          diffs={args.showLiveDiffs ? LIVE_DIFFS : undefined}
        />
      </Box>
    );
  },
} satisfies StoryLiteStoryDefinition<CompactArgs>;

const Hint = {
  name: 'Hint with references',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Finder and receiver resolve to player names</Text>
      <Box className="compact-record-story">
        <CompactRecordView
          record={HINTS[2]}
          schema={HINT_SCHEMA}
          config={HINT_CONFIG}
          resolveIdRefDisplay={resolveSlotDefault}
        />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CompactArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Box className="story-row">
      <Box className="story-column">
        <Text className="story-label">Every field</Text>
        <Box className="compact-record-story">
          <CompactRecordView record={PLAYERS[0]} schema={PLAYER_SCHEMA} config={PLAYER_CONFIG} />
        </Box>
      </Box>
      <Box className="story-column">
        <Text className="story-label">Progress only</Text>
        <Box className="compact-record-story">
          <CompactRecordView record={PLAYERS[0]} schema={PLAYER_SCHEMA} config={PLAYER_CONFIG} groups={GROUPS_BY_CHOICE['progress only']} />
        </Box>
      </Box>
      <Box className="story-column">
        <Text className="story-label">Live differences</Text>
        <Box className="compact-record-story">
          <CompactRecordView record={PLAYERS[0]} schema={PLAYER_SCHEMA} config={PLAYER_CONFIG} diffs={LIVE_DIFFS} />
        </Box>
      </Box>
      <Box className="story-column">
        <Text className="story-label">References resolved</Text>
        <Box className="compact-record-story">
          <CompactRecordView record={HINTS[2]} schema={HINT_SCHEMA} config={HINT_CONFIG} resolveIdRefDisplay={resolveSlotDefault} />
        </Box>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CompactArgs>;

const CODE = `import { CompactRecordView } from '@drizztdourden08/tessera';

<CompactRecordView
  record={player}
  schema={PLAYER_SCHEMA}
  config={PLAYER_CONFIG}
  groups={['progress']}
  diffs={liveDiffs}
/>`;

const Overview = overviewStory({
  component: 'CompactRecordView',
  description: 'A read-only property sheet for one record, one line per field, grouped from the schema the same way RecordEditor groups it. Built for a floating panel a few hundred pixels wide, where a summary fits and an editor does not. It can narrow to a list of groups or field paths, show a reference by its target\'s name, and bracket the live value beside a field that disagrees with it.',
  playground: Player,
  variants: [AllVariants],
  code: CODE,
});

export default meta;
export { AllVariants, Hint, Overview, Player };
