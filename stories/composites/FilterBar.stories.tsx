/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FilterBar } from '../../src/composites';
import { createClause } from '../../src/data';
import type { FilterClause } from '../../src/data';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { FilterDemo } from './_samples/data-filter-demo';
import type { FilterDemoProps } from './_samples/data-filter-demo';
import { PLAYER_SCHEMA } from './_samples/data-players';
import './FilterBar.stories.css';

type FilterBarArgs = Omit<FilterDemoProps, 'startWith' | 'parseToken'>;

const ARGS: Partial<FilterBarArgs> = { withClauses: true, placeholder: 'Search players, games, tags...', maxChips: undefined };

const ARG_TYPES: PlaygroundArgTypes<FilterBarArgs> = {
    placeholder: { group: 'Content', control: 'text' },
    maxChips: { group: 'Behaviour', control: 'range', min: 0, max: 5, step: 1, description: 'Chips past this count fold into a +N menu.' },
    withClauses: { group: 'Behaviour', control: 'boolean', description: 'Pass a schema so filters can be added with +' },
  };

const meta = {
  title: 'Composites · Data views/FilterBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FilterBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <FilterDemo withClauses={args.withClauses === true} placeholder={args.placeholder} maxChips={args.maxChips} />,
} satisfies PlaygroundStory<FilterBarArgs>;

const SearchOnly = {
  name: 'Search only',
  render: () => <FilterDemo withClauses={false} placeholder="Search players, games, tags..." />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const NO_CLAUSES: readonly FilterClause[] = [];

const Empty = {
  name: 'No filters yet',
  render: () => <FilterDemo withClauses placeholder="Search players..." startWith={NO_CLAUSES} />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const EVERY_KIND: readonly FilterClause[] = [
  createClause('name', 'startsWith', 'S'),
  createClause('game', 'noneOf', ['Factorio', 'Celeste', 'Terraria']),
  createClause('checked', 'between', [100, 250]),
  createClause('deathLink', 'isTrue'),
  createClause('tags', 'isEmpty'),
];

const EveryKind = {
  name: 'One filter per kind',
  render: () => <FilterDemo withClauses placeholder="Search players..." startWith={EVERY_KIND} />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const FoldedChips = {
  name: 'maxChips: the chips past the count fold into a +N menu where each one can be removed',
  render: () => <FilterDemo withClauses placeholder="Search players..." startWith={EVERY_KIND} maxChips={2} />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const TypedTokens = {
  name: 'parseToken: type status:playing or checked:100 and a space, the token becomes a chip',
  render: () => <FilterDemo withClauses parseToken placeholder="Try status:playing or deathLink:yes" startWith={NO_CLAUSES} />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const ON_CLAUSES: readonly FilterClause[] = [createClause('status', 'anyOf', ['playing']), createClause('checked', 'gte', 100)];
const OFF_CLAUSES: readonly FilterClause[] = ON_CLAUSES.map((clause) => ({ ...clause, enabled: false }));

const renderState = (props: StateProps) => (
  <Box className="filter-bar-story">
    <FilterBar
      search=""
      onSearchChange={() => undefined}
      searchLabel="Search players"
      schema={PLAYER_SCHEMA}
      clauses={props.disabled === true ? OFF_CLAUSES : ON_CLAUSES}
      onChange={() => undefined}
    />
  </Box>
);

const CODE = `import { FilterBar, compile } from '@drizztdourden08/tessera';
import type { FilterClause } from '@drizztdourden08/tessera';

const [search, setSearch] = useState('');
const [clauses, setClauses] = useState<readonly FilterClause[]>([]);
const rows = players.filter(compile(clauses, PLAYER_SCHEMA));

<FilterBar
  search={search}
  onSearchChange={setSearch}
  schema={PLAYER_SCHEMA}
  clauses={clauses}
  onChange={setClauses}
/>`;

const Overview = overviewStory({
  component: 'FilterBar',
  description: 'A search box and filter chips above a table or list, so the user can narrow down its rows.',
  points: [
    '`search` and `onSearchChange` drive the box; a `schema` adds the filter chips.',
    'The + button lists the schema fields; picking one adds a chip and opens its value.',
    'A chip reads like a sentence: click its field to turn it off, or its operator or value to change them.',
    '`fields` limits which fields the + button offers; `maxChips` folds the rest into a +N menu.',
    '`parseToken` turns a typed `key:value` word into a chip; pass a function to read your own tokens.',
    '**It filters nothing itself:** `onChange` reports the `clauses`, and `compile` turns them into a row test.',
  ],
  playground: Playground,
  variants: [SearchOnly, Empty, EveryKind, FoldedChips, TypedTokens],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.filter-chip__value' },
      { ...STATE.focus, target: '.filter-chip__operator' },
      { ...STATE.disabled, name: 'Filter off' },
    ],
  },
  code: CODE,
});

export default meta;
export { Empty, EveryKind, FoldedChips, Overview, Playground, SearchOnly, TypedTokens };
