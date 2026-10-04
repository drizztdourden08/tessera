/* @layer root-config @kind data */
const TIER_ICONS: Record<string, string> = { Core: 'atom', Primitives: 'box', Composites: 'boxes', Data: 'database', Preview: 'flask-conical' };

const GROUP_ICONS: Record<string, string> = {
  'Core · Setup': 'rocket', 'Core · Brand': 'gem', 'Core · Colours': 'palette', 'Core · Typography': 'type', 'Core · Text': 'pilcrow',
  'Core · Icons': 'shapes', 'Core · Tokens': 'ruler',
  'Primitives · Layout': 'layout-grid', 'Primitives · Display': 'monitor', 'Primitives · Charts': 'chart-spline', 'Primitives · Actions': 'mouse-pointer-click',
  'Primitives · Inputs': 'text-cursor-input', 'Primitives · Feedback': 'message-square-warning', 'Primitives · Navigation': 'compass',
  'Composites · Dialogs': 'app-window', 'Composites · Overlays': 'layers', 'Composites · Wizard': 'wand-sparkles',
  'Composites · Navigation': 'signpost', 'Composites · Layout': 'layout-panel-left', 'Composites · Lists': 'list-tree',
  'Composites · Settings': 'settings', 'Composites · Menus': 'menu', 'Composites · Actions': 'square-mouse-pointer',
  'Composites · Inputs': 'text-cursor-input', 'Composites · Forms': 'clipboard-pen-line',
  'Composites · Data views': 'table', 'Composites · Charts': 'chart-column', 'Composites · Content': 'newspaper', 'Composites · Input devices': 'gamepad-2',
  'Composites · Widgets': 'blocks', 'Composites · Windows': 'app-window-mac', 'Composites · Screens': 'panels-top-left', 'Data': 'database',
  'Preview · For approval': 'clipboard-check',
};

