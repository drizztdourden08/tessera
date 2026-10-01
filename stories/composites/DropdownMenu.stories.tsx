/* @layer stories @kind story */
import { useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DropdownMenu } from '../../src/composites';
import type { MenuAlign, MenuGroup, MenuSide } from '../../src/composites';
import { Box, Button, Glyph, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { INITIAL_OPEN, buildViewMenu } from './_samples/data-menu';
import { buildTitleMenu } from './_samples/data-title-menu';

type DropdownArgs = {
  side: MenuSide;
  align: MenuAlign;
  closeOnSelect: boolean;
};

const useViewMenu = (onPick: (label: string) => void) => {
  const [open, setOpen] = useState(INITIAL_OPEN);
  return buildViewMenu({
    open,
    onToggle: (id) => {
      setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
      onPick(`Toggled ${id}`);
    },
    onPick,
  });
};

const MenuDemo = ({ side, align, closeOnSelect }: DropdownArgs) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [last, setLast] = useState('Nothing picked yet.');
  const groups = useViewMenu(setLast);

  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button ref={anchorRef} variant="secondary" active={menuOpen} icon={<Glyph name="chevronDown" />} onClick={() => setMenuOpen((v) => !v)}>
          View
        </Button>
        <Text className="story-label">{last}</Text>
      </Box>
      {menuOpen && (
        <DropdownMenu groups={groups} anchorRef={anchorRef} side={side} align={align} closeOnSelect={closeOnSelect} onClose={() => setMenuOpen(false)} />
      )}
    </Box>
  );
};

const PlacementDemo = ({ side, align }: { side: MenuSide; align: MenuAlign }) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const groups = useViewMenu(() => undefined);
  return (
    <>
      <Button ref={anchorRef} variant="secondary" size="sm" active={menuOpen} icon={<Glyph name="chevronDown" />} onClick={() => setMenuOpen((v) => !v)}>
        View
      </Button>
      {menuOpen && <DropdownMenu groups={groups} anchorRef={anchorRef} side={side} align={align} onClose={() => setMenuOpen(false)} />}
    </>
  );
};

const HamburgerDemo = () => {
  const [last, setLast] = useState('Nothing picked yet.');
  return (
    <Box className="story-row">
      <DropdownMenu trigger="hamburger" groups={buildTitleMenu(setLast)} />
      <Text className="story-label">{last}</Text>
    </Box>
  );
};

const LABELLED: MenuGroup[] = [
  { id: 'screens', label: 'Screens', items: [{ id: 'home', icon: 'house', label: 'Home' }, { id: 'library', icon: 'folder-open', label: 'Library' }] },
  { id: 'tools', label: 'Tools', items: [{ id: 'logs', icon: 'file-text', label: 'Logs' }, { id: 'reload', icon: 'refresh-cw', label: 'Reload', shortcut: 'Ctrl+R' }] },
];

const NESTED: MenuGroup[] = [
  {
    id: 'sections',
    items: [
      { id: 'screens', icon: 'monitor', label: 'Screens', children: LABELLED[0]?.items ?? [] },
      { id: 'tools', icon: 'puzzle', label: 'Tools', children: LABELLED[1]?.items ?? [] },
    ],
  },
];

const ARGS: Partial<DropdownArgs> = { side: 'below', align: 'start', closeOnSelect: true };

const ARG_TYPES: StoryLiteArgTypes<DropdownArgs> = {
  side: { control: 'select', options: ['below', 'above'], description: 'Which side of the anchor the menu hangs off' },
  align: { control: 'select', options: ['start', 'end'] },
  closeOnSelect: { control: 'boolean', description: 'Close the menu when an item is picked' },
};

const meta = {
  title: 'Composites · Menus/DropdownMenu',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DropdownArgs>;

const Playground = {
  name: 'View menu',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <MenuDemo {...args} />,
} satisfies StoryLiteStoryDefinition<DropdownArgs>;

const SIDES: readonly MenuSide[] = ['below', 'above'];
const ALIGNS: readonly MenuAlign[] = ['start', 'end'];

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator rows={axis(SIDES)} columns={axis(ALIGNS)} cell={(side, align) => <PlacementDemo side={side} align={align} />} />
  ),
} satisfies StoryLiteStoryDefinition<DropdownArgs>;

const Hamburger = {
  name: 'Hamburger trigger',
  render: () => <HamburgerDemo />,
} satisfies StoryLiteStoryDefinition<DropdownArgs>;

const CATEGORY_KINDS = ['Labelled groups', 'Submenus'] as const;

const Categories = {
  name: 'Categories',
  render: () => (
    <Demonstrator
      columns={axis(CATEGORY_KINDS)}
      valign="start"
      cell={(_row, kind) => <DropdownMenu inline groups={kind === 'Submenus' ? NESTED : LABELLED} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<DropdownArgs>;

const renderState = (props: StateProps) => (
  <DropdownMenu
    inline
    groups={[{
      id: 'state',
      items: [{ id: 'players', icon: 'users', label: 'Players', shortcut: 'Ctrl+1', checked: props.checked === true, disabled: props.disabled === true }],
    }]}
  />
);

const CODE = `import { DropdownMenu } from '@drizztdourden08/tessera';
import type { MenuGroup } from '@drizztdourden08/tessera';

const groups: MenuGroup[] = [
  {
    id: 'widgets',
    label: 'Widgets',
    items: [
      { id: 'players', icon: 'users', label: 'Players', shortcut: 'Ctrl+1', checked: true, onSelect: togglePlayers },
      { id: 'layout', icon: 'layout-grid', label: 'Layout', children: [
        { id: 'default', label: 'Default dock', onSelect: useDefault },
        { separator: true },
        { id: 'save', label: 'Save this layout', onSelect: saveLayout },
      ] },
    ],
  },
  { id: 'app', items: [{ id: 'quit', icon: 'log-out', label: 'Quit', shortcut: 'Ctrl+Q', onSelect: quit }] },
];

<DropdownMenu trigger="hamburger" groups={groups} />

<Button ref={anchorRef} onClick={() => setMenuOpen((v) => !v)}>View</Button>
{menuOpen && <DropdownMenu groups={groups} anchorRef={anchorRef} onClose={() => setMenuOpen(false)} />}`;

const Overview = overviewStory({
  component: 'DropdownMenu',
  description: 'A menu built from data. groups lists the groups, each with an optional label and its items, with a line between groups. An item has an id, a label, an icon, a muted description, a shortcut drawn with Shortcut, a check mark, a disabled state and onSelect, and children opens a submenu that can hold its own separators. Separators at the ends of a list or next to each other are dropped. The arrows, Home, End, Enter and typing the start of a label move through it; the right arrow opens a submenu and the left arrow or Escape closes it. trigger="hamburger" draws its own trigger: three lines in a gold edge that turn into a cross while the menu hangs from it, with the edge running on around the menu as Select does. It draws nothing when the menu has no items. Without a trigger the menu hangs off anchorRef, and inline draws it in place.',
  playground: Playground,
  variants: [AllVariants, Hamburger, Categories],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.dropdown__item' },
      { ...STATE.focus, target: '.dropdown__item' },
      STATE.checked,
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { AllVariants, Categories, Hamburger, Overview, Playground };
