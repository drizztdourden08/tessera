/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { SearchInput, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { PresetFilter, StatefulSearch } from './_samples/search-input-demos';

type SearchInputArgs = {
  initialValue: string;
  placeholder: string;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<SearchInputArgs> = { initialValue: 'Master Sword', placeholder: 'Search items', disabled: false, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<SearchInputArgs> = {
  initialValue: { group: 'Content', control: 'text' },
  placeholder: { group: 'Content', control: 'text' },
  disabled: { group: 'State', control: 'boolean' },
  size: SIZE_ARG,
};

const meta = {
  title: 'Primitives · Inputs/SearchInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SearchInputArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <StatefulSearch key={args.initialValue} initial={args.initialValue} placeholder={args.placeholder} disabled={args.disabled} size={args.size} />
  ),
} satisfies PlaygroundStory<SearchInputArgs>;

const Sizes = sizesStory<SearchInputArgs>((size) => <StatefulSearch size={size} initial="Hookshot" />, { align: 'stretch' });

const CLEAR_ROWS = ['empty', 'with a query'] as const;

const ClearButton = {
  name: 'Clear button',
  render: () => (
    <Demonstrator
      rows={axis(CLEAR_ROWS)}
      align="stretch"
      cell={(row) => <StatefulSearch initial={row === 'empty' ? '' : 'Pegasus Boots'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<SearchInputArgs>;

const Filtering = {
  name: 'Filtering a list',
  render: () => <PresetFilter />,
} satisfies StoryLiteStoryDefinition<SearchInputArgs>;

const renderState = (props: StateProps) => <SearchInput value={props.disabled === true ? 'Hyrule Castle' : ''} onChange={() => undefined} {...props} />;

const CODE = `import { useState } from 'react';
import { SearchInput } from '@drizztdourden08/tessera';

const [query, setQuery] = useState('');

<SearchInput value={query} onChange={setQuery} placeholder="Search game presets" />`;

const Overview = overviewStory({
  component: 'SearchInput',
  description: 'A search field, with a search icon at the start and a clear button at the end, for narrowing a list.',
  points: [
    'Use it in a filter bar, a palette or a nav.',
    'The clear button shows once there is a query, empties it and keeps the focus in the field.',
    '[[Esc]] empties it too; a host that handles Esc itself calls `preventDefault` to keep the query.',
    '`value` and `onChange` hand the query as a string.',
    '`start` swaps the search icon for another mark.',
  ],
  instead: '[Combobox] when typing picks from a list.',
  playground: Playground,
  variants: [Sizes, ClearButton, Filtering],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.text-input' },
      { ...STATE.focus, target: '.text-input' },
      { name: 'Filled', props: { value: 'Zelda' } },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { ClearButton, Filtering, Overview, Playground, Sizes };
