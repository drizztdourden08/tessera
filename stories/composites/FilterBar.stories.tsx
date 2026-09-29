/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { FacetPicker, FilterBar } from '../../src/composites';
import { createClause } from '../../src/data';
import type { FilterClause } from '../../src/data';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { FilterDemo } from './_samples/data-filter-demo';
import type { FilterDemoProps } from './_samples/data-filter-demo';
import { PLAYER_SCHEMA } from './_samples/data-players';

type FilterBarArgs = FilterDemoProps;

const CHANNELS = [
  { id: 'chat', label: 'Chat' },
  { id: 'items', label: 'Item sends' },
  { id: 'hints', label: 'Hints' },
  { id: 'joins', label: 'Joins and leaves' },
];

const FacetDemo = () => {
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set(['joins']));
  const onToggle = (id: string) => setHidden((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  const visible = CHANNELS.filter((channel) => !hidden.has(channel.id)).map((channel) => channel.label);
  return (
    <Box className="story-row">
      <FacetPicker facet={{ id: 'channels', label: 'Show channels', options: CHANNELS, hidden, onToggle }} />
      <Text className="story-label">{`Showing: ${visible.join(', ') || 'nothing'}`}</Text>
    </Box>
  );
};

const ARGS: Partial<FilterBarArgs> = { withClauses: true, withFacets: true, placeholder: 'Search players, games, tags...' };

const ARG_TYPES: StoryLiteArgTypes<FilterBarArgs> = {
    withClauses: { control: 'boolean', description: 'Schema-driven clause list' },
    withFacets: { control: 'boolean', description: 'Enumerated show and hide facets' },
    placeholder: { control: 'text' },
  };

const meta = {
  title: 'Composites · Data views/FilterBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FilterBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <FilterDemo {...args} />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const SearchOnly = {
  name: 'Search only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <FilterDemo withClauses={false} withFacets={false} placeholder={args.placeholder} />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const Facet = {
  name: 'FacetPicker',
  render: () => <FacetDemo />,
} satisfies StoryLiteStoryDefinition<FilterBarArgs>;

const ON_CLAUSES: readonly FilterClause[] = [createClause('checked', 'gte', 100)];
const OFF_CLAUSES: readonly FilterClause[] = ON_CLAUSES.map((clause) => ({ ...clause, enabled: false }));

const renderState = (props: StateProps) => (
  <FilterBar
    search=""
    onSearchChange={() => undefined}
    searchLabel="Search players"
    schema={PLAYER_SCHEMA}
    clauses={props.disabled === true ? OFF_CLAUSES : ON_CLAUSES}
    onChange={() => undefined}
  />
);

const CODE = `import { FilterBar } from '@drizztdourden08/tessera';
import type { FilterClause } from '@drizztdourden08/tessera';

const [search, setSearch] = useState('');
const [clauses, setClauses] = useState<readonly FilterClause[]>([]);

<FilterBar
  search={search}
  onSearchChange={setSearch}
  schema={PLAYER_SCHEMA}
  clauses={clauses}
  onChange={setClauses}
/>`;

const Overview = overviewStory({
  component: 'FilterBar',
  description: 'The filter surface for a list of rows: a search box that is always there, an optional list of schema-driven clauses, and optional show and hide facets. Reach for it above any table or list the user narrows down. It holds no filter logic: it reports the query, the clauses and each facet toggle, and the screen that renders the rows applies them. FacetPicker, the facet dropdown, also works on its own.',
  playground: Playground,
  variants: [SearchOnly, Facet],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.filter-bar__clause' },
      { ...STATE.focus, target: '.filter-bar__control input' },
      { ...STATE.disabled, name: 'Clause off' },
    ],
  },
  code: CODE,
});

export default meta;
export { Facet, Overview, Playground, SearchOnly };
