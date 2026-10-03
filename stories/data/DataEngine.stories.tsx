/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
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

const ARG_TYPES: StoryLiteArgTypes<EngineArgs> = {
    grouping: { control: 'select', options: GROUPING_NAMES, description: 'groupBy, one level or two' },
    sortBy: { control: 'select', options: ['none', 'name', 'game', 'sphere'], description: 'The sort entry' },
    descending: { control: 'boolean', description: 'Sort direction' },
    search: { control: 'text', description: 'Free text, compiled with compileTextSearch' },
    minSphere: { control: 'number', description: 'Operand of the sphere is at least clause' },
    progressionOnly: { control: 'boolean', description: 'Adds a progression is true clause' },
  };

const SCHEMA_ARG_TYPES: StoryLiteArgTypes<EngineArgs> = {
    applyConfig: { control: 'boolean', description: 'Layer the SchemaConfig over the derived schema' },
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
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const Explorer = {
  name: 'Example: a spoiler log explorer',
  render: () => <SpoilerExplorer />,
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const Schema = {
  name: 'buildSchema',
  args: SCHEMA_ARGS,
  argTypes: SCHEMA_ARG_TYPES,
  render: (args) => <SchemaDemo applyConfig={args.applyConfig === true} />,
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const Filters = {
  name: 'Filter clauses',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <EngineFilterDemo search={args.search} minSphere={args.minSphere} progressionOnly={args.progressionOnly === true} />
  ),
} satisfies StoryLiteStoryDefinition<EngineArgs>;

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
  description: 'The headless half of the data views: plain functions and hooks with no markup of their own. buildSchema reads the rows and describes every field, compile and compileTextSearch turn filter clauses and a search into a test for each row, and useDataTable keeps the columns, a multi-level sort and layered grouping, and hands back the rows those produce. Draw its groupedRows with any markup and call its actions from headers and menus. DataTable and FilterBar are built on it; reach for it directly when a screen needs its own layout, as in the spoiler log below.',
  points: [
    'Rows sit one step in from the group they belong to, so a two-level grouping reads as a tree.',
    'The table state is plain data: save it with a view key and ViewStorageProvider, and restore it on the next visit.',
  ],
  playground: Playground,
  variants: [Explorer],
  code: CODE,
});

export default meta;
export { Explorer, Filters, Overview, Playground, Schema, Storage };
