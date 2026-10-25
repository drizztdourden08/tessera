# @drizztdourden08/tessera

## 0.61.0

### Minor Changes

- a7072f9: FormRow and SettingsRow take `descriptionOverflow="hint"`: the description clamps to its lines with no More button, and an info mark shows the full text in a tip when it is cut. The default stays `more`, so rows that fold today are unchanged.
- 989e7e6: ItemCard takes `density="compact"` and `mediaSize="sm"` for one-row catalogue items, and ActionItem takes `iconOnly` to draw an icon button with a tooltip.

  StatusBar takes `actions`, ghost icon buttons with a tooltip at the end of the bar.

### Patch Changes

- 208bf20: DocumentTabs draws a tablist that owns only the tabs, by id, and keeps each close button outside it, so a tablist no longer holds buttons.

  Stepper names each step with its visible label and summary first, then the step number and state, so the accessible name contains the visible text.

  CollapseToggle and the edge button never draw under the 24 px minimum target, with the larger hit area kept around it.

  ColorSwatch focus draws a light ring over a dark one inside the swatch edge, so it shows on any swatch colour.

  `--c-text-faint` and `--c-text-muted` move up to 4.5:1 or more on the main ground, faint still under muted; the old faint grey is now `--c-text-disabled`, and the `tessera/no-faint-text` rule is now `tessera/no-disabled-text`.

  Toast stops its exit animation under reduced motion.

  The Brock palette grey lifts slightly, from #8a8b8d to #9b9c9e, so faint text reaches 4.5:1 on its surface too; its surface keeps the old grey through the `--p-surface` seed, so surfaces and status colours do not move.

## 0.60.0

### Minor Changes

- 373845a: Grid takes `fit` with `minColWidth`: empty column tracks collapse, so a lone child or a short row fills the width instead of one column of it.

### Patch Changes

- b99518f: ControllerSilhouette anchors and sizes now follow measured real pads. Anchor ids are unchanged.

## 0.59.0

### Minor Changes

- e341502: VirtualGrid takes `sections` instead of `items` and draws a collapsible header row over each section, with `collapsed`, `defaultCollapsed` and `onToggleSection`, and the keys move between headers and tiles.
  VirtualGrid takes `scrollRef`, `bind` and `overlay` for a marquee, and every tile carries `data-marquee-key` set to its key.
  VirtualGrid takes a `ref` with `scrollToIndex(index, align)`, and `scrollTopForSpan` gives the scroll offset of a row of any height.
  VirtualGrid takes `tileWidth` and `tileHeight` for tiles that are not square, and `useVirtualWindow` takes `readMetrics` and `rangeOf` for rows of more than one height.

### Patch Changes

- 1ab79b6: Bxel gets a file icon for its older `.bxel` format, drawn as an archive box on the usual document page, with the new `pixel-legacy` pixel icon.

## 0.58.1

### Patch Changes

- 6609dcc: DynamicInput ignores a key the slot does not accept, and moves on only at the literal separator of the pattern or when the slot is full. A partly filled text slot keeps what was typed when it loses focus and shows an incomplete message instead of being cleared.

## 0.58.0

### Minor Changes

- ae8a29d: Adds file type icons for Bxel's sprite, sheet, palette, tileset, tilemap and project files, written by `pnpm icons` as svg, ico, icns and PNGs.
  Adds the `pixel-sprite`, `pixel-tilemap` and `pixel-project` icons used as their glyphs.
- f19e40f: DynamicInput takes a `chars` option per text slot, a string or a set of the allowed characters, that replaces the slot kind and follows its case.
  It takes an `aliases` map per slot or per pattern that maps typed characters before the check, on typing and on paste.
  It takes a `validate` function per slot and per pattern that makes the control invalid and shows the message under it, and the `invalid` prop still wins.
- 382671e: Toolbar items with `options` take `openOn: 'click'` to open their menu on a press instead of on hover.
  Toolbar and tooltip `shortcut` also takes a list of `{ label, keys }`, shown in the hint as one labelled Shortcut row each.
  Toolbar takes `layout: 'list'` to draw each item as a row with its icon, name, description and shortcut for a wide panel.
- 82dc0dd: Adds `VirtualGrid`, a windowed grid of equal square tiles with a `tileSize` token, 2D arrow keys and `items`, `getKey` and `renderItem`; `VirtualList` takes a `rowHeight` size token for a row height of its own, and `Checkbox` takes an optional `tooltip` (a string or a description with a shortcut) and passes `title` to the input.

## 0.57.0

### Minor Changes

- babeca3: Adds 48 pixel icons for brushes, canvas view, file actions, sheets, tilemaps, sprite transforms, the timeline and frames.
  Each one is drawn on the 24 by 24 grid like the tool icons.
- 24acd6a: Toolbar items take an icon name or any node as `icon`, in the bar and in More.
  `useHoverOpen` and `HoverOpenParams` are now public, for opening a menu on hover from your own buttons.

### Patch Changes

- b9d2699: Uses brock-thread 0.87.1, which accepts the same standards version, so the standards override is gone.

## 0.56.2

### Patch Changes

- a150820: The tessera command now runs the Brock thread commands in this repo, so tessera launch main none --target storylite starts the catalogue on port 4400.
- 87f6dc3: A dialog now stays inside the window: its header and actions stay put and only the body scrolls.

  The open animation now fades without scaling, so buttons no longer shift.

## 0.56.1

### Patch Changes

- c56f6cc: ListDetailLayout with both panes collapsible now spaces the two seam buttons apart, each on its own pane edge, and the detail draws the same dashed fold line as the list.

  A folded detail no longer hides half of its unfold button behind the rail.

## 0.56.0

### Minor Changes

- efb2b0b: SegmentedControl and ToggleGroup options take a `tooltip` with a `description` and a `shortcut`, and the control takes `tooltipPlacement`, so icon-only options get a name on hover.

  The tooltip body moves from Toolbar into the new primitive `TooltipContent`, and the shortcut parser becomes `shortcutKeys` in Shortcut.

- 6853c6c: Add ToolbarDock, a frame that holds toolbars on the four edges of a work area, up to two lanes on each side. It draws the layout from the toolbar model and hands each toolbar its orientation and a handle for its grip. Dragging the grip moves the toolbar to another lane or side with a drop preview, refuses a full side, and hides it when dropped on the basket. Escape puts it back. The keyboard does every move too: Enter or Space on the grip picks the toolbar up and opens the move guide, arrow keys choose a side and then the outer or inner lane, Delete hides, Enter drops and Escape cancels, with each step announced. Dropping a toolbar where it already is does not change the layout.

  Add the pure layout ops (createToolbarLayout, migrateToolbarLayout, moveToolbar, hideToolbar, showToolbar, toggleToolbar, isToolbarShown, canShowToolbar, toolbarOrientation), the useToolbarLayout hook for a controlled layout, and toolbarMenuGroups, which builds the Toolbars menu for a DropdownMenu: one check item per toolbar and a Reset toolbars item.

  WindowGuideOverlay takes an optional title and showSnapping, so the toolbar guide says Moving toolbar and leaves out the snapping line. Its default look is unchanged. DockLayout and widget layouts are unchanged.

### Patch Changes

- 6024133: Pixel icons now render at 24, 48 or 72 px: Icon snaps any other size to the nearest multiple of its 24 px grid, so they stay crisp.
  IconButton and Button grow to hold a 24 px icon, which keeps the Toolbar tools with pixel icons sharp in both orientations.

## 0.55.0

### Minor Changes

- 6d36ac1: New composite ContextMenu: a DropdownMenu that opens at the pointer on right-click or long press, and under the focused element with Shift+F10 or the menu key, flipping to stay in the window; it also takes `open`, `point` and `onClose` to be driven by the app.

  New composite AnchorPicker: a three by three grid that picks one of nine anchors, with a `dots` or `arrows` variant, arrow keys in two dimensions and the `Anchor` type.

  SegmentedControl: the `icon` of an icon option is an icon name or any node, so pixel icons and custom nodes work, and the new `SegmentIcon` type names it.

- 241cdbb: VirtualList draws only the rows in view of a very long list of equal rows, with the arrow keys, Home, End, Page Up and Page Down, and the windowing it shares with DataTable is now the useVirtualWindow hook. useMarqueeSelect lets the user drag a rectangle over an area to pick the items inside, with Shift to add, Ctrl or Cmd to toggle, Escape to cancel and scroll near the edges, and MarqueeBox draws the rectangle.

## 0.54.0

### Minor Changes

- 4e0bb71: Bxel, the pixel art editor, joins the family as a brand. The `bxel` palette is new: import `@drizztdourden08/tessera/palettes/bxel.css` and set `data-palette="bxel"`. Violet is the primary colour, crimson the secondary, magenta the tertiary, with Night as the black and Mist as the white. `BrandApp` takes `bxel`, and `BRAND_FAMILY.bxel` carries its wide mark, its square icon, its wordmark, gradient and backdrop. The wide mark is the Merge 1 logo drawn as paths and stays for wide spaces. The square app icon is the crimson pixel B on a Night tile: `BrandInfo` has a new optional `iconMark`, and `BrandMark variant="app-icon"` and `pnpm icons` draw it in place of the mark. On the dark gradient the wide mark takes the light outline. The splash file draws a mark at least twice as wide as it is tall at half the canvas, and the static splash kit has `ts-mark--wide` for it. The icon files are written under `brand/bxel`, `brand/light-rim` and `brand/dark-ground`, and the Bxel gradient and backdrop tokens are in `brand.css`. Bxel appears in the brand pages and in the app switcher of the gallery. It has no mascot yet.
- 593e5ac: ControllerLayout, StickPlot and PressedGrid are removed: the controller feature is a Brock plugin, and it builds its live parts there. Tessera keeps the plain parts: `ControllerSilhouette` with its paths, anchors and view box, `InputIcon` and the input icon sets. Build a live layout on those.
- 6ab897c: New `FloatingPrompt` composite: a bar in the look of a Toast that floats at the foot of a region, asks a question with actions from data such as Apply and Cancel, and blocks that region until it is answered. It blocks its parent by default or the whole window with `scope="window"`, moves focus into the bar and back, and runs the action marked `cancel` on Escape.
- bfb2882: New `--c-focus` colour role, `var(--c-primary)` by default, used by every focus ring. New `--p-surface` seed, `var(--p-tertiary)` by default, that tints the surface, sunken and border ladder.
- bd88262: Icon draws pixel art icons through the same `name` prop: `pixel-pencil`, `pixel-eraser` and the rest of the tool rail, drawn on a 24 by 24 grid in one colour. They stay crisp at 24, 48 and 72 px.
- 363e91a: WindowTitleBar takes `viewItems`, menu nodes the app adds to its View sub-menu after Tessera's own rows and a separator. With `view={false}` and `viewItems` set, the main menu still draws a View sub-menu holding only those entries.
- ed2abb8: Adds the toolbar layout model for the coming ToolbarDock: a JSON-safe `ToolbarLayout` with at most two toolbars per side. Pure ops create, migrate, move, hide, show and toggle it: `createToolbarLayout`, `migrateToolbarLayout`, `moveToolbar`, `hideToolbar`, `showToolbar`, `toggleToolbar`, `isToolbarShown`, `canShowToolbar` and `toolbarOrientation`.
- b8a47d7: New composite Toolbar. It is a row or a column of tools built from data: buttons, toggles, groups of choices, a number and separators, each with a hint that shows its name, description and shortcut. A tool with `options` opens a DropdownMenu on hover, below a row and beside a column, and items that do not fit fold into More. An optional `handle` draws a grip that a dock can wire through `handleProps`. Exports: `Toolbar` and its item types.

  DropdownMenu can open to the `right` or `left` of its anchor and flips when there is no room. It also takes `openOnHover` on a trigger, and `hover` and `focusOnOpen` on an anchored menu. Tooltip takes `right` and `left` as placements.

### Patch Changes

- 67b2150: ColorSwatch forwards its ref to its button, so an app can anchor a popover to it. Select draws `options` before `groups` when both are given, in place of dropping `options`. The ColorPicker usage says ColorPicker and ColorPickerPopover are imported from `/color-picker` and `/color-picker-popover`, which keep the colour library out of an app that never uses them.
- 308022a: The composites barrel is split into grouped barrels for maintenance; the public exports are unchanged.
- ae4d195: The drop hints, drop preview, pop zone and drag ghost of DockLayout now live in a shared dock-zones folder, so other composites can use them. DockLayout users see no change.
- ca9a15c: The guide takes a usage file for a hook module, a lowercase folder with an index that a tier index re-exports. It gets its own page and a Hooks section in the index, and `reorder` is the first.

## 0.53.0

### Minor Changes

- fcb5675: ReorderList and SwatchGrid are removed: a layers list and a palette are the Bxel app's own, and it builds them from Tessera's parts. The drag and keyboard reorder logic they shared is now public: `useReorderDrag`, `useMoveFocus`, `reorderStep`, `columnsOf` and `REORDER_ITEM_SELECTOR`, with their types. Build such lists on those hooks, `ColorSwatch`, `ListItemRow` and `IconButton`.
- ac388f6: Card takes `fill`, which makes its body take the card height left under the header and scroll when the child is taller. FactsPanel takes `framed`, and `framed={false}` drops the border, background and padding so it sits inside a Card.
- c801e0b: Adds the checkerboard tokens --c-checker-a, --c-checker-b and --checker-size and the grid line token --c-grid-line, and ColorSwatch uses them for its transparent checkerboard. PixelViewport, merged earlier and never released, is removed; it lives in the Bxel app.
- 9bfcc94: DataTable takes `defaultExpanded`, a list of group keys or a function, to choose which groups start open. It draws only the rows in view from `virtualizeFrom` rows (200 by default), so a group of hundreds of rows stays fast.
- 8789b5a: New composite DocumentTabs. It is the strip of open documents above an editor, such as the drawings of a pixel art editor. Each tab has a title cut with an ellipsis, an optional icon, a hover text, an unsaved dot that turns into the close button on hover or focus, and a close button named Close and the title. A middle click closes a tab. The user puts the tabs in order by dragging or with Alt and Left or Right, through the shared `src/composites/reorder` folder. The strip is a tablist: Left and Right move focus, Home and End go to the ends, Enter or Space activates, and Delete or Ctrl and W asks to close the focused tab. The app keeps `tabs` and `activeId` and can refuse a close in `onClose`. When the tabs do not fit, the strip scrolls with the active tab kept in view, and `overflowMenu` adds a DropdownMenu that lists every tab. Exports: `DocumentTabs`, `DocumentTab` and `DocumentTabsProps`.

  ScrollStrip takes a new optional `trackProps`, the ARIA attributes of its track, so a strip can name its tablist.

- ce308bb: Exports ownerWindowOf, ownerDocumentOf and observeResize from the primitives path, and adds the focus-ring.css and visually-hidden.css entry points. Apps no longer copy these helpers locally.
- 2e314b4: SettingsRow and the content rows of SettingsSection take an optional `hint`. A missing, empty or blank hint draws no hint line, so the row keeps no room for it.
- 8c6efbc: WindowTitleBar actions take `disabled`, which makes the button and its main menu row inert. `disabledReason` replaces the tooltip text while the action is disabled.
- de71a72: New icons `eraser`, `paint-bucket`, `pipette` and `hand` for the tools of a drawing editor. They are the Lucide icons of the same names, in the interface set.

### Patch Changes

