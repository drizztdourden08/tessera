/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
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
import { JoinDemos, MarksDemo } from './_samples/menu-join-demos';
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

const ARG_TYPES: PlaygroundArgTypes<MenuDemoArgs> = {
  variant: { group: 'Appearance', control: 'select', options: [...VARIANTS], description: 'The colour of the trigger and of the edge' },
  size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  iconOnly: { group: 'Appearance', control: 'boolean', description: 'An icon button, the hamburger by default' },
  iconSide: { group: 'Layout', control: 'select', options: ['start', 'end'], description: 'Which side of the label the icon sits on' },
  intensity: { group: 'Behaviour', control: 'select', options: [...INTENSITIES], description: 'strong adds the halo, medium keeps the coloured edge, subtle uses the plain border' },
  filter: { group: 'Behaviour', control: 'boolean', description: 'A search field that finds items at every level' },
  closeOnSelect: { group: 'Behaviour', control: 'boolean' },
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
} satisfies PlaygroundStory<MenuDemoArgs>;

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

const Joins = { name: 'Where a sub-menu opens', render: () => <JoinDemos /> } satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

const Marks = { name: 'Checks, plain items and a radio sub-menu', render: () => <MarksDemo /> } satisfies StoryLiteStoryDefinition<MenuDemoArgs>;

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

const Overview = overviewStory({
  component: 'DropdownMenu',
  description: 'A menu of actions, checks and sub-menus, built from data, that hangs from its own button.',
  points: [
    '`groups` lists the items; each has a `label` and can add an `icon`, a `shortcut` and `onSelect`.',
    '`trigger` draws the button: a [Button] with its label, or an [IconButton] with `iconOnly`.',
    '`kind="radio"` or `checked` turns an item into a choice, and `children` opens a sub-menu.',
    '`filter` adds a search field that finds items on every level.',
    'The arrow keys, [[Home]], [[End]] and typing move through it; [[Esc]] or a click outside closes it.',
    '`anchorRef` hangs it from something that is not a button, such as a table header.',
  ],
  instead: '[CommandPalette] to find any action in the app by name.',
  playground: Playground,
  variants: [Variants, Triggers, Inside, Commands, Marks, SubMenus, Joins],
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
export { Commands, Inside, Joins, Marks, Overview, Playground, SubMenus, Triggers, Variants };
