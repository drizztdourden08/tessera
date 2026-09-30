# @drizztdourden08/tessera

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
