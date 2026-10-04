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

type FilterBarArgs = Omit<FilterDemoProps, 'startWith'>;

const ARGS: Partial<FilterBarArgs> = { withClauses: true, placeholder: 'Search players, games, tags...' };

const ARG_TYPES: PlaygroundArgTypes<FilterBarArgs> = {
    placeholder: { group: 'Content', control: 'text' },
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
  render: (args) => <FilterDemo withClauses={args.withClauses === true} placeholder={args.placeholder} />,
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
  description: 'The filter surface for a list of rows: a search box, then one chip per filter, then a + button that adds one. The + opens a menu of the fields in the schema; picking one adds a chip and opens its value. A chip reads like a sentence, such as Checks done is at least 100: its field turns it on and off, its operator opens the operator menu, its value opens an editor that suits the field, and the cross removes it. Reach for it above any table or list the user narrows down. It holds no filter logic: it reports the query and the clauses, and compile turns the clauses into a test for each row.',
  playground: Playground,
  variants: [SearchOnly, Empty, EveryKind],
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
export { Empty, EveryKind, Overview, Playground, SearchOnly };
