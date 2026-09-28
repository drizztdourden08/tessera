/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { SchemaDemo } from './_samples/schema-demo';
import { TableDemo } from './_samples/table-demo';
import { EngineFilterDemo } from './_samples/filter-demo';
import { StorageDemo } from './_samples/storage-demo';
import './DataEngine.stories.css';

type EngineArgs = {
  applyConfig: boolean;
  search: string;
  minSphere: number;
  progressionOnly: boolean;
};

const ARGS: Partial<EngineArgs> = { applyConfig: true, search: '', minSphere: 2, progressionOnly: true };

const ARG_TYPES: StoryLiteArgTypes<EngineArgs> = {
    applyConfig: { control: 'boolean', description: 'Layer the SchemaConfig diff over the derived schema' },
    search: { control: 'text', description: 'Free text, compiled with compileTextSearch' },
    minSphere: { control: 'number', description: 'Operand of the sphere is at least clause' },
    progressionOnly: { control: 'boolean', description: 'Adds a progression is true clause' },
  };

const meta = {
  title: 'Data/Engine',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<EngineArgs>;

const Schema = {
  name: 'buildSchema',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SchemaDemo applyConfig={args.applyConfig} />,
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const HeadlessTable = {
  name: 'useDataTable',
  render: () => <TableDemo />,
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const Filters = {
  name: 'Filter clauses',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <EngineFilterDemo search={args.search} minSphere={args.minSphere} progressionOnly={args.progressionOnly} />
  ),
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const Storage = {
  name: 'ViewStorageProvider',
  render: () => <StorageDemo />,
} satisfies StoryLiteStoryDefinition<EngineArgs>;

const CODE = `import { buildSchema, compileTextSearch, useDataTable } from '@drizztdourden08/tessera';

const schema = buildSchema(locations);

const LocationTable = ({ query }: { query: string }) => {
  const matches = compileTextSearch(query);
  const rows = matches ? locations.filter(matches) : locations;
  const table = useDataTable({ rows, schema, initialGroupBy: ['game'] });

  // table.groupedRows holds the group headers and the rows, sorted and grouped.
  return <LocationGrid nodes={table.groupedRows} onHeaderClick={table.setSingleSort} />;
};`;

const Overview = overviewStory({
  component: 'useDataTable',
  description: 'The headless state behind a data table: visible columns, a multi-level sort, layered grouping, and the rows those produce. Give it rows and a schema from buildSchema, then draw its groupedRows with any markup and call its actions from headers and menus. Filtering stays outside it: compile clauses or a text search into a predicate and pass the rows that match.',
  variants: [HeadlessTable],
  code: CODE,
});

export default meta;
export { Filters, HeadlessTable, Overview, Schema, Storage };
