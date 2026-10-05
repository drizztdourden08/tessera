/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import {
  CategoryList, ColumnsHighlight, ComboboxPlayground, Filtering, FreeText, FullItem, MultiChips, PrefixFilter, ServerSearch,
} from './_samples/combobox-variants';
import { StartHints } from './_samples/StartHints';
import { PICKER_ARG_TYPES, pickerSizes, pickerStates, pickerVariant } from './_samples/picker-story';
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

const ARG_TYPES: PlaygroundArgTypes<ComboboxArgs> = {
  placeholder: { group: 'Content', control: 'text' },
  highlight: { group: 'Appearance', control: 'boolean', description: 'Mark the typed text inside each row.' },
  grouped: { group: 'Layout', control: 'boolean', description: 'Split the games by kind, under headers with an icon or an emoji.' },
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
} satisfies PlaygroundStory<ComboboxArgs>;

const VARIANTS: readonly Story[] = [
  pickerVariant('Filtering', Filtering),
  pickerSizes('combobox'),
  pickerVariant('Columns and highlight', ColumnsHighlight),
  pickerVariant('Categories', CategoryList),
  pickerVariant('Multi select, as tags', MultiChips),
  pickerVariant('Start hints: several from a long list, as removable tags', StartHints),
  pickerVariant('Custom filter', PrefixFilter),
  pickerVariant('Server search', ServerSearch),
  pickerVariant('Full item when not typing', FullItem),
  pickerVariant('Free text with suggestions', FreeText),
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
  description: 'A text field that narrows a list as you type, built on the same list as [Select].',
  points: [
    'It keeps the rows whose text holds the typed text and marks it; `filter` swaps in your own test.',
    'It takes the same items, columns and categories as Select.',
    'With `max` above 1 the picks show as tags, and [[Backspace]] in an empty field removes the last one.',
    '`onQueryChange` hands each change of text to a server search; `loading` shows a spinner meanwhile.',
    '`min={0}` adds a clear button.',
    '`freeText` keeps whatever is typed and the list only suggests, as in [CommandInput]; `start` adds a mark.',
  ],
  instead: '[Select] when the list is short enough to scan.',
  playground: Playground,
  variants: VARIANTS,
  states: pickerStates('combobox', { field: '.combobox', input: '.combobox__input' }),
  code: CODE,
});

export default meta;
export { Overview, Playground };
