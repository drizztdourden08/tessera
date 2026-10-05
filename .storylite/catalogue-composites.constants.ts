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
        { name: 'CreateRecordDialog', summary: 'A modal form that creates one record.' },
        { name: 'DeleteGuardDialog', summary: 'Confirms a delete and lists what still points at it.' },
        { name: 'WizardDialog', summary: 'A wizard in a dialog, under the standard dialog header.' },
        { name: 'JobDialog', summary: 'A long job in a dialog, with Cancel and Hide while it runs and Close once it ends.' },
      ],
    },
    {
      group: 'Overlays',
      entries: [
        { name: 'Drawer', summary: 'A panel that slides in from an edge.' },
        { name: 'DisabledOverlay', summary: 'Covers a disabled area and says why.' },
      ],
    },
    {
      group: 'Wizard',
      entries: [
        { name: 'Wizard', summary: 'A task done in steps inside a screen, driven by its step definitions, with useWizard behind it.' },
        { name: 'WizardStep', summary: 'One step: heading, description, an error on top, then the fields.' },
        { name: 'WizardNav', summary: 'The action bar of a wizard: Cancel, Back and Next built from the step, with a busy state.' },
        { name: 'WizardReview', summary: 'The last step: what was chosen per step, each with Edit.' },
        { name: 'WizardExitGuard', summary: 'Asks before unsaved input is thrown away.' },
      ],
    },
    {
      group: 'Navigation',
      entries: [
        { name: 'SideNav', summary: 'Grouped section navigation with search, or an app rail.' },
        { name: 'HeaderAnchorNav', summary: 'Pill links in a page header that jump to its sections, with counts.' },
        { name: 'FloatingSwitch', summary: 'A floating toggle between two views.' },
      ],
    },
    {
      group: 'Layout',
      entries: [
        { name: 'SplitPane', summary: 'Two panes with a draggable, collapsible divider.' },
        { name: 'MasterDetailLayout', summary: 'A list beside the detail of the selected item.' },
        { name: 'MasterDetail', summary: 'A ManagedList beside an editor that asks before unsaved edits are lost.' },
        { name: 'SideNavLayout', summary: 'A side nav beside a content pane; its search shows results in the pane.' },
        { name: 'ContentHeader', summary: 'The header of a page, card or panel: an icon and a title over a fading backdrop.' },
      ],
    },
    {
      group: 'Lists',
      entries: [
        { name: 'ListItemRow', summary: 'One selectable row: icon, name and meta, any number of two-line columns that line up in a list, and an action.' },
        { name: 'GroupTree', summary: 'A keyboard tree of groups with guides, icons and counts, and the items as leaves.' },
        { name: 'SearchResults', summary: 'The search pane: a summary with page chips over groups of matches.' },
        { name: 'SearchResultGroup', summary: 'One group of matches: glowing icon, title, count and an open button.' },
        { name: 'SearchResultHit', summary: 'One match: icon, label with the match marked, and its path.' },
        { name: 'ManagedList', summary: 'The list side of a list and editor screen: count, New, filter, groups, rename, delete and states.' },
        { name: 'FileList', summary: 'One row per file: its type icon, name, size and date, with Open and Show in folder.' },
      ],
    },
    {
      group: 'Settings',
      entries: [
        { name: 'SettingsPage', summary: 'A settings page header with tabs over a scrolling body.' },
        { name: 'SettingsSection', summary: 'One section of settings: a title with reset, and groups of rows with locks.' },
        { name: 'SettingsRow', summary: 'One setting: title, description, a live hint and its control, compact or read only.' },
      ],
    },
    {
      group: 'Menus',
      entries: [
        { name: 'DropdownMenu', summary: 'A menu of actions, checks and submenus.' },
        { name: 'CommandPalette', summary: 'A search box over the window for screens, settings and actions.' },
        { name: 'CommandPaletteRow', summary: 'One result row: icon, label, breadcrumb, check or toggle.' },
        { name: 'ControlMenu', summary: 'A dropdown of settings, each a compact control, joined to its button.' },
      ],
    },
    {
      group: 'Actions',
      entries: [
        { name: 'ConfirmIconButton', summary: 'An icon button that asks once before it acts.' },
        { name: 'ActionBar', summary: 'The actions on one item in a row that folds the rest into More when narrow.' },
        { name: 'CopyButton', summary: 'Copies a text to the clipboard and says Copied.' },
      ],
    },
    {
      group: 'Inputs',
      entries: [
        { name: 'DynamicInput', summary: 'One field built from a pattern: typed slots, muted text, icons and actions, with a control per slot.' },
        { name: 'VolumeControl', summary: 'A mute button beside a volume slider, with the icon following the level.' },
        { name: 'ColorPicker', summary: 'A full colour picker with hex and fields.' },
        { name: 'ColorPickerPopover', summary: 'A swatch that opens the picker.' },
        { name: 'KeyValueEditor', summary: 'A map of names to values, row by row, with a duplicate check and an add row.' },
      ],
    },
    {
      group: 'Forms',
      entries: [
        { name: 'InlineCreateForm', summary: 'A name field that creates one thing in place, boxed or on one line.' },
        { name: 'RecordEditor', summary: 'Edits one record, form derived from its schema.' },
        { name: 'ValidationSummary', summary: 'What blocks a save, each problem a link to its field, the rest under and N more.' },
        { name: 'FormRow', summary: 'One option of a long form: name and help, its control, changed mark and reset.' },
        { name: 'FormGroupTabs', summary: 'The top of a long form in groups: search, Show advanced and tabs with counts.' },
        { name: 'RowGrid', summary: 'A short list edited in place, a row per item: a table when wide and labelled cards when narrow.' },
        { name: 'SaveBar', summary: 'The foot of an editor: whether it is saved, why a save failed, and Save and Discard.' },
      ],
    },
    {
      group: 'Data views',
      entries: [
        { name: 'DataTable', summary: 'Sortable, groupable, resizable table with saved layouts.' },
        { name: 'FilterBar', summary: 'A search box and filter chips, each added with + and edited in place.' },
        { name: 'CompactRecordView', summary: 'One record read-only, with differences marked.' },
        { name: 'Field kits', summary: 'The editor, cell and filter for each field kind.' },
      ],
    },
    {
      group: 'Charts',
      entries: [
        { name: 'StatTile', summary: 'One headline number with its unit, its change and a small chart.' },
      ],
    },
    {
      group: 'Content',
      entries: [
        { name: 'LogPanel', summary: 'A live log in one framed box: a FilterBar toolbar, tones per type, older lines on demand.' },
        { name: 'FactsPanel', summary: 'Label and value pairs in a bordered box, in groups split by hairlines.' },
        { name: 'Hero', summary: 'The top of a home screen: backdrop, art, title, actions and facts on glass.' },
        { name: 'PixelWordmark', summary: 'A wordmark set in the pixel alphabet from a text and four colours.' },
        { name: 'TaskProgress', summary: 'One long job: a bar, the current line, its steps, the error and a folded log.' },
        { name: 'CheckList', summary: 'The results of a list of checks: pass, advice, failure, checking or skipped, with counts on top.' },
        { name: 'ItemCard', summary: 'One item of a catalogue as a card: media, eyebrow, status, title, tags, details and actions.' },
        { name: 'ActionTile', summary: 'One headline value in a tile that also does one thing: an action, a copy or a way in.' },
        { name: 'CopyValue', summary: 'A value to copy, such as an address or a key, with a copy button at its end.' },
        { name: 'Video', summary: 'A video player with its own control bar, keys and error state.' },
        { name: 'ShortcutList', summary: 'Keys, clicks and drags in one column, what each does in the next.' },
        { name: 'CodeBlock', summary: 'Highlighted code in a panel, with line marks, numbers and a copy button.' },
      ],
    },
    {
      group: 'Input devices',
      entries: [
        { name: 'PressedGrid', summary: 'A grid of buttons that light up while held.' },
        { name: 'StickPlot', summary: 'Where an analog stick points, with dead zones and calibration marks.' },
        { name: 'KeyboardLayout', summary: 'A full keyboard drawn from data, with keys lit or pressed.' },
        { name: 'ShortcutTour', summary: 'A camera that walks a keyboard through a shortcut, key by key.' },
      ],
    },
    {
      group: 'Widgets',
      entries: [
        { name: 'DockLayout', summary: 'Tiles widget panes around a main view, with drag, drop and resize.' },
        { name: 'Widget', summary: 'The frame of a tool panel: title bar, tabs, pop out, options, close.' },
        { name: 'WidgetOptions', summary: 'The gear options of one widget, in a ControlMenu: placement, make room, opacity, show.' },
        { name: 'WindowGuideOverlay', summary: 'A dimmed guide over the window that lists the keys while one is moved or resized.' },
      ],
    },
    {
      group: 'Windows',
      entries: [
        { name: 'WindowTitleBar', summary: 'An app window title bar with brand, slots and window buttons.' },
        { name: 'WindowHeader', summary: 'A panel title bar with extras and close.' },
      ],
    },
    {
      group: 'Screens',
      entries: [
        { name: 'WorkspaceScreen', summary: 'A screen to work in: a side list of pages and the current page with its header pills.' },
        { name: 'InfoScreen', summary: 'A screen to read, such as About or credits: wide margins and one centred column.' },
        { name: 'UtilityScreen', summary: 'A compact screen for one short task: a status, details, progress and actions.' },
        { name: 'StageScreen', summary: 'One big open stage for custom work, such as calibration, with an optional toolbar.' },
        { name: 'ScreenWindow', summary: 'Building block: the plain screen window with a title, a close button and an empty container.' },
        { name: 'ScreenPage', summary: 'Building block: the page header container every screen kind shows, with its icon, title and fading backdrop.' },
        { name: 'ScreenLayer', summary: 'Building block: the overlay and the card with its gap, to build a new kind of screen.' },
      ],
    },
  ],
};

export { COMPOSITES_TIER };
