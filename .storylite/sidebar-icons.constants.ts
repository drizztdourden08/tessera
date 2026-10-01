/* @layer root-config @kind data */
const GROUP_ICONS: Record<string, string> = {
  'Brand': 'gem', 'Colours': 'palette', 'Typography': 'type', 'Text': 'pilcrow', 'Icons': 'shapes', 'Tokens': 'ruler',
  'Primitives · Layout': 'layout-grid', 'Primitives · Display': 'monitor', 'Primitives · Actions': 'mouse-pointer-click',
  'Primitives · Inputs': 'text-cursor-input', 'Primitives · Feedback': 'message-square-warning', 'Primitives · Navigation': 'compass',
  'Primitives · Setup': 'wrench',
  'Composites · Dialogs': 'app-window', 'Composites · Wizard': 'wand-sparkles', 'Composites · Navigation': 'signpost', 'Composites · Menus': 'menu',
  'Composites · Data views': 'table', 'Composites · Content': 'newspaper', 'Composites · Input devices': 'gamepad-2',
  'Composites · Widgets': 'blocks', 'Composites · Screens': 'panels-top-left', 'Data': 'database',
};

const PAGE_ICONS: Record<string, Record<string, string>> = {
  'Brand': {
    Brand: 'stamp', InteractiveTessera: 'grid-2x2',
    Logo: 'badge-check', WordMark: 'signature', Combined: 'layers-2', Mascot: 'bot',
  },
  'Colours': { Swatches: 'swatch-book', Palettes: 'paintbrush', Roles: 'tags', Contrast: 'contrast', Gradients: 'blend' },
  'Typography': {
    'Fonts': 'type', 'Weights': 'bold', 'Sizes': 'a-large-small', 'Optical size and italic': 'italic',
    'OpenType features': 'ligature', 'Transform and style': 'case-sensitive',
  },
  'Text': {
    'Text': 'text', 'All elements': 'list', 'Title': 'heading', 'Paragraph': 'pilcrow', 'Span': 'text-cursor',
    'Strong': 'bold', 'Emphasis': 'wand', 'Bold': 'bold', 'Italic': 'italic', 'Underline': 'underline',
    'Strikethrough': 'strikethrough', 'Deleted': 'eraser', 'Inserted': 'square-plus', 'Highlight': 'highlighter',
    'Small': 'a-arrow-down', 'Subscript': 'subscript', 'Superscript': 'superscript', 'Code': 'code', 'Sample': 'terminal',
    'Variable': 'variable', 'Abbreviation': 'whole-word', 'Citation': 'book-open', 'BlockQuote': 'text-quote',
    'Definition': 'book-a', 'Time': 'clock', 'Data': 'binary', 'Address': 'map-pin', 'Preformatted': 'file-code',
    'BidiIsolate': 'arrow-left-right', 'BidiOverride': 'arrow-right-left', 'Ruby': 'languages', 'RubyText': 'captions',
    'RubyParenthesis': 'parentheses', 'Shortcut': 'keyboard', 'Quote': 'quote', 'CodeBlock': 'square-code',
  },
  'Icons': { 'Icon': 'shapes', 'Brand icons': 'badge', 'Glyph': 'pen-tool', 'PathIcon': 'spline', 'EmojiIcon': 'smile' },
  'Tokens': {
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
    EmptyState: 'inbox', Image: 'image', Thumbnail: 'gallery-thumbnails', Video: 'video', Canvas: 'frame', Svg: 'vector-square',
  },
  'Primitives · Actions': { Button: 'mouse-pointer-click', IconButton: 'circle-plus', ButtonRow: 'rectangle-ellipsis', ButtonGroup: 'group' },
  'Primitives · Inputs': {
    TextInput: 'text-cursor-input', Textarea: 'letter-text', NumberInput: 'hash', Stepper: 'diff', Checkbox: 'square-check',
    Toggle: 'toggle-right', ToggleGroup: 'toggle-left', RadioGroup: 'circle-dot', SegmentedControl: 'gallery-horizontal',
    Select: 'chevrons-up-down', Combobox: 'search', Slider: 'sliders-horizontal', RangeInput: 'move-horizontal',
    RangeSlider: 'sliders-vertical', PositionInput: 'move', TagInput: 'tag', TagPicker: 'tags', ColorSwatch: 'paint-bucket',
    DropZone: 'upload', Field: 'form-input',
  },
  'Primitives · Feedback': {
    Spinner: 'loader', ProgressBar: 'battery-medium', ProgressRing: 'circle-dashed', Toast: 'bell', Tooltip: 'message-square',
    HintLine: 'text-quote', Callout: 'megaphone',
  },
  'Primitives · Navigation': { TabBar: 'panels-top-left' },
  'Primitives · Setup': { TesseraProvider: 'replace' },
  'Composites · Dialogs': {
    Dialog: 'app-window', DialogShell: 'app-window-mac', CreateRecordDialog: 'file-plus',
    DeleteGuardDialog: 'shield-alert', ConfirmIconButton: 'circle-check', InlineCreateForm: 'square-pen', Overlay: 'layers-2',
    Drawer: 'panel-right', FullScreenLayer: 'fullscreen', DisabledOverlay: 'ban', ErrorBoundary: 'bug',
  },
  'Composites · Wizard': {
    Wizard: 'wand-sparkles', WizardProgress: 'git-commit-horizontal', WizardStep: 'square-pen', WizardNav: 'move-horizontal',
    WizardReview: 'list-checks', WizardExitGuard: 'shield-alert',
  },
  'Composites · Navigation': {
    SideNav: 'panel-left', SectionNav: 'list', HeaderTabs: 'panel-top', FloatingSwitch: 'blend', SplitPane: 'columns-2',
    MasterDetailLayout: 'layout-list', GroupTree: 'folder-tree', ListItemRow: 'list-start', WindowHeader: 'heading-2',
    WindowTitleBar: 'app-window-mac', SettingsShell: 'settings', SettingsSection: 'settings-2', SettingsGroupList: 'list-checks',
    SettingsPage: 'file-cog', NavLayout: 'layout-template', SearchResults: 'search-check', ProfilePicker: 'users',
  },
  'Composites · Menus': { DropdownMenu: 'square-chevron-down', SearchSpark: 'sparkles', CommandPalette: 'command', CommandPaletteRow: 'text-search' },
  'Composites · Data views': {
    'DataTable': 'table', 'FilterBar': 'filter', 'RecordEditor': 'file-pen-line', 'CompactRecordView': 'id-card', 'Field kits': 'toolbox',
  },
  'Composites · Content': {
    LogPanel: 'logs', AboutPanel: 'info', FactsPanel: 'table-properties', ReleaseNotesPanel: 'notebook-text', Emphasis: 'wand-sparkles',
    ColorPicker: 'pipette', ColorPickerPopover: 'paintbrush', PixelWordmark: 'type-outline', KeyboardLayout: 'keyboard-music', ShortcutTour: 'route',
  },
  'Composites · Input devices': { CalibrationPanel: 'crosshair', PressedGrid: 'grid-2x2-check', StickPlot: 'joystick' },
  'Composites · Widgets': { DockLayout: 'layout-dashboard', Widget: 'layout-panel-left', WidgetOptions: 'cog' },
  'Composites · Screens': { Hero: 'mountain-snow' },
  'Data': { Engine: 'cpu' },
};

export { GROUP_ICONS, PAGE_ICONS };
