/* @layer renderer-components @kind barrel */
export { DataTable } from './DataTable';
export type {
  ColumnActions, ColumnDragBinding, DataTableProps, IdRefDefaultResolver, IdRefDisplayResolver, IdRefHrefResolver,
  IdRefTargetField, IdRefTargetFieldResolver, PickerNode,
} from './DataTable';
export { ConfirmIconButton } from './ConfirmIconButton';
export type { ConfirmIconButtonPlacement, ConfirmIconButtonProps, ConfirmIconButtonSize } from './ConfirmIconButton';
export { Dialog } from './Dialog';
export { DialogShell } from './DialogShell';
export type { DialogInitialFocus, DialogShellProps } from './DialogShell';
export {
  Wizard, WizardDialog, WizardExitGuard, WizardNav, WizardReview, WizardStep, useWizard, useWizardExit,
} from './Wizard';
export type {
  WizardApi, WizardButtonLook, WizardDialogProps, WizardExit, WizardExitGuardProps, WizardExitOptions, WizardNavProps,
  WizardOptions, WizardProblem, WizardProps, WizardReviewProps, WizardReviewSection, WizardStepButtons, WizardStepDef, WizardStepProps, WizardValues,
} from './Wizard';
export { GroupTree, type GroupTreeProps, type TreeNode } from './GroupTree';
export { HeaderAnchorNav, type HeaderAnchorNavItem, type HeaderAnchorNavProps } from './HeaderAnchorNav';
export { LogPanel } from './LogPanel';
export type { LogKindDef, LogPanelProps, LogRow } from './LogPanel';
export { ListItemList, ListItemRow } from './ListItemRow';
export type {
  ListItemColumn, ListItemColumnAlign, ListItemListProps, ListItemRowActionVisibility, ListItemRowProps, ListItemRowRole, ListItemShape,
} from './ListItemRow';
export { ListDetailLayout } from './ListDetailLayout';
export type { ListDetailLayoutProps } from './ListDetailLayout';
export { SplitPane } from './SplitPane';
export type { CollapsedSide, SplitOrientation, SplitPaneProps } from './SplitPane';
export { SettingsRow } from './SettingsRow';
export type {
  SettingsDescription, SettingsInput, SettingsInputKind, SettingsInputOf, SettingsItem, SettingsLoadProblem, SettingsOption, SettingsRowAction,
  SettingsRowLook, SettingsRowProps,
} from './SettingsRow';
export { filterSettingsSections, SettingsSection } from './SettingsSection';
export type { SettingsContentRow, SettingsGroupData, SettingsLock, SettingsLockRenderer, SettingsSectionData, SettingsSectionLook, SettingsSectionProps, SettingsSectionRow } from './SettingsSection';
export { SettingsPage } from './SettingsPage';
export type { SettingsPageAnchor, SettingsPageProps, SettingsPageTabs } from './SettingsPage';
export { SideNavLayout } from './SideNavLayout';
export type { SideNavLayoutPaneScroll, SideNavLayoutProps } from './SideNavLayout';
export { SearchResults } from './SearchResults';
export type { SearchResultsGroup, SearchResultsHit, SearchResultsJump, SearchResultsProps } from './SearchResults';
export { SearchResultGroup } from './SearchResultGroup';
export type { SearchResultGroupProps } from './SearchResultGroup';
export { SearchResultHit } from './SearchResultHit';
export type { SearchResultHitProps } from './SearchResultHit';
export { InlineCreateForm } from './InlineCreateForm';
export type { InlineCreateFormProps } from './InlineCreateForm';
export { Drawer, type DrawerProps } from './Drawer';
export { DropdownMenu } from './DropdownMenu';
export type {
  DropdownMenuProps, MenuAlign, MenuGroup, MenuIconSide, MenuIntensity, MenuItem, MenuItemKind, MenuItemTone, MenuNode, MenuSeparator, MenuSide,
  MenuSize, MenuTrigger, MenuTriggerIcon, MenuVariant,
} from './DropdownMenu';
export { ScreenLayer } from './ScreenLayer';
export type { ScreenLayerProps, ScreenLayerSize } from './ScreenLayer';
export { ScreenWindow } from './ScreenWindow';
export type { ScreenWindowHeader, ScreenWindowProps } from './ScreenWindow';
export { ScreenPage, type ScreenPageProps } from './ScreenPage';
export { WorkspaceScreen } from './WorkspaceScreen';
export type {
  WorkspaceContent, WorkspaceGroup, WorkspacePage, WorkspaceScreenProps, WorkspaceSearch,
} from './WorkspaceScreen';
export { InfoScreen, type InfoScreenProps, type InfoScreenWidth } from './InfoScreen';
export { UtilityScreen } from './UtilityScreen';
export type {
  UtilityScreenAction, UtilityScreenNotes, UtilityScreenProgress, UtilityScreenProps, UtilityScreenReport, UtilityScreenStatus, UtilityScreenTone,
} from './UtilityScreen';
export { StageScreen, type StageScreenDone, type StageScreenProps } from './StageScreen';
export { FloatingSwitch, type FloatingSwitchItem, type FloatingSwitchProps } from './FloatingSwitch';
export { KeyboardLayout, KEYBOARD_SIZES } from './KeyboardLayout';
export type { KeyboardLayoutProps, KeyboardSize, KeyboardTarget, KeyRect, KeyRects } from './KeyboardLayout';
export { PressedGrid, type PressedGridItem, type PressedGridProps } from './PressedGrid';
export { StickPlot, type StickPlotPoint, type StickPlotProps, type StickPlotRange, type StickPlotSize } from './StickPlot';
export { ShortcutTour, type ShortcutTourProps } from './ShortcutTour';
export { SideNav } from './SideNav';
export type { SideNavConfig, SideNavGroup, SideNavItem, SideNavProps, SideNavSearch, SideNavVariant } from './SideNav';
export { WindowHeader, type WindowHeaderProps } from './WindowHeader';
export { WindowTitleBar } from './WindowTitleBar';
export type {
  WindowControl, WindowControlsConfig, WindowTitleBarAction, WindowTitleBarActionBar, WindowTitleBarCommandAction,
  WindowTitleBarDropdownAction, WindowTitleBarInstance, WindowTitleBarProps,
} from './WindowTitleBar';
export { Hero } from './Hero';
export type { HeroArt, HeroBackdrop, HeroImageFit, HeroProps, HeroShade } from './Hero';
export { FactsPanel } from './FactsPanel';
export type { FactsPanelFact, FactsPanelGroup, FactsPanelLayout, FactsPanelProps } from './FactsPanel';
export { CommandPalette, CommandPaletteRow } from './CommandPalette';
export type {
  CommandPaletteGroup, CommandPaletteItem, CommandPaletteProps, CommandPaletteRowProps, CommandPaletteToggle,
} from './CommandPalette';
export { GuidedTour, TourSpot, useGuidedTour } from './GuidedTour';
export type {
  GuidedTourApi, GuidedTourOptions, GuidedTourProps, TourAdvance, TourEnterContext, TourMascotMove, TourSpotProps, TourSpotTarget, TourStep,
  TourStepMascot, TourTarget,
} from './GuidedTour';
export { DisabledOverlay } from './DisabledOverlay';
export type { DisabledOverlayProps } from './DisabledOverlay';
export {
  Widget, WidgetManager, WidgetOptions, useWidgetLayout, createDefaultLayout, getDevOnlyWidgetIds, getWidgetDefinition,
  migrateLayout, loadLayoutForProfile, loadLayoutLocal, saveLayoutForProfile, saveLayoutLocal, applyEdit, dockOnEdge, dockWidget,
  dropFrame, edgeOf, floatInMain, floatWidget, frameOf, isWidgetOpen, moveMain, openStartupWidgets, openWidget, placementOf,
  popOutWidget, removeEverywhere, resolveSplit, setFrame, setMakeRoom, setPopped, visibleLayoutOf, DEFAULT_LAYOUT_STORAGE_KEY,
  WIDGET_OPTIONS_ATTRIBUTE,
} from './Widget';
export type {
  DockPlace, FlatWidgetLayout, FlatWidgetState, PinMode, PoppedWidget, ResolvedSplit, SnapLink, SnapSide, StartupOverride,
  UseWidgetLayoutParams, WidgetBodyLook, WidgetContextActive, WidgetDefinition, WidgetDisabledState, WidgetFrame, WidgetGates, WidgetLayout,
  WidgetManagerProps, WidgetOptionsProps, WidgetPadding, WidgetPersistenceIO, WidgetPlacement, WidgetProps, WidgetTab, WidgetVisibility,
  WidgetWindowOptions, WindowBounds,
} from './Widget';
export { WindowGuideOverlay } from './WindowGuideOverlay';
export type { WindowGuideHint, WindowGuideMode, WindowGuideOverlayProps, WindowGuidePointer } from './WindowGuideOverlay';
export {
  DockLayout, EDGES, GAP, MAIN_NODE, STRIP, createPane, evenSplit, findLeaf, floatingRect, holdsMain, insertAt, layoutTree,
  mainRectOf, paneOf, patchPane, placeFloating, removeLeaf, removeWidget, resizeSplit, swapPanes, toFloating, useDockKeys,
  widgetsIn, wrapBeside,
} from './DockLayout';
export type {
  DividerRect, DockEdge, DockKeys, DockLayoutProps, DockMainGrip, DockTarget, DockTree, DragModifiers, DropTarget, ExternalDrag, FloatingWidget,
  LaidOut, LayoutEdit, LayoutNode, LeafNode, LeafRect, MainNode, MainTarget, PaneNode, Rect, ScreenPoint, Size, SplitAxis, SplitNode, WidgetId,
} from './DockLayout';
export { FilterBar } from './FilterBar';
export type { FilterBarProps } from './FilterBar';
export { RecordEditor, ReferencedBy } from './RecordEditor';
export type {
  EditorGroupModel, IdRefOption, IdRefOptionResolver, NumberBounds, NumberBoundsResolver,
  RecordEditorProps, ReferencedByHit, ReferencedByProps, TagCreateResult, TagCreator, TagSuggestionResolver,
} from './RecordEditor';
export { DeleteGuardDialog } from './DeleteGuardDialog';
export type { DeleteGuardDialogProps } from './DeleteGuardDialog';
export { CreateRecordDialog } from './CreateRecordDialog';
export type { CreateOutcome, CreateRecordDialogProps } from './CreateRecordDialog';
export { CompactRecordView } from './CompactRecordView';
export type { CompactIdRefResolver, CompactRecordViewProps, FieldDifference } from './CompactRecordView';
export { DynamicInput, escapePatternText, parsePattern } from './DynamicInput';
export { VolumeControl } from './VolumeControl';
export type { VolumeControlProps } from './VolumeControl';
export type {
  DynamicInputProps, ParsedPattern, PatternAction, PatternActions, PatternChoice, PatternIcons, PatternLists, PatternPart,
  PatternSetup, PatternSlotCase, PatternSlotChars, PatternSlotConfig, PatternSlotConfigs, PatternSlotControl, PatternSlotSpec,
  PatternSlotType, PatternSlotValue, PatternValue,
} from './DynamicInput';
export { ContentHeader } from './ContentHeader';
export type { ContentHeaderLevel, ContentHeaderProps } from './ContentHeader';
export { StatTile } from './StatTile';
export type { StatTileChartPlacement, StatTileProps, StatTileSize, StatTrend, StatTrendMeaning } from './StatTile';
export { ControlMenu, ControlMenuGroup, ControlMenuRow, ControlMenuSub } from './ControlMenu';
export type { ControlMenuGroupProps, ControlMenuProps, ControlMenuRowProps, ControlMenuSubProps } from './ControlMenu';
export { TaskProgress } from './TaskProgress';
export type { TaskProgressProps, TaskState } from './TaskProgress';
export { JobDialog } from './JobDialog';
export type { JobDialogProps } from './JobDialog';
export { ActionBar } from './ActionBar';
export type { ActionBarAlign, ActionBarProps, ActionConfirm, ActionItem, ActionKind } from './ActionBar';
export { ValidationSummary } from './ValidationSummary';
export type { ValidationProblem, ValidationSummaryProps, ValidationTone } from './ValidationSummary';
export { CheckList } from './CheckList';
export type { Check, CheckListProps, CheckState } from './CheckList';
export { ItemList } from './ItemList';
export type { ItemListCreate, ItemListFilter, ItemListGroup, ItemListGroupAction, ItemListProps, ItemListRowParts } from './ItemList';
export { ListDetail } from './ListDetail';
export type { ListDetailGuardLook, ListDetailListProps, ListDetailProps, ListDetailSave } from './ListDetail';
export { FileList } from './FileList';
export type { FileEntry, FileListProps } from './FileList';
export { ItemCard } from './ItemCard';
export type { ItemCardLayout, ItemCardMediaTone, ItemCardProps, ItemCardStatus } from './ItemCard';
export { CopyButton } from './CopyButton';
export type { CopyButtonProps, CopyButtonSize, CopyText } from './CopyButton';
export { CopyValue, type CopyValueProps, type CopyValueSize, type CopyValueTruncate } from './CopyValue';
export { Video } from './Video';
export type { VideoProps } from './Video';
export { Splash } from './Splash';
export type { SplashAction, SplashBar, SplashProgress, SplashProps } from './Splash';
export { ShortcutList, type ShortcutGesture, type ShortcutListGroup, type ShortcutListItem, type ShortcutListProps } from './ShortcutList';
export { CodeBlock, type CodeBlockLanguage, type CodeBlockProps } from './CodeBlock';
export { ActionTile } from './ActionTile';
export type {
  ActionTileAction, ActionTileCopy, ActionTileProps, ActionTileRun, ActionTileSize, ActionTileStatus, ActionTileTool, ActionTileToolCopy,
  ActionTileTone, ActionTileToolRun,
} from './ActionTile';
export { KeyValueEditor } from './KeyValueEditor';
export type { KeyValueEditorProps, KeyValueEntry, KeyValueKind, KeyValueRecord } from './KeyValueEditor';
export { FormRow } from './FormRow';
export type { FormRowProps } from './FormRow';
export { FormGroupTabs } from './FormGroupTabs';
export type { FormGroupTab, FormGroupTabsProps } from './FormGroupTabs';
export { RowGrid, type RowGridColumn, type RowGridDensity, type RowGridProps } from './RowGrid';
export { SaveBar, type SaveBarProps, type SaveBarState } from './SaveBar';
export { RetryButton, type RetryButtonProps } from './RetryButton';
export { LoadError, type LoadErrorProps, type LoadErrorVariant } from './LoadError';
export { ErrorBoundary, type ErrorBoundaryProps } from './ErrorBoundary';
export { CommandInput, type CommandEntry, type CommandInputProps, type CommandOption, type CommandSubmit } from './CommandInput';
export { PasswordInput, type PasswordInputProps, type PasswordMode, type PasswordRule, type PasswordScore, type PasswordStrength, type PasswordStrengthLevel } from './PasswordInput';
export { namespacedTag, TagInput, type TagAdvice, type TagInputProps, type TagValidationResult, type TagValidator } from './TagInput';
export { Toast, ToastStack, toast, type ToastAction, type ToastApi, type ToastInput, type ToastItem, type ToastPosition, type ToastProps, type ToastStackProps, type ToastVariant } from './Toast';
export { PathInput, type PathBrowse, type PathInputProps, type PathKind } from './PathInput';
