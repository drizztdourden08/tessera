<!-- @layer docs @kind doc -->
# Backlog

Issues found in the components while writing their stories. Everything here came over from relic-of-the-past with the copy, so rotp has the same issue until it consumes Tessera. Fixed items are listed once so the rotp step knows the behaviour changed.

## Fixed

| Component | Issue | Fix |
|---|---|---|
| Widget | `topOffset` was accepted and ignored | docked layout reads it |
| WidgetManager | a fresh `[]` default re-ran the layout memo every render, so a caller storing insets in state looped | shared empty default; insets published only when a value changes |
| Widget | the frame was a fixed dark colour | mixed from `--c-layer` and `--c-text`, same pixels in the dark theme |
| ColorPicker | default imports of react-color's CommonJS files break under Vite 8 | imports its ES build |
| IconButton | no `type="button"`, and every icon button announced as a toggle | `type="button"`; `aria-pressed` only while active |
| Toast | close button had no `type="button"` | added |
| ProgressBar | `max = 0` gave a `NaN%` width | reads as empty |
| Badge | the warning pulse ignored reduced motion | stops under `prefers-reduced-motion` |
| StatusBadge | interactive mode was a clickable span with no role, tab stop or keys | StatusBadge merged into the read-only `Status`; the click to cycle mode is gone |
| barrels | Stepper, DropZone, Toast, Drawer, SettingsSection, `dropPanelPositionFor` and several prop types were not exported | exported |
| DropdownMenu | a type re-export sat in the middle of the file | moved to the barrel |
| DropdownMenu | `MenuItem.description` was never drawn, and nothing closed the menu on Escape or after a pick | drawn as a muted second line; `onClose` runs on Escape, Tab and after a pick |
| several | stray byte-order marks after the header comment (27 files) | removed |
| comments | DataTable, CompactRecordView, RecordEditor and the number kit pointed at rotp files and game indexes | rewritten in the design system's own terms |

## Open

| Component | Issue |
|---|---|
| TextInput, Textarea | no error or disabled styling of their own; the error state only shows through Field |
| RadioGroup | the default `name` comes from the label, so two groups with the same label share one radio set |
| Stepper | typing strips everything but digits, so negative or decimal values cannot be typed even when allowed |
| DropZone | `disabled` is enforced only by CSS; handlers do not check it. The block variant has static inline styles |
| ProgressRing | has no size of its own and stretches to its container |
| Toast | the exit `setTimeout` is not cleared on unmount |
| Tooltip | measures its anchor once and does not follow scroll |
| Card | emits `card--default` with no rule; the interactive variant has no role, tab stop or keys; hover repeats the base background |
| TermList | keyed by term, so duplicate terms collide |
| Thumbnail | no load-error fallback, unlike Image |
| Portal | creates DOM nodes during render and again in a layout effect; its layers are `pointer-events: none`, undocumented |
| ButtonRow | drops every prop but align, gap, className and children; `align` sets justify-content |
| Divider, Spacer, Icon | vertical Divider has no `aria-orientation`; Spacer takes no className; Icon is not `aria-hidden` by default and keys paths by `d` |
| Toggle | `label` is string only, while Checkbox takes a node |
| Dialog | `message` is required though it renders conditionally |
| CreateRecordDialog | resets its draft only when `open` changes |
| DeleteGuardDialog | title and confirm label are fixed strings |
| SplitPane, SectionNav, GroupTree | read their default props on first render only; SplitPane has hard-coded glyphs; SectionNav hard-codes English aria labels |
| ListItemRow | base and hover backgrounds are the same, so hover only changes the border |
| Widget | docked panes size from `100vh`/`100vw` with `position: fixed`, so a dock cannot live in part of a page |
| data engine | filters match every row until the field kits are imported, which registers the testers |
| tokens | two radius scales (`--r-*`, `--radius-*`) and two shadow sets (`--shadow-1..3`, `--shadow-dropdown/overlay/lg`) |
| size | DataTable.css (315), FilterBar.css (243), Widget.css (238), Select.css (210) and ColorPicker.css (201) exceed 200 lines |