- 42df5a1: `ControllerSilhouette` redraws its `offset`, `symmetric` and `nintendo` outlines. Each is still one closed line with no fill, mirrored from one half, in the same `0 0 400 260` viewBox. The curves are smoother, with no kinks or wobbles, and the grips, shoulders and the notch between the grips follow the new references more closely. `pad` is unchanged. `CONTROLLER_SILHOUETTE_PATHS` follows the new drawings, and `CONTROLLER_SILHOUETTE_ANCHORS` moves each control of those three variants to where it sits on the reference pad, so an app that places marks from the anchors needs no change. The three outlines are drawn by hand with reference to Noun Project icons: [XBOX Controller](https://thenounproject.com/icon/xbox-controller-5652517/) by Daniel Finnegan, [pro controller](https://thenounproject.com/icon/pro-controller-5602909/) by Eliran Bensadoun and [playstation controller](https://thenounproject.com/icon/playstation-controller-1751312/) by dinnerchief. No path data is taken from them.
- a2a0629: ColorSwatch captions now use a dark ink on light swatch colours and keep the light ink on dark and transparent ones.

## 0.52.0

### Minor Changes

- 5701fa8: `ControllerSilhouette` draws the outline of a controller for the app to draw on. It is one closed, stroked line with no fill, no shading and nothing drawn for a button, stick or trigger. Shoulders show only where they stick out past the body, as on a real pad seen from the front. `variant` picks the outline: `offset` for Xbox shapes, `symmetric` for PlayStation shapes, `nintendo` for Switch Pro shapes and `pad` for a pad with no sticks or triggers. Each outline is symmetric left to right and follows the proportions of the real pad. `children` render inside the SVG on top of the outline, so the app places its own glyphs, labels and leader lines. The viewBox is fixed at `0 0 400 260` for every variant and is exported as `CONTROLLER_SILHOUETTE_VIEW_BOX`. `CONTROLLER_SILHOUETTE_ANCHORS` gives where each control sits per variant in viewBox units, such as `stick.left`, `dpad`, `face`, `shoulder.right` and `meta.guide`, with a radius for the round controls. Triggers sit above their shoulder, outside the outline. `CONTROLLER_SILHOUETTE_PATHS` gives the SVG path `d` of each variant's outline, the same string the component draws, for an app that draws the outline inside its own SVG. The SVG overflow is visible, so children may draw past the box. The figure is named by `label` and the drawing is hidden from screen readers.

  ## Attribution

  - The `offset` outline is traced from "Xbox Series Controller Gold Shadow Special Edition" by Serhio Magpie, Wikimedia Commons, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: silhouette traced, mirrored into one symmetric half and refitted as curves.
  - The `symmetric` outline is traced from "Dualshock 4 Layout.svg" by Tokyoship, Wikimedia Commons, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Changes: outer silhouette only, mirrored into one symmetric half and refitted as curves.
  - The `nintendo` outline is drawn by hand from the proportions of "Nintendo.Swtich.Pro.Controller.Black.jpg" by Tim Whitehouse, Wikimedia Commons, CC0. The `pad` outline is traced from "SNES-Controller-Flat.jpg" by Evan-Amos, Wikimedia Commons, public domain.

- 1fc71ff: No app in the family has a light theme, so every variant made for a light background is removed. BrandMark, Logo and Logo.Combined lose their `ground` prop; inside Splash a mark still takes its dark look by itself. The `rim` prop and BrandRim and BrandRimTone lose the value `'dark'`, so a rim is `'none'` or `'light'`. The token `--brand-rim-dark` and the class `.brand-rim--dark` are removed. The light gradient pair, `--p-gradient-light-from`, `--p-gradient-light-to`, `--c-gradient-light-from` and `--c-gradient-light-to`, is removed from every palette, and `gradientLightFrom` and `gradientLightTo` from `tokens.json` and `splash-tokens.css`. The folders `brand/light-ground` and `brand/dark-rim` are deleted; `brand/dark-ground` and `brand/light-rim` stay as they were. The gallery drops its light cells and options, and its demo menus no longer list a Light theme. See MIGRATION.md section 271 for how an app upgrades.

## 0.51.0

### Minor Changes

- 4cd13ac: New composite ReorderList. It is a list the user puts in order by dragging the grip or with the keys, with a row of on and off icons on each item, such as visible and locked for the layers of a drawing. Describe the icons once in `toggles`, keep each item's state in its own `toggles`, and flip it in `onToggle`. Each icon is a button named by its label with aria-pressed. Arrow keys, Home and End move focus, Space or Enter selects, and Alt with Up or Down moves the row. Moves are announced. Exports: `ReorderList`, `ReorderItem`, `ReorderListProps`, `ReorderToggle` and `ReorderToggleState`.

  The drag and the keyboard step of RowGrid now come from one shared reorder folder, `src/composites/reorder`, which also handles horizontal lists. RowGrid looks and behaves as before.

- da4fbbe: New composite StatusBar, the thin bar at the foot of an editor window. It shows a row of labelled readouts, such as cursor position, zoom, current colour, sprite size, layer and frame. Each item has a label and a value, and can take an icon, a colour swatch, a tone and a hover title. An item sits at the start or the end of the bar. Numbers use tabular figures, so a cursor position does not jitter, and long text ends in an ellipsis. On a narrow bar, items with a priority from 1 to 3 drop out, 3 first. The bar is a labelled region and not a live region, so a moving cursor is never announced. It adds the tokens status-bar-h and status-bar-swatch.

### Patch Changes

- 8324a77: ListDetail shows the list count in its panel heading again, as it did before 0.46.0.
- d3e3109: The ScreenWindow corner title is a true pill again, aligned on the line of the close and lock buttons.

## 0.50.0

### Minor Changes

- 72c811d: `ControllerLayout` draws a plain outline of a controller with every input in its place, like a console test screen. `variant` picks the body: `offset` for Xbox shapes, `symmetric` for PlayStation shapes with the sticks side by side, `nintendo` for the offset body with face labels from the caller, and `pad` for a pad with no sticks or triggers. `slots` takes a state per input by its place, such as `face.south`, `dpad.up`, `trigger.left` or `stick.right.click`; `CONTROLLER_SLOT_IDS` lists them and `ControllerSlotId` is their union. A held button lights in the primary colour, triggers and shoulders fill with `value` from 0 to 1, a stick cap moves with `x` and `y` from -1 to 1 with `y` up, and a stick click lights the cap. A `label` or a `glyph` shows on or beside its control. A slot the variant has no place for, and every entry of `extras`, shows in a list under the outline, one row each. The outline grows with its card up to `--controller-layout-max-w` (640 px). Screen readers hear the figure name and a hidden list of what is held now, so a moving stick announces nothing. A new strings group, `controller`, holds the names of every input.

## 0.49.0

### Minor Changes

- 03d8d3b: ScreenWindow with no title row now shows its title in a small chip on the top left corner, on the same line as the round X. The chip has the height, surface, border and shadow of the corner buttons, small dim text and an ellipsis for a long title. Pass the new icon prop for a 14 px glyph before the title, and cornerTitle={false} to keep the corner bare. The chip text names the dialog.
- 86a5fed: Add `mediaPlacement`, hidden labels and `size` to Stepper. `mediaPlacement="below"` puts the `media` of each step under its dot, in the column of that step. `labelPlacement="hidden"` hides the name of each step from view and keeps it for screen readers, with no label row. `size="sm"` draws a smaller dot, a smaller number inside it and a tighter gap between steps. `compact` is unchanged.

## 0.48.1

### Patch Changes

- 08e8eff: Fix the folded ListDetailLayout detail rail being clipped at the right edge.

## 0.48.0

### Minor Changes

- 18ede59: Add `badge` to SideNav items: a count pill at the end of the row, shown as a dot over the icon when the nav is collapsed to its icons. A number or text becomes a pill; any other node is drawn as given.

## 0.47.0

### Minor Changes

- d20baed: Stepper can draw an editable ladder: a step takes its own `state`, `media` and a struck-through label, and the Stepper takes `selectMode="toggle"`, `labelPlacement`, `labelLines`, `dotVariant="ring"`, `stepWidth`, `mediaSize`, `scroll` and a `neutral` tone, so an app needs no Tessera selectors.

## 0.46.4

### Patch Changes

- a1ab898: Make the gap between the list pane and the detail pane of ListDetailLayout visible: 12 pixels from the medium spacing token instead of 2. The resize handle and fold buttons stay centered on the list border.

## 0.46.3

### Patch Changes

- 081117c: Add the standard small gap between the list pane and the detail pane of ListDetailLayout, from one spacing token, in pixel and ratio layouts. The resize handle and fold buttons stay centered on the list border.

## 0.46.2

### Patch Changes

- 26768c2: Add a small gap between a panel container title and its content, from one spacing token, in SidePanel, ListDetailLayout and StudioLayout.

## 0.46.1

### Patch Changes

- 7e0327d: Make the dashed resize edge the pane border, overlap the fold control on that edge, and keep pane headings neutral.

## 0.46.0

### Minor Changes

- 4b43b49: Unify collapsible pane rails, add titled primary panel containers, remove excess small-window ScreenWindow padding, and keep window guides from dimming the app.

## 0.45.0

### Minor Changes

- fab8bcb: One pane edge for SidePanel, StudioLayout, ListDetailLayout and SplitPane: the same thin line, the round fold button beside the line with a 4 px gap, and the same folded rail. Every pane resizes (`resizable` is removed from SidePanel and ListDetailLayout), and pulling a pane about 32 px narrower than its minimum folds it to its rail while dragging the rail outward opens it; the arrow keys at the end of the range do the same. The highlight on the line is a slight brighten from `--c-border-strong` to `--c-text-muted`, with no gold and no glow. `ResizeHandle` takes `fold` in place of `onCollapse`, `look`, `children` and `onClick`, and `SplitPane.snapAt` becomes `collapsible`.

## 0.44.1

### Patch Changes

- c0e2fe7: WindowTitleBar no longer flickers when it is concealed or full screen. A concealed bar drops its drag region (`data-app-region="no-drag"`), so the pointer on empty bar space is no longer window frame. The peek hides 400 ms (`PEEK_HIDE_MS`) after the pointer leaves the bar and its open menus, not at once. An open menu keeps the concealed bar in place, forced shown, so the page no longer jumps 40 px.

## 0.44.0

### Minor Changes

- b1a7f15: SpeechBubble, a box that speaks with a tail on any side, and `useReducedMotion` exported. It is an opaque `--c-surface` box with the border and tint of a Callout tone, `--radius-md` and `--shadow-overlay`; `pointer` puts the tail on `top`, `bottom`, `left` or `right` (default `none`), `pointerOffset` moves it along the edge, `maxWidth` limits the width, and the ref and other attributes go to the box. GuidedTour's bubble is now drawn by it and looks the same. `useReducedMotion(ref)` is exported from the package.

## 0.43.1

### Patch Changes

- 0512669: ItemList takes `maxRows`: the list shows that many rows, whatever their height (a flush picture included), and scrolls the rest, while the title, count, New and filter stay fixed above. The selected row scrolls into view. Without `maxRows` nothing changes.

## 0.43.0

### Minor Changes

- b1d63ef: Load state, save state and delete buttons pressed twice, with an icon that loops while it waits. The named set gains `load-state` and `save-state`: a platform seen from three quarters with an arrow rising out of it or coming down into it, in the 2 unit line of the Lucide icons. `ArmedIcon` draws them and `trash-2` in parts and, with `armed`, morphs into an armed pose and loops over `--duration-armed-loop` (1.4 s): the load arrow keeps lifting, the save arrow keeps sinking while the platform squashes and ripples, and the trash lid keeps lifting; only `transform` and `opacity` move, and reduced motion shows the armed pose still. `ArmedIconButton` is a ghost icon button on the shared confirm ask of ConfirmIconButton: the first press arms it, the second runs `onConfirm`, and a 4 second timeout, a blur or Escape disarms it; armed, its name and tooltip read Click again to and the label, `tone` colours the icon and `timeout={false}` waits for blur or Escape. The 4 second wait of the DropdownMenu confirm item is now the shared `CONFIRM_AGAIN_MS`.
- d102d35: List rows start at the inset of a Button: one token, `--row-inset` (the Button inline padding, `--control-pad-md`, or `--control-pad-sm` in a compact scope), through one rule for ListItemRow, ItemList, CheckList, FileList, GroupTree and the options of Select and Combobox. The open Select, Combobox, DropdownMenu and ControlMenu read as one shape with their trigger, with no line at the join at any device scale, and the highlighted option fills the whole row. ListItemRow takes `media`, `mediaAspect`, `mediaWidth` and `nameAction`; ItemList takes `media` from `render` and `renameInline` to rename in place with a pen.
- d15cb24: ScreenWindow drops its title row with `titleRow={false}` and puts a small round X on the top right corner of the card, half over its edge, drawn by the same round button as CollapseToggle. The title still names the dialog, Escape still closes, and the X shows a tooltip with the Esc key. The window gets tighter: the gap around the card takes the next smaller space token, the padding is lg on the sides and bottom, and the content starts `--space-sm` (8 px) under the floating switch, 9 px measured with the card border. `movable` adds a lock left of the X, grey while unlocked and in the primary colour while locked, its shackle lifting and swinging open on transform and stroke only. Locked, the default, the window sits centred; unlocked, it moves by the top edge of the card, by drag or the arrow keys, and resizes from every edge and corner, inside the screen and down to `minSize`. Locking snaps it back to the centre and unlocking puts it back where it was. `storageKey` remembers the lock and the rect; `locked`, `defaultLocked`, `onLockChange`, `defaultRect` and `onRectChange` keep them in the app. ScreenLayer takes `corner`, `tight` and `move` for the same, and `ScreenLayerMove` is exported. DockLayout's floating resize edges are now `rect-resize` in place of `dock-resize`, shared with ScreenLayer.
- 3bb490a: SidePanel is the one side panel standard. Its body sits on the sunken surface in place of the raised one. A line runs down its inner edge in every state, with the CollapseToggle on it, set in the row of the heading so it lines up whatever the heading height; `resizable` adds the grip and the drag, and `resizable={false}` keeps the line and the toggle. Folded, it is a 60 px sunken rail that shows the `actions` at its top level with the toggle, the title written sideways (reading up on a left panel and down on a right one), then the `rail` icons. A glow around a rail icon now spreads past the rail: only a rail too long to fit scrolls and clips. StudioLayout's panels follow, and ListDetailLayout's folded rails take the same sunken look and reading direction. The `side-panel--overhang` and `side-panel__frame` classes are gone, and `side-panel__line` is new.

### Patch Changes

- 76dca7c: VolumeIcon in four steps, with waves that grow taller as the level rises. It draws one wave up to 25%, two up to 50%, three up to 75% and four above that, so 25, 50, 75 and 100% each look different; `VolumeStep` is now `0 | 1 | 2 | 3 | 4`. Every step makes the shown waves taller: each arc draws out from its middle toward its tips, to 60, 73, 87 and 100% of its length, and the change morphs over the same 390 ms on `stroke-dashoffset`, so the box never moves. The waves take `--c-volume-wave`, now set to `--c-primary` in place of `--c-primary-bright`; the speaker takes `--c-text`, white on the dark ground, in place of `currentcolor`; the X keeps `--c-danger`.
- 754496c: WindowTitleBar's peek calls `preventDefault` on the Escape it handles, so the host does not act on the same key. A concealed bar now sits on its own layer, `--z-title-bar` (120), above the floating panes, without the host needing `isolation: isolate`.

## 0.42.0

### Minor Changes

- 662b746: LogPanel kinds in any tone, and a count that hides at 0. A `LogKindDef` takes `tone?: LogKindTone`, a text tone, a tag tint such as `teal` or a hex colour from app data, `toneMessage?: boolean | LogKindTone` for a message tone of its own, and `uppercase?: boolean` for messages in capitals. A hex colour under 4.5:1 on the dark panel is lifted toward white until it reads, through the hex helpers Tag now shares from `src/primitives/hex-ink`. Badge takes `hideZero` on a count, and Tabs, Card, SectionHeader and HeaderAnchorNav take it and pass it to their counts, so a count of 0 draws nothing. A kind with a text tone or none, and a count without `hideZero`, keep their look.
- 9f071c1: A sharp pixel art wordmark on the splash, and a wide wordmark with no empty band. Splash takes `wordmarkPixelated?: boolean | 'auto'` (`ImagePixelated`, the same option as Image, `false` by default): with `true`, or with `'auto'` once a picture of 256 px or less on its longest side has loaded, the wordmark takes `ts-wordmark--pixelated`, a new class of `splash.css` that scales it up to the 384 px row with `image-rendering: pixelated`, its height following its proportions up to 48 px. `ts-wordmark` now keeps the height of the picture up to 48 px (`block-size: auto; max-block-size: var(--size-48)`) in place of a fixed 48 px box, so a wordmark that reaches the 384 px cap draws its box only as high as the picture, with no empty band above and below.

### Patch Changes

- 662b746: A docked pane saved without `makeRoom` makes room. `migrateLayout` sets `makeRoom: true` on such panes, and DockLayout and `mainRectOf` read a missing `makeRoom` as true, so the main view no longer runs under the panes of an older saved layout. A pane with `makeRoom: false` still overlays, and an overlay pane now widens the main view only on its own side, never over a pane that makes room.

## 0.41.0

### Minor Changes

- 81980f7: A volume icon that morphs with the level, a volume slider in a popover, and a volume action on the title bar. `VolumeIcon` (primitives) takes `{ level: number; muted?: boolean; size?: number; className?: string }`: gold waves in `--c-volume-wave` grow from none to three as `level` rises from 0 to 1, and at 0 or muted they fade out as a red X draws in, over `--duration-volume-morph` on transform, opacity and stroke offset only; reduced motion switches at once. VolumeControl and the Video bar draw it. VolumeControl takes `slider?: 'inline' | 'popover'` and `orientation?: 'vertical' | 'horizontal'`: with `popover` it is an icon button that mutes on a click and opens a slider on hover or keyboard focus, which the wheel and the arrow keys move and which closes on pointer leave, blur, Escape or a click away. Its button glyph is now 14 px at md and 12 px at sm. Slider takes `orientation` on a single thumb. DropdownMenu items take `kind: 'slider'` with `value`, `min`, `max`, `step`, `formatValue` and `onChange`, reached with Up and Down and moved with Left and Right. WindowTitleBar actions take `bar: 'volume'` with `{ id, label, value, muted, onChange, onMutedChange, min?, max?, step?, shortcut? }`, drawn as VolumeControl at the bar button size and listed in the main menu as a Mute or Unmute row and a slider row.

## 0.40.1

### Patch Changes

- 36c1f12: `formatDate` is now the one way Tessera writes a date. A `Date` in a Select or Combobox column with no `format`, or as an option's text, tag or category, used the browser's `toLocaleDateString()` and now reads as the `date` preset, the same text as `format: 'date'`: Oct 16, 2026 in place of 10/16/2026 in English. A new test fails when `src` or the gallery writes a date with a `toLocale` call or an Intl date formatter outside `date-format`.

## 0.40.0

### Minor Changes

- 3122fbc: One Ctrl+Z for the app, and a New that says why it is off. `useUndo()` returns `{ push, undo, latest }`, one undo stack per document: `push({ label, undo, expires, within })` adds a step, Ctrl+Z or Cmd+Z undoes the latest one a press, never while focus is in a text box, and a step with `within` runs only while focus is inside that region. ItemList puts its waiting deletes in that stack in place of its own Ctrl+Z, and `toast({ undo })` draws Undo and keeps its step while the toast shows, so Ctrl+Z runs it and closes the toast with `action`. ItemList and ListDetail take `newDisabled?: boolean | string`: New is greyed out and does nothing, and a string is its reason, shown on hover and keyboard focus and read as its description. A Button or IconButton with `aria-disabled="true"` now looks disabled. The string `lists.undo` moves to `common.undo`.

## 0.39.1

### Patch Changes

- bdd2010: ToolGroups takes `compact`, and StudioLayout takes `compactToolbar`: the tools sit in one row of small controls with a line between groups and no label shown above them. Each group keeps its name as `aria-label`, and every control inside without its own size draws at sm through a compact DensityScope. The toolbar of a StudioLayout editor is then 45 px high, one 28 px control and the frame padding, where the labelled toolbar is 65 px. Left out, the markup is the same as before.

## 0.39.0

### Minor Changes

- 6c968a8: DateText shows a date or a time in any common format: `relative` (5 minutes ago), `calendar` (Today, 21:40), `date`, `time`, `datetime`, `weekday`, `month` and `iso`, each in a short, medium or long `length`, or Intl date options of your own. It renders a `time` element, shows the full date in a Tooltip (on by default for relative and calendar), and keeps relative and calendar text current from one shared clock. `formatDate(value, format, options)` gives the same text outside React. The locale and the words Just now, Today, Yesterday and Tomorrow come from the new `dates` strings. DataTable takes `SchemaConfig.dates` to format a column, and Select and Combobox columns take every date preset as `format`.
- 194239e: A search box, a Select or a Combobox fits in a toolbar, and StudioLayout stacks only when its columns do not fit. TextInput, SearchInput, Select, NativeSelect and Combobox take `grow={false}`: the control keeps the set width `--field-w-inline` (256 px), shrinks to `--field-w-inline-min` (160 px) and sits on one line with the other tools in a ToolFrame toolbar or ToolGroups. StudioLayout stacks its columns when the open side panels, the folded rails and `editorMinWidth` (192 px when left out) do not fit side by side, in place of a fixed 768 px of its own width, so a studio beside a ListDetailLayout list keeps its columns and the editor its full height on an ordinary window.

## 0.38.0

### Minor Changes

- 9373034: Every panel that folds now folds with one button, CollapseToggle: the round chevron on the edge that SideNav already had, which points toward the panel's edge to fold it and away from it to unfold it. SidePanel, StudioLayout and ListDetailLayout use it in place of their panel icon buttons, and their folded rails look like the folded SideNav. SidePanel takes `rail` for what its folded rail shows, keeps its content mounted while folded, and works in a plain flex row for a page with a panel on each side.
- 3d01dba: DockLayout keeps widget groups apart and can snap floating widgets. `WidgetDefinition` takes `group?: string`, and WidgetManager never lets widgets of different groups tab or split into each other's panes; widgets with no group form one group. DockLayout and WidgetManager take `canDrop?: (id, drop: DockDrop) => boolean` for any other rule, where `DockDrop` names the kind (`tab`, `split`, `float`), the slot (`pane`, `main`, `stage`), the pane and the side. A refused drop shows no hint and does nothing. `floatSnap?: number`, off by default, snaps the edges of a floating widget moved or resized within that many pixels of the stage, the main view or another floating widget, with thin guide lines in `--c-primary-bright`. `keepsGroups` is exported for hosts that draw DockLayout themselves.
- d963a27: ItemList deletes at once with an inline Undo: `undoDelete` keeps the row as Deleted with an Undo button for that many milliseconds, waits while the pointer or focus is on it, then calls `onDelete`; Ctrl+Z undoes the latest. `deleteKey` binds the Delete key on the focused row, and `rowActions` adds buttons of your own before rename and delete. `toast()` takes `onClose`, called once with `expired`, `dismissed`, `action` or `replaced`, so an undo window can follow the toast. `useNameEdit`, the rename logic behind ItemList, is exported.
- f14f9ad: Field, FormRow, Checkbox and Toggle take `help?: ReactNode`: a small circled question mark after the label that shows the note in a Tooltip on hover, keyboard focus or click, and keeps the note off the page. The mark is one Tab stop named Help, the note is its description while open, and it closes on pointer leave, blur, Escape or a click elsewhere. A click on the mark inside a Checkbox or Toggle does not change the value, and the control keeps its label text as its name.
- 15ecfe1: Menu check and radio items that are off show a faint centred dot in place of a dim check or an empty ring; turned on, the dot morphs into a check or a filled radio in the menu tone, and back when turned off. DropdownMenu, its sub-menus, the CommandPalette check and the Video speed menu draw the same mark, which switches at once under reduced motion.
- 40fc04f: A widget takes a lighter frame through `chrome`, on its definition or on Widget: `full` is the title bar as before and stays the default, `compact` draws a 20 px strip with a smaller label and the same buttons, and `none` gives the body the whole widget, with a drag grip and the buttons floating over its top edge on hover or keyboard focus. Docked, floating and popped widgets all take it, and the grip moves a widget in DockLayout or, with `dragRegion`, its own window.

### Patch Changes

- beec552: DockLayout starts a drag from a press on the icon inside a drag handle. It used to ignore any press whose target was an SVG element, so pressing the grip icon of the main view started nothing; it now finds the handle from any element inside it, SVG included, and a press on a button inside a handle still stays a click. The widget grip no longer needs its icon to let presses through.
- f14f9ad: The unfilled part of a Slider track draws in `--c-border-strong`, the colour of its scale ticks, in place of `--c-surface`, so it shows on a card, a dialog, a drawer or any panel drawn in `--c-surface`, where it was missing. A Tooltip, and with it every disabled reason on tabs, segments, radio options, chips and Select options, now closes on pointer leave, blur, Escape or a click elsewhere; a click shows it but never holds it open, and only keyboard focus keeps it open with the pointer away.

## 0.37.4

### Patch Changes

- b978e28: WindowTitleBar takes `tucked`, which renames, moves or hides the pin and full screen rows its main menu lists with `view={false}`: `label` and `activeLabel` name only that row, and `group` and `position` place it the way `view` places View. A hidden row leaves its button out of reach on a narrow window.

## 0.37.3

### Patch Changes

- 4c7ead4: WindowTitleBar keeps a tucked pin and full screen in reach with `view={false}`: the main menu then lists them in the bar's own group, where View would have been. `onFitChange` hears the ids of the bar items a narrow window tucks away, each time that list changes. Pin and full screen in the menu are now actions whose label and icon say what a pick does, with no check mark, since a check mark there showed while the window was neither pinned nor in full screen.

## 0.37.2

### Patch Changes

- ec543b7: WindowTitleBar takes `view`, which places its View sub-menu in the main menu. `view={false}` leaves it out; `view={{ group, position }}` puts it into the `menu` group with that id, at an index or at `'start'` or `'end'`. Without `view` the menu is the same as before.

## 0.37.1

### Patch Changes

- adae458: Menu, nav and palette items take `onHighlight`, called once each time the item is hovered, focused or reached with the arrow keys, and never while it is disabled. DropdownMenu items (so WindowTitleBar menus), submenu triggers, SideNav and SideNavLayout entries, FloatingSwitch items and CommandPalette rows take it on their item data, so an app can start loading a screen before it is picked. Nothing looks different.
- 0e7f2f3: A splash can show the app wordmark in place of its name. `splash.css` has a new class, `ts-wordmark`, for an image inside `ts-title`: 48 px high, at most 384 px wide and narrower in a narrow window, centred, with `object-fit: contain`. `Splash` takes `wordmark`, an image URL, and then draws `<img class="ts-wordmark" alt={title}>` in its h1 in place of the title text, so the heading keeps the app name and the React splash draws the same as the static page.

## 0.37.0

### Minor Changes

- fdf5375: BackdropLayer draws an image, a colour or a scene of your own behind a block from one `Backdrop` value, the value Hero's `backdrop` takes, and `backdropStyle(backdrop)` returns its background style for an element you draw yourself. Pass a BackdropLayer as the `backdrop` of ScreenPage, SettingsPage or ContentHeader to show an image or a colour behind the header. Hero draws its backdrop through it, with the same look. `HeroBackdrop` is renamed `Backdrop` and `HeroImageFit` is renamed `BackdropFit`, both now exported from `primitives` and the package root; the layer classes `hero__backdrop--node`, `--image`, `--color` and `--pixelated` are now `backdrop-layer--node`, `--image`, `--color` and `--pixelated`. RENAMES.json carries all of these. BackdropLayer has a usage file, so the guide answers a picture, a colour or a scene behind a block with it.
- 8029350: StatRow and FactsPanel take `align`, `start` or `end`, typed `StatRowAlign`. `align="end"` sets each label on the left and its value on the right edge of the row or panel, past the 512 px a row stops at, one fact per row in every FactsPanel layout; `start` sets the value right after its label. Without `align` each layout looks as before. FactsPanel passes it to its StatRows and no longer copies their alignment rules.
- fdf5375: Hero takes `size`, `compact`, `default` or `tall`, so an app sets how tall it is. `default` keeps today's look. `compact` fits the content with tighter padding and gaps, for a home with a few facts and actions. `tall` grows to 80 percent of the window height, between 408 and 560 px. Each size stacks under 720 px wide as before. The `HeroSize` type is exported, and the token `--hero-h-tall` is new.
- b7edb67: StudioLayout, a new composite, is the frame of a studio screen: a raised bar with the title, labelled action groups and a hint line, a list on the left, an editor with its toolbar on the top edge, and an inspector on the right, stacked below 768 px of its own width. It is drawn from three new shared parts: SidePanel, a raised side panel with a heading that folds to a rail and is dragged wider; ToolFrame, a sunken frame with a toolbar on its top edge; and ToolGroups, tools in groups under small labels. ListDetailLayout now folds to the same rail as SidePanel, and LogPanel is a ToolFrame, both with the same look; ListDetailLayout's rail label class is now `pane-rail__label`, and LogPanel's `log-panel__toolbar` class is gone.

### Patch Changes

- 8029350: A Button with `icon` or `iconEnd` has the same padding on the icon side as on the label side, in every variant and size: the icon slot no longer adds a 20 px box around a 16 px glyph, an Icon passed without a `size` takes the size of the button (16, 14 or 12 px for `md`, `sm` and `xs`), and the gap between icon and label is 8, 6 or 4 px. An Icon given a `size` keeps it. Heights do not change.
- be4d768: A chip row in a page header never wraps and never squeezes the title. HeaderAnchorNav, the chip row of SettingsPage and of any ContentHeader or ScreenPage strip, now scrolls sideways on the same strip as Tabs: the mouse wheel scrolls it without Shift, and an arrow and a fade show at each edge only while chips are hidden there. Beside the title the row takes the room that is left; ScreenPage moves it under the title only when that room is less than two of its widest chips, and it scrolls there too.
- 8029350: Window chrome can no longer be selected by accident: WindowTitleBar with its title, status items, buttons and drag area, every WindowHeader (so the DialogShell, Drawer and ScreenWindow headers), the Widget title strip and DropdownMenu panels share one rule, `user-select: none`, from `theme/window-chrome.css`. A text input, a text area or editable text inside them can still be selected and typed in.

## 0.36.0

### Minor Changes

- 5aaac38: Box takes `surface`, `sunken` or `raised`, for a well set into the page or a panel lifted off it: the fill, a thin border and the corner from the tokens, and for `raised` the first shadow, all at zero specificity so a part's own rules win. The `BoxSurface` type is exported. CodeView, the CodeBlock editor, ColorPicker's hex box and quick assign list, PressedGrid cells, RecordEditor array items and fallback, the ListDetailLayout list pane and ShortcutTour now draw on it and drop their own copies, with the same look. Box has a usage file, so the guide answers a plain block with it.
- ead6b17: Button takes `hint` and `onHint`, as IconButton does, so it reports a one-line description to the HintScope around it without a `useHintTarget` wrapper. Both take them from the new public `HintTargetProps` type.
- 6d131fd: The hamburger of the WindowTitleBar main menu button turns into an X and back with a visible motion: the middle bar fades out, the top and bottom bars slide to the middle and tilt to 45 degrees, in 200 ms, and at once under reduced motion. The new `--ease-out` token sets the curve. Every other hamburger, on a DropdownMenu `iconOnly` trigger, the SiteHeader phone menu or a ControlMenu, keeps its three bars while its menu is open; change `trigger.icon` from `onOpenChange` to show something else.
- 5f10149: Informational windows open small: InfoScreen opens as a dialog sized to its content, centred, at most 512 px wide, and scrolls only when the window is too short for it. ScreenLayer and ScreenWindow take `size="info"` for the same card. InfoScreen drops `width` and the `InfoScreenWidth` type.
- ead6b17: A SettingsRow toggle takes `hints: { on, off, atRest: true }` to show both lines under the row hint at all times, each after its gold On or Off label, with the current state's line brighter. Without `atRest` the hints show only while the toggle is pointed at, as before.

### Patch Changes

- 32f19ee: A file dropped on a disabled DropZone, or on a disabled or read only PathInput, is swallowed with the not allowed pointer, so Chromium no longer opens it in place of the app. No handler runs and no drop highlight shows.
- 8234848: A WindowTitleBar status that counts, such as a frame rate, keeps its width as its digits change, so the items beside it stay put; Emphasis with a stagger also reserves room for the letters that lose their kerning mid swell. `pnpm check:steady` measures the box of every animated part in the gallery over a cycle.
- ead6b17: A long Tooltip note, such as the reason on a disabled tab, wraps inside its 256 px box in place of running past it. A short note still sizes to its text on one line.

## 0.35.0

### Minor Changes

- a1c7d46: `DensityScope` sets a whole panel compact at once: every input, Field and Button inside without its own `size` draws at `sm`, and the gaps inside Slider, Checkbox, SegmentedControl, ToggleGroup and DisabledOverlay tighten through the `--density-gap`, `--density-pad` and `--density-message-weight` tokens; `useDensity` and the `Density` type are exported. Public options replace styling Tessera's classes: `className` on SegmentedControl, `strong` on a LogPanel kind, and `titleWrap` on DialogShell. Nothing changes where they are not used.
- d5705e6: DisabledOverlay takes `placement`, `center` by default or `top`, which holds the message and its button at the top of the scrim and in view while the covered body scrolls; `DisabledOverlayPlacement` is exported.
- bdbd7a1: Small parts for RotP's stand-ins: the Lucide icons `skull`, `shovel`, `tree-deciduous` and `waves` join the named set, with the short names `tree` and `water`; Button takes `iconEnd`; Toggle and Checkbox take `labelSize`; Image takes `fit` and `pixelated`, with `usePixelArt` and `isPixelArt` public and `MediaViewerPixels` renamed `ImagePixelated`; DisabledOverlay takes `tone`; Disclosure takes `bodyClassName`; WindowHeader takes `titleWrap`; and `IDENTITY_PATH` is exported from `/data` too.

## 0.34.0

### Minor Changes

- fa286f2: Three new composites the owner approved (TX-57, TX-58, TX-59): `Rating` shows an average in half stars with the number and the count, and with `onChange` is the star picker with one Tab stop, the arrow keys, Home and End; `Carousel` shows one slide at a time with dots and arrows, turns by itself with `turnEvery` and a stop button, and never turns under the pointer, on focus, on a hidden tab, off screen or with reduced motion; `MediaViewer` opens a picture or a video large in `DialogShell`, fits first, zooms by steps to 1600%, swaps Fit and actual size, drags to look around, keeps small sprites sharp and steps through a set. The `zoom-in` and `zoom-out` Lucide icons join the named set, with the string groups `rating`, `carousel` and `mediaViewer`.

## 0.33.0

### Minor Changes

- 3ab4a7f: Options that are off with a reason, a title bar with no window buttons, and a disabled widget in its own window, for Brock. An option of a settings choice, RadioGroup, SegmentedControl, ToggleGroup and Select takes `disabled`, where a string is the reason: the option greys out, cannot be picked, the keys skip it, and the reason shows as a tooltip and is read as its description. SegmentedControl gains one Tab stop and the arrow keys, Home and End. WindowTitleBar `controls` takes `close: false`, and `controls={false}` hides every window control, the space they took closing up. Widget takes `disabled` and `onOpenSettings`, so a widget in its own window shows the disabled state a docked one shows; the overlay now covers the visible body.

## 0.32.0

### Minor Changes

- eefa0f3: ListDetailLayout takes `listRatio` for columns by share, `detailCollapsible` with `detailCollapsed`, `defaultDetailCollapsed` and `onDetailCollapsedChange` for a detail that folds to a rail like the list, and `listScroll` and `detailScroll` for a pane whose content scrolls itself. LogPanel takes `selectedIds` and `onSelectionChange`: a click, Shift and a click, and Up and Down with Shift pick rows the app copies or acts on. `blankValue` is public from `/data`, `IDENTITY_PATH` from `/composites`, and `createScrollSyncController` with its types `ScrollSyncController` and `ScrollSyncNode` from `/primitives`.
- e39c0f2: Four parts an app no longer keeps a copy of. Anchored takes `onDismiss` and closes on Escape, through the shared Escape stack at the popover level, or on a press outside; `dismissOnEscape` and `dismissOnOutsidePress` turn either off. `useDismissListeners` and its `UseDismissListenersParams` type are exported, with a new `outsidePress` option. Tooltip takes `follow="pointer"` to sit beside the pointer and stay inside the window. A StackedBar segment takes a `description`, shown under its name, value and share in its tooltip. Shortcut draws `mouse="drag"`: the held left button with the move arrows.
- a02dd60: Small parts RotP asked for, so it can drop its own copies. The named icon set gains fifteen Lucide icons: shuffle, database, store, camera, joystick, smartphone, wrench, dices, list-checks, scroll-text, network, person-standing, languages, music and layout-dashboard. A tab takes `disabled` and `disabledReason`: it greys out, the arrow keys, Home and End skip it, and the reason shows as a tooltip and is read as its description. Disclosure takes a controlled `open` beside `defaultOpen`, with `onOpenChange`. ItemCard takes `navigate` for app routing, as Link does, and `mediaHeight="auto"` for a picture taller than the 96 px band. Tag takes `variant="custom"` with a hex `color` from app data, and picks black or white text, whichever reads best. A menu item icon, and a menu trigger icon, can be a name, iconify data, Icon path data or an element.

## 0.31.0

### Minor Changes

- e51282c: Every DropdownMenu with a trigger opens on the side with room by default: `align` now defaults to `auto`, so a trigger in the right half of the window gets its menu under its end, opening to the left at its natural width, instead of a menu squeezed against the right edge. The More menu of ActionBar and ItemCard and the row menu of RowGrid get it. A trigger in the left half keeps its menu under its start. Pass `align="start"` or `align="end"` to hold one edge.

## 0.30.2

### Patch Changes

- 0c71151: The parts file `tessera guide` writes for `guide.parts` opens with `import type {} from '@drizztdourden08/tessera';`, so it adds the part names on its own, also in an app that imports only a subpath of Tessera, where it gave TS2664. A scope with no parts now gets a parts file with `parts: never` in place of the old list, and `tessera check` expects the same. Run `tessera guide` once to rewrite the file.

## 0.30.1

### Patch Changes

- facd938: CommandPalette closes through the shared Escape stack at `dialog` while open, so Escape first cancels the confirm question of a row and closes the palette on the next press, wherever focus is. Escape in the search box with text clears the text first, as in every search box. Focus returns to where it was on close, in a frame too.
- 08cdf54: A confirm question that closes gives focus back to the button that opened it when focus was inside the question, in ConfirmIconButton, ActionBar and the SettingsRow action, after a confirm too while the button is still there, so CommandPalette keeps its keys; CommandPalette takes the arrow keys and typing from a row's button, and `onCancel` runs when a question goes away because its part unmounts.
- 28cb7ae: `tessera guide` and `tessera check` take a views folder shared by several apps, listed in the root's `parts.views` and in each app's own: its parts count once and go once into the root's `guide.parts` file, from the root and from every app. Two different folders that hold a part of the same name now give a `duplicate-part` finding.
- 10efba6: The SiteHeader profile menu and every WindowTitleBar dropdown action open on the side with room, under the end of their button when it sits in the right half of the window, and keep their natural width instead of being squeezed against the right edge. The SiteHeader link menu does the same. DropdownMenu with a trigger takes `align`: `start` by default, `end` or `auto`.

## 0.30.0

### Minor Changes

- 7885131: ResizeHandle is the one line SplitPane, ListDetailLayout, DockLayout and the DataTable column resize all draw, with the arrow keys, Home, End and Enter, its value and range, and `edge` for a panel after the line; `usePaneSize` keeps a panel width in pixels. Grid takes `dense`, and `Grid.Cell` spans two columns once two fit or the whole row, for a dashboard of Cards.
- 18780f0: SiteHeader and SiteFooter frame a website built from the app's parts: SiteHeader holds the logo and the site title as the link home, main links that fold into one menu under 640 px and the signed-in person drawn with WindowTitleBar's own dropdown action; SiteFooter is a small line with the logo, a note and links.

### Patch Changes

- 799ae7a: The package ships `release-notes/`, one hand-written note per version from 0.29.0 on, which is also the body of each GitHub release.
- baf9b67: The GuidedTour spotlight measures again once the fonts are ready and after each step's onEnter settles, so one step lands on the same pixels on every load. LogPanel time cells, the RetryButton countdown and the StickPlot dot, stem and readout carry `data-review-mask`, exported as `REVIEW_MASK_ATTRIBUTE`.

## 0.29.0

### Minor Changes

- afad37a: One Escape stack by level for every layered surface, with `useEscapeStack` for apps: DialogShell, Drawer, ScreenLayer (new `onClose`, passed by ScreenWindow), the popup stack, menus, GuidedTour, confirm asks, a DockLayout drag and a filled Video take Escape from it, innermost first, and a key a control already handled is left alone. `IdRefOptionResolver` gets the working record; CompactRecordView takes `fieldRenderers` and draws group headings in the secondary accent; `SchemaConfig.options` takes `{ value, label }` and keeps numbers as numbers; the enum editor falls back to a searchable Select when its control does not fit the row, sharing `useChoiceFit` with SettingsRow; DropZone takes media types, a `status` line and Ctrl+V paste.
- 54e55e2: Seven fixes from rotp: an inline Field lets its control shrink, ColorPickerPopover opens above its swatch on the script placed path, `SpaceToken` gains `2xs`, a hex formatted number shows its hex text as its editor hint, Checkbox and DropZone draw the error of their Field, Grid `minColWidth` fits a box narrower than N, and a Button with a plain label stays on one line.

## 0.28.0

### Minor Changes

- 943dc0f: New `Disclosure` primitive, a line that shows or hides what is under it on the browser details element, and new `LoadError` composite, one plain sentence, a Retry and the raw error behind Details, centred, in a box or inline; `Callout` takes `details`; ItemList, TaskProgress, ErrorBoundary (now in the composites, with `onRetry`) and a `SettingsRow` load problem draw their failures with `LoadError`; TaskProgress and RecordEditor fold with `Disclosure`; UtilityScreen and Splash put a raw `error` behind Details, a UtilityScreen action takes `retry`, and a failed Video offers Retry.
- 4392cab: New `Markdown` composite: shows a Markdown text, such as a release note, drawn with Tessera parts through `react-markdown`, with headings moved down by `headingOffset`, `hideTitle`, `size`, links handed to `onLink` or opened in a new tab, raw HTML dropped and only http, https and mailto links kept.

## 0.27.0

### Minor Changes

- ca91a7a: TagInput, Toggle and the field kit editors take aria-label and aria-labelledby; Widget is a region named by its title; MenuItem takes tone danger; PathInput takes onBlur; FormRow folds a long description behind More and Less; KeyValueEditor reports its problem through onProblem; RowGrid marks the row of selectedKey.
- e2edd34: DialogShell, Dialog, JobDialog, CreateRecordDialog, DeleteGuardDialog and WizardDialog take `id` and `data`, set on the element with `role="dialog"`; the title keeps its own id, so `aria-labelledby` still names the dialog.

### Patch Changes

- 23feda7: `tessera guide` and `tessera check` run from inside an app keep each part folder in the parts file of the config that names it, so the root's design parts stay in the root's `guide.parts` file and a guide run followed by a check is clean from the root and from each app.
- 344f641: ItemList rows sit on one line again: each row is as tall as its name and meta, a note column such as not installed stays on that line, and rename and delete take no room until the row is hovered, focused or picked, then sit at its end. ListItemList takes `shape` for rows drawn through a component of the app's own, and ListItemRow gives a name or meta written as text a `title` with the full text.

## 0.26.0

### Minor Changes

- 6335a34: ItemList takes `groups`, which keeps empty groups with an empty line and an action such as New preset, marks each row with `data-item-id` plus `rowData`, and marks New with `data-tour="item-list-new"` or `createTour`; ListDetail passes `onActivate` to its list behind the unsaved question, and guards the action of a group too.

### Patch Changes

- 7b697f5: LogPanel shows every new line of a log that starts empty or short: while it sits at the newest line, its window grows with the log up to 400 lines and then keeps the newest 400, with older lines behind Load older. Scrolled up, or after Load older, new lines add below the rows already shown, so the lines being read stay in place.

## 0.25.0

### Minor Changes

- 7a42af6: The WidgetOptions panel and every panel it opens, such as Shortcuts, carry `data-widget-options`, exported as `WIDGET_OPTIONS_ATTRIBUTE`, so an app can tell them from any other ControlMenu; ControlMenu gains `panelData`, data attributes it sets on its panel and on each sub-panel.

## 0.24.1

### Patch Changes

- 242285d: A ScreenLayer or Drawer title that takes focus on open draws no focus outline, so the white box Chrome drew around it after a key press or at start up is gone; controls keep their focus ring.

## 0.24.0

### Minor Changes

- af5b924: Screens fit the room they have: the ScreenPage header stacks its strip, and its actions when needed, under the title once they no longer fit beside it, so SettingsPage tabs and the StageScreen toolbar never squeeze the title or clip; the ScreenWindow title bar puts the subtitle under the title, and the window is a `screen-window` container that content can query.
- 340fa05: Button, IconButton, ButtonGroup and the DropdownMenu and ControlMenu triggers share an `xs` size of 20 px from the new `--control-h-xs` token, and the Widget title bar buttons use it in place of a rule of their own; `--widget-btn-d` and `--menu-trigger-width` give way to `--control-h-xs`.

## 0.23.1

### Patch Changes

- fbbb1f5: RENAMES.json lists the props CommandInput dropped in 0.23.0 when it stopped extending TextInputProps, such as `name` and `autoFocus`, each with what to do instead, so an upgrade finds them before the type check does.

## 0.23.0

### Minor Changes

- 3f4e8a5: CommandInput draws its line with Combobox: focus shows the border and soft halo of a Combobox field with no outline, and the open list of commands joins the field as a Combobox list does. CommandInput keeps the mono face, the prompt mark, Tab or Right completing, Enter sending, the history, Escape clearing and the key hints, and its props no longer extend TextInputProps. Combobox gains `freeText`, `query`, `start`, `listLabel` and an `onKeyDown` that runs before its own keys.
- e082ced: Every header draws its back and close buttons at `md`, 39 px, as tall as a `md` Button: the ContentHeader back button grows from 28 px, and a compact ContentHeader drops its block padding so it stays 40 px with one. Widget title bars keep their 20 px buttons. Brock's light grey stone colours are removed with the `inks` prop of BrandMark, Logo and Logo.Combined: Brock draws its charcoal stone on both gradients, with a black outline on the light one and a white outline on the dark one.

## 0.22.0

### Minor Changes

- ef4a50b: ConfirmIconButton takes `onCancel`, which runs when its question closes without the check, and `onAsk`, which runs when a press opens it. The same `onCancel` is on an ActionBar action, a SettingsRow action and a DropdownMenu confirm item, and runs from the cross, Escape, focus or the pointer leaving, the timeout, disabling, or a second ActionBar question taking the place of the first.
- 6b71cbf: GuidedTour takes `keep` for parts that stay usable all along, `advance: 'wait'` for steps the app ends with `tour.next()`, `clickTarget` and `hint` on a step, `onStepShown` and `onStepLeave`, an abort signal for `onEnter`, and `entering`, `shown` and `target` on the api. Its keys go ahead of the app's, its bubble flips to the side that fits and stays in the window, its mascot keeps off the lit part, its ring and bubble draw in the top layer, a step mascot can name its walk and arrive clips, and `TourSpot` draws the spotlight alone for a second window. `AnchoredPlacement` gains `left-start`, `left-center` and `right-center`.
- dbf5e1f: IconButton is as tall as Button at every size: `md` is 39 px square, where it was 32 px, and `sm` stays 28 px, both from the `--control-h-md` and `--control-h-sm` tokens that Button now sets as its height too. An icon with no size of its own draws at 16 px in `md`. ActionBar drops its own rule for More.
- d0bd880: ListDetail asks before New opens the create form of its list while the editor holds unsaved edits, in the same bar or dialog. Discard opens the form, Save opens it once the save works, and Keep editing leaves it shut. An app that holds `createOpen` gets `onCreateOpenChange(true)` after the answer.

## 0.21.0

### Minor Changes

- 6e685c9: Each brand mark names its look for the light and the dark gradient in `grounds`: the colours it draws in and an outline in the rim colour. Brock stays charcoal on both, with a white outline on the dark gradient and a black one on the light; Tessera and Archipelia take a black outline on the light gradient; Archipelia keeps its lilac ring on the dark; Relic of the Past keeps one mark, the original, on both. `ground` left out draws a mark as drawn, and the new `inks` prop draws either colour set on any ground. Brock's stone faces now meet with no gap. `pnpm icons` writes `brand/light-ground/` beside `brand/dark-ground/`, and the contrast test holds each mark on both gradients, counting an outline as the edge. ConfirmIconButton takes `size="xs"`, a compact one for a search row or a menu row, and a CommandPalette item takes an `action` drawn at the end of its row.
- 24a0f07: ManagedList, MasterDetailLayout and MasterDetail are renamed into one family: `ItemList`, the list of the user's items; `ListDetailLayout`, the two panes; and `ListDetail`, an ItemList beside an editor that asks before unsaved edits are lost. Their props types and classes follow, and RENAMES.json lists each one. The list pane folds to a rail for more room to edit, from a button at the top of the divider or Enter on it, held by the part, by `storageKey`, or by the app with `collapsed` and `onCollapsedChange`. The list pane draws on the sunken surface and the detail pane on the surface, and a SaveBar last in the detail sits flush with its foot. `detailEmpty` is removed: no `detail` means nothing is picked, and `emptyDetail` replaces the default placeholder in the layout. ListDetail passes every layout prop through, and the stored width reads and writes through the shared storage helpers.
- 0ff728c: One mascot engine: `AnimatedMascot` runs one actor on the `MascotStage` engine and keeps no motion code of its own, and Flint works at a laptop seen straight on.
- 3a6b86a: CodeBlock takes `editable`, `value` and `onChange` to edit text in any language over its highlighting, with `invalid` and `problemLine` to show what the app's own check found, so JsonInput and its JSON reader are removed and an app checks JSON with `JSON.parse`. NamedRange is removed for Slider with `labels` at the named values and `input`, and Slider now takes the id and label of its Field or FormRow. SetPicker is removed for Combobox with `max` and `values`, which draws the picks as removable tags. KeyValueEditor lays each row out as a grid, so a free name keeps its width beside a text or select value, and its rows keep their ids when the app hands back a reordered value.
- 05a7fe9: Slider scale labels stay inside the track: the first starts at its start and the last ends at its end, and ScaleLabels drops `--scale-labels-overhang`.
- faa66dd: Toasts keep one queue per app: `toast()` raises from any part and one `ToastStack`, which replaces `ToastContainer`, draws it, caps how many show with `max` and joins a repeated message into one toast with a count. CommandInput takes `commands` and lists the closest ones under the line as the user types, with Tab or Right to complete and Up and Down to move. PathInput and DropZone show the drop target as soon as a file is dragged in. ActionBar's More button matches the height of its buttons, CopyButton xs draws a 12 px icon with a 24 px hit area, and ConfirmIconButton asks with a green check and a quiet cross.
- 2f1b7a3: An action written as data takes one shape, ActionData, with label, onSelect, tone, disabled and confirm, and a way back one shape, BackAction: SettingsRow, UtilityScreen and StageScreen actions take onSelect for onClick, UtilityScreen and ActionTile actions take tone for variant, and WindowHeader and ScreenWindow take back for onBack and backLabel.
- 00ce9f4: Anchored places its own popup by its placement where the browser has no CSS anchor positioning, with the same gap and centring as the native popup, so Tooltip, DynamicInput, DropdownMenu and FilterBar drop their own fallback placement and the SettingsRow bubble and the ControlMenu panels get one.
- 958513f: The last five cases of TX-38 share one helper each. ItemList's rename, the DataTable column rename and InlineCreateForm's name edit a name in place the same way: Enter keeps, Escape undoes and stops there, and InlineCreateForm's Escape now runs `onCancel`. Wizard's exit guard and ListDetail's guard decide when to ask and run stay, discard and save through one hook, each in its own look. CommandPalette scrolls its active row through the listbox's scroll, which follows the CSS zoom. Slider, Splash and KeyValueEditor clamp through `clampNumber`, and CommandInput keeps its history through the shared storage read and write. Strings that said the same thing are one, such as `common.discard`, `common.unsavedTitle`, `common.keepEditing`, `common.renameNamed` and `common.resetNamed`, with every move in RENAMES.json, so the Wizard's question is titled Unsaved changes and ListDetail's stay button reads Keep editing.
- 15ee758: SegmentedControl and FloatingSwitch place their marker under the chosen item through one internal useActiveMarker, measured before paint, and ToggleGroup and TagPicker turn a value on or off through one internal toggleValue.
- 0f53242: Numbers are kept in bounds by one internal clampNumber and written for display by one internal formatDecimal; a ColorPickerPopover wider than the window starts at the left margin from its first frame.
- 3db77ec: Every part that checks its layout again when an element changes size watches through one internal `observeResize`, which takes the observer of the element's own window and does nothing where there is none.
- 71a5bfc: SideNav and the Widget layout read and write browser storage through one internal readStored and writeStored, each with its own check of the stored value.
- 16938f3: One shared helper for each piece of logic written twice: every search matches each word in any order with case and accents ignored, through `matchesText` and `matchParts`.
- 536c473: Success, warning, danger and info mean the same thing in every palette. Each palette sets its own `--p-success`, `--p-warning`, `--p-danger` and `--p-info`, tuned to its surfaces and kept apart from its primary and secondary, and `data-palette="tessera"` now sets the Tessera seeds inside another palette. A success Toast reads `--c-success` where it read the secondary colour, so it is green in Tessera, Brock and Archipelia instead of grey or lilac, and every Toast draws its text in the `-bright` step of its tone on the `-dim` fill with a full tone border. Tessera's danger is a little lighter, `#ec6279`, so its text reaches 4.5:1 on its own tint. A cancelled TaskProgress bar is the neutral tertiary instead of the secondary. `tokens.json` lists the four status colours for each palette, a new test holds every status text at 4.5:1 and every icon or border at 3:1 in each palette, and the Status page shows the four tones in every palette.

### Patch Changes

- 70c7409: The Tessera mark takes a white outline on the dark gradient, and the Archipelia mark has no outline on the light gradient; every other look of the marks stays as it was. The contrast test records Archipelia's large dot on the light gradient, 2.36:1, as a case the owner accepted, and still fails for any other shape under 3:1. `pnpm icons` writes the two changed looks again.
- 5d53cde: `RENAMES.json` lists each export that moved between entry points in a `moves` map per release, under its name after that release's renames: `"CopyButton": { "from": "primitives", "to": "composites" }`. It holds the 10 moves of 0.17.0 and the 55 of 0.20.0, and the `PixelWordmark` note leaves `removedExports`. The test of `RENAMES.json` checks that each moved name is exported from its new entry point.
- 90f285f: The title face ships a TrueType copy beside its WOFF2 files, `fonts/chakra-petch/chakra-petch-latin-600-normal.ttf` and `chakra-petch-latin-700-normal.ttf`, unpacked from the `.woff2` with the same glyphs, for tools that cannot read WOFF2 such as resvg; `exports` gains `./fonts/*`.

## 0.20.0

### Minor Changes

- b628c7c: `WidgetManager`, `WidgetGates` and `visibleLayoutOf` take `contextActive` as one flag or as a function that answers for each widget definition, typed `WidgetContextActive`. `DropdownMenu` items take `kind: 'confirm'`: the first press asks with Click again to and the label in the danger tone, the second runs it, and Escape, leaving or a timeout puts it back; `confirm` sets the words, from the new string `items.confirmAgain`. ConfirmIconButton, ActionBar, SettingsRow and the confirm item share one ask hook. WindowTitleBar actions with `bar: 'dropdown'` take `tone` and `effect`, drawn on the bar and in the folded menu.
- ed03db5: Every brand mark has a look for a dark ground: `ground="dark"` on `BrandMark`, `Logo` and `Logo.Combined` draws each path in its `onDark` colour and adds the mark's `onDarkRim` as a fine rim. `Splash` gives its marks the dark ground by itself, and `pnpm icons` writes the look as `brand/dark-ground/<app>.svg` and a mark PNG ladder for a static splash page. Brock's stone turns lighter with a fine light rim, Archipelia's ring turns lilac, and Relic of the Past's outline turns bronze. The splash contrast test holds every shape of every mark at 3:1 on its palette's dark gradient.
- 979630e: Every palette, the default one too, sets a light gradient pair beside its dark one, `--p-gradient-light-from` and `--p-gradient-light-to`, read as `--c-gradient-light-from` and `--c-gradient-light-to` and listed in `tokens.json` as `gradientLightFrom` and `gradientLightTo`; the Archipelia and Brock pairs are the ends of their bright brand gradient. The splash keeps the dark pair, and its test checks that every palette sets both pairs and that the splash paints no radial gradient. The Gradients page shows each palette's pairs. `Splash` moves from the primitives to the composites, drawn with `Box`, `Pressable` and an internal image element, with its props, classes and look unchanged; its page and the Static splash page move to Composites · Feedback. The RotP mascot files Sentri and the hookshop are drawn again from their current pieces.
- e931330: `GuidedTour` and `useGuidedTour` are new: a tour of a screen written as steps, each lighting one part while the rest dims and blurs through `Overlay`, with a rounded glowing hole that glides between targets, a bubble placed with `Anchored`, `onEnter` for the app to change its state, click steps, the arrow keys, Enter and Escape listed in `tour.shortcuts`, and the mascot walking on `MascotStage` to present each step.
- 21dd790: `RetryButton`, `CommandInput`, `PasswordInput`, `TagInput`, `Toast` with `ToastContainer`, and `PathField` move from the primitives to the composites, since each carries behaviour; `@drizztdourden08/tessera/composites` exports them in place of `/primitives`, and the root import, props and look are unchanged. `PathField` is renamed `PathInput`, with `PathInputProps` and the `path-input` classes. RetryButton and the WindowTitleBar status share one ticking clock, and PathInput and DropZone share one drag tracker, so DropZone ignores a drag with no files and takes no drop while disabled. `Center` is back as a shortcut over `Flex` with its own page and usage, and `BrandScene`, `placePiece` and `groupNode` are no longer exported.
- a54ab7e: `AnimatedMascot` is a state machine: change `animation` at any moment and the mascot blends from where it is, with the approved blend times, protected moments, upright symbols and face cross-fades; it takes `face`, and a clip that plays once goes back to idle and calls `onFinish`. `brand="auto"` picks the mascot of the nearest `data-palette`, and `ChosenMascot`, `MascotName`, `MascotChoice` and `mascotForBrand` are removed; `CommandPalette` takes a brand for `mascot`. `MascotStage`, the approved stage prototype, is in the package: several mascots on a stage of any width that walk, turn and act by command or on their own. `PixelWordmark`, `buildPixelWordmark` and `PIXEL_FONT` move to the brand tier. `InteractiveTessera` is no longer exported; it stays in the gallery.
- 3ac89d9: Five parts fold into the part they wrapped: `NumberStepper` is `NumberInput` with `buttons="sides"`, `Thumbnail` is `Image` with `frame`, `RouterLink` is `Link` with `navigate`, `TermList` is `FactsPanel` with `layout="terms"`, and `PathIcon` is `Icon` with `path`. NumberInput steps and clamps one way and labels its buttons Increase and Decrease, so `fields.increment` and `fields.decrement` are gone. `Inline` is a new row shortcut over `Flex`, the mirror of `Stack`. Text takes `tone="faint"` again, for decoration and secondary hints only, and the faint text rule lets that tone through.
- 3d05855: `SaveBar` is new: the bar at the foot of an editor, with the save state (`clean`, `dirty`, `saving`, `saved` or `error` with its reason) and Save and Discard, drawn on the `ButtonRow` bar that the inline question of `MasterDetail` now shares. `RowGrid` moves from the gallery preview into the composites: a short list edited in place, a table when wide and cards when narrow. `MasterDetail` asks over the editor by default, `guard` going from `'dialog'` to `'inline'`. New string groups `saveBar` and `rowGrid`. See MIGRATION.md.
- d238701: Every palette sets a dark gradient pair from its own hues, `--p-gradient-dark-from` and `--p-gradient-dark-to`, read as `--c-gradient-dark-from` and `--c-gradient-dark-to` and listed in `tokens.json` as `gradientDarkFrom` and `gradientDarkTo`. `splash.css`, and so `Splash`, paints it behind the page, from `--look-dark-from` and `--look-dark-to` when a page sets them. The detail and the version of the splash use `--c-text-dim`, so every text, border and bar of the splash reaches WCAG AA in each palette, which a new test checks.
- 2f039b7: `ShortcutList` and `CodeBlock` move to the composites and `Overlay` to the primitives, as the one dimmed backdrop that Drawer, DisabledOverlay, WindowGuideOverlay and ScreenLayer now draw with; `Overlay` takes `tone`, `blur`, `keepMounted`, `onClick` and `ref`. `StatRow` drops `copyable`: pass a `CopyValue` as the value, which now takes `text` for a string to copy that differs from what it shows, and any node as `value`. `Text.CodeBlock` is gone. `Floating` is no longer exported; apps use `Anchored`. Glyph drops the eighteen marks Icon already draws, and Tessera draws them with Icon. An Icon with a `label` is no longer hidden from screen readers.
- 517618d: `Video` moves from the primitives to the composites, since it is a whole player with its own bar, keys, full screen and idle timer. `@drizztdourden08/tessera/composites` now exports `Video` and `VideoProps` in place of `@drizztdourden08/tessera/primitives`; the root import, props, classes, keys and look are unchanged. Its gallery page moves to Composites · Content, and it gains a usage file. The volume icon comes from the `VolumeControl` rule; the volume, seek bar and speed menu stay the player's own, since `VolumeControl`, `Slider` and `DropdownMenu` lack the buffered band, the time preview and a menu drawn inside full screen.

## 0.19.0

### Minor Changes

- 27da4ce: `ManagedList` takes `onActivate`, run on a click, Enter or Space on a row: with it set, the arrow keys, Home and End move only the focus, with one Tab stop on the focused row, and `selectedId` still marks the current item. It also takes `actionVisibility` from `ListItemRow`, `'hover'` by default, so rename and delete are on every row: always on the picked row, and on the others under the pointer or with focus. Without `onActivate` the arrow keys move the selection as before, and `MasterDetail` keeps that. `ListItemRow` and `ConfirmIconButton` take `tabIndex`. The ManagedList page shows profiles where the arrows move and Enter switches.

## 0.18.0

### Minor Changes

- be5aa89: `ManagedList` takes `create`, a render prop `(close: () => void) => ReactNode` for a create form such as an `InlineCreateForm` with more fields. New opens it at the top of the list and moves focus into it; Escape or Cancel closes it and focus goes back to New; after a create, focus goes to the new row when the app picks it. `createOpen` with `onCreateOpenChange` lets the app decide whether the form is open, such as on a first run with no items; without them the list tracks it. `onCreate` still runs New for an app that opens its own flow. `MasterDetail` passes all three through its `list`. The ManagedList page shows a profile form with a name, a game and a template, and a first run where it starts open.

## 0.17.0

### Minor Changes

- e92754d: `ActionBar` is new: the actions on one item in a single row. A `primary` action sits last and never folds; the others keep their order and, when the row runs out of width or past `keep`, the last ones move into a More `DropdownMenu`, with danger actions in their own group. A `danger` action takes the danger look and always asks first, in place, with the check and cross of `ConfirmIconButton`; `confirm` sets the question and the name of the check and makes any action ask. New strings `items.more`, `items.asksFirst` and `items.confirmQuestion`.
- 72fc846: `ActionTile` is new, under Composites · Content: one headline value in a tile that also does one thing (Archipelia review T-24, from the T-07 proposal). It reads like a StatTile (`label`, `value`, `unit`, `tone`) and adds `meta`, an `icon`, a `status` word, one `action` at its foot, small `tools` in the top corner and `onOpen`, a chevron to the full view. An action or a tool given `copy` in place of `onSelect` copies through `CopyButton`. The label is set as written, at 12 px. New string `common.open`. The decision tree answers data, a headline number that does one thing, with ActionTile.
- 9c89d02: Four props Brock asked for. `Widget` takes `dragRegion`, which marks its title strip as the window drag region and its buttons as clickable, as `WindowTitleBar` does. A `Hero` with no `art` and no `backdrop` fits its content and starts at the top in place of keeping its full height. A `SettingsRow` action takes `loading`, which shows its button busy while the app runs it. `StatRow` takes `size` (`sm`, `md` or `lg`, the `GaugeSize` scale of StatTile and Gauge).
- a967cf3: `CheckList` is new: the results of a list of checks, such as a connection test. Each check has a `state` (`pass`, `warn`, `fail`, `pending` or `skip`) drawn from one `defineStatuses` table: an icon and a tone, a spinner while pending and a grey ring when skipped, a `detail` line and an optional `action`. The counts on top add up passed, advice, failed and checking in a status region, after an optional `summary`; `compact` draws one line per check with no box. New strings `items.checks`, `items.checkPassed`, `items.checkAdvice`, `items.checkFailed`, `items.checkChecking`, `items.checkSkipped` and `items.checkCount`.
- 632c9fd: `CommandInput` is new: a command line in the mono face with a prompt mark and a Send button. Enter sends the trimmed text through `onSubmit` (return `false` to keep it), Up and Down walk the history and bring back the draft, and Escape clears the line or passes on when it is empty. The history comes from `history` or is kept by the input, in local storage with `storageKey`; `actions` holds quick commands beside the key hints. New strings `common.send`, `command`, `history` and `clear`.
- 83924a7: `CopyButton` and `CopyValue` move from the primitives to the composites, since both write to the clipboard and keep a Copied state on a timer. `@drizztdourden08/tessera/composites` now exports them and their types in place of `@drizztdourden08/tessera/primitives`; the root import, props, classes and look are unchanged. Their gallery pages move to Composites · Actions and Composites · Content. `useCopy` stays beside `TesseraProvider`.
- 2149d7d: `FileList` is new: one row per file in a framed list, with a type icon from the extension (or `icon`), the name cut short with an ellipsis, the size and the date it changed written with the DataTable `bytes` and `datetime` formats, and Open and Show in its folder icon buttons with tooltips when `onOpen` and `onReveal` are passed; the columns line up across rows, `empty` says why there are no files yet and `dense` tightens the rows. New strings `items.files`, `items.noFiles`, `items.openFile` and `items.revealFile`.
- b5f2c82: `ItemCard` is new: one item of a catalogue as a card, with `media` on top or on the left (`layout`) over a gradient in `mediaTone`, an `eyebrow` and a `status` on one line, the title as a heading (`level`, 3 by default), `tags`, `details` joined with dots and stopped at three lines, and `actions` through an `ActionBar` with one action in view. `onOpen` or `href` makes the title a button or a link whose hit area covers the card, with the focus ring around the card; `selected` draws the primary border and marks the title with `aria-current`.
- d5a6ee9: `ManagedList` is new: the list side of a list and editor screen, a title with its count, New, a filter, rows under group headings, rename in place, a delete that asks once, the arrow keys, Home, End and F2, and the loading, empty and error states. `MasterDetail` is new: a ManagedList beside an editor in a MasterDetailLayout that asks before a pick, New or Back throws unsaved edits away, in a dialog or a bar over the editor, with Stay here, Discard and Save and open.
- d577152: Six new parts for long, schema driven forms. `JsonInput` types JSON over the code highlighting of CodeBlock, checks it as it is typed, names the problem with its line and column, tints that line, hands on a value only while the text parses, and has Format. `KeyValueEditor` edits a map of names to values row by row, with names from a list of valid items or typed freely, a count, number, text or select per value, and a check that holds the value back while a name is empty, listed twice or not on the list. `NamedRange` puts the named values of a number first and Custom with a NumberStepper second. `SetPicker` picks several choices from a long list, with the chosen ones as tags over a search and a checklist. `FormRow` lays out one option with its name, help, control, changed mark, advanced tag, problem and reset, and gives the control its id, label and notes. `FormGroupTabs` heads a long form with a search, Show advanced and a tab per group with its changed count.
- 452abfa: `PathField` is new: a file or folder path the user can type, drop from the desktop or pick through the app's own dialog with Browse, all in the same field. A drop shows a dashed target, `kind` and `accept` turn away a folder, a file or a wrong ending with a reason, and `resolvePath` reads the full path of a dropped file. A long path is cut in the middle so the file name stays in view, and Copy, Reveal (`onReveal`) and Clear sit at the end; read only keeps Copy and Reveal.
- 214c67e: `RetryButton` is new: a small Retry button for a failed step, such as a lost connection. `retryAt` counts down to the next automatic try in a line before the button (Next try in 4 s), the button then reads Retry now, `attempt` and `attempts` add Try 2 of 5, and `retrying` shows a spinner. The app keeps the timer and starts each try. New strings `common.retry`, `retryNow`, `nextTryIn`, `tryOfIn`, `tryOf`, `waitSeconds` and `waitMinutes`.
- c3abe80: Small text is 12 px: `--text-xs` goes from 10 px to 12 px, so captions, hints, tags, badges, mono StatRow values, keycaps and every other small label read more easily (Archipelia review T-03, ux-59). Field labels and Text `variant="label"` no longer force upper case or wide letter spacing; section headers, widget titles, StatTile labels and the overline variant keep their capitals. A small TagInput keeps its entry 80 px wide, so a compact settings row with two tags stays on one line, and ShortcutList keeps a `+` between keys on one line.
- 1fa9726: `Splash` is new: the static splash page drawn from React with the same `splash.css` classes, with a mark, a title, a status line, a detail, a bar that fills or sweeps, actions and the version, for a start, an update or a reconnect. `splash.css` adds `ts-splash--layer`, `ts-mark`, `ts-detail` and `ts-progress--indeterminate` (MIGRATION section 163).
- 144bbf0: `Status` takes a table of states: `<Status map={TABLE} value={key} fallback="unknown" />` draws the word, tone, pulse and icon of the key from a `defineStatuses` table. `StatusOf` is gone; `StatusOfProps` is `StatusProps` (MIGRATION section 157).
- b2ae8ad: `ValidationSummary` is new: what blocks a save, listed above a form in a danger or warning `Callout` inside an alert. The title counts the problems unless `title` is given; each problem with a `field` is a link that calls `onFocusField`; the first `max` (4) show and "and N more" shows the rest and moves focus to the first one it revealed. New strings `items.fixBeforeSaving` and `items.andMore`.

### Patch Changes

- cbc05ac: `Drawer` closes on Escape through `onClose`, moves focus in when it opens, keeps Tab inside while open and gives focus back to its opener when it closes, with the focus and Escape code of `DialogShell`; it is `inert` while closed. The name of a `FormRow` is a `label` for its control, so a click on it focuses the control or flips a `Toggle`, and focuses the first stop of a group control. `ErrorBoundary` is exported from `@drizztdourden08/tessera/primitives` only, no longer from `/composites`; the root import is unchanged. The ContentHeader catalogue entry gets a real summary.
- d2242e2: Gallery: a new Preview · For approval group holds the Mascot stage prototype, where Sentri, Flint and Pelago walk, turn and move between their approved clips on a stage of any width, by command or on their own. It lives in the gallery only and is not part of the package.

## 0.16.1

### Patch Changes

- 1a74e6a: Title bar actions take any `tone` as an icon colour and an `effect` from Icon (twinkle, ping and the rest), kept when the action folds into the main menu.

## 0.16.0

### Minor Changes

- 064516b: Card takes `title`, `subtitle`, `count`, `actions`, `tone` and `level`, drawn as a header row in the SectionHeader look above the body, and `title` is no longer the native tooltip attribute; Widget and the widget definition take `padding` (`none`, `sm` by default, or `md`) and `fill`, a full-height body column that does not scroll, and the body keeps its scrollbar gutter. See MIGRATION.md under "Card has a header row, and the Widget body takes padding and fill".
- fe8f65f: `ControlMenu` is new: a dropdown of settings behind one button, each row a label with one compact control (SegmentedControl, Toggle, Slider, Select, NumberStepper), joined to its trigger like a DropdownMenu, with sub-panels joined at their row, a filter that narrows rows by label, and the shared popup stack. WidgetOptions keeps its 0.15.0 rows and opens in a ControlMenu from the widget gear (`Widget` takes `options`), `OptionRow` becomes `ControlMenuRow`, the shared listbox drop can line up with the end of its trigger, and the DropdownMenu-based widget menu from the previous change is withdrawn. A widget opened on an edge takes its `defaultDockedSize` as its share of the window, and joins a pane already on that edge as a split instead of stacking another 22 percent pane further out.
- a58a7a6: `CopyValue` is new: a value the user often copies, such as an address, a seed or a key, with a copy button at its end, `mono` and `truncate` (`end` or `middle`). `CopyButton` is new: the one copy button, icon only or with its word, that turns to a check, reads Copied for two seconds and announces it. LogPanel and CodeBlock copy through `CopyButton`, and `useCopy().copy` resolves to whether the copy worked.
- deabdf0: Every control inside a `data-app-region="drag"` region stays clickable with no app rule; the standards extension adds `tessera/no-tessera-internals` (stylelint, app selectors that name a class of a Tessera part), `tessera/no-icon-button-child` and `tessera/prefer-named-input` (ESLint); docs/using-tessera.md gains "Window drag regions" and a "Common needs" table.
- 3154ed0: Field takes `width` (`sm` 256 px, `md` 512 px by default, `full`), a max inline size so fields no longer stretch across a wide page, and StatRow stops at 512 px so its value stays near its label (`--field-w-sm`, `--field-w-md`, `--stat-row-max-w`).
- 64a38e7: tessera guide writes the part names of each scope to the module that `guide.parts` names, merged into TesseraApps, so an app no longer lists its views by hand, and tessera check reports the module once it falls behind; `usageExampleImports` from `@drizztdourden08/tessera/config` is a knip compiler that adds the imports of a usage example as re-exports, so a part only the example imports counts as used.
- 5c9c15c: TextInput, PasswordInput and SearchInput take `onEnter(value)` and show the 2 px focus outline of Button; Slider takes `input`, a NumberInput at its end bound to the same value and bounds; FactsPanel takes `layout` (inline, rows, boxed); StatRow and FactsPanel values can be selected, and `copyable` adds a copy button named after the row. See MIGRATION.md section 123.
- c14f94c: ListItemRow shows its action at all times by default (`actionVisibility` defaults to `"always"`; `"hover"` is the opt-in and still shows on touch screens), and Enter and Space both run `onClick`; a row with only `onDoubleClick` runs it from the keyboard.
- 78324c2: Mascots play 29 clips: the variants idle-bounce, move-wobble, jump-hop, happy-grin and alert-exclaim, the new spin, the expressions default, content, curious, focused, sleep and love, and the interactions working, idea, success, confused, worried, low-power and resting. MASCOT_CLIP_GROUPS sorts them into Motion, Expressions and Interactions and MASCOT_CLIP_VARIANTS names each variant's original. An effect can be fixed to the stage, a clip's still list keeps its symbols in the resting picture for reduced motion, and AnimatedMascot draws only the effects the playing clip uses. Sentri draws every new clip in pixel art.
- 8c65ef5: MasterDetailLayout stacks its list and detail under 768 px, showing the detail with a Back button that calls `onBack` and the list once the detail is empty, and on a wide window its list column drags from 240 to 480 px through the SplitPane divider, with the arrow keys, Home, End and Enter, remembered under `storageKey`; new props `onBack`, `backLabel`, `resizable`, `listWidth`, `minListWidth`, `maxListWidth`, `storageKey`, `listLabel` and `detailLabel`. See MIGRATION.md under "MasterDetailLayout stacks on small windows and its list column drags".
- c70440a: LogPanel takes `height` ("fill" or pixels); ProgressBar takes `showValue` and `formatValue(value, max)`, written at the end of the bar and read as aria-valuetext; EmptyState takes `title`, `hint` (which can hold Shortcut keycaps) and `size` (sm, md, hero); SearchResults takes `emptyIcon`. See MIGRATION.md section 119.
- 0b54dd7: A click on the title bar or any drag region closes an open popup: while a popup is open the page carries `data-popup-open` and drag regions marked `data-app-region="drag"` stop dragging. Popups also close when the window loses focus.
- 6336efa: ProgressBar draws one value again: parts, legend and ProgressPart are removed, and a bar split into parts is a StackedBar. StackedBar moves from the composites to the primitives, so it is no longer exported from the composites entry. StatTile takes a size of sm, md or lg, its page shows StatTile alone, and the live Performance panel moves to the Widget page inside a real Widget.
- e076ca9: SectionHeader draws its title as a heading (`h3` unless `level` says otherwise) and takes `count`, drawn as a Badge after the title; ListItemList takes `heading` and `count`, drawn in the overline look, and the heading names the list. See MIGRATION.md section 118.
- e2ef8cc: SettingsRow and SettingsItem take `actions`, buttons after the control in the same right-aligned end area, or in its place when the row has no `input`, which is now optional; a `danger` action has the danger look and `confirm` asks first, in place, with the ConfirmIconButton pair. See MIGRATION.md under "Settings rows take actions".
- 59b16ee: SettingsRow and SettingsItem take `changed` (a dot after the title), `onReset` (a reset button beside it on a changed row), `problem` (a line under the row in the danger tone), `badge` (after the title) and `descriptionLines` (folds a long description with More and Less); the row hint shows under the description at rest, and pointing changes that line instead of hiding the description; SettingsSection counts its changed rows when no `changedCount` is given. See MIGRATION.md under "Settings rows show changes, problems and badges".
- 6daa111: `ShortcutList` is new: keys, clicks and drags in one column and what each does in the next, every description starting at one edge and every key on the first line of its text, gestures drawn as caps with an icon and a short verb, groups under small headings, and rows that stack when the text column would get too narrow. The WidgetOptions Shortcuts sub-panel and the WindowGuideOverlay rows use it, and the widget title bar loses its long native tooltip.
- fe4d6a2: SideNavLayout opens its nav with labels on a wide layout, and SideNav takes `open`, `onOpenChange` and `storageKey` to hold or keep that choice; the nav scroll thumb shows on hover only, so it no longer draws a long bar beside the items. A segmented SettingsRow choice that does not fit its row turns into a Select with the same options and value, measured before paint. See MIGRATION.md section 115.
- eb54104: `splash.css` is new beside `splash-tokens.css`: plain CSS classes for a splash page in static HTML that shows before the app bundle loads, a centred stage, a title, a status line with a danger look, a button and a primary button in the look of Button, a progress bar that fills to `--value` with an edge and a danger look, and the version in the corner. It ships in `exports` and `files`, and the gallery has a Static splash page under Core, Setup.
- cba937b: StackedBar takes orientation: vertical stacks the parts bottom to top in a column of a given height, or the height of its box, with the legend beside it, the same tooltips and the same grouping into Other; size sets the column width as it sets the bar height.
- 1298138: `defineStatuses` and `StatusOf` are new: a kind of state is declared once as a typed table of keys, each with a label, a tone, and an optional pulse and icon, and `StatusOf` draws the Status of a key from it, with a fallback for a value not known yet.
- cded9b2: `TaskProgress` is new: the progress of one long job, a bar with its percent or a sweep while the length is unknown, the current line, a state word (running, done, failed, cancelled), the steps in a vertical Stepper, a danger Callout on failure and the output lines folded in a LogPanel of fixed height that a failed job opens. `JobDialog` is new: TaskProgress in a dialog with Cancel and Hide while the job runs and Close once it ends. `ProgressBar` takes `indeterminate`, and `Stepper` takes `complete`, every step done.
- 94e8844: Text takes `tone` as Span does, `mono` for the code face, `numeric` for tabular figures and `variant="overline"` for small caps group headings. No Tessera text uses `--c-text-faint` any more (about 1.86:1); it is `--c-text-muted` (5.29:1 on the LogPanel), and the standards extension adds the stylelint rule `tessera/no-faint-text`, which refuses `color: var(--c-text-faint)`. See MIGRATION.md section 117.
- 3ffe0b1: WindowTitleBar actions take `bar: 'dropdown'` with `groups`, a title bar button that opens its own menu and becomes a sub-menu of the main menu when the window narrows, and a status action takes `pulse`, a pulsing dot on top of its swell and breathing; WindowHeader and ScreenWindow take `onBack` and `backLabel`, a back button before the title; ContentHeader, ScreenPage, SettingsPage and the ScreenWindow header take `back`, a Back to button before the icon that folds to an arrow with a tooltip when narrow. See MIGRATION.md under "Title bar dropdowns, a pulsing status, and back buttons in headers".
- d0b2890: The close, pop out, pop in and options buttons of a Widget carry its name ("Close Players"); each DockLayout pane carries `data-pane-id` beside the `data-widget-id` of each Widget, as stable test hooks; a Hero with no `brand` takes the brand of the nearest `data-palette` before falling back to tessera. See MIGRATION.md section 127.

### Patch Changes

- 4e896bc: DialogShell, and every dialog built on it, moves focus in on open, keeps Tab and Shift+Tab inside, brings focus back from the page behind and returns it to the opener on close; only the top dialog closes on Escape. A danger Dialog and DeleteGuardDialog start on Cancel, CreateRecordDialog starts in its first field, and the new `initialFocus="dialog"` starts on the panel.
- ef4270a: Flint draws all 19 new mascot clips in its smooth facets: idle-bounce, move-wobble, jump-hop, spin, happy-grin and alert-exclaim, the expressions default, content, curious, focused, sleep and love, and the interactions working, idea, success, confused, worried, low-power and resting. Its stone hands type, scratch its head, rest under its chin and go up to cheer; its orange chip flares, dims and flickers as an expression light; and its flat vector symbols (question and exclamation marks, a heart, z letters, a bulb with rays, a battery, sweat drops, confetti, sparkles, swooshes and a laptop) and eye overlays stay in the reduced motion picture.
- 1dfedc0: The `hit-area` class (with `HIT_AREA_CLASS`, `--hit-area-min` and `--hit-area`) grows the hit area of a small control to at least 24 by 24 px without changing its look. The Tag remove button takes clicks on 24 by 24 px around its 16 px glyph, and the SideNav edge toggle on 28 by 28 px.
- ffb0042: The standards extension declares a knip facet: usage files are entries and their example imports count as uses (needs standards 0.7.0).
- 8ce3b34: Mascot clips move smoothly: Sentri's 19 new clips and its link spark ease continuously in place of stepped pixel hops, with fades in place of pops, and Flint's spin, battery blink and chip flicker drop their stepped easing.
- 861946c: Flint's spin starts turning while it is still rising and finishes the turn on the way down; the laptop of the working clip is redrawn for Sentri, Flint and Pelago, seen from behind at three quarters with the lid, its lit edge, the hinge and the keys; the Mascot gallery pages switch by mascot with one tab bar that every section follows and the gallery remembers, the Brand page shows its mascots the same way, and the clip cards are named by their clip so all three list the same 29.
- a334ebf: Pelago draws all 19 new mascot clips in its smooth facets: idle-bounce, move-wobble, jump-hop, spin, happy-grin and alert-exclaim, the expressions default, content, curious, focused, sleep and love, and the interactions working, idea, success, confused, worried, low-power and resting. Its islets race, droop and huddle as its hands, its threads flash bright or dim with the mood, its crystal glow is the expression light, and its flat vector symbols (question and exclamation marks, a heart, z letters, a bulb with rays, a battery, sweat drops, confetti, sparkles and a laptop) and eye overlays stay in the reduced motion picture.
- 85789f4: ScreenLayer is one modal dialog around the floating switcher and the card, moves focus to its title (or first control) on open, keeps Tab inside with the DialogShell focus code, makes its siblings inert while open, and returns focus to the opener when it closes or hides. A toast gives focus back to where it was before when its action or close button is chosen.
- 2da388e: StatRow, and FactsPanel through it, copy with `CopyButton`: the same 20 px icon button named Copy and the row label, now with the green check, Copied for two seconds and the status announcement every Tessera copy has.
- 40ac137: WindowTitleBar: a concealed or full screen bar shows while focus is in it, and a lone Alt tap moves focus to its menu button (Escape returns it); every icon button shows a Tooltip with its label and the action `shortcut` as keycaps on hover and focus, and actions set `aria-keyshortcuts`; the brand draws the app mark once, before the name, with the instance badge after it.
- 7def4dd: ToastItem takes `action` (`{ label, onSelect }`), drawn as a small button that runs `onSelect` and dismisses the toast; a toast waits while the pointer or focus is on it. ScreenLayer puts `floating` before the card in the page order, so its switcher is the first Tab stop, with no change in where it draws.
- 0c0aeb4: Tooltip opens on focus and on hover, has `role="tooltip"`, describes the focused control with `aria-describedby`, closes on Escape through the shared dismiss stack, and takes `focusable` to put plain text in the Tab order. ToastContainer is a polite status region that stays mounted, and a danger toast is an alert. RadioGroup names each group with `useId` and makes the legend the first child of the fieldset.
- 503eb25: The Widget title bar buttons (pin, pop out or pop in, options, close and the menu buttons) take the hit-area class, so each takes clicks on 24 by 24 px around its 20 px box; a FactsPanel value cut short with a tooltip is focusable, so the keyboard reaches its full text. See MIGRATION.md under "Widget title bar buttons take clicks on 24 by 24 px, and a cut FactsPanel value takes focus".

## 0.15.0

### Minor Changes

- 1799a34: Four chart parts for panels that update every second: Sparkline draws the latest samples as a line or an area with an optional threshold band and a dot on the latest sample; Gauge is a small round meter whose tone follows its zone; StatTile holds a headline number with its unit, a delta with a trend arrow and a chart; StackedBar splits one bar into parts with tooltips, a legend and an Other part past a limit.
- 0365b65: Every mascot plays the same ten clips: idle, move, jump, wave, scan, happy, alert, point, blink and link. Sentri gains point, blink and link (a spark that hops pixel by pixel up one edge of the pyramid and down the other, from pod to pod), and Flint gains link (a spark thrown over its head from hand to hand through its glowing chip). One type, `MascotClip`, and one list, `MASCOT_CLIPS`, replace `SentriAnimation`, `FlintAnimation` and `PelagoAnimation`. A mascot's motion can add `effects`: pieces the moving mascot draws hidden until a clip fades them in.
- bbe24f9: Widgets from hands-on testing in Brock: a floating widget resizes from every edge and corner, between `floatingMin` (160 by 96 pixels by default) and the main view it floats over; the WidgetOptions panel closes on a press anywhere outside it, on Escape (innermost first), when focus leaves it and when the window loses focus; every widget body scrolls with the slim ScrollArea and keeps a gutter for the thumb, so it never covers text; the drag hint is a compact one line card at full opacity beside the pointer, kept on screen, and WindowGuideOverlay takes `pointer` to sit beside the pointer too. Window groups are removed: the Window group row of WidgetOptions, the Window group sub-menu of the WindowTitleBar View menu, their props, the `WindowGroup` and `WindowTitleBarGroup` types and their strings.

### Patch Changes

- 097865d: DropdownMenu sub-menus join their parent the same way at every level: level with the open row's top, else its bottom, else on the row, always a gap apart with the tunnel only at the open row. They no longer line up with the parent menu's own edges and merge into it.

## 0.14.0

### Minor Changes

- 9d3adaa: DropdownMenu sub-menus line up with the open row's top or bottom edge before they fall back to the middle, and a join at a menu's first or last row runs straight along that menu's edge. Checkable and radio items keep the menu open when picked; every other item still closes it. Sub-menus place themselves right inside a page scaled with CSS `zoom`.
- c9b35c8: Pelago, the Archipelia mascot, is redrawn as an island spirit: a floating island of faceted stone with a glowing crystal face, four islets in orbit joined by threads of light, and pebbles below, over the ring of dots. Its animations are redone and it gains point, link (a spark that runs around the ring of islets) and blink. A motion frame's opacity fades its part again, so Sentri's and Flint's shadows fade as drawn. Scene groups lose goo, and the Svg primitives lose SvgFilter, SvgFeGaussianBlur and SvgFeColorMatrix.

### Patch Changes

- 78aaa5b: Select, Combobox and DropdownMenu lists keep their width and the join with their trigger inside a page scaled with CSS `zoom`. Without CSS anchor positioning, DropdownMenu sub-menus are no longer cut off from the second level on.
- ddab775: The brand palettes sit in the `ds.palette` layer, so an app's own `theme.css` seeds win whatever the import order.

## 0.13.0

### Minor Changes

- ed9afe3: Brand palettes ship in the package: `@drizztdourden08/tessera/palettes/rotp.css`, `archipelia.css` and `brock.css` set each family app's seeds under `[data-palette]`. Brock gets its own palette, the logo's orange on a neutral charcoal.
- ed8dc38: DropdownMenu sub-menus line up with the parent menu's top edge, or its bottom edge when the top does not reach the open row, and the join runs straight along that edge with square corners; only when neither lines up does the sub-menu sit on the row with curves on both sides. Every item keeps the mark and icon columns, sub-menu rows included, so icons and labels line up across item kinds; an unchecked item shows a dim check and every radio item shows a ring.
- e66cee3: Hero's `backdrop` takes many kinds: a live scene node that fills the hero, an image by URL that covers, contains or tiles, a solid colour or token, or `null` for none; left out, it draws the brand gradient. `art` takes an image by URL or any node, and the new `shade` prop sets the fade that keeps text readable (`fade`, `scrim` or `none`). Both `backdrop` and `art` now name their kind: wrap a scene as `{ kind: 'node', node }` and art as `{ kind: 'image', src }`.
- e33cae3: ChosenMascot with `auto` draws none when the brand or palette has no mascot, instead of Sentri. `mascotForBrand(brand)` gives the mascot of a brand, or null.
- cdaa3fe: ScreenWindow takes `header`, which makes a ContentHeader the top edge of the window in place of the title bar, with the close button at the end of its actions; the title bar stays the default. UtilityScreen is laid out as rotp's update dialog, with the status in that header at the window level and no card inside: one column, the report button over a rule with an optional `report.footnote`, then the actions. `title` is gone: `status.title` names the window. InfoScreen drops the page header and its `icon`, `heading` and `backdrop`: its window keeps the title bar and the reading column scrolls under it.

### Patch Changes

- cbb907d: ScreenPage's header no longer flickers between full and compact when the body barely overflows: it compacts only when the body still scrolls with the smaller header, and comes back only at the top.
- c0899a9: WindowTitleBar's status, such as Update available, swells again every 4 seconds and breathes with a slight opacity change in between; reduced motion keeps it still.

## 0.12.0

### Minor Changes

- 1b835dc: ContentHeader: the header of ScreenPage is its own component, so any card, panel or page can carry it. It takes an icon, a title, a backdrop, a strip after the title, actions at the end, a compact look and a heading level. The header classes move from screen-page\_\_ to content-header (MIGRATION section 97).

## 0.11.0

### Minor Changes

- 8301c5d: Archipelia has a mascot: Pelago, three purple spheres that press together and drift apart, never still, with floating eyes and floating hands that follow a beat late, over a ring of dots. It has every animation Sentri has (idle, move, jump, wave, look around, happy, alert), and ChosenMascot picks it by the name pelago, by brand="archipelia" or inside data-palette="archipelia". MascotMotion takes ambient, a loop that runs under every clip; MotionTrack takes lag; a scene group takes goo to melt its shapes into one; Svg adds SvgFilter, SvgFeGaussianBlur and SvgFeColorMatrix.
- 663c824: Brock has a mascot: Flint, a small round stone cut in flat facets like the Brock logo, with its orange chip, a flat base and two stone hands. It has every animation Sentri has (idle, move, jump, wave, look around, happy, alert) plus point and blink, and ChosenMascot picks it by the name flint, by brand="brock" or inside data-palette="brock". A scene can set smooth to draw anti-aliased vector edges in place of crisp pixels, and MascotPose takes handAngles. ChosenMascot's animation takes any mascot's animation name; one the mascot lacks plays its idle.
- d5afc7c: Screens, SideNavLayout and Hero fit small windows and phones. The screen card fills the layer under 840 px wide or 560 px high (was 480 and 440) and its padding shrinks to lg under 960 by 600 and md once it fills the layer. SideNavLayout folds under 640 px wide into a bar with a menu button and the search, and the nav opens as a drawer over the page. Hero gives its art a column of its own, so the aside never covers it and it is never cut off, keeps the aside at least 320 px wide, shrinks from 408 px to 288 px when the room is short, and stacks under 720 px wide. --hero-art-left is removed; --hero-h-min and --hero-aside-min are new.
- 3d87af2: The pin of a widget in its own window is a menu of labelled choices with an icon each and a mark on the current one, and its button shows the current choice. PinMode is 'off' | 'top': with-app is gone, since Sync with main window does the same, and Widget drops onTop. Widget takes titleBarActions and WidgetManager takes widgetActions(id) for buttons of the widget's own in the title bar.

### Patch Changes

- 62bd7fe: Gallery: the Composites pages for Data views, Lists, Settings, Layout, Windows, Content and Input devices, and the Data engine page, open on a one-sentence lead, a few short points and, where a sibling is the better pick, a Use instead line.
- 9480f99: Gallery: the Composites pages for Dialogs, Overlays, Wizard, Navigation, Menus, Actions, Inputs, Forms and Widgets open on a one-sentence lead, a few short points and, where a sibling is the better pick, a Use instead line.
- 5e74126: Gallery: the Core pages (Setup, Brand, Colours, Typography, Text, Icons and Tokens) open on a one-sentence lead and a few short points in the new description format.
- 0f0b1c9: Gallery: Overview pages open on a one-sentence lead, 3 to 6 short points and an optional Use instead line, written in a small markup that draws Code, Strong, Em, Shortcut keycaps and links to other component pages. Button, DataTable and SettingsRow use it, and a test lists the pages still over the limits.
- 5140070: Gallery: the Primitives pages (Layout, Display, Actions, Inputs, Feedback and Navigation) open on a one-sentence lead, a few short points and, where a sibling is the better pick, a Use instead line.
- a260d50: SettingsRow puts its control under the text when the row is too narrow for both, so a phone no longer squeezes the description to a word per line.

## 0.10.0

### Minor Changes

- 5be0256: DataTable group rows span the whole scrolled width, with the group label pinned to the start edge and the field name and count pinned to the end edge, in both directions. The sort toggle, the column menu trigger and the table options gear are IconButtons. Reference cells are a Link with the new `variant="subtle"` when the table gets `resolveIdRefHref`, and plain text otherwise. `FieldPicker` is removed. FilterBar's add menu shows each field's type with an icon, a label and a colour, and each chip shows the same icon in place of its dot. IconButton takes a `ref`.
- b0a7ea6: DropdownMenu sub-menus open a small gap (`--menu-gap`, the corner radius) away from their parent and join it only at the open row, through a tunnel as tall as the row whose edges curve into both menus. Both menus keep their full border, halo and corners everywhere else; near a menu end the corner and the fillet share the room. The tunnel follows the row when the sub-menu opens on the left, moves to stay on screen, or nests. A safe area keeps a sub-menu open while the pointer heads for it across the gap and the parent's other rows. The `dropdown__join*` classes become `dropdown__tunnel*`.
- 0cb1c49: InputIcon `tone` takes every Status tone: primary, secondary, tertiary, neutral, success, warning, danger and info paint the highlight parts in that colour, with the same thin gap as `theme`. PixelWordmark, and so Logo.Wordmark, BrandWordmark and Logo.Combined, scales down in proportion when its box is narrower than the wordmark, and an inline Logo.Combined shrinks its name to fit beside the mark.
- c7134a7: Every screen kind shows the page header, and nothing turns it off. ScreenPage is the new building block for it: a card with a header of icon, title and fading backdrop that compacts once the body scrolls. SettingsPage is built on it. WorkspaceScreen drops `pageHeader` and every `WorkspacePage` needs an `icon`. InfoScreen and StageScreen take a required `icon` and `heading`; StageScreen's toolbar and Done button move into the header. UtilityScreen takes RotP's update dialog look again: the status is the header, the message is a centred line, `notes` is a framed box with a tinted title, progress shows its percent, and `footnote` is replaced by `report`, one red bug icon button. A screen built without the header is a custom screen made from ScreenWindow; in development a screen kind warns when `pageHeader` is forced on it or its header has no icon or title.
- d10d1e0: SettingsRow shows one line under its title: the description at rest, swapped in place for the row hint while the control is pointed at, or for the hint of the segment, option, toggle state, slider value or highlighted select option under the pointer, with no change in row height. `description` (or `noDescription: true`) and `hint` are required on every settings row and content row, and the search matches the hint. Compact rows keep a 40px minimum height and their wide inputs a 160px minimum width, from new tokens, and compact radio options drop their subtitles. Select takes `onActiveChange`, and RadioGroup options take a `hint`.
- a786d70: Stepper keeps its size as the current step moves. Every step keeps a summary line by default, and each label keeps the room it needs in bold, so nothing around the Stepper moves on Next, Back or a jump. `reserve="none"` drops the empty summary line. New type `StepperReserve`.
- 3387bec: Stepper: going back plays the forward sequence in exact reverse at 0.6 times its length, one step at a time. A jump over several steps plays the full sequence for each step in turn at 0.4 times the forward pace; Skip to Review across six steps now takes 2.7 s instead of 6.8 s. A done circle flips its number over to a check (`doneIcon`, on by default; `false` keeps the number), and each step can pick its own icon. A step, or the whole Stepper, can take any Tessera tone or tag colour with `tone`, which colours its fill, border, glow and the line arriving at it. New motion tokens: `--duration-step`, `--duration-step-flip`, the `-back` durations and easings, and the `skip` durations.
- c6a23b7: The usage guide tooling is now named guide, with no alias: the `guide` object of `tessera.config.json` (`guide.usage`, `guide.out`, `guide.tree`, `guide.tsconfig`, also under `apps`), the `tessera guide` command, the `pnpm guide` script, the shipped `guide/` folder with its `./guide/*` export, and the `GuideUsage` type. `RENAMES.json` gains a `configKeys` group for the moved settings. Tessera moves to `@drizztdourden08/standards` 0.6.0: `.gitignore` ignores every dot-folder with `.*/` and lists the tracked ones, and `pnpm lint` runs `standards knip`.
- e55835a: Widget windows get the pieces of a window system. WidgetOptions shows a Sync with main window switch and a Window group select for a widget in its own window, both controlled (`sync`, `onSyncChange`, `group`, `groups`, `onGroupChange`) and each with an info tooltip and a hint; WidgetManager passes them through `windowOptions`, `windowGroups` and `onWindowOptionsChange`. The new WindowGuideOverlay dims the window and shows a card with the keys while a window is moved or resized, including Snapping off while Ctrl is held. Widget takes `square` for a widget window shown fullscreen. OptionRow takes `about`.
- 5bb4f7f: WindowTitleBar slides instead of folding. A bar item that hides as the window narrows slides out towards its end of the bar while it fades, and slides back in the same way; the items beside it glide into the freed space. The concealed bar slides down from the top edge when the pointer nears it, at full height, instead of growing from zero height. A status action shows its status as plain text in its tone, with no pill, and the text swells from its centre with Emphasis when it appears. The bar now also fits right to left layouts. `windowGroups`, `windowGroup` and `onWindowGroupChange` add a Window group radio sub-menu to View, None first. Emphasis `pulse` and `loop` stop animating under reduced motion.

### Patch Changes

- 757f868: Escape closes the innermost popup first. Popups that use useDismissListeners share one stack per document, so Escape in an open Select inside WidgetOptions closes only the Select and a second Escape closes the panel; a menu that handles Escape itself keeps the key, and a press inside a nested popup no longer closes the popups under it.
- 1fbda2e: `tessera add` in a Tessera checkout writes the Playground story with the gallery's `PlaygroundArgTypes` and `PlaygroundStory` types, its first parameter in the `Content` group.

## 0.9.1

### Patch Changes

- 0a25896: A Button leaving `loading` shows its label at once, even in a window that is not painting. The label now sits in a `.btn__label` wrapper (`display: contents`, so layout is unchanged) that is hidden with `visibility` while the spinner shows, instead of turning the button's text colour transparent, which started a colour transition that never ran in hidden windows.

## 0.9.0

### Minor Changes

- 2dfb2c0: InputIcon exports `INPUT_ICON_FAMILIES`, `INPUT_ICON_NAMES`, the accepted names of each family as a readonly list, and `isInputIconName(family, name)`. `InputIconFamily` and `InputIconName` come from those lists, and a test keeps them equal to the glyph data. A name the family does not have draws a question mark key and warns in development. See MIGRATION.md.
- 50c017c: ScrollArea takes `scrollbar="slim"`: a thin line in the primary colour, painted along the edge so it takes no layout width, wider under the pointer and draggable. SideNav scrolls its groups with it, so the collapsed icon column is no longer squeezed by the scrollbar. New tokens `--scrollbar-slim` and `--scrollbar-slim-active`. See MIGRATION.md.

### Patch Changes

- 4335b63: The Stepper sequence runs without a stall between its parts. The fill, the line and the ring each take a curve that hands its speed to the next, from the new tokens `--ease-step-fill`, `--ease-step-line` and `--ease-step-ring`, and the current circle starts breathing as its ring spreads. See MIGRATION.md.

## 0.8.0

### Minor Changes

- ab732c5: Every logo takes `rim`: `'none'`, `'light'` or `'dark'`, a thin outline that follows the mark so it reads on dark and light surfaces. The rim colours and widths are tokens, and `pnpm icons` writes every brand's icon files again with each rim under `brand/light-rim/` and `brand/dark-rim/`, always without a tile. See MIGRATION.md and brand/LOGO.md.
- ce207fd: InputIcon: the SNES glyphs are vector paths only, with no blur filter or bitmap, and their pressed d-pad arrow is red. The generic family adds `dpad` and the four d-pad directions, and `gamepadInputIcon('generic', 'dpup')` maps to them. `tone="theme"` paints highlights in `--c-primary` with a thin gap around them. See MIGRATION.md.
- 859a6f0: `WindowTitleBar` takes `actions`, declared once, which show as bar buttons or status pills and as menu items; `left` is removed. Everything the bar shows is also in its hamburger menu: the pin and full screen as check items in a View sub-menu, each action as an item with its status as the subtitle. As the bar narrows, its items hide one by one before the brand gives way, and the logo shrinks before it goes. See MIGRATION.md and RENAMES.json.
- 69aec47: `WizardFrame` is now `Wizard`, `WizardFrameProps` is now `WizardProps`, and its classes `wizard-frame` and `wizard-frame__*` are now `wizard` and `wizard__*`, with no alias. See MIGRATION.md and RENAMES.json.

## 0.7.1

### Patch Changes

- bba5a42: Hero's intro column grows to fit its title and only shortens it when the hero is too narrow. LogPanel's default count says "1 entry" and "2 entries".

## 0.7.0

### Minor Changes

- 4f42235: `AboutPanel`, `ReleaseNotesPanel`, `CalibrationPanel` and `ProfilePicker` move to Brock and leave Tessera: import the first two from `@drizztdourden08/brock-react`, `CalibrationPanel` from `@drizztdourden08/brock-input/renderer`, and use Brock's `ProfilesPanel` for profiles. `useCopy` is exported, and an app part reads the whole string table through `useTesseraStrings`. `tessera new` takes `layer` from `tessera.config.json` and `--layer`, imports a usage example from the part's own workspace package and its export, and writes a story only where the part's package lists StoryLite or a `stories` folder is set. See MIGRATION.md.
- f270b30: `FilterBar` drops facets: every filter is added with a + menu and shows as a chip of joined segments, field, operator, value and remove, each one editable. `LogPanel` is redone as one framed box with a `FilterBar` toolbar and filters its lines itself. `ListItemRow` takes any number of two-line `columns`, and the new `ListItemList` lines them up across rows. `GroupTree` is rebuilt as a real tree with guides, icons, counts, selection and keyboard support. `DataTable` draws a full border and scrolls sideways inside itself. See MIGRATION.md.
- aba4949: `DropdownMenu` draws its own trigger from `trigger={{ label, icon, iconSide, iconOnly }}`, an `IconButton` or a `Button` in the menu `variant`, and joins the open menu to it at every size. `intensity` sets the edge: `strong`, `medium` or `subtle`. Menus close on an outside click, on Escape and when the trigger scrolls out of view. Items line up with or without icons, shortcuts share one column, `kind: 'radio'` adds radio items, `filter` searches every level, and sub-menus join the edge of their parent. `trigger="hamburger"` is now `trigger={{ label: 'Menu', iconOnly: true }}`. The new `ChosenMascot` picks a mascot by name or by brand and palette, and `CommandPalette` takes `mascot`. See MIGRATION.md section 63.
- 9f9c080: New `InputIcon` primitive: controller buttons, sticks, triggers, d-pads and keyboard keys for the xbox, playstation, switch, gamecube, snes, generic and keyboard families, with `gamepadInputIcon(family, id)` to match SDL button ids and `KeyboardEvent.code` values. `PressedGrid` takes `family` and an `icon` per item and draws its cells with `InputIcon`. Icon effects draw thinner, take a `size` of `sm`, `md` or `lg`, and gain a `comet` kind. The `DynamicInput` popover is as wide as the control it holds, with a 192 pixel floor for a slider. `Widget` shows a gear for its options. `DockLayout`, `WidgetManager` and the dock API pass `onPopOut(id, point?)` the screen point where a dragged widget left the window, and `visibleLayoutOf` drops popped widgets that fail the show rules. See MIGRATION.md.
- c072d24: Settings come from one model. `SettingsRow` is new: a title, a description, a live hint that says what the value or the pointed part does, and the input on the right, for every kind from a toggle to a keybind, with a compact and a read only look. `SettingsGroupList` is folded into `SettingsSection`, which now draws a whole section the way relic-of-the-past does, on the sunken fill. `WorkspaceScreen` builds its side nav, page header, sections and search from one `content` object, and searches every row of every page. `NavLayout` is renamed `SideNavLayout` and loses the menu filter. `SearchResultGroup` and `SearchResultHit` are new, and `SearchResults` draws with them. See MIGRATION.md section 61.
- 7ae86a9: `WizardProgress` is now the `Stepper` primitive, with summaries and sub-steps in both orientations, an error state, lines that meet the circles exactly and one fill, line, border and glow sequence per step. The step definition drives the whole wizard: summary, sub-steps, hint, busy text, an extra control and the label or icon of each button. `WizardNav` is a `ButtonRow` with the new dark `bar` variant and generates Back and Next with arrows at the same size, the step content fades with the Stepper, and `WizardDialog` puts a wizard under the standard dialog header. See MIGRATION.md section 62.
- 51fd04c: `WindowTitleBar` centres its brand on the whole bar and, short of room, shows the logo alone and then nothing. `WindowHeader` stays on one row: the subtitle shortens, then the extras hide, then the title shortens. `Hero` has a fixed height that its content no longer changes. `UtilityScreen` takes `settings`, for choices such as a pre-release toggle and a version picker, and `footnote`, a fine print bar with an action at its end. See MIGRATION.md section 60.

### Patch Changes

- 2d9ebb8: The `gear` glyph draws a toothed wheel with a hole, the shape of the Lucide `settings` icon, where it drew a sun. The DataTable options button shows it. See MIGRATION.md.

## 0.6.0

### Minor Changes

- 1d3453a: `Emphasis` moves from the composites to the primitives, beside the text elements, and its gallery page is now Core · Text, Emphasis animation. The package root still exports it; an import from the `composites` subpath moves to the root or `primitives`. The gallery regroups the composites: Navigation keeps only navigation, and new Layout, Lists, Settings and Windows groups hold the rest. See MIGRATION.md section 59.
- 3b7504e: `Stepper`, the number field with minus and plus buttons, is renamed `NumberStepper`, with `NumberStepperProps` and `number-stepper` class names. Nothing else about it changes. The name `Stepper` is freed for the wizard step indicator in a later release. See MIGRATION.md section 58.

## 0.5.0

### Minor Changes

- a431bc6: The usage files of app parts follow the same rules as Tessera's own. `tessera check` (`brock tessera check`) runs the Tessera usage checks on every part in the `parts` folders of `tessera.config.json`, the views of each `apps` entry included: complete fields, no sentence left from `tessera new`, alternatives that name a Tessera export or an app part, a tree path on the Tessera tree or the app tree, examples that type-check against the app and a `propsHash` that matches the props. `ai.usage` decides: `report` lists and passes, `enforce` fails. `tessera ai` also writes the app guide to `ai.out`, linked to the Tessera guide. `ai.tree` names a module whose `APP_TREE` adds app branches to the decision tree, and `ai.tsconfig` the tsconfig the check reads the parts with. `ComponentUsage` takes the app names and answers an app adds to `TesseraApps` by declaration merging, and `AppTree` types the tree module. The standards extension runs the same checks: notes in report mode, findings in enforce mode. The package now ships `scripts/ai`, and `typescript` is an optional peer dependency the check uses. See MIGRATION.md section 53.
- c58f1b0: `Drawer` takes `title`, `subtitle` and `actions`: a `WindowHeader` with a close button at the top, a body that pads its content on every side and scrolls, and an actions row at the bottom. The popups of `DynamicInput` show the Stepper, NumberInput, Slider, option list and ColorPicker in their own look inside one shared frame, and a selected slot draws in the Tessera selection colour in place of the browser's blue box. See MIGRATION.md section 57.
- e5783e3: `Icon` takes `effect`, a small pop that lands every few seconds on a random point of the drawn shape: `twinkle`, `glint`, `ping`, `burst`, `dot` or `shimmer`, with `every`, `jitter`, `color` and `count`. The pops never change the size of the icon, pause off screen and in a hidden tab, and never show under reduced motion. The new `--duration-icon-pop` token sets their length. `SearchSpark` and `SEARCH_ICON_PATHS` are removed: draw `<Icon name="search" effect="twinkle" className="search-glass" />`. See MIGRATION.md section 56.
- 81df80c: `InlineCreateForm` takes `size`, `md` or `sm`, and follows the size of the `Field` around it, else `md`; `compact` no longer forces `sm`, and the name field, the extra fields and the buttons all follow the size. `RecordEditor` takes `size` too, and each of its rows has the same padding on every side, so a marked row keeps its label and control clear of its edges. See MIGRATION.md section 55.
- a431bc6: `PasswordInput` is a new primitive built on `TextInput`: an eye button with `aria-pressed` that keeps the focus and the caret, controlled or not, with `hideOnBlur`; any mask character drawn over the real password input in the mono font, so autofill and password managers keep working; a `monospace` option; a Caps Lock warning; and an optional rule checklist and strength meter, from the rules or from a host score, announced once typing pauses. `mode="new"` asks for a new password. `InputAdornmentAction` takes `pressed`, the string table gains a `password` group, and the icon set gains `arrow-big-up-dash` and `circle`. See MIGRATION.md.
- a431bc6: Screens come in layers. `FullScreenLayer` splits into two building blocks: `ScreenLayer`, the overlay with its equal gap, the empty card and the floating slot, with a new `compact` size; and `ScreenWindow`, which adds a title, a close button and an empty container, with the same padding on all four sides and an lg gap under the title bar. Four screen kinds are built on them: `WorkspaceScreen` for a side list of pages beside a `SettingsPage`, `InfoScreen` for About and credits, `UtilityScreen` for a short task with a status, progress and actions, and `StageScreen` for one open stage with a toolbar and Done. `SettingsShell` is removed; `NavLayout` takes its `filterable` and `filterPlaceholder`. The `.fullscreen-layer*` classes become `.screen-layer*` and `.screen-window*`. The decision tree gains a full screen view. See MIGRATION.md section 52.

### Patch Changes

- 403d3c2: Tessera's lint and structure tooling moves from `brock-build` and `brock-lint-config` to `@drizztdourden08/standards`, with the same rules. The usage file check of the standards extension now treats a missing `Name.usage.ts` like any other usage finding: a note in `report` mode, a finding in `enforce` mode. An app needs no change beyond installing Tessera. See MIGRATION.md section 54.

## 0.4.0

### Minor Changes

- a311d50: `AnimatedMascot` animates an app's mascot from its pieces with the Web Animations API, typed so each brand takes only its own animation names. Sentri gets Idle, Move, Jump, Wave, Look around, Happy and Alert, each with play and pause, speed and loop, and a still pose under reduced motion. The brand data's new `motion` field lists a mascot's parts, pivots and animations. See MIGRATION.md.
- 50bacb4: The bright and dim accent greys of the Tessera palette are neutral instead of slightly pink, and the light colour set is removed: Tessera has one colour set, and each app's palette is its look. `--brand-backdrop-gradient`, built by `backdropGradientCss(BACKDROP_GRADIENT)`, is the shared backdrop each palette paints its own way, and `Hero` draws it. `InteractiveTessera` callouts show the logo alone and open the wordmark on focus, never overlapping the T. `pnpm icons` writes a `mark.ico` for Tessera, the gallery favicon, and draws the maskable, Android background and splash layers of a straight app icon on transparent ground. See MIGRATION.md.
- 87a8d7b: One name per job: `Badge` is now a count or a dot (`inline`, `number` or `dot`, a circle for one character and a pill for more, `max` for 99+, anchored to the corner of an icon), the old coloured status word is `Status`, which absorbs `StatusBadge` as its `pill` look and drops the click to cycle mode, and the chip TagInput drew is the new `Tag` primitive, with `normal`, `urgency` and `category` variants whose colours the types check. TagInput, Combobox, the Select multi-select tags and TagPicker all draw `Tag` in one shared look, and the tab, table and search counts draw `Badge`; see MIGRATION.md.
- a311d50: Each brand has its own backdrop: `BRAND_FAMILY[app].backdrop`, built by `backdropGradientCss()` into `--brand-<app>-backdrop`, a blend of soft glows in the brand colours with no visible edge. `BACKDROP_GRADIENT` and `--brand-backdrop-gradient` are removed. `Hero` takes `brand` to pick its backdrop. `tokens.json` gives each brand its `backdrop`. `ScrollArea` holds the wheel only on an axis that has something to scroll, so a sideways ScrollArea no longer stops the page from scrolling. See MIGRATION.md.
- 87a8d7b: Relic of the Past's mark is its new pixel logo, and its mascot is Sentri, built in code from its separate pieces with `Mascot`, `BrandScene` and `sceneMarkup`; the Hookshop variant has Sentri pull a shop bag in with its hookshot. `BrandMark` and `Logo` take `variant="app-icon"` in place of `tile`, drawing the app icon the new `appIcon` brand field describes: none for Tessera, the mark straight for Relic of the Past and Brock, the tile for Archipelia. `pnpm icons` writes every brand's files from the brand data, with PNG ladders from 16 to 512, whole-pixel scaling for pixel art and a .ico from 16 to 256. See MIGRATION.md.
- 87a8d7b: `Button` and `IconButton` take `loading`, which shows the Spinner in place of the icon, disables the button, sets `aria-busy` and keeps its width; a disabled button no longer spins its icon. `Spinner` takes `label`, renders a `span` and fades in place of turning with reduced motion. The new `TesseraProvider` lets an app swap the spinner for its own, once at the root, for every Tessera part that draws one. `AboutPanel`, `CreateRecordDialog` and the `RecordEditor` save button show the spinner while they work in place of their Collecting..., Creating... and Saving... labels; see MIGRATION.md.
- 9c35af8: `ConfirmIconButton` takes `placement`, `start` (the default), `center` or `end`, so the icon keeps its edge when the question opens and the cancel button takes its place; `ProfilePicker` rows and the `SettingsGroupList` reset use `end`. `InlineCreateForm` takes `compact`, a one-line form at the `sm` size with icon buttons to create and cancel, and its error now describes the name field. `ErrorBoundary` moves to the primitives tier; the package root still exports it. See MIGRATION.md.
- 50bacb4: `DropdownMenu` builds from data: `groups` of items with an icon name, a description, a shortcut drawn with `Shortcut`, checked and disabled states, submenus and separators at any depth, with full keyboard support and menu roles. `trigger="hamburger"` draws an animated hamburger in a gold edge with the menu hanging from it as the `Select` list does. `WindowTitleBar` builds its menu from `menu` groups, and its pin, full screen, minimize, maximize and close buttons are built in, report to `onControl` and can be turned off through `controls` (all but close). `MenuEntry`, `items`, `key`, `onClick` and the title bar callbacks are replaced; see MIGRATION.md.
- 50bacb4: `FactsPanel` is a new composite for label and value pairs in groups split by hairlines, and `Hero` draws its facts with it (`HeroFact` and `HeroFactRow` give way to `FactsPanelFact` and `FactsPanelGroup`). `WindowTitleBar` draws its caption buttons with the new `windowMinimize` and `windowClose` glyphs and the existing maximize and restore glyphs. `AboutPanel` takes `brand` to draw the app's icon and wordmark from the brand family. A pressed danger `IconButton` stays red, `LogPanel` no longer lets times run into tags, the `SectionNav` rail glows on its current item, `SectionNav` takes `overlay` and compact `NavLayout` slides the menu over the page, `TabBar` icons centre on their labels, `SettingsPage` blurs its backdrop, and `StickPlot` draws a line to the dot with a muted `Small` calibrated marker; see MIGRATION.md.
- 58a8eee: `FloatingSwitch` slides one thumb to the picked place, and hovering a place brightens and glows its text without filling it. `SplitPane` shows a hairline divider with a grip that lights up on hover and focus, takes `orientation`, `minRatio` and `maxRatio`, no longer stacks its panes under a 960 pixel window, and works right to left. The pane name strings `navigation.leftPane` and `navigation.rightPane` are now `navigation.firstPane` and `navigation.secondPane`. See MIGRATION.md.
- ce66e20: `FullScreenLayer` keeps one gap around its card, equal on all sides, that follows the room it has: a 2xl gap plus 5% of the smaller side on a large layer, stepping down to a minimum that always leaves room above the floating switch, and to no gap under 480 px wide or 440 px high. The padding moves to a new `.fullscreen-layer__inset` wrapper.
- 9d217f1: Controls publish hints: SegmentedControl and ToggleGroup options, Toggle, Slider and IconButton take a `hint` of a value label and a one-line description, report it through `onHint` and to the nearest `HintScope` while pointed at or keyboard focused, and `HintLine` shows it in a fixed line with an idle text. SegmentedControl, IconButton, Toggle, Slider and Shortcut gain an `xs` size, and SegmentedControl options can be icons alone. WidgetOptions is rebuilt from xs icon controls with a hint line at the bottom, and its shortcut list moves to a floating aside beside the panel; every function and prop is kept. Widget option strings and OptionRow's `hint` change; see MIGRATION.md.
- 632183e: Every input takes `size`, `md` (the default) or `sm`, and the sizes line up: a row of `md` inputs and a `md` Button shares the new `--control-h-md` (39 px), and a row of `sm` ones shares `--control-h-sm` (28 px). `Field` passes its `size` to the control inside. The `xs` size of SegmentedControl, Toggle and Slider becomes `sm`, and `SegmentedSize`, `ToggleSize` and `SliderSize` give way to `ControlSize`. See MIGRATION.md.
- 5b67ad3: The `link` override leaves `TesseraProvider`. `Link` is now a styled link for a URL, with tones and an `external` variant, and the new `RouterLink` draws a route in the app: a real `href`, and a plain click calls `onNavigate(to)`. `Box` no longer takes `href`. The gallery puts its top groups under Core, and Core · Setup gains pages on the app setup, building compounds and views, and app primitives and composites, beside the TesseraProvider page. See MIGRATION.md.
- db16c87: `Slider` takes `range` for two thumbs and a `[low, high]` value, `stops` for named positions, `keyStep`, `defaultValue`, `name` and `id`, and `labels`: a rule such as `"every 0.5 | {v}x"`, a list of `[value, label]` pairs, or a function. Labels that would overlap thin out. `RangeSlider` and `RangeInput` are removed in its favour. `Textarea` takes `resize`, with `none` to lock its size. See MIGRATION.md.
- db16c87: `DynamicInput` replaces `PositionInput`, with no alias. It was first named `PatternInput`, which is renamed with no alias; its classes are `.dynamic-input*` and its strings are the `dynamicInput` group. The field is written as a pattern of muted text, typed slots such as `{hh:hour 12h}`, `{amount:decimal 2 group}` or `{country:choice @countries flag}`, echoes, icons and action buttons. Each slot is its own segment: typing fills it, a full slot moves on, Tab and Backspace move between slots, and the slot in focus opens a popover with a Stepper, a Slider, a NumberInput, an option list or a ColorPicker. The value is one object keyed by slot name. `parsePattern` and `escapePatternText` are exported, and a bad pattern warns in development without throwing. `clampAxis`, `clampPosition`, `isValidForAxis`, `isWithinAxis`, `PositionAxis` and `PositionValue` are removed. RecordEditor draws its x and y pairs with DynamicInput. See MIGRATION.md.
- 50bacb4: `TesseraProvider` takes every app part in one place: beside the spinner, a clipboard writer behind every copy button, a link component behind every `href`, the `Image` and `Thumbnail` placeholder, the `ErrorBoundary` crash screen, the `EmptyState` art, the portal document (`PortalDocumentContext` is removed) and an icon set behind `Icon` names. Every built-in string now comes from `TESSERA_STRINGS`, a typed table of English defaults an app overrides whole or key by key. `AboutPanel` loses `onCopy`, `OperatorSpec` loses `label`, and the new `Link` primitive renders every link; see MIGRATION.md.
- 02095c0: `RENAMES.json` groups its maps by the release they ship in (`releases: [{ version, cssCustomProperties, components, ... }]`, oldest first), and every key maps straight to its final name, so an upgrade replays only the releases between two versions in one pass each. Unreleased entries sit under `next`, which the release step stamps with the new version.
- 9797a33: `@drizztdourden08/tessera/cli` exports `runTessera(args, { cwd })`, the same commands as the `tessera` bin, so another tool such as the Brock command line can run them and read the exit code.
- 7807ac7: `SearchResults` has a fixed head with the summary and "Open" chips for pages whose names match, and a body that scrolls on its own. Group headings are split into a glowing icon, a title, a count pill and an `openLabel` button, with `groupHeading="button"` for the old look. `idleIcon` shows a search spark above the idle message, and with no match the head stays and `emptyMessage` fills the body. `NavLayout` takes `paneScroll` and by default leaves the results to scroll themselves. The icon glow is one shared class, `.icon-glow`. See MIGRATION.md.
- 58a8eee: `SectionNav` is renamed `SideNav`, with its types, its `.section-nav*` classes and its `--section-nav-*` tokens following the new name, and the old grouped `SideNav` is removed. `SettingsShell` draws the new `SideNav` and takes `filterable`, `filterPlaceholder` and `header` itself. `HeaderTabs` is renamed `HeaderAnchorNav`, with `.header-tabs*` becoming `.header-anchor-nav*`; it now lists its buttons in a `ul` inside the `nav` and marks the current one with `aria-current="location"`. There are no aliases. See MIGRATION.md section 47.
- db16c87: `TabBar` is renamed `Tabs`, with its classes moving from `.tab-bar` to `.tabs`; there is no alias. When the tabs overflow, the scroll arrows no longer keep a blank space: the left arrow shows only once the strip has left the start and the right one only while more tabs wait to the right. The TesseraProvider gallery page now shows one override per section, each with a toggle, a demo and its own snippet. A `portalDocument` named in `TesseraProvider` now wins over the document a `Portal` is rendered in. See MIGRATION.md.
- 50bacb4: Tag classes are `.tag` again, and CodeBlock prefixes its highlighter classes as `code-block__token--<type>` so they cannot match a component. TagPicker options take a Tag `variant` and `color` and keep them once picked, with a border in their colour. Badge drops spaces and symbols from its value before it renders, shows numbers as whole counts, and renders nothing when no text is left or a count is below 0. ProgressBar renames `variant` and `secondaryVariant` to `tone` and `secondaryTone` (`ProgressVariant` is `ProgressTone`), takes `parts`, several labelled amounts stacked in one bar with a tone or colour each and an optional `legend`, and is now a labelled `progressbar` with `aria-valuenow` and, for parts, `aria-valuetext`; see MIGRATION.md.
<!-- markdownlint-disable-next-line BROCK007 -->
- 5b67ad3: Tessera now ships an `ai/` folder: a decision tree, the always-rules and one page per component, generated from each component's usage file by `pnpm ai`, for any AI working in an app that uses Tessera. The new `tessera new <kind> <Name>` command creates a primitive or composite in Tessera, or a compound, view, primitive or composite in an app, with its usage file and gallery story. The human guides in `docs/` ship with the package.
- 3d446a2: An app tells Tessera's tools where its own parts live in `tessera.config.json` at the repo root, checked against the shipped `tessera.config.schema.json`. `@drizztdourden08/tessera/config` reads it from Node with `loadTesseraConfig` and `findTesseraConfig`, with types. `tessera new` writes each kind into the configured folders, the views into the folder of the app it runs in, and takes `--into` to pick a folder from a list. Tessera declares a `@drizztdourden08/standards` extension that requires usage files in the configured parts and passes their primitives globs and theme token file to ESLint and stylelint. Tessera's own `aiUsage` setting moves from package.json to `ai.usage` in its `tessera.config.json`. See MIGRATION.md.
- 334cb48: `TextInput` and `NumberInput` take `start` and `end`: an icon at either end, sized to the control, that becomes a labelled button when it has `onClick`. `SearchInput` is a new primitive built on it, with a search icon, a clear button that keeps the focus, Escape to clear and `type="search"`; `SideNav`, `CommandPalette`, `FilterBar` and the `Select` search box use it. The `Combobox` clear button and the `DynamicInput` icons and actions draw through the same adornment. The `SideNav` chevron lines up with the first row, and the nav has the same space above its first row and below its last. See MIGRATION.md.
- 5b67ad3: The value rule engine is exported on its own (`parseValueRule`, `formatValueRule`, `thinLabels`), and `ScaleLabels` draws labels along any scale, across or up. `Slider` drags both range thumbs with the mouse, keeps its readout at the width of its longest value, and loses `mute`; the new `VolumeControl` composite pairs a mute button with a slider. See MIGRATION.md.
- 9d217f1: A standard wizard: `useWizard` holds the steps, the input, visited steps, errors, unsaved input and a finish that keeps every input when it fails; `WizardFrame` lays it out inside a screen by default, with the steps on top or in a column on the left, or in a dialog. `WizardProgress` is the step strip whose circles fill and connect as each step is done, with a compact form, summaries and sub-steps; `WizardStep`, `WizardNav`, `WizardReview` and `WizardExitGuard` are the other parts. `WizardDialogShell` is removed, `TermList` takes a node as a detail, and the string table gains a `wizard` group; see MIGRATION.md.

### Patch Changes

- 709010f: AboutPanel takes `heading`: `wordmark` (the default with a brand) or `title`, which keeps the brand mark but shows the app's own name. Menu shortcuts read `Mod` as Cmd on macOS and Ctrl elsewhere, accept key names such as Comma, Period and Plus, and leave out an unknown part with a dev warning. WindowTitleBar takes `onMenuOpenChange` so an app knows when its menu is open.
- a311d50: Menus grow to fit their items: the hamburger menu, anchored menus and submenus are capped only by the room to the window edge and scroll past it, where they used to stop at the 288 px of a Select list. `useListboxDrop` takes `fit` for this; Select and Combobox keep their cap. See MIGRATION.md.
- 8acd7f2: Apps that typecheck Tessera's source no longer fail on the colour picker's `react-color` imports. The picker reaches react-color's ES files through the package's own `#react-color/*` imports, which carry their types, and `@types/react-color` is now a dependency.
- 2e83dd0: ScrollArea fades its content over a short edge on each side that has more to scroll, instead of cutting it straight. The fade follows scrolling and resizing; `fade={false}` turns it off.
- e84ed2f: Sentri's pods are whole rounded hands: each pod's inner end now continues under the body as a rounded knuckle, so a turned pod in Wave, Happy, Jump, Alert or a pose shows a round hand instead of a straight cut. At rest Sentri, the Hookshop scene and the icon files look exactly as before.
- 3b6d394: `tessera.config.json` lookup stops at the top of the repo (`.git` or `pnpm-workspace.yaml`). Inside an `apps` entry, the default views folder and theme file come from the app's own folder. The standards extension reads the config when the lint runs, from the root or package the factory passes; it gives `primitivesGlobs` for primitives only, and a broken config is a structure finding instead of a load error.

## 0.3.0

### Minor Changes

- f376c60: New composites: DockLayout tiles widget panes around a main view with drag, drop, tabs, resize and peek, and Hero draws the top of a home screen with a backdrop, art, facts and actions. Widget moves to the split tree layout: a frame with tabs, pop out, a pin for its own window, and the new WidgetOptions panel. WidgetManager now hosts a DockLayout of widgets from a version 2 WidgetLayout, and stored flat layouts migrate on load. This changes the Widget API; see MIGRATION.md.
- f376c60: New input device composites from Brock's input tester. `CalibrationPanel` is the frame of one calibration step: a title, an instruction, a live monospace readout, the step content, then Cancel and one step action. `PressedGrid` is a grid of button cells that light up while their id is in `pressed`. `StickPlot` draws an analog stick position from plain `x` and `y`, with optional inner and outer dead zones, a measured `range`, a recorded `center` and a larger `lg` size. A trigger reading needs no new part: a `StatRow` with `mono` over a `ProgressBar` with `live`, as the ProgressBar gallery shows.
- ef8000a: `TesseraLogo` is renamed `InteractiveTessera`, with `InteractiveTesseraProps`, and its classes and custom properties move from `tessera-logo` to `interactive-tessera`; see MIGRATION.md. The gallery's Brand section now has a Brand page for the whole family, InteractiveTessera, and Logo, WordMark and Combined pages for the mark, the wordmark and the two together, and the brand gradients have their own page under Colours.

### Patch Changes

- 4d246cc: WindowTitleBar draws its minimize, maximize, restore and close buttons at Brock's size again, with the filled 12 unit caption paths. ListItemRow takes `actionVisibility` (`hover` by default, or `always`), and ProfilePicker uses `always` so the delete button stays in view. ProfilePicker fits its content up to 640 px instead of filling the width. `Small` takes the status tones (success, warning, danger, info) on top of dim and muted, for short status lines.
- 1dfaa6d: `useDockKeys` no longer reads `window` while rendering, so pages that render on the server, like the gallery build, work again.
- 0422b2c: DockLayout and WidgetManager take `mainGrip`: `always` (the default), `dragging` to show the grip on the main view only while a widget is dragged, or `hidden` for an app whose main view never moves.

## 0.2.0

### Minor Changes

- d19c22b: Anchored pins a popup to its trigger through the browser's popover top layer and CSS anchor positioning, so it follows the trigger in the same frame as a scroll. Select, Combobox, TagInput, Tooltip, DropdownMenu, ColorPickerPopover, the Widget settings and the FilterBar and DataTable menus use it, with the script placement as a fallback.
- 52681a9: Each brand has a standard gradient (`gradient` on its brand data, `brandGradientCss`, and a `--brand-<app>-gradient` token), the package ships `tokens.json` and `splash-tokens.css` with the dark theme resolved to literal colours for native and static pages, and every brand folder gains transparent mark PNGs under `brand/<app>/mark/`.
- cd93c7b: SectionNav gains a rail variant with disabled items for an app's screen list, ListItemRow takes an aside, and SettingsSection takes keyed rows with lock runs and a search hit pulse. New composites carry the Brock app shell: NavLayout, SearchResults, SettingsPage, SettingsGroupList, ProfilePicker and InlineCreateForm.
- cd93c7b: New composites carry the rest of the Brock app shell: WindowTitleBar, CommandPalette with CommandPaletteRow, AboutPanel and ReleaseNotesPanel, and a new Callout primitive for warnings and footnotes. Badge pulses only when asked, IconButton takes a danger tone with a red glow that the FilterBar remove button now uses, LogPanel kinds take a tone, and CodeBlock shows plain text, wraps lines and can stop at a fixed height.
- e8ab4f1: Select is rebuilt on a shared list engine: items from plain strings to any object, columns set up by configuration with value maps, tones, rules and formats, a custom item component, categories with an icon or an emoji, multi select with checkboxes from min and max, one returned property, loading and empty states, and a trigger and list that read as one shape. Combobox is new on the same engine, for typing to narrow the list. Select can show several picks as gold tags that collapse into +N and then a count, the list marks matches with the Mark text element, and the pickers reuse the design system's text elements, Divider, TextInput, IconButton and tag chip.

### Patch Changes

- f85ee3c: Button labels are no longer selectable, fast clicks on NumberInput and Stepper buttons no longer select text, Toggle is a full pill with a matching thumb, and ToggleGroup separates its options with a line and tints the selected cell.
- 5f9271d: DropdownMenu, DataTable, Widget, FilterBar, Select and Combobox draw their text and icons through the design system: menu labels follow their item colour, disabled items read as disabled, and the menu, dock and trash icons come from the icon set.
- d19c22b: Primitives and composites build their text from the text elements and their icons from Glyph and Icon: labels, hints, captions and descriptions take a tone in place of their own colour rules, and the hand-drawn chevrons, copy, close and check icons are the shared glyphs.
- d8f1a12: New KeyboardLayout draws a full-size keyboard that highlights or presses keys by Shortcut names, and ShortcutTour walks a camera across it to teach a shortcut, key by key, then all together. Both draw every key and the mouse through Shortcut, which gains a state prop (idle, lit or pressed, easing between them like its loop) and a fill prop that stretches the caps to their box.
- 5470a2e: Shortcut (Sc) draws keys and combinations from keys as keycaps with a label, symbol or arrow legend on a normal or wide cap, and a mouse button from mouse with its pressed part in the primary colour, with an optional press animation; Quote takes its look from where it sits, CodeBlock is a primitive in the Text family, and inline code and highlights stand out more.
- 692fa15: Video is a custom player with its own control bar, theater mode and a full screen that works inside the gallery, Image and Thumbnail hold their box with a loading and a broken placeholder, ButtonGroup joins buttons into one control, and the Text page joins the Text category.
- 638a6d0: Inputs, buttons, tabs, cards and the stateful composites draw every state they have: shared hover, focus halo, error and disabled looks on the field surfaces, focus rings and pressed looks on buttons, invalid on more inputs, and open and inline options on Select, TagInput and DropdownMenu.
- d6027ef: Text elements take only the look their use needs: tones where colour carries meaning, typesetting on free text and numbers, diff colours on Deleted and Inserted. H1 to H3 are set in capitals, and the Brock build and lint packages come from the registry.
