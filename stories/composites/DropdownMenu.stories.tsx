/* @layer stories @kind story */
import { useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DropdownMenu } from '../../src/composites';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis, VariantGrid } from '../_template/VariantGrid';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { INITIAL_OPEN, buildViewMenu } from './_samples/data-menu';

type MenuSide = 'below' | 'above';
type MenuAlign = 'start' | 'end';

type DropdownArgs = {
  side: MenuSide;
  align: MenuAlign;
  closeOnPick: boolean;
};

const MenuDemo = ({ side, align, closeOnPick }: DropdownArgs) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(INITIAL_OPEN);
  const [last, setLast] = useState('Nothing picked yet.');

  const finish = (label: string) => {
    setLast(label);
    if (closeOnPick) setMenuOpen(false);
  };
  const items = buildViewMenu({
    open,
    onToggle: (key) => {
      setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
      finish(`Toggled ${key}`);
    },
    onPick: finish,
  });

  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button ref={anchorRef} variant="secondary" active={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          View ▾
        </Button>
        <Text className="story-label">{last}</Text>
      </Box>
      {menuOpen && <DropdownMenu items={items} anchorRef={anchorRef} side={side} align={align} />}
    </Box>
  );
};

const PlacementDemo = ({ side, align }: { side: MenuSide; align: MenuAlign }) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(INITIAL_OPEN);
  const items = buildViewMenu({
    open,
    onToggle: (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] })),
    onPick: () => setMenuOpen(false),
  });
  return (
    <>
      <Button ref={anchorRef} variant="secondary" size="sm" active={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
        View ▾
      </Button>
      {menuOpen && <DropdownMenu items={items} anchorRef={anchorRef} side={side} align={align} />}
    </>
  );
};

const ARGS: Partial<DropdownArgs> = { side: 'below', align: 'start', closeOnPick: true };

const ARG_TYPES: StoryLiteArgTypes<DropdownArgs> = {
    side: { control: 'select', options: ['below', 'above'], description: 'Which side of the anchor the menu hangs off' },
    align: { control: 'select', options: ['start', 'end'] },
    closeOnPick: { control: 'boolean', description: 'The caller owns closing: the menu has no close handler' },
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
    <VariantGrid
      rows={axis(SIDES)}
      columns={axis(ALIGNS)}
      cell={(side, align) => <PlacementDemo side={side} align={align} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<DropdownArgs>;

const renderState = (props: StateProps) => (
  <DropdownMenu inline items={[{ key: 'players', label: 'Players', checked: props.checked === true, disabled: props.disabled === true }]} />
);

const CODE = `import { DropdownMenu } from '@drizztdourden08/tessera';

const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setMenuOpen((v) => !v)}>View</Button>
{menuOpen && (
  <DropdownMenu
    anchorRef={anchorRef}
    side="below"
    align="start"
    items={[
      { key: 'players', label: 'Players', checked: true, onClick: togglePlayers },
      'separator',
      { key: 'reset', label: 'Reset window positions', onClick: resetLayout },
    ]}
  />
)}`;

const Overview = overviewStory({
  component: 'DropdownMenu',
  description: 'A menu that hangs off the button that opened it. Reach for it for a toolbar or window menu: toggles, picks and submenus under one trigger. Items can carry an icon, a description, a check mark or a disabled state, with separators between groups and submenus for nested items. It opens below or above its anchor, lined up with either edge, and follows the anchor as the page scrolls, while the caller owns opening and closing it. inline draws it in place, without the floating layer, for a menu that sits inside a panel.',
  playground: Playground,
  variants: [AllVariants],
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
export { AllVariants, Overview, Playground };
