/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import {
  CategoryList, ColumnsHighlight, ComboboxPlayground, Filtering, FullItem, MultiChips, PrefixFilter, ServerSearch,
} from './_samples/combobox-variants';
import { PICKER_ARG_TYPES, pickerStates, pickerVariant } from './_samples/picker-story';
import type { ComboboxArgs } from './_samples/combobox-variants';
import './Select.stories.css';
import './Combobox.stories.css';

type Story = StoryLiteStoryDefinition<ComboboxArgs>;

const ARGS: Partial<ComboboxArgs> = {
  placeholder: 'Type a game',
  grouped: false,
  highlight: true,
  min: 1,
  max: 1,
  loading: false,
  size: 'md',
  disabled: false,
  invalid: false,
};

const ARG_TYPES: StoryLiteArgTypes<ComboboxArgs> = {
  placeholder: { control: 'text' },
  grouped: { control: 'boolean', description: 'Split the games by kind, under headers with an icon or an emoji.' },
  highlight: { control: 'boolean', description: 'Mark the typed text inside each row.' },
  ...PICKER_ARG_TYPES,
};

const meta = {
  title: 'Primitives · Inputs/Combobox',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ComboboxArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ComboboxPlayground {...args} />,
} satisfies Story;

const VARIANTS: readonly Story[] = [
  pickerVariant('Filtering', Filtering),
  pickerVariant('Columns and highlight', ColumnsHighlight),
  pickerVariant('Categories', CategoryList),
  pickerVariant('Multi select, as chips', MultiChips),
  pickerVariant('Custom filter', PrefixFilter),
  pickerVariant('Server search', ServerSearch),
  pickerVariant('Full item when not typing', FullItem),
];

const CODE = `import { useState } from 'react';
import { Combobox } from '@drizztdourden08/tessera';

const [game, setGame] = useState<Game | null>(null);

<Combobox
  items={games}
  columns={[
    { field: 'title' },
    { field: 'platform', tone: 'muted' },
    { field: 'year', align: 'end' },
  ]}
  groupBy="kind"
  value={game}
  onChange={setGame}
  placeholder="Type a game"
/>`;

const Overview = overviewStory({
  component: 'Combobox',
  description: 'A text field that narrows a list as you type, built on the same list as Select: the same items, columns, categories, item component, min and max, and the same joined shape for the field and the list. By default it keeps the rows whose shown text holds the typed text, and marks that text in each row; filter replaces the test with your own. The arrow keys and Page Up and Page Down move, Enter picks and Escape closes. After a pick the field shows the label of the item. With valueDisplay full or a valueComponent, the picked item shows in full while the field is not being edited, and the one-line text comes back as soon as it takes focus. With max above 1 the picks show as chips before the text, and Backspace in an empty field removes the last one. onQueryChange hands each change of text to a server search: the list then shows what comes back, and loading draws a spinner meanwhile. min 0 adds a clear button.',
  playground: Playground,
  variants: VARIANTS,
  states: pickerStates('combobox', { field: '.combobox', input: '.combobox__input' }),
  code: CODE,
});

export default meta;
export { Overview, Playground };
