/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { EnginePlayground } from './_samples/engine-playground';
import type { EnginePlaygroundProps } from './_samples/engine-playground.type';
import { GROUPING_NAMES } from './_samples/engine-columns.constants';
import { SchemaDemo } from './_samples/schema-demo';
import { SpoilerExplorer } from './_samples/spoiler-explorer';
import { EngineFilterDemo } from './_samples/filter-demo';
import { StorageDemo } from './_samples/storage-demo';
import './DataEngine.stories.css';

type EngineArgs = EnginePlaygroundProps & { applyConfig: boolean };

const ARGS: Partial<EngineArgs> = {
  grouping: 'game', sortBy: 'sphere', descending: false, search: '', minSphere: 2, progressionOnly: false,
};

const SCHEMA_ARGS: Partial<EngineArgs> = { applyConfig: true };

const ARG_TYPES: PlaygroundArgTypes<EngineArgs> = {
    grouping: { group: 'Data', control: 'select', options: GROUPING_NAMES, description: 'groupBy, one level or two' },
    sortBy: { group: 'Data', control: 'select', options: ['none', 'name', 'game', 'sphere'], description: 'The sort entry' },
    descending: { group: 'Data', control: 'boolean', description: 'Sort direction' },
    search: { group: 'Data', control: 'text', description: 'Free text, compiled with compileTextSearch' },
    minSphere: { group: 'Data', control: 'number', description: 'Operand of the sphere is at least clause' },
    progressionOnly: { group: 'Data', control: 'boolean', description: 'Adds a progression is true clause' },
  };

const SCHEMA_ARG_TYPES: PlaygroundArgTypes<EngineArgs> = {
    applyConfig: { group: 'Data', control: 'boolean', description: 'Layer the SchemaConfig over the derived schema' },
  };

const meta = {
  title: 'Data/Engine',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<EngineArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <EnginePlayground {...args} />,
} satisfies PlaygroundStory<EngineArgs>;

const Explorer = {
  name: 'Example: a spoiler log explorer',
  render: () => <SpoilerExplorer />,
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const Schema = {
  name: 'buildSchema',
  args: SCHEMA_ARGS,
  argTypes: SCHEMA_ARG_TYPES,
  render: (args) => <SchemaDemo applyConfig={args.applyConfig === true} />,
} satisfies PlaygroundStory<EngineArgs>;

const Filters = {
  name: 'Filter clauses',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <EngineFilterDemo search={args.search} minSphere={args.minSphere} progressionOnly={args.progressionOnly === true} />
  ),
} satisfies PlaygroundStory<EngineArgs>;

const Storage = {
  name: 'ViewStorageProvider',
  render: () => <StorageDemo />,
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const CODE = `import { FilterBar, buildSchema, compile, compileTextSearch, useDataTable } from '@drizztdourden08/tessera';

const schema = buildSchema(locations);

const SpoilerLog = () => {
  const [search, setSearch] = useState('');
  const [clauses, setClauses] = useState<readonly FilterClause[]>([]);
  const text = compileTextSearch(search);
  const rows = locations.filter(compile(clauses, schema)).filter((row) => !text || text(row));
  const table = useDataTable({ rows, schema, initialGroupBy: ['game'] });

  // table.groupedRows holds the group headers and the rows, sorted and grouped.
  return (
    <>
      <FilterBar search={search} onSearchChange={setSearch} schema={schema} clauses={clauses} onChange={setClauses} />
      <LocationGrid nodes={table.groupedRows} onHeaderClick={table.setSingleSort} />
    </>
  );
};`;

const Overview = overviewStory({
  component: 'Data engine',
  importName: 'useDataTable',
  description: 'The logic under the data views, with no markup: describe the rows, filter them, then sort and group them for your own layout.',
  points: [
    '`buildSchema(rows)` reads the rows and describes every field.',
    '`compile` and `compileTextSearch` turn filter clauses and a search into a test for each row.',
    '`useDataTable` keeps the columns, sort and grouping, and returns `groupedRows` to draw with any markup.',
    'Rows sit one step in from their group, so a two-level grouping reads as a tree.',
    'The table state is plain data: a view key and `ViewStorageProvider` keep it between visits.',
  ],
  instead: '[DataTable] and [FilterBar] when the standard table and filter bar fit the screen.',
  playground: Playground,
  variants: [Explorer],
  code: CODE,
});

export default meta;
export { Explorer, Filters, Overview, Playground, Schema, Storage };
