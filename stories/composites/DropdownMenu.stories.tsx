/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DropdownMenu } from '../../src/composites';
import type { MenuIntensity, MenuSize, MenuTrigger, MenuVariant } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { buildTitleMenu } from './_samples/data-title-menu';
import { CATEGORY_MENU, EDIT_MENU, NESTED_MENU, SUBTITLE_MENU } from './_samples/data-menu-features';
import { ChoiceDemo, MenuDemo } from './_samples/menu-demos';
import type { MenuDemoArgs } from './_samples/menu-demos';

const VARIANTS: readonly MenuVariant[] = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success', 'ghost'];
const INTENSITIES: readonly MenuIntensity[] = ['strong', 'medium', 'subtle'];
const SIZES: readonly MenuSize[] = ['sm', 'md'];
const TRIGGERS: Readonly<Record<string, MenuTrigger>> = {
  'Hamburger': { label: 'Menu', iconOnly: true },
  'Icon only': { label: 'More', icon: 'ellipsis', iconOnly: true },
  'Icon at the start': { label: 'View', icon: 'eye' },
  'Icon at the end': { label: 'View', icon: 'chevron-down', iconSide: 'end' },
  'Text only': { label: 'View' },
};
const INSIDE = {
  'Icons, some missing': EDIT_MENU,
  'Categories and separators': CATEGORY_MENU,
  'Subtitles and shortcuts': SUBTITLE_MENU,
} as const;
const ignore = (): void => undefined;

const ARGS: Partial<MenuDemoArgs> = {
  variant: 'primary', intensity: 'strong', size: 'sm', iconOnly: true, iconSide: 'end', filter: false, closeOnSelect: true,
};

const ARG_TYPES: StoryLiteArgTypes<MenuDemoArgs> = {
  variant: { control: 'select', options: [...VARIANTS], description: 'The colour of the trigger and of the edge' },
  intensity: { control: 'select', options: [...INTENSITIES], description: 'strong adds the halo, medium keeps the coloured edge, subtle uses the plain border' },
  size: { control: 'select', options: [...SIZES] },
  iconOnly: { control: 'boolean', description: 'An icon button, the hamburger by default' },
  iconSide: { control: 'select', options: ['start', 'end'], description: 'Which side of the label the icon sits on' },
  filter: { control: 'boolean', description: 'A search field that finds items at every level' },
  closeOnSelect: { control: 'boolean' },
};

const meta = {
  title: 'Composites · Menus/DropdownMenu',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MenuDemoArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <MenuDemo {...args} />,
} satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

const Variants = {
  name: 'Variants and intensity',
  render: () => (
    <Demonstrator
      corner="Variant"
      rows={axis(VARIANTS)}
      columns={axis(INTENSITIES)}
      cell={(variant, intensity) => (
        <DropdownMenu
          trigger={{ label: 'View', icon: 'chevron-down', iconSide: 'end' }}
          variant={variant}
          intensity={intensity}
          groups={buildTitleMenu(ignore)}
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

const Triggers = {
  name: 'Triggers and sizes',
  render: () => (
    <Demonstrator
      corner="Size"
      rows={axis(SIZES)}
      columns={axis(Object.keys(TRIGGERS))}
      cell={(size, kind) => <DropdownMenu trigger={TRIGGERS[kind] ?? { label: 'Menu' }} size={size} groups={buildTitleMenu(ignore)} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

const Inside = {
  name: 'Icons, categories, shortcuts and subtitles',
  render: () => (
    <Demonstrator
      columns={axis(Object.keys(INSIDE))}
      valign="start"
      cell={(_row, kind) => <DropdownMenu inline groups={INSIDE[kind as keyof typeof INSIDE]} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

const Commands = {
  name: 'Check and radio',
  render: () => (
    <Demonstrator
      columns={axis(['In place', 'From a button'])}
      valign="start"
      cell={(_row, where) => <ChoiceDemo inline={where === 'In place'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

const SubMenus = {
  name: 'Sub-menus and filter',
  render: () => (
    <Demonstrator
      columns={axis(['Sub-menus', 'With a filter'])}
      cell={(_row, kind) => (
        <DropdownMenu trigger={{ label: 'File', icon: 'chevron-down', iconSide: 'end' }} filter={kind === 'With a filter'} groups={NESTED_MENU} />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

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
    id: 'view',
    label: 'View',
    items: [
      { id: 'players', icon: 'users', label: 'Players', shortcut: 'Ctrl+1', checked: true, onSelect: togglePlayers },
      { id: 'dark', icon: 'moon', label: 'Dark', kind: 'radio', checked: theme === 'dark', onSelect: () => setTheme('dark') },
      { id: 'layout', icon: 'layout-grid', label: 'Layout', children: [
        { id: 'default', label: 'Default dock', description: 'Widgets down both sides', onSelect: useDefault },
        { separator: true },
        { id: 'save', label: 'Save this layout', onSelect: saveLayout },
      ] },
    ],
  },
  { id: 'app', items: [{ id: 'quit', icon: 'log-out', label: 'Quit', shortcut: 'Ctrl+Q', onSelect: quit }] },
];

<DropdownMenu trigger={{ label: 'Menu', iconOnly: true }} groups={groups} />
<DropdownMenu trigger={{ label: 'View', icon: 'chevron-down', iconSide: 'end' }} variant="secondary" intensity="medium" filter groups={groups} />`;

const DESCRIPTION = [
  'A menu built from data that hangs from its own trigger.',
  'trigger draws the button: iconOnly gives an IconButton, the hamburger unless icon names another, and otherwise a Button with the label and an icon on either side.',
  'The button takes the variant of the menu, and the open menu joins it: the coloured edge runs on around the menu, with a rounded notch where the button meets it, at every size.',
  'intensity sets how strong that edge is: strong adds the halo, medium keeps the coloured edge, subtle uses the plain border.',
  'groups lists the groups, each with an optional label, with a line between groups.',
  'An item has an id, a label, an icon, a subtitle, a shortcut, a disabled state and onSelect. Labels line up whether or not an item has an icon, and every shortcut sits in one column at the right edge.',
  'kind="radio" or checked turns an item into a radio or a check.',
  'children opens a sub-menu that joins the edge of the menu it comes from.',
  'filter adds a search field that searches every level and lists the results in the same menu, with the path of each one.',
  'A click outside, Escape, or scrolling the trigger out of view closes it.',
  'The arrows, Home, End and typing the start of a label move through it; the right arrow opens a sub-menu and the left arrow closes it.',
  'anchorRef hangs the menu from something that is not a button, such as a table header, and inline draws it in place.',
].join(' ');

const Overview = overviewStory({
  component: 'DropdownMenu',
  description: DESCRIPTION,
  playground: Playground,
  variants: [Variants, Triggers, Inside, Commands, SubMenus],
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
export { Commands, Inside, Overview, Playground, SubMenus, Triggers, Variants };
