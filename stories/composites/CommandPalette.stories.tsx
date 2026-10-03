/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
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

const ARG_TYPES: StoryLiteArgTypes<PaletteArgs> = {
  defaultOpen: { control: 'boolean' },
  defaultQuery: { control: 'text' },
  placeholder: { control: 'text', description: 'Leave it empty to hear the mascot ask' },
  mascot: { control: 'select', options: ['none', 'auto', 'sentri'], description: 'auto picks the mascot of the app palette' },
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
} satisfies StoryLiteStoryDefinition<PaletteArgs>;

const Idle = {
  name: 'Before typing, screens first',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen defaultQuery="" />,
} satisfies StoryLiteStoryDefinition<PaletteArgs>;

const Results = {
  name: 'Grouped results with toggle rows',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen defaultQuery="s" />,
} satisfies StoryLiteStoryDefinition<PaletteArgs>;

const WithMascot = {
  name: 'With a mascot',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen defaultQuery="" placeholder="" mascot="auto" />,
} satisfies StoryLiteStoryDefinition<PaletteArgs>;

const Closed = {
  name: 'Closed, opens from a button',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PaletteDemo {...args} defaultOpen={false} defaultQuery="" />,
} satisfies StoryLiteStoryDefinition<PaletteArgs>;

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
  description: 'A search box that drops from the top of the window over a dim scrim, for jumping to any screen, setting or action by name. It grows out of a pill at the top edge and shrinks back when it closes. The host owns the query and the results, as groups with an optional heading; each row is a CommandPaletteRow with an icon, a description, a breadcrumb, a check dot or an inline toggle. Arrow keys and Page Up and Down move the active row past disabled ones, Enter picks it, Ctrl+Enter flips a toggle row, and Escape or a click on the scrim closes. The field is a combobox that points at the active option of its listbox, and focus comes back to where it was on close. mascot adds a small mascot at the start of the field that looks around while the field is empty and asks what the user is looking for; auto picks the mascot of the app palette, and a name picks that one.',
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