const PAGE_ICONS: Record<string, Record<string, string>> = {
  'Core · Setup': {
    'Setup': 'package-plus', 'TesseraProvider': 'replace', 'Building compounds': 'component',
    'Building views': 'layout-panel-top', 'App primitives and composites': 'puzzle', 'Static splash': 'power',
  },
  'Core · Brand': {
    Brand: 'stamp', InteractiveTessera: 'grid-2x2',
    Logo: 'badge-check', WordMark: 'signature', Combined: 'layers-2', Mascot: 'bot',
  },
  'Core · Colours': { Swatches: 'swatch-book', Palettes: 'paintbrush', Roles: 'tags', Contrast: 'contrast', Gradients: 'blend' },
  'Core · Typography': {
    'Fonts': 'type', 'Weights': 'bold', 'Sizes': 'a-large-small', 'Optical size and italic': 'italic',
    'OpenType features': 'ligature', 'Transform and style': 'case-sensitive',
  },
  'Core · Text': {
    'Text': 'text', 'All elements': 'list', 'Title': 'heading', 'TextElement': 'code-xml', 'Paragraph': 'pilcrow', 'Span': 'text-cursor',
    'Strong': 'bold', 'Emphasis': 'wand', 'Bold': 'bold', 'Italic': 'italic', 'Underline': 'underline',
    'Strikethrough': 'strikethrough', 'Deleted': 'eraser', 'Inserted': 'square-plus', 'Highlight': 'highlighter',
    'Small': 'a-arrow-down', 'Subscript': 'subscript', 'Superscript': 'superscript', 'Code': 'code', 'Sample': 'terminal',
    'Variable': 'variable', 'Abbreviation': 'whole-word', 'Citation': 'book-open', 'BlockQuote': 'text-quote',
    'Definition': 'book-a', 'Time': 'clock', 'Data': 'binary', 'Address': 'map-pin', 'Preformatted': 'file-code',
    'BidiIsolate': 'arrow-left-right', 'BidiOverride': 'arrow-right-left', 'Ruby': 'languages', 'RubyText': 'captions',
    'RubyParenthesis': 'parentheses', 'Shortcut': 'keyboard', 'Quote': 'quote', 'CodeBlock': 'square-code', 'Emphasis animation': 'wand-sparkles',
  },
  'Core · Icons': { 'Icon': 'shapes', 'Brand icons': 'badge', 'Glyph': 'pen-tool', 'InputIcon': 'joystick', 'PathIcon': 'spline', 'EmojiIcon': 'smile' },
  'Core · Tokens': {
    'Size scale': 'ruler', 'Sizes': 'move-diagonal', 'Margin': 'expand', 'Padding': 'shrink', 'Gap': 'separator-vertical',
    'Radius': 'square-round-corner', 'Shadows': 'layers', 'Z-index': 'layers-3', 'Durations': 'timer',
    'Easings': 'chart-spline', 'Transitions': 'arrow-right-left',
  },
  'Primitives · Layout': {
    Box: 'square', Flex: 'columns-3', Stack: 'rows-3', Grid: 'grid-3x3', Center: 'align-horizontal-justify-center',
    Spacer: 'space', Divider: 'separator-horizontal', Card: 'square-stack', ScrollArea: 'scroll', Portal: 'door-open',
    Anchored: 'anchor', Floating: 'picture-in-picture-2',
  },
  'Primitives · Display': {
    SectionHeader: 'heading-1', TermList: 'book-text', StatRow: 'chart-bar', Badge: 'badge', Status: 'activity', Tag: 'tag',
    EmptyState: 'inbox', Image: 'image', Thumbnail: 'gallery-thumbnails', Video: 'video', Canvas: 'frame', Svg: 'vector-square', ScaleLabels: 'ruler-dimension-line',
    ShortcutList: 'keyboard',
  },
  'Primitives · Actions': { Button: 'mouse-pointer-click', IconButton: 'circle-plus', ButtonRow: 'rectangle-ellipsis', ButtonGroup: 'group', Pressable: 'pointer', Link: 'link', RetryButton: 'refresh-cw' },
  'Primitives · Inputs': {
    TextInput: 'text-cursor-input', SearchInput: 'scan-search', CommandInput: 'square-terminal', PasswordInput: 'lock-keyhole', Textarea: 'letter-text', NumberInput: 'hash', NumberStepper: 'diff', Checkbox: 'square-check',
    Toggle: 'toggle-right', ToggleGroup: 'toggle-left', RadioGroup: 'circle-dot', SegmentedControl: 'gallery-horizontal',
    Select: 'chevrons-up-down', Combobox: 'search', Slider: 'sliders-horizontal',
    TagInput: 'tag', TagPicker: 'tags', ColorSwatch: 'paint-bucket',
    DropZone: 'upload', Field: 'form-input', FieldControlBoundary: 'square-dashed',
    PathField: 'folder-input',
    JsonInput: 'braces',
    NamedRange: 'list-ordered',
    SetPicker: 'list-checks',
  },
  'Primitives · Feedback': {
    Spinner: 'loader', ProgressBar: 'battery-medium', ProgressRing: 'circle-dashed', Toast: 'bell', Tooltip: 'message-square',
    HintLine: 'text-quote', HintScope: 'scan-text', Callout: 'megaphone', ErrorBoundary: 'bug',
    Splash: 'rocket',
  },
  'Primitives · Navigation': { Tabs: 'panels-top-left', RouterLink: 'route', Stepper: 'git-commit-horizontal' },
  'Composites · Dialogs': {
    Dialog: 'app-window', DialogShell: 'app-window-mac', CreateRecordDialog: 'file-plus', DeleteGuardDialog: 'shield-alert',
    WizardDialog: 'wand-sparkles',
    JobDialog: 'square-activity',
  },
  'Composites · Overlays': { Overlay: 'layers-2', Drawer: 'panel-right', DisabledOverlay: 'ban' },
  'Composites · Actions': { ConfirmIconButton: 'circle-check', ActionBar: 'rectangle-ellipsis', CopyButton: 'clipboard-copy' },
  'Composites · Wizard': {
    Wizard: 'wand-sparkles', WizardStep: 'square-pen', WizardNav: 'move-horizontal',
    WizardReview: 'list-checks', WizardExitGuard: 'shield-alert',
  },
  'Composites · Navigation': { SideNav: 'list', HeaderAnchorNav: 'panel-top', FloatingSwitch: 'blend' },
  'Composites · Layout': { SplitPane: 'columns-2', MasterDetailLayout: 'layout-list', SideNavLayout: 'layout-template', ContentHeader: 'panel-top', MasterDetail: 'panels-left-bottom' },
  'Composites · Lists': {
    ListItemRow: 'list-start', GroupTree: 'folder-tree', SearchResults: 'search-check', SearchResultGroup: 'list-tree',
    SearchResultHit: 'mouse-pointer-click', ManagedList: 'list-checks',
    FileList: 'files',
  },
  'Composites · Settings': { SettingsPage: 'file-cog', SettingsSection: 'settings-2', SettingsRow: 'sliders-horizontal' },
  'Composites · Menus': { DropdownMenu: 'square-chevron-down', CommandPalette: 'command', CommandPaletteRow: 'text-search', ControlMenu: 'sliders-horizontal' },
  'Composites · Data views': {
    'DataTable': 'table', 'FilterBar': 'filter', 'CompactRecordView': 'id-card', 'Field kits': 'toolbox',
  },
  'Composites · Content': {
    LogPanel: 'logs', FactsPanel: 'table-properties', Hero: 'mountain-snow',
    PixelWordmark: 'type-outline',
    TaskProgress: 'list-todo',
    CheckList: 'clipboard-check',
    ItemCard: 'square-library',
    ActionTile: 'square-activity',
    CopyValue: 'copy',
  },
  'Composites · Inputs': { DynamicInput: 'braces', VolumeControl: 'volume-2', ColorPicker: 'pipette', ColorPickerPopover: 'paintbrush', KeyValueEditor: 'list-plus' },
  'Composites · Forms': { InlineCreateForm: 'square-pen', RecordEditor: 'file-pen-line', ValidationSummary: 'list-x', FormRow: 'rows-3', FormGroupTabs: 'folder-kanban' },
  'Composites · Input devices': {
    PressedGrid: 'grid-2x2-check', StickPlot: 'joystick', KeyboardLayout: 'keyboard-music', ShortcutTour: 'route',
  },
  'Composites · Widgets': { DockLayout: 'layout-dashboard', Widget: 'layout-panel-left', WidgetOptions: 'cog', WindowGuideOverlay: 'move' },
  'Composites · Screens': {
    WorkspaceScreen: 'panels-left-bottom', InfoScreen: 'info', UtilityScreen: 'refresh-cw', StageScreen: 'gamepad-2',
    ScreenWindow: 'app-window', ScreenPage: 'panel-top', ScreenLayer: 'fullscreen',
  },
  'Composites · Windows': { WindowTitleBar: 'app-window-mac', WindowHeader: 'heading-2' },
  'Data': { Engine: 'cpu' },
  'Primitives · Charts': { Sparkline: 'chart-spline', Gauge: 'gauge', StackedBar: 'chart-bar-stacked' },
  'Composites · Charts': { StatTile: 'trending-up' },
  'Preview · For approval': { 'Mascot stage': 'theater', EditorHeader: 'panel-top-dashed', RowGrid: 'rows-4' },
};

export { GROUP_ICONS, PAGE_ICONS, TIER_ICONS };
