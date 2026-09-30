/* @layer root-config @kind data */
import type { CatalogueTier } from './catalogue.type';

const COMPOSITES_TIER: CatalogueTier = {
  tier: 'Composites',
  intro: 'Tier 2: presentational pieces assembled from primitives. They hold layout and interaction, never app data.',
  groups: [
    {
      group: 'Dialogs',
      entries: [
        { name: 'Dialog', summary: 'A modal question with a message and actions.' },
        { name: 'DialogShell', summary: 'The frame every modal is built in.' },
        { name: 'WizardDialogShell', summary: 'A modal that walks through numbered steps.' },
        { name: 'CreateRecordDialog', summary: 'A modal form that creates one record.' },
        { name: 'DeleteGuardDialog', summary: 'Confirms a delete and lists what still points at it.' },
        { name: 'ConfirmIconButton', summary: 'An icon button that asks once before it acts.' },
        { name: 'InlineCreateForm', summary: 'A boxed name field that creates one thing in place.' },
        { name: 'Overlay', summary: 'A scrim over the page with content on top.' },
        { name: 'Drawer', summary: 'A panel that slides in from an edge.' },
        { name: 'FullScreenLayer', summary: 'A full-window page over the main content.' },
        { name: 'DisabledOverlay', summary: 'Covers a disabled area and says why.' },
        { name: 'ErrorBoundary', summary: 'Catches a crash in its children and shows a fallback.' },
      ],
    },
    {
      group: 'Navigation',
      entries: [
        { name: 'SideNav', summary: 'A vertical menu of grouped links.' },
        { name: 'SectionNav', summary: 'Grouped section navigation with search, or an app rail.' },
        { name: 'HeaderTabs', summary: 'Tabs in a page header, with counts.' },
        { name: 'FloatingSwitch', summary: 'A floating toggle between two views.' },
        { name: 'SplitPane', summary: 'Two panes with a draggable, collapsible divider.' },
        { name: 'MasterDetailLayout', summary: 'A list beside the detail of the selected item.' },
        { name: 'GroupTree', summary: 'Nested groups that open and close.' },
        { name: 'ListItemRow', summary: 'One selectable row with icon, meta, aside and action.' },
        { name: 'WindowHeader', summary: 'A panel title bar with extras and close.' },
        { name: 'WindowTitleBar', summary: 'An app window title bar with brand, slots and window buttons.' },
        { name: 'SettingsShell', summary: 'The frame of a settings page.' },
        { name: 'SettingsSection', summary: 'One titled group of settings.' },
        { name: 'SettingsGroupList', summary: 'Settings sections of bordered row groups, with reset and locks.' },
        { name: 'SettingsPage', summary: 'A settings page header with tabs over a scrolling body.' },
        { name: 'NavLayout', summary: 'A SectionNav beside the current page, with search results.' },
        { name: 'SearchResults', summary: 'Search hits with a count, jumps and groups.' },
        { name: 'ProfilePicker', summary: 'Profiles to pick from, add and delete.' },
      ],
    },
    {
      group: 'Menus',
      entries: [
        { name: 'DropdownMenu', summary: 'A menu of actions, checks and submenus.' },
        { name: 'SearchSpark', summary: 'A compact search field.' },
        { name: 'CommandPalette', summary: 'A search box over the window for screens, settings and actions.' },
        { name: 'CommandPaletteRow', summary: 'One result row: icon, label, breadcrumb, check or toggle.' },
      ],
    },
    {
      group: 'Data views',
      entries: [
        { name: 'DataTable', summary: 'Sortable, groupable, resizable table with saved layouts.' },
        { name: 'FilterBar', summary: 'Filter clauses, facets and search over a collection.' },
        { name: 'RecordEditor', summary: 'Edits one record, form derived from its schema.' },
        { name: 'CompactRecordView', summary: 'One record read-only, with differences marked.' },
        { name: 'Field kits', summary: 'The editor, cell and filter for each field kind.' },
      ],
    },
    {
      group: 'Content',
      entries: [
        { name: 'LogPanel', summary: 'A live log with kinds, search and paging.' },
        { name: 'AboutPanel', summary: 'An About screen: logo, name, facts, copy and legal text.' },
        { name: 'ReleaseNotesPanel', summary: 'Release notes in a titled, scrolling box.' },
        { name: 'Emphasis', summary: 'Animates a word along the weight axis.' },
        { name: 'ColorPicker', summary: 'A full colour picker with hex and fields.' },
        { name: 'ColorPickerPopover', summary: 'A swatch that opens the picker.' },
        { name: 'PixelWordmark', summary: 'A wordmark set in the pixel alphabet from a text and four colours.' },
        { name: 'KeyboardLayout', summary: 'A full keyboard drawn from data, with keys lit or pressed.' },
        { name: 'ShortcutTour', summary: 'A camera that walks a keyboard through a shortcut, key by key.' },
      ],
    },
    {
      group: 'Widgets',
      entries: [{ name: 'Widget', summary: 'Dockable, floating panels around the main content.' }],
    },
  ],
};

export { COMPOSITES_TIER };
