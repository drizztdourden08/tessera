/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { MascotChoice } from '../../src/brand';
import { CommandPalette } from '../../src/composites';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { paletteGroups } from './_samples/palette';
import type { PaletteEntry } from './_samples/palette';
import './CommandPalette.stories.css';

type PaletteArgs = {
  defaultOpen: boolean;
  defaultQuery: string;
  placeholder: string;
  mascot: 'none' | MascotChoice;
};

const NO_FLAGS: Readonly<Record<string, boolean>> = { sound: true };

const ignore = () => undefined;

const PaletteDemo = (props: PaletteArgs) => {
  const { defaultOpen, defaultQuery, placeholder, mascot } = props;
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState(defaultQuery);
  const [flags, setFlags] = useState(NO_FLAGS);
  const [said, setSaid] = useState('Press the button, then type. Arrows move, Enter opens, Ctrl+Enter flips a toggle row.');
  const groups = useMemo(
    () => paletteGroups(query, flags, (id) => setFlags((all) => ({ ...all, [id]: all[id] !== true }))),
    [query, flags],
  );
  const handleSelect = (item: PaletteEntry) => {
    setSaid(`Opened ${item.label}.`);
    setOpen(false);
  };

  return (
    <Box className="story-frame command-palette-story__frame">
      <Box className="command-palette-story__page">
        <Button variant="secondary" onClick={() => setOpen(true)}>Search</Button>
        <Text variant="caption">{said}</Text>
      </Box>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        query={query}
        onQueryChange={setQuery}
        groups={groups}
        onSelect={handleSelect}
        placeholder={placeholder === '' ? undefined : placeholder}
        mascot={mascot === 'none' ? undefined : mascot}
      />
    </Box>
  );
};

const ARGS: Partial<PaletteArgs> = { defaultOpen: true, defaultQuery: '', placeholder: 'Search screens, settings and actions', mascot: 'none' };

const ARG_TYPES: PlaygroundArgTypes<PaletteArgs> = {
  defaultQuery: { group: 'Content', control: 'text' },
  placeholder: { group: 'Content', control: 'text', description: 'Leave it empty to hear the mascot ask' },
  mascot: { group: 'Appearance', control: 'select', options: ['none', 'auto', 'sentri'], description: 'auto picks the mascot of the app palette' },
  defaultOpen: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Menus/CommandPalette',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PaletteArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo key={`${String(args.defaultOpen)}-${args.defaultQuery}`} {...args} />,
} satisfies PlaygroundStory<PaletteArgs>;

const Idle = {
  name: 'Before typing, screens first',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen defaultQuery="" />,
} satisfies PlaygroundStory<PaletteArgs>;

const Results = {
  name: 'Grouped results with toggle rows',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen defaultQuery="s" />,
} satisfies PlaygroundStory<PaletteArgs>;

const WithMascot = {
  name: 'With a mascot',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen defaultQuery="" placeholder="" mascot="auto" />,
} satisfies PlaygroundStory<PaletteArgs>;

const Closed = {
  name: 'Closed, opens from a button',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen={false} defaultQuery="" />,
} satisfies PlaygroundStory<PaletteArgs>;

const renderState = (props: StateProps) => {
  const query = typeof props.query === 'string' ? props.query : 'se';
  return (
    <Box className="story-frame command-palette-story__frame command-palette-story__frame--state">
      <CommandPalette
        open
        onClose={ignore}
        query={query}
        onQueryChange={ignore}
        groups={paletteGroups(query, NO_FLAGS, ignore)}
        onSelect={ignore}
        activeIndex={typeof props.activeIndex === 'number' ? props.activeIndex : -1}
      />
    </Box>
  );
};

const CODE = `import { CommandPalette } from '@drizztdourden08/tessera';

const [open, setOpen] = useState(false);
const [query, setQuery] = useState('');

<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  query={query}
  onQueryChange={setQuery}
  groups={[
    { id: 'screens', label: 'Screens', items: screens },
    { id: 'settings', label: 'Settings', items: settings },
  ]}
  onSelect={(item) => {
    setOpen(false);
    run(item.id);
  }}
/>`;

const Overview = overviewStory({
  component: 'CommandPalette',
  description: 'A search box that drops from the top of the window, for jumping to any screen, setting or action by name.',
  points: [
    'The host owns `query` and the results, passed as `groups` of [CommandPaletteRow] items.',
    'The arrow keys move the active row, [[Enter]] picks it and [[Ctrl+Enter]] flips a toggle row.',
    '[[Esc]] or a click on the scrim closes it, and focus goes back where it was.',
    '`mascot` adds a small mascot to the field; `auto` picks the one of the app palette.',
  ],
  instead: '[DropdownMenu] for a short list of actions on one button.',
  playground: Playground,
  variants: [Idle, Results, WithMascot, Closed],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, name: 'Hover on a row', target: '.command-palette-row' },
      { name: 'Active row', props: { activeIndex: 1 } },
      { name: 'No results', props: { query: 'zebra' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Closed, Idle, Overview, Playground, Results, WithMascot };
