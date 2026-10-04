<!-- @layer docs @kind doc -->
# Migrating relic-of-the-past onto Tessera

Every change Tessera made to the design system after it was copied out of relic-of-the-past, and what rotp does about each one when it becomes a consumer. The machine-readable part is `RENAMES.json`; `DRIFT.md` lists the rotp-side changes made after the copy.

## 1. Colour tokens are named by role

| Before | After |
|---|---|
| `--c-gold`, `-bright`, `-dim`, `-soft` | `--c-primary`, `-bright`, `-dim`, `-soft` |
| `--c-green`, `-bright`, `-dim`, `-soft`, `-scrim` | `--c-secondary`, `-bright`, `-dim`, `-soft`, `-scrim` |
| `--color-gold-*`, `--color-green-*` | `--color-primary-*`, `--color-secondary-*` |
| text on a solid accent fill used `--c-bg` | `--c-on-primary`, `--c-on-secondary` |

Replay `RENAMES.json` over rotp's CSS and TS. It also maps every old `--color-*` alias to its canonical token: Tessera ships no legacy aliases, so rotp converts them all in that one pass.

## 2. rotp's palette moves into its own theme.css

Tessera's defaults are greys. rotp adds, unlayered and after `tokens.css`:

```css
:root {
  --p-primary: #c8a84e;
  --p-secondary: #4a9966;
  --p-on-primary: #000;
  --p-on-secondary: #000;
  --c-primary-bright: #e4c65a;
  --c-primary-dim: #2a2418;
  --c-secondary-bright: #5cb87a;
  --c-secondary-dim: #1a2a1e;
}
```

The dark neutrals keep rotp's exact values, so with these pins every screen stays pixel-identical.

## 3. Game-only tokens and the dialogue face stay in rotp

`tokens/game-text.css` and `fonts/` (the ALttP face) are not in Tessera. rotp keeps them and imports them from its own theme.

## 4. Widget takes the registry as data

- `WIDGET_DEFINITIONS` lives in rotp. Pass it as `definitions` to `WidgetManager`, `useWidgetLayout`, `createDefaultLayout`, `getWidgetDefinition(definitions, id)` and `getDevOnlyWidgetIds(definitions)`.
- rotp's extra fields (`readsGameData`, `requiresSetting`) go on its own `interface RotpWidgetDefinition extends WidgetDefinition`.
- `useWidgetLayout(profileId, io, startup)` becomes `useWidgetLayout({ definitions, profileId, io, startup, storageKey })`.
- `WidgetManager`: `gameRunning` becomes `contextActive`. `vanillaSafe` and `settings` become one `resolveDisabled(definition)` callback; rotp's old `resolveWidgetDisabledState` moves into rotp as that callback.
- `'game-only'` visibility becomes `'context-only'`.
- The "Shrink game area" label is now the `exclusiveLabel` prop; rotp passes its old wording.

## 5. DisabledOverlay owns no wording

`DISABLED_SETTING_MESSAGES` moves to rotp. `DisabledOverlay` defaults to "Disabled"; rotp passes `message` at every call site that relied on the Vanilla Safe default.

## 6. View state has its own session store and a storage provider

- `SessionView` and the session tier now live in Tessera (`useSessionView`, `setSessionView`). rotp's `data-view-store` keeps only its own requests (`pendingRecord`, `pendingRecommendation`) and drops `views`.
- The durable tier comes from `ViewStorageProvider`. rotp wraps its root in `<ViewStorageProvider value={{ load: loadViewSnapshot, save: saveViewSnapshot }}>` with its existing `lib/storage/ui-views` pair.

## 7. Record ids

`ID_RE` now matches any `<prefix>-<digits>`. rotp can keep its narrower list by passing `idPattern` in each collection's `SchemaConfig`.

## 8. ProgressBar variants

`variant` and `secondaryVariant` values `'gold'` and `'green'` become `'primary'` and `'secondary'`.

## 9. One radius scale, and rotp's screen sizes

- `--r-sm`, `--r-md`, `--r-lg` and `--r-pill` become `--radius-sm`, `--radius-md`, `--radius-lg` and `--radius-pill` (same values; in RENAMES.json). A raw `border-radius: 50%` becomes `var(--radius-round)`.
- These sizes belong to rotp screens and leave Tessera. rotp declares them in its own theme, with the values its copy of `size.css` has today: `--mode-badge-d`, `--summary-fact-maxw`, `--settings-page-head-h`, `--settings-page-head-h-compact`, `--profile-hero-h`, `--profile-hero-intro-w`, `--profile-hero-art-left`, `--profile-hero-art-h`, `--profile-hero-bar-h`, `--profile-hero-save-w`, `--profile-hero-thumb-w`, `--option-control-w`, `--option-impact-w`, `--capacity-line-label-w`, `--capacity-slider-w-min`, `--capacity-curve-w`, `--pond-label-w-max`, `--item-sprite-d`, `--price-symbol-d`, `--shop-card-w-min`, `--shop-slot-box-h`, `--tier-box-h`, `--dark-room-tile-d`, `--dark-room-sprite-d`, `--titlebar-btn-width`.

## 10. One size scale, a tertiary colour, palettes and tracking

- Every length token is now a step of the size scale (`src/tokens/scale.css`, `--size-1` to `--size-1024`). Values that sat between steps moved to the nearest one; the ones rotp will see: `--text-sm` 11px to 12px, `--text-base` 13px to 14px, `--titlebar-height` 38 to 40, `--control-h-sm` 26 to 28, the dialog and panel widths, and the breakpoints (600 to 640, 820 to 768). Component stylesheets follow the same rule, and lint refuses a raw px, rem or em outside the scale.
- rotp's own stylesheets should take lengths from the scale too; its game-specific sizes (section 9) belong on it as well.
- A third seed, `--p-tertiary` with `--p-on-tertiary`, and roles `--c-tertiary`, `-bright`, `-dim`, `-soft`, `--c-on-tertiary`. It is the grey of the tertiary button, `#9a9aa4` in rotp, and the tertiary Button and IconButton now take their colour from it.
- Two whites and two blacks: `--p-white` / `--p-black` are the app's own (rotp: `#ece6da` / `#12100e`), `--p-pure-white` / `--p-pure-black` are exactly `#fff` / `#000`.
- Full palettes derive from the seeds: `--p-primary-50` to `-950`, the same for secondary and tertiary, and `--p-grey-0` (pure white) to `--p-grey-1000` (pure black).
- Letter spacing has tokens: `--tracking-tight`, `-normal`, `-wide`, `-caps`. Uppercase labels take `--tracking-caps`.

## 11. Colours come only from the swatches

- A colour value is written in two places only: the swatch tokens in `palette.css` and third-party brand colours in `brand.css`. Lint refuses a hex, rgb() or colour name anywhere else, tokens included.
- Every neutral role is a step of the tertiary palette: `--c-surface` is `--p-tertiary-900`, `--c-border` is `-850`, `--c-text` is `-100`, and so on. The values moved slightly (the most visible: dark `--c-text` `#e8e8ec` to `#f0f0f2`, light `--c-border-strong` `#bfbfca` to `#d0d0d5`); every text role still passes AA on the surface.
- Urgency colours are swatches too (`--p-danger`, `--p-warning`, `--p-info`, `--p-success`, deeper on a light ground); their roles derive from them. Only the three main colours have palettes.
- The `upgrade` data-series colour is gone; rotp's series takes `--c-tag-violet` (in RENAMES.json). Ten tag swatches (`--p-tag-rose` to `--p-tag-pink`, roles `--c-tag-*`, `-soft`, `-dim`) cover labels, categories and chart series.
- rotp's theme is its swatches only. The pinned bright and dim steps are gone: they derive from the seeds like every other app's.

## 12. Buttons: one behaviour for every colour, no tile or bare

- `Button` and `IconButton` variants are `primary`, `secondary`, `tertiary`, `danger`, `warning`, `info`, `success` and `ghost`. Every coloured one rests as a dim tint with a border in its colour and fills with the colour on hover, so tertiary now shows its grey on hover like primary shows its gold.
- `variant="tile"` is gone. `variant="bare"` is gone too: a clickable container with a look of its own is `<Pressable>`, an unstyled button whose class carries the whole look. Replace `<Button variant="bare" ...>` with `<Pressable ...>` and drop `size`, which never applied to it.
- A fourth urgency colour, `--p-success`, with its roles. Every urgency role now has `-bright` and `--c-on-*` like the accents.

## 13. Tags, lists, closed sets and contained widgets

- `TagInput` accepts any tag by default. The `namespace:value` check is now opt-in: pass `validate={namespacedTag}` (exported from the primitives) to keep the old hint, and `enforce` to refuse a new tag that fails it. `RecordEditor` tag lists already pass it.
- An enum field with `closed: true`, or declared through `SchemaConfig.options` by path, offers only its options: no `+ Other` entry.
- The array and object field kits edit in place. A list draws each element with its own kit, with move, remove and add; an object draws each child field.
- `ListItemRow` with a click handler takes focus, has a role (`button` by default, or `role="option"` inside a listbox) and answers Space (click) and Enter (double click, or click).
- `WidgetManager` takes `bounds="container"` to dock and float inside its parent, which must be positioned; the title bar offset then defaults to 0. `computeDockedStyles` takes the same bounds as its third argument and is exported from the composites entry, with the rest of the widget helpers.
- `useWidgetLayout` takes a `preset` layout to start from when nothing is saved, and returns `reset` to go back to it.
- `package.json` `sideEffects` lists the field kit modules, so a bundler keeps their registration.
- New primitive `Floating`: a panel pinned to the window at `placement` (`top`, `left`, `right`, `bottom`, `width`). Every anchored popup (dropdown and sub menus, the field picker, the filter pickers, the colour picker popover, widget settings) now renders through it, so none of them writes an inline style of its own.

## 14. Accessibility

- `Field` ties its label to its control without `htmlFor`: it hands an id to the `TextInput`, `Textarea`, `NumberInput`, `Select` or `Toggle` inside it, and points the control's `aria-describedby` at the hint or error. A control made of several inputs wraps them in `FieldControlBoundary` so they do not share that id.
- `Select` takes `id`, `aria-label`, `aria-labelledby` and `aria-describedby` on its trigger. `Toggle` takes `aria-label` for a switch with no visible label; the boolean field kit passes the field's label.
- `DialogShell` and `FullScreenLayer` are `role="dialog"` with `aria-modal`, named by their title (`WindowHeader` takes `titleId`).
- `ListItemRow` no longer makes the whole row a button: the icon, name and detail are the button and the action sits beside it. `role` is now `listitem` or `row`, for the row itself.

## 15. Inter, Chakra Petch and the variable type system

- Tessera ships its faces in `fonts/` and loads them with the tokens; nothing is fetched from the network. `--font-sans` is Inter (variable: weight 100 to 900, optical size 14 to 32, a true italic, the full OpenType feature set). A Latin subset loads first and the full file covers other scripts. `--font-title` is Chakra Petch, for titles and headings. `--font-game` moved to `fonts/game/`.
- Weight tokens cover the whole axis: `--weight-thin`, `-extralight`, `-light`, `-normal`, `-medium`, `-semi`, `-bold`, `-extrabold`, `-black`. `--opsz-text` and `--opsz-display` name the two ends of the optical size axis; the reset sets `font-optical-sizing: auto`.
- `Text` takes `weight` (any number from 100 to 900), `italic`, `opticalSize` (`'auto'`, `'text'`, `'display'` or a number) and `features`, a list of named OpenType features such as `'tabularNumbers'`, `'slashedZero'`, `'disambiguation'` or `'singleStoryA'`. `TYPE_FEATURES` lists them all with the font's own labels, and `typesettingStyle` builds the same style for any element.
- New composite `Emphasis` animates a word along the weight axis: on hover (its own, or an ancestor marked `data-emphasis-scope`), while `active`, once per `pulseKey`, or in a loop, whole or letter by letter with `stagger`. `anchor` (`left`, `center` by default, `right`) sets where the word grows from inside its reserved width and where a wave starts; `order` runs the wave out from the anchor, in a seeded `random` order (`seed`), or in a custom list of letter positions. It reserves the heavy width by default and holds still under reduced motion.

## 16. Icons, logos and file names

- `Icon` is now the Iconify icon, drawn offline from bundled data. Pass `name` (one of `ICONS`: 121 Lucide icons in app, interface and status groups) or `icon` (any `@iconify` icon object), plus `size`, `rotate` (0, 90, 180 or 270), `flip`, `inline` and `label`. Without a `label` it is hidden from screen readers.
- The old path-drawn `Icon` is `PathIcon`, with the same props (`paths`, `circles`, `viewBox`). Code that passes `paths` to `Icon` renames it to `PathIcon`, or moves to a `name`.
- `Icon.Brand` draws a brand mark (`tessera`, `rotp`, `archipelia`, `brock`, `rotp-mascot`) with the same props as `Icon`. `tone="mono"` draws it in the current colour.
- The brand entry adds `Logo`: `<Logo brand="rotp" />` is the mark, `<Logo.Wordmark brand="rotp" />` the wordmark, and `<Logo.Combined brand="rotp" direction="stacked" />` both together, `stacked` or `inline`.
- Every app's icon files ship under `brand/<app>/icon/` (svg, ico, PNG sizes 16 to 1024, maskable, Android layers) and `brand/<app>/splash/`. `pnpm icons` rebuilds them from the brand marks.
- Shared control looks (button and field surfaces, select popups, focus ring, glass panel and others) live in `src/theme/`, loaded by the components that use them.
- Logic files are kebab-case and named after what they export (`to-text.ts` exports `toText`); hooks stay `useThing.ts`. Deep imports into `src/` paths changed with this; the package entries did not.

## 17. Text elements, Title and popups in other documents

- Every HTML text element is a component, by full name and by short name: `Paragraph` and `P`, `Bold` and `B`, `Strikethrough` and `S`, `Highlight` and `Mark`, and the rest. Each is also on the `Text` namespace (`Text.Paragraph`, `Text.P`). The `<em>` element imports as `Em`, because `Emphasis` stays the weight animation composite; `Text.Emphasis` and `Text.Em` both work.
- Each element takes the native attributes of its tag, such as `cite` on `BlockQuote`, `dateTime` on `Time` and `title` on `Abbr`. `TextElement` renders any tag with the same props.
- Each element takes only the look its use needs. Paragraph takes weight, italic, optical size, features and a dim or muted tone; Span takes the same looks with any tone. Time and Data take features for their digits. A tone is offered only where colour carries meaning: Strong (primary and status), Bold (accents), Highlight and BlockQuote (accents and status, as the tint and the rule), Sample (status), Citation (primary), Small and Time (dim, muted). Deleted and Inserted draw in the danger and success colours. Headings take weight, italic and a dim, muted or accent tone.
- `Title` is a heading in the title face with a `level` from 1 to 6; H1 to H3 are set in capitals. `Title.H1` to `Title.H6` and `Title.Heading1` to `Title.Heading6` are the same headings by name, and `H1` or `Heading1` import on their own.
- `Portal` renders into the document it lives in. An app that renders Tessera into an iframe or a second window can pass that document through `PortalDocumentContext`.
- `CodeBlock` is a primitive in the Text family, next to `Code` and `Preformatted`, and is also `Text.CodeBlock`. The package import is unchanged; a deep import from `src/composites/CodeBlock` moves to `src/primitives/CodeBlock`.
- `Quote` and `Q` are now their own component, also `Text.Quote` and `Text.Q`, and draw their own quote marks. Inside a `Paragraph` a quote renders as `<q>`, in italics between two small raised marks. Anywhere else it renders as `<blockquote>`: one mark beside a single line, or a mark two lines tall with the text flowing around it once the text wraps. `inline` forces the in-sentence look outside a paragraph, and `cite` works in both looks.
- `Keyboard` and `Kbd` are gone. `Shortcut` and `Sc` replace them, also `Text.Shortcut` and `Text.Sc`, and take props in place of children. `keys` takes one key name, or an array for a combination such as `keys={['ctrl', 'S']}`. `mouse` takes one mouse button: `left`, `right`, `middle`, `wheel`, `wheel-up`, `wheel-down`, `wheel-left`, `wheel-right`, `back`, `forward` or `any`. Keys come first, then the mouse button, and the component places a plus between them. `legend` picks what a key shows: its printed word (`label`, the default), its symbol (`symbol`) or its plain arrow (`arrow`); a key without that legend shows its label. `width` sets every cap to `normal` or `wide`; left out, each key keeps its own width. A mouse button has no cap, and its pressed part is drawn in the primary colour. `animate` presses and releases in a loop. `state` holds one look instead: `idle`, `lit` (the primary colour) or `pressed` (down and in the primary colour), and a change of state eases between the looks the loop uses; an `idle` mouse button draws its pressed part in the text colour. While `animate` runs it wins over `state`, and with reduced motion both keep the colour and drop the movement. `fill` stretches the caps to fill their box. The key names gain `scrolllock`, `pause`, `numlock` and `menu`. `<Kbd>Ctrl</Kbd>` becomes `<Sc keys="ctrl" />`.
- `KeyboardLayout` is new: a full-size US keyboard drawn from data, or `size="tenkeyless"` without the keypad. `highlight` lights keys and `pressed` presses them, by the same key names as `Shortcut`, so `highlight={['ctrl', 'S']}` works. A bare modifier lights both sides; `ctrl-left` or `shift-right` picks one, and the keypad answers to `numpad-7`, `numpad-enter` and the like. Every key is a `Shortcut` with `fill` and a `state`, so it looks and moves the same. `onKeyRects` reports where each key sits.
- `ShortcutTour` is new: a framed keyboard and a camera that zooms onto each key of a shortcut in turn and presses it, holds the earlier keys, then zooms out to the whole combination and loops. `keys` and `mouse` take the same values as `Shortcut`; `zoomOut`, `loop` and `speed` tune the walk. With reduced motion it shows the whole combination pressed, standing still.
- `Text` is documented in the Text family now, as the namespace for every text element but headings: `Text.Paragraph` or `Text.P`, `Text.Strong`, `Text.Code`, `Text.Shortcut` or `Text.Sc`, `Text.Quote` or `Text.Q`, `Text.CodeBlock` and the rest. Headings stay on `Title`. Plain `Text` and its props are unchanged.
- Gallery code snippets print array and object props in full, one item per line when they do not fit on one, so a snippet such as the `items` of `TermList` can be copied as it is.
- `ButtonGroup` is new: `Button` and `IconButton` children joined into one control, with no gap, one shared border between neighbours and the button radius only on the outer corners. It renders `role="group"`, so give it an `aria-label`. `orientation="vertical"` stacks the buttons. Each button keeps its own `variant`, `size` and `disabled`. Use it for independent actions; `SegmentedControl` stays the control for one choice and `ToggleGroup` for on and off settings.
- `Image` renders a frame around its `<img>` and holds the box the picture will take: from `width` and `height`, from the new `aspectRatio`, or 16 / 9 filling the width. While the source loads it draws a pulsing picture outline, and a source that fails draws the same outline in the danger colour with a cross. `placeholder="none"` leaves the box empty, and `pending` marks a source that is still on its way. `className` and `style` now style the frame; every other prop still reaches the `<img>`. `fallback` is drawn inside the frame, when the source fails or is missing. `Thumbnail` draws through `Image`, so it shows the same states at its own size; its props are now `Image` props, with `src` taking `null` and `placeholder` still the node for an empty frame.
- `Video` is now a player. It renders a frame around its `<video>` and draws its own control bar in place of the browser one: play and pause, a seek bar with the buffered part and a time preview, the time, a mute button and volume, a playback speed menu from 0.5x to 2x, picture in picture where the browser allows it, theater mode and full screen. Full screen uses the browser full screen on the player frame, prefixed or not, and fills the window when the page may not go full screen; Escape leaves it. A large play button sits over the poster until the first play, a spinner shows while it waits for data, and a source that fails shows `errorMessage`. The bar hides while the video plays and the pointer rests, and comes back on pointer move, focus or a key. Space or K plays and pauses, the arrows skip five seconds, M mutes, T toggles theater mode and F goes full screen. Theater mode widens the player to its container in a 21 / 9 frame with a dark band around it; it keeps its own state, starting from `defaultTheater`, or a page owns it through `theater` and `onTheaterChange` to reflow around it. Nothing in the player can be selected, so clicks and double clicks never paint it with the selection colour. `controls` now defaults to true and means this bar; `controls={false}` leaves a bare framed video, and the native controls are never shown. `label` names the player for screen readers. `className` and `style` now style the frame; every other prop, `ref` included, still reaches the `<video>`, and `preload` defaults to `metadata`. The icon set gains `pause`, `volume-1`, `picture-in-picture-2` and `rectangle-horizontal`.
- `Button` and `IconButton` draw their own keyboard focus ring, a thick outline in the primary colour set just outside the border, in place of the browser ring, and a pressed look: a coloured button sinks to a deeper fill of its colour and a ghost button to a stronger tint. Disabled buttons take their opacity from `--opacity-disabled`, the same value as before. An interactive `Card` draws the same focus ring when it takes keyboard focus.
- Composite items draw the inset focus ring (`focus-ring-inset`) on keyboard focus in place of the browser ring: `SideNav` items and heading targets, `SectionNav` items, `HeaderTabs` tabs, `FloatingSwitch` items, `GroupTree` section headers and `DropdownMenu` items. `GroupTree` headers now set `aria-expanded`. `ConfirmIconButton` takes `defaultArmed` to open on its question; focus moves to cancel only when the user arms it. `DropdownMenu` takes `inline` to draw the menu in place, without the portal and the anchor tracking. The `SplitPane` divider grip turns bright while it is pressed, as it does during a drag. A collapsed `SplitPane` pane now keeps its grid column, so the rail no longer slides under the other pane.
- Inputs draw every state they have. `Textarea`, `NumberInput` and `Select` take `invalid` like `TextInput`, and a `Field` with an error sets it for them: a danger border, and a danger halo on focus. The field surfaces (`Textarea`, `Select`, `NativeSelect`, `NumberInput`, `Stepper`) share the `TextInput` hover border and focus halo, `Textarea` draws read only on the sunken fill, and their disabled opacity comes from `--opacity-disabled`. `TagInput` draws the same hover, focus halo and danger border while a new tag is refused or `createError` is set. `Select` and `TagInput` take `defaultOpen` to start open and `inline` to draw the list under the field, without the portal and the anchor tracking. `Checkbox`, `TagPicker`, `ColorSwatch` and `RangeInput` draw a keyboard focus ring; `Checkbox` brightens its label and `Toggle` its track border on hover; `RadioGroup` options take a hover border and fill; a disabled `SegmentedControl` option and a disabled `ColorSwatch` dim; the `Slider` and `RangeSlider` thumbs grow while the pointer is over the input, and the gallery can force that look.
- `Select` is rebuilt on a shared list engine that `Combobox` also uses. The old props keep working: `options` or `groups` of `{ value, label, description }`, `value` and `onChange(value)` with a string, `searchable`, `size`, `renderOption`, `defaultOpen` and `inline`. A group now shows as a category header, and it can carry an `icon`. The new way in is `items`: plain strings, `{ value, label }` objects or any object. `getKey` names the field (or gives a function) that identifies an item, by default the string itself or `value`, `id` or `key`; `getLabel` does the same for the label, by default `label`, `name` or `title`. With `items`, `value` and `onChange` carry the whole item, and `onChange` gets `null` when the field is cleared; `valueField` returns one property of the item instead (`valueField="id"` hands `item.id` to `onChange` and matches `value` by `id`). The selection is kept by key, so it holds while the list changes, reorders or loads late; `loading` draws a spinner in the list and `emptyText` replaces the empty message.
- `Select` and `Combobox` draw an object item as a row of `columns` on one grid shared by every row, so the columns line up and a missing value leaves its cell blank. A column takes a `field` (a name, a dotted path or a function), a `header`, a `width` (`auto`, `fill`, `xs` to `lg`), an `align`, a `format` (`number`, `integer`, `percent`, `bytes`, `date`, `datetime`, `yesno` or a function), a `map` from value to what to show, a `tone` (one tone, a map from value to tone, or a function), `rules` (`{ when, show, tone }`, the first match wins; `when` checks `equals`, `in`, `not`, `empty`, `above`, `below`, another `field`, or `selected`, `active` and `disabled`, or is a function), a `render` function for full control, an `empty` placeholder, `inTrigger` and `searchable`. Every function gets the value and a context: `{ item, index, selected, active, disabled, category, query, place }`. The types are exported: `ListboxColumn`, `ColumnRule`, `ColumnCondition`, `ItemContext` and the rest.
- `itemComponent` draws each row with your own component, which gets the same context as props; the list still handles focus, keys, picking, checkboxes and categories around it. `groupBy` (a field or a function) and `categories` (`{ key: { label, icon } }`, an icon or an emoji) split the list under headers that the arrow keys skip. `valueDisplay="full"` draws the picked item in the trigger with the same columns or component; `label`, the default, shows its label.
- `min` and `max` drive the picking, both 1 by default. `min={0}` lets the user clear the field: pick the picked row again, or press Backspace or Delete on the closed trigger. `max` above 1 (or `Infinity`) turns on a checkbox per row, stops at `max` by disabling the other rows, and does not let the user go below `min`; the value then comes in through `values` and out through `onValuesChange`, and the trigger reads `3 selected` with the names in a tooltip. With `max` at 1 nothing changes.
- The trigger and the list are one shape: no gap and no line between them, the corners where they meet are square, and when the list is wider than the trigger a curved corner fills the step so the radius stays the same all around. The border colour and the focus halo run around the whole shape, and it mirrors when the list opens upward. The list is as wide as its content, at least as wide as the trigger. The chevron is now centred: it sat on the text baseline of its line box, two pixels high.
- `Combobox` is new: a text field that narrows the list as you type, with the typed text marked in each row. It takes the same `items`, `columns`, categories, `itemComponent`, `min`, `max`, `valueField` and `loading` as `Select`. `filter(item, query)` replaces the test, or `false` turns it off; `onQueryChange` hands each change of text to a server search, and then the list shows the items as they come back. With `max` above 1 the picks show as chips before the text and Backspace in an empty field removes the last one; `min={0}` adds a clear button.
- A `Field` label now has an id, which `Select` and `Combobox` use to label their list.
- Primitives and composites draw their text through the text elements. Labels, hints, descriptions and captions are `Span`, `Small`, `Paragraph` or a `Text` variant with a `tone`, so the `text-el` tone classes now carry the colour that classes such as `.field__hint`, `.field__error`, `.checkbox__label`, `.slider__value`, `.section-header__title` and `.dialog__message` used to set. The class names stay; a stylesheet that recoloured one of them needs a selector at least as specific as `.text-el--toned`. The `SectionHeader` title and subtitle and the `ListItemRow` name and meta render as `span` in place of `div`.
- Hand-drawn icons gave way to `Glyph` and `Icon`: the `NumberInput` step chevrons, the `CodeBlock` copy button, the `ConfirmIconButton` cancel and confirm, the `WindowHeader` close, the `SectionNav` chevrons and clear button, the `LogPanel` load and newest arrows and the `SplitPane` rail chevron. `DropZone` sets its browse hint spacing in CSS (`.dropzone__hint--browse`) in place of an inline style, and the `Video` speed menu draws the shared inset focus ring.
- `DropdownMenu` item labels and icons take the item colour and size: small, in the dim text colour, bright primary on hover and faint when disabled, as `Select` options do. They were drawn at the base size in the full text colour, so a disabled item read as enabled. The `DataTable` field picker menus follow the same look.
- The `DataTable` column and table menus, the column menu button, the drag grip and the drop to remove target draw `Icon`s in place of unicode characters and path data, and an empty table shows an `EmptyState`. The icon set gains `arrow-left-right`, `arrow-left-to-line`, `arrow-right-to-line`, `group`, `ungroup`, `delete`, `panel-right`, `panel-top` and `panel-bottom`.
- The `Widget` position control shows panel icons, each with a title (Dock left, Dock right, Dock top, Dock bottom, Float), and the settings separator is a `Divider`. The `FilterBar` remove button shows the standard button focus ring on keyboard focus; its danger ring stays for hover and press.
- `Anchored` is new: a popup pinned to its trigger by the browser. It opens as a manual popover in the top layer, stays in the page next to the component that renders it, and CSS anchor positioning places it (`anchor-name` on the trigger, `position-anchor` and `anchor()` on the popup), so it moves with its trigger in the same frame as a scroll, inside scroll boxes too, with no lag. `placement` takes `bottom-start`, `bottom-center`, `bottom-end`, `top-start`, `top-center`, `top-end` or `right-start`; `flip` lets the browser move it to the other side when room runs out; `--anchored-gap` in a popup's own class sets its distance from the trigger. Where the browser has no anchor positioning or popover support, it falls back to a `Portal` placed from script with `fallback`, as before; `useAnchorSupport` reports which path runs.
- Every anchored popup now uses it: the `Select` and `Combobox` list, the `TagInput` suggestions, `Tooltip`, `DropdownMenu` and its submenus, `ColorPickerPopover`, the `Widget` settings, the `FilterBar` add and facet menus, and the `DataTable` column, options and field menus. Popups render in place in the DOM, so they inherit the theme of the part of the page they sit in; a stylesheet rule that targets every child of a container (`.box > *`) now also reaches a popup rendered there, so exclude `[popover]` in such rules. `Portal` stays for overlays that are not tied to a trigger: dialogs, drawers, toasts and full screen layers.
- `Select` takes `multiDisplay`: `count`, the default, reads `3 selected` with the names in a tooltip; `tags` draws a gold tag (the `TagInput` chip in its primary tone) per pick on one line, as many as fit beside the chevron, then a `+N` tag with the rest in a tooltip, and the count when not even one fits. It measures the real widths and follows the trigger as it resizes or the picks change. `tagField` picks what a tag shows: a field name, a dotted path or `(item) => ReactNode`, by default the label. `Combobox` picks now show as the same gold tags, showing `tagField`; they keep wrapping onto more lines instead of collapsing, because each one stays removable and the text needs its room.
- The list of `Select` and `Combobox` draws its text through the text elements: a match is marked with `Mark`, cells take the text element tones (`dim`, `muted`, `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger`, `info`; `faint` and `default` are gone), and categories are split by a `Divider`. The `Select` search box is a `TextInput`, the `Combobox` clear button an `IconButton`, and the `Combobox` chips the `TagInput` chip. The chip look moved to a shared sheet, and `TagChip` takes a `tone` and an optional `onRemove`.

## 18. Brand gradients and resolved tokens

- Each brand in `BRAND_FAMILY` has a `gradient`: `{ angle, stops }`, with two or three hex stops in drawing order. `brandGradientCss(gradient)` returns the `linear-gradient()` string, and `--brand-<app>-gradient` in `src/tokens/brand.css` holds the same value. Code that builds its own `BrandInfo` adds a `gradient`.
- `tokens.json` (`@drizztdourden08/tessera/tokens.json`) is the dark theme with every colour resolved to opaque hex, for pages and programs that cannot compute `color-mix()`: `brands.<app>` holds `gradient` as `[from, to, via]`, `angle`, the `stops` in drawing order and the `css` string; `theme.dark` holds `bg`, `surface`, `hairline`, `border`, `text`, `textDim`, `textMuted`, `textFaint`, `primary` and `onPrimary`; `theme.radius` and `theme.space` hold the scales; `palettes.<palette>.dark` repeats the colours for each gallery palette. A translucent colour such as `hairline` is flattened onto `bg`.
- `splash-tokens.css` (`@drizztdourden08/tessera/splash-tokens.css`) sets every token as a literal custom property on `:root`, with no `var()`, `color-mix()` or imports, then what each palette changes under `[data-palette="<palette>"]`.
- `pnpm tokens` writes both files and the gradient tokens from the CSS and the brand data; a test fails when a committed file differs from what it would write.
- `brand/<app>/mark/mark-<size>.png` is the mark without its tile, transparent, at 16 to 1024 pixels, 96 and 192 included for a splash at one and two times. `pnpm icons` writes them with the other icon files.

## 19. Composites for the Brock app shell, settings and profiles

- `SectionNav` takes `variant`: `panel`, the default, is the nav as before; `rail` is an app-level screen list that sits flush on the window edge on the surface fill with a line on its right, draws no toggle and no item chevrons, and drops the glow from the current item. In the rail, `collapsed` narrows it to icons and the host owns that state. `ariaLabel` names the nav (default "Sections"). An item takes `disabled`, which dims it and stops clicks, and a group's `label` is now optional, for a first group with no heading. The root carries `section-nav--panel` or `section-nav--rail`, and the narrow screen float applies to the panel only.
- `ListItemRow` takes `aside`: a short muted line at the right of the row, such as a date.
- `SettingsSection` takes `rows` in place of `children`: each row has a `key`, its `content` and an optional `lock` cause. Rows next to each other that share a cause run together under one `DisabledOverlay` with the cause as its message; `renderLock` replaces that overlay. Each row carries `data-setting-key`, `flashKey` pulses the matching row once, `anchor` sets `data-section` on the section, and `inset` draws the group on the inset fill with a hairline border. `title` is now optional, and the header is left out when there is no title and no description. `className` is new.
- The search hit pulse is a shared class, `search-hit`, from `src/theme/search-hit.css`. A host that flashes a row from script adds `search-hit` in place of its own class.
- `SettingsGroupList`, `SettingsPage`, `NavLayout`, `SearchResults`, `ProfilePicker` and `InlineCreateForm` are new. `SettingsPage` declares `--settings-page-head-h` and `--settings-page-head-h-compact` on its own root, so an app that set them for its own settings page keeps working.

## 20. Window title bar, command palette and the smaller Brock parts

- `Badge` takes `pulse`, which fades it in and out. The warning variant no longer pulses on its own: a warning badge that should keep pulsing passes `pulse`. Its colour is unchanged.
- `IconButton` takes `tone="danger"`: a ghost button in the danger colour with a soft red glow, which fills red inside a danger ring on hover and press. The `FilterBar` remove button uses it in place of its own hover rules, so it now carries the soft glow at rest too. `IconButtonTone` is exported.
- A `LogKindDef` takes `tone`, one of the text element tones, which colours the tag of that kind, and `toneMessage`, which colours the message too. Tags and messages render as `Span` now; a tag without a tone keeps the muted colour, and both keep their size. A host that recoloured `.log-panel__tag--<kind>` or `.log-panel__msg--<kind>` still can, but a tone replaces most of those rules.
- `CodeBlock` takes `language="text"` for plain text, `wrap` to wrap long lines in place of scrolling sideways, and `capped` to stop at a fixed height and scroll inside, with the copy button staying in place. A debug report or diagnostics preview uses all three.
- The `Glyph` set gains `windowMaximize` and `windowRestore`, the window caption squares.
- `Callout` is a new primitive: a note in a box on the soft fill of its `tone` (`primary`, the default, `secondary`, `info`, `success`, `warning`, `danger`), or `variant="footnote"` for small muted text under a hairline. `icon` leads it and `action` ends it.
- `WindowTitleBar` is new: the title bar of a frameless app window. `title`, `logo` and `instance` (`name`, `logo`, `pulse`) make the centred brand; `menu` is a slot for the menu trigger, with `menuOpen` and `menuAnchorRef` on the left group for a menu anchored to it; `pinned` and `onPinToggle` draw the pin; `left` holds more slots. `maximized` and `fullscreen` pick the control icons, and each of `onFullscreenToggle`, `onMinimize`, `onMaximizeToggle` and `onClose` shows its button. `concealed`, and full screen, tuck the bar away until the pointer comes within 40 pixels of the top of its container; `peek` forces that look. `WindowHeader` stays as the header of dialogs and panels.
- `CommandPalette` and `CommandPaletteRow` are new: a search box that drops from the top of the window over a scrim. The host owns `open`, `query` and the result `groups`; an item has an `id`, a `label`, an `icon`, a `description`, a `breadcrumb`, `disabled`, `checked` and an inline `toggle`. The arrows and Page Up and Down move the active row past disabled ones (`activeIndex` and `onActiveIndexChange` control it), Enter calls `onSelect`, Ctrl+Enter flips a toggle row, and Escape or the scrim calls `onClose`. The palette focuses its field when it opens and gives focus back when it closes.
- `AboutPanel` is new: a logo, a title, `rows` of facts as `StatRow`s, a button that copies `copyText` (null while it is gathered, left out to hide it; `onCopy` replaces the browser clipboard) and `legal` text. `ReleaseNotesPanel` is new: release notes in a box with a titled bar, plain text keeping its line breaks, scrolling past a fixed height.

## 21. Widget on a split tree, DockLayout and Hero

The widget layout is now one split tree around a main view, with widgets floating over it and widgets in their own windows. `DockLayout` draws the tree and `Widget` is only the frame of one pane.

- `WidgetLayout` was `{ widgets: WidgetState[] }`. It is now `{ v: 2, dock, floating, popped, frame, poppedMemory? }`: `dock` is a tree of `split`, `pane` and exactly one `main` node, `floating` holds positions as fractions of the main view, `popped` holds the widgets in their own windows (bounds, pin, snap), and `frame` holds each widget's `opacity` and `show`. `WidgetState`, `WidgetMode` and `WidgetBounds` are gone. `migrateLayout(raw)` turns a stored flat layout into the tree (docked widgets become panes on their side, `exclusive` becomes `makeRoom`, a floating widget keeps its place), and every load helper runs it, so saved layouts keep working. The old flat shapes are exported as `FlatWidgetLayout` and `FlatWidgetState`.
- `Widget` took `state`, `label`, `onChange`, `onClose`, `settingsContent`, `dockedStyle` and `exclusiveLabel`, and placed, dragged and resized itself. It now fills the box it is given and takes `id`, `tabs`, `activeId`, `paneKey` (null while floating or in its own window), `opacity`, `onActivateTab`, `onOpenOptions(anchor)`, `onClose` and the content, plus `peek`, `optionsOpen`, `onPopOut`, `canPopOut`, and for its own window `mode="out"`, `pin`, `onTop` and `onPinChange`. The title bar carries `data-drag-widget` and `data-pane-key`, which `DockLayout` reads to start a drag.
- `WidgetSettings` is replaced by `WidgetOptions`: placement buttons (four edges, float, pop out or in), Make room, the pin and snap rows of a widget in its own window, opacity, Show, the widget's own `OptionRow`s, the drag keys, and a reset. It is anchored to the gear through `anchorRef`. `exclusiveLabel` becomes `makeRoomHint`, the line under Make room, and `contextLabel` names the Show choice for a context-only widget.
- `WidgetManager` took `layout`, `onUpdate(id, patch)`, `onClose(id)`, `onInsetsChange`, `topOffset`, `bounds` and `exclusiveLabel`. It now takes `layout` and `onLayoutChange(next)` and draws a `DockLayout` of `Widget` frames, with `WidgetOptions` from each gear. It keeps `definitions`, `contextActive`, `pageOpen`, `developerToolsEnabled`, `startupForcedWidgetIds`, `resolveDisabled`, `onOpenSettings` and `settingsContent`, and adds `main` (the view the widgets tile around), `onMainRect`, `peek` and `modifiers` (Alt, Shift and Ctrl held by default), `onPopOut` (the host opens the window; a definition opts in with `popOut: true`), `externalDrag` and `onExternalDrop` for a widget window dragged back over the app, `mainLabel`, `gripLabel`, `makeRoomHint`, `contextLabel` and `className`. The main view takes the room the docked widgets leave, so a host no longer pads its content by the insets.
- `useWidgetLayout` returns `{ layout, setLayout, open, close, toggle, reset }`; `update` is gone. `createDefaultLayout()` takes no argument and returns the main view alone. `loadLayoutLocal(storageKey, preset)` and `loadLayoutForProfile(profileId, io, { storageKey, preset })` no longer take the definitions.
- Removed: `createDefaultWidgetState`, `startingLayout`, `updateWidget`, `getWidgetState`, `computeDockedStyles`, `useWidgetDrag`, `useWidgetResize`, `getDockedResizeEdge`, `TITLEBAR_HEIGHT`, `DockedLayoutResult` and `ExclusiveInsets`. Layout changes go through the pure edits: `openWidget`, `removeEverywhere`, `dockOnEdge`, `dockWidget`, `floatWidget`, `floatInMain`, `popOutWidget`, `setPopped`, `moveMain`, `setMakeRoom`, `setFrame`, `dropFrame`, `applyEdit` (one `LayoutEdit` from `DockLayout`), `visibleLayoutOf` (the gates) and `openStartupWidgets`.
- `DockLayout` is new. It takes `layout` (`dock` and `floating`), `renderPane`, `renderFloating`, `onEdit` and `labelOf`, and draws dividers, drop hints, a drag label and a grip on the main view. `useDockKeys` reports Alt peek and the Shift and Ctrl drag keys. The tree helpers (`layoutTree`, `mainRectOf`, `insertAt`, `removeWidget`, `resizeSplit` and the rest) are exported.
- In rotp's stored layouts the main node was `{ kind: 'game', key: 'game' }` and `show` was `'game-only'`. Tessera names them `{ kind: 'main', key: 'main' }` and `'context-only'`; rotp maps them when it loads its layout.
- `Hero` is new: the top of a home screen with `title`, `eyebrow`, `backdrop`, `art` (`src`, `alt`, `pixelated`), `actions`, `tools`, `facts` (rows of `StatRow` facts on glass), `aside` and `panel` (glass tiles the host fills) and `label`.

## 22. TesseraLogo is now InteractiveTessera

- `TesseraLogo` is renamed `InteractiveTessera`, and `TesseraLogoProps` is renamed `InteractiveTesseraProps`. The props are unchanged. There is no alias under the old name: change the import and the tag.
- Its classes follow the new name: `.tessera-logo` and every `.tessera-logo__*` part are now `.interactive-tessera` and `.interactive-tessera__*`, and the custom properties `--tessera-logo-ink` and `--tessera-logo-slide` are now `--interactive-tessera-ink` and `--interactive-tessera-slide`. A host stylesheet that reached into the old classes renames them.
- In the gallery, the Brand pages are now Brand (the whole family), InteractiveTessera, Logo (the mark alone), WordMark and Combined, and the brand gradients moved to Colours, Gradients. The `Logo`, `BrandMark` and `BrandWordmark` components are unchanged.

## 23. Button loading, one Spinner and TesseraProvider

- A disabled `Button` no longer spins its icon. The `.btn:disabled .btn__icon` rule and the `btn-spin` keyframes are gone: disabled and busy are two states. A host that disabled a button with an icon to show work in progress passes `loading` instead.
- `Button` and `IconButton` take `loading`. It shows the `Spinner` in place of the icon (or over the label, kept in place but hidden, when a `Button` has no icon), disables the button, sets `aria-busy`, and keeps the button's width. A loading button keeps full opacity and a progress cursor, where a disabled one fades. The roots carry `btn--loading` and `icon-btn--loading`; the spinner sits in `.btn__spinner` or `.icon-btn__spinner`, and the hidden icon in `.btn__glyph`.
- `AboutPanel` no longer reads Collecting... while `copyText` is null: the copy button shows its label with `loading`. `CreateRecordDialog` no longer reads Creating... and the `RecordEditor` save button no longer reads Saving...: both keep their label and show `loading` while the save runs.
- `Spinner` renders a `span` in place of a `div`, so it is valid inside a button, and takes `label` (default Loading), its accessible name. `SpinnerSize` is exported. With reduced motion it stops turning and fades in and out.
- `TesseraProvider` is new. `<TesseraProvider overrides={ spinner: AppSpinner }>` at the app root makes every Tessera `Spinner` below it draw `AppSpinner`, including the ones inside `Button`, `IconButton`, `Select`, `Combobox`, `Video` and anything rendered through a portal. `AppSpinner` receives `SpinnerProps` (`size`, `label`, `className`) and carries the status role and label itself. Keep the overrides object stable. An inner provider keeps the outer parts and replaces the ones it names. A separate React root, such as one inside an iframe, needs its own provider. `TesseraOverrides`, `TesseraPart` and `TesseraProviderProps` are exported.

## 24. Badge, Status and Tag: one name per job

A badge is a count or a dot, a status is a read-only word for the state something is in, and a tag is a value that sorts an item into a group. Label stays the name of a form field's label.

- `Badge` is now a count or a dot. `variant` is `inline` (after text, on a soft fill, like a tab's count), `number` (a solid count, the default) or `dot`. `value` takes a number or a string of letters and digits; the types refuse a string literal with a space or a symbol, and a dev build warns about one at run time. `max` caps a number, so `value={120} max={99}` shows `99+`; a trailing `+` after digits is the only symbol allowed. One character draws a 16 pixel circle and more characters a pill of the same height. `color` is `normal` (a pastel red, the default), `tame`, `success`, `warning`, `danger`, `info`, `primary`, `secondary` or `tertiary`, and `translucent` fades it a little. A `number` or `dot` Badge with children wraps them and sits on the corner `anchor` names: `top-end` (the default), `bottom-end`, `top-start` or `bottom-start`. `label` gives it an accessible name. `BadgeAnchor`, `BadgeColor`, `BadgeText` and `BadgeValue` are exported.
- The old `Badge`, a coloured status word, is now `Status`, and `StatusBadge` merges into it. `<Badge variant="success">Connected</Badge>` becomes `<Status tone="success">Connected</Status>`. `tone` is `neutral` (the default), `success`, `warning`, `danger`, `info`, `primary`, `secondary` or `tertiary`; `variant` is `text` (the old Badge look) or `pill` (the old StatusBadge look, in capitals on a filled pill); `dot` leads the word with a dot and `pulse` fades it, only the dot when there is one. The success tone now takes `--c-success` where the old Badge took `--c-secondary`. `BadgeProps` and `BadgeVariant` change meaning; `StatusProps`, `StatusTone` and `StatusVariant` are new.
- `StatusBadge`, `StatusBadgeProps` and `ScreenStatus` are removed, with the click to cycle `interactive` mode and the built-in draft, mapped and verified labels. `<StatusBadge status="draft" />` becomes `<Status tone="warning" variant="pill">Draft</Status>`; rotp maps its own screen statuses to a tone and a label. The `.status-badge*` classes are gone.
- `Tag` is a new primitive: the chip that `TagInput` drew, promoted, restyled and shared. `variant` then `color`: `normal` takes `neutral` (the default), `primary`, `secondary` or `tertiary` and draws a border; `urgency` takes `success`, `warning`, `danger` or `info` and draws bold text with no border; `category` takes the ten `--c-tag-*` colours and draws a tinted chip with a dot. The types refuse a colour from another variant. `onRemove` (with `name` for the button's label) adds a remove button; `selected` with `onSelect` makes it a toggle that rests grey and shows its colour once picked, and `role="radio"` reads it as a radio. `disabled`, `title` and `data-*` attributes pass through. `TagCategoryColor`, `TagColor`, `TagLook`, `TagNormalColor`, `TagProps`, `TagUrgencyColor` and `TagVariant` are exported.
- Every tag draws through `Tag` and has the same 20 pixel height: `TagInput` chips (a tag that fails `validate` is `urgency` `warning`, as before), `Combobox` chips and the `Select` multi-select tags (`normal` `primary`, the old gold), `TagPicker` options (selectable, `primary` once picked), the enum field kit cell and the id reference list of the array kit. The `TagInput` field no longer grows to 40 pixels with chips in it. The `.tag-input__chip*` and `.tag-picker__tag*` classes and `src/theme/tag-chip.css` are gone; a host that styled them targets `.tag-chip` and its `--tag-ink`, `--tag-fill`, `--tag-edge` and `--tag-dot` properties.
- The counts are Badges now: the `badge` of a `TabBar` tab and of a `HeaderTabs` item (`tame`, `primary` on the active tab), the `DataTable` group count and the `SearchResults` group count (`primary`). The `.tab-bar__badge`, `.header-tabs__badge`, `.badge.data-table__group-count` and `.search-results__count-pill` rules are gone.
- The boolean field kit cell is a `Status` (success or neutral). `WindowTitleBar` draws its instance name as an info `Status` pill, keeping the monospace capitals. The array kit's `IdRefBadgeList` is `IdRefTagList`, and its `field-kit__ref-chip` class is gone.
- In the gallery, Display holds Badge, Status and Tag; the StatusBadge page is gone.

## 25. The new Relic of the Past logo, Sentri, app icons and icon files

- Relic of the Past's mark is its new pixel logo, the gold pyramid on a 35 by 28 grid (`viewBox="0 0 35 28"`). `BrandMark` now draws every mark in a square box around its art, so a mark that is not square stays centred.
- `BrandInfo.mascot` is no longer a `BrandMarkData`. It is a `BrandMascot`: a `name` (Sentri), a `summary` and `variants`, each with an `id`, `name`, `summary`, the `pieces` it is built from and a `compose(pose)` function that returns a `BrandSceneData`. Nothing keeps the old flattened mascot.
- `BrandMark` and `Logo` lose `tile` and the `mascot` variant. `variant` is now `'mark' | 'app-icon'`: `app-icon` draws the app icon the brand data describes, and the mark for a brand with none. Replace `tile` with `variant="app-icon"`, and `variant="mascot"` with `<Mascot brand="rotp" />`.
- `BrandInfo` gains `appIcon: 'straight' | 'tile' | null`. Tessera has none, Relic of the Past and Brock are `straight` (the mark with no tile or container) and Archipelia is `tile`.
- New in `@drizztdourden08/tessera/brand`: `Mascot` (`brand`, `variant`, `pose` with `look` and `podAngles`, `size` or `scale`, `title`), `BrandScene` (draws any `BrandSceneData` inline), `sceneMarkup` (the same scene as SVG markup), `placePiece` and `groupNode` (the helpers a composition function builds with), `iconFiles` and `ICON_SIZES` (the icon file names and sizes), and the types `BrandAppIcon`, `BrandMascot`, `BrandMascotVariant`, `BrandPiece`, `BrandSceneData`, `MascotPose`, `SceneNode`, `ScenePieceNode`, `SceneGroupNode`, `ScenePoint`, `SceneTurn`, `PieceSpot`, `GroupSpot`, `SceneMarkupOptions`, `IconArtFiles`, `IconArtKind` and `IconSizes`. The primitives gain `SvgClipPath`.
- `pnpm icons` builds everything from the brand data, including `brand/<app>.svg`. PNG ladders are 16, 24, 32, 48, 64, 128, 256 and 512, with whole-pixel scaling for pixel art; each `.ico` holds 16 to 256. `mark-96`, `mark-192` and `mark-1024` are gone, and `icon/png/icon-1024.png` stays for the installer builder. Tessera no longer has `brand/tessera/icon/` or `brand/tessera/splash/`. `brand/rotp-mascot.svg` moved to `brand/rotp/mascot/sentri.svg`, beside Sentri's PNG ladder, `sentri.ico`, and the Hookshop highlight as `hookshop.svg` and `hookshop-<1|2|4>x.png`.
- rotp takes its logo, Sentri and the Hookshop highlight from Tessera once it consumes the package: `<Logo brand="rotp" />`, `<Mascot brand="rotp" />`, `<Mascot brand="rotp" variant="hookshop" />`, and the files under `brand/rotp/`.
- In the gallery, the Brand tier gains a Mascot page after Combined, and the Logo page gains Icon files in place of its Mascot story.

## 26. Caption glyphs, FactsPanel and owner fixes to the composites

- `WindowTitleBar` draws minimize, maximize, restore and close with the design system `Glyph` set, at 16 pixels with a 1.25 stroke, so each reads at the 10 to 11 pixel size of the old shapes. The filled 12 unit paths and their constants (`CAPTION_SIZE`, `CAPTION_VIEWBOX`, `MINIMIZE_PATHS`, `MAXIMIZE_PATHS`, `RESTORE_PATHS`, `CLOSE_PATHS`) are gone. The props are unchanged. The `Glyph` set gains `windowMinimize` and `windowClose`, drawn in the same box as `windowMaximize`.
- `FactsPanel` is new: label and value pairs in a bordered box. `groups` is a list of groups, each a list of `{ label, value, title?, mono? }`; a group runs along one row and wraps, with a hairline between groups. `title` puts the full text of a long value in a tooltip, `mono` sets the value in the monospace font, and `label` names the panel. `FactsPanelFact`, `FactsPanelGroup` and `FactsPanelProps` are exported.
- `Hero` draws its `facts` with `FactsPanel`, on the same glass as before. `facts` takes `FactsPanelGroup[]`; `HeroFact` and `HeroFactRow` are removed, so a host imports `FactsPanelFact` and `FactsPanelGroup` in their place. The shape of each fact is unchanged. The `.hero__facts`, `.hero__fact-row` and `.hero__fact` classes are now `.facts-panel`, `.facts-panel__group` and `.facts-panel__fact`, and the `--hero-fact-max-w` token is now `--facts-panel-value-max-w`.
- `AboutPanel` takes `brand`, a `BrandApp`, and then draws that app's icon (`Logo` with `variant="app-icon"`) in place of the `logo` image and shows its wordmark as the heading, with `title` as the wordmark's accessible name. Without `brand`, `logo` stays an optional image and the heading is `title` as text, for an app that is not a Tessera brand. `title` is now a `string` in place of any node. Brock passes `brand="brock"` and drops `logo`.
- `IconButton` with `tone="danger"` keeps its glyph red while pressed; it used to take the page background colour.
- `LogPanel` measures its gutter and tag columns at the size they are drawn, so `--log-gutter-w` and `--log-tag-w` in `ch` now count characters of the log text. Each column also grows to fit a longer time or tag, so time, tag and message never overlap. A host that set wider values to make up for the old measure can lower them.
- The `SectionNav` rail glows on its current item, as the panel does.
- `SectionNav` takes `overlay`: the nav keeps its strip of icons beside the content, and the open panel slides over the content, so the page keeps its width; the toggle, Escape, a click outside or picking an item closes it, and focus inside the menu goes back to the toggle. The rule that floated the open panel below a 768 pixel wide viewport is gone; a host that relied on it passes `overlay`. `NavLayout` with `compact` sets it, in place of only tightening the gap.
- `TabBar` centres each tab icon on its label; the icon used to sit about 2 pixels high.
- `SettingsPage` blurs what is behind its panel, as Relic of the Past does.
- `StickPlot` draws a line from the centre to the dot, and the calibrated marker is a muted `Small` after the numbers.
- In the gallery, Content gains a FactsPanel page after AboutPanel.

## 27. Tag classes, TagPicker colours, Badge sanitising and multipart ProgressBar

- `Tag` classes are `.tag` and `.tag__*`, `.tag--*` again: `.tag-chip` is now `.tag`, `.tag-chip__text`, `__dot` and `__remove` are `.tag__text`, `.tag__dot` and `.tag__remove`, and every `.tag-chip--<variant|colour|state>` is `.tag--<variant|colour|state>`. The `--tag-ink`, `--tag-fill`, `--tag-edge` and `--tag-dot` properties keep their names. A host stylesheet that targeted `.tag-chip` renames it.
- `CodeBlock` no longer passes on the highlighter's own class names, which were `token`, the token type (`tag`, `keyword`, `string` and so on) and `token-line`. Each token span carries `code-block__token` and one `code-block__token--<type>` for each type, and a line carries `code-block__line` alone, so a token class can never match a component class. The colours are unchanged; a host that styled `.token.<type>` inside a code block targets `.code-block__token--<type>`.
- A `TagPickerOption` takes the `variant` and `color` of a `Tag` (`TagLook`), and a picked option keeps them: a `category` option shows its own tint and dot, an `urgency` option its own tone. An option with neither is `normal` `primary`, as before. A picked `urgency` or `category` Tag now draws a border in its own colour, so a pick stands out against the grey resting tags.
- `Badge` cleans its value before it renders: a space or a symbol in a string is dropped, so `"4 new"` shows `4new`, and a trailing `+` stays only after digits. A number shows as a whole count: a fraction is cut to its whole part, and a negative number, `NaN` or an infinite number has no text. A `number` or `inline` Badge with no text left renders nothing, and a hosted one renders its children alone; a `dot` is unchanged. The dev warning still fires for a string with a space or a symbol, and now for a number that is not a whole count from 0.
- `ProgressBar` renames `variant` to `tone`, `secondaryVariant` to `secondaryTone` and the `ProgressVariant` type to `ProgressTone`, to match the parts and `Status`. There are no aliases: `<ProgressBar value={60} variant="danger" />` becomes `<ProgressBar value={60} tone="danger" />`.
- `ProgressBar` takes `parts` in place of `value` and `tone`: several amounts stacked in order in one bar, each a `ProgressPart` with a `value`, a `label` and a `tone` or its own CSS `color`. Parts past `max` are cut. `legend` lists the parts under the bar with a swatch, the label and the value; the root is then `.progress-bar-group` around the bar and `.progress-bar__legend`.
- `ProgressBar` is now a `progressbar` to assistive tech: `aria-valuemin` 0, `aria-valuemax` `max`, `aria-valuenow` the value or the sum of the parts, capped at `max`, and `label` names it. A multipart bar sets `aria-valuetext`, such as 136 of 216: Found 120, Hinted 12, Missed 4, and each part carries its label as a `title`.
- `ProgressTone` gains `tertiary`, `success`, `warning` and `info`. `secondaryValue` stays beside `parts`: it is a second amount behind the fill that is not progress, such as reachable against done or a peak, so it is not part of `aria-valuenow`. With no `secondaryTone` it is a faded copy of the first part's colour. The root no longer carries `data-variant` or `data-secondary-variant`; each fill carries `data-tone` and its colour in `--progress-fill`.

## 28. TesseraProvider takes every app part, and Tessera's wording is one table

`TesseraOverrides` gains eight parts beside `spinner`. Each is optional and a part left out keeps the Tessera default. An inner provider keeps the outer parts and replaces the ones it names; `strings` merges key by key. The provider reads nothing from `window` or `document` while rendering.

- `writeText: ClipboardWriter`, `(text) => Promise<void> | void`, which rejects or throws when it fails. Every copy button writes through it: the `CodeBlock` copy button, the `AboutPanel` copy button and the `LogPanel` Copy all button. The default is `navigator.clipboard.writeText`, looked up only when a button is pressed.
- `link: ComponentType<LinkProps>`, for router integration. The new `Link` primitive (`LinkProps` is the anchor props with a required `href`) renders the app link, or `<a>` by default. Everything Tessera renders with an `href` goes through it: the `Toggle` learn more link, and a `Box` with an `href`. A `Box` given an `href` and no `as` now renders a link where it rendered a `div`.
- `imagePlaceholder: ComponentType<ImagePlaceholderProps>`, whose `status` is `empty`, `loading` or `broken`. It replaces the picture `Image` and `Thumbnail` draw while loading, when broken and when there is no source. A `fallback` still wins once loading ends, and `placeholder="none"` still draws nothing.
- `strings: TesseraStringsOverride`, the wording; see below.
- `errorFallback: ComponentType<ErrorFallbackProps>` (`error`, `label`, `action`, `reset`, `className`) replaces the panel every `ErrorBoundary` draws. `reset` clears the boundary and draws its children again; `label` is the boundary's `label` or the table's wording.
- `emptyArt: ReactNode` is drawn by every `EmptyState` that has no `icon`, in `.empty-state__art`. `icon={null}` opts one out.
- `portalDocument: Document` replaces `PortalDocumentContext`, which is removed. `<PortalDocumentContext value={doc}>` becomes `<TesseraProvider overrides={{ portalDocument: doc }}>`. A `Portal` renders into the provider's document when one is named, and otherwise into the document it is rendered in (see section 37).
- `icons: IconSet`, a `Readonly<Record<IconName, IconifyIcon>>`, serves every `Icon` name. The type wants every name, so a set built without one fails to compile; spread `ICONS` and replace the names the app draws its own way. `Icon.Brand` and an `Icon` given `icon` data are unchanged.

`AboutPanel` loses `onCopy` and the `AboutPanelCopy` type: a desktop host that writes the clipboard itself gives `writeText` to the provider once. `copyLabel` stays.

Every fixed user-facing string in Tessera, visible text, `aria-label`, `title`, placeholders and default prop wording, now comes from `TESSERA_STRINGS`, a typed table of English defaults in groups: `common`, `fields`, `video`, `colorPicker`, `table`, `filters`, `filterOperators`, `records`, `navigation`, `panels`, `widgets` and `windows`. Wording that holds a value is a function, such as `common.selectedCount(count)`. `TesseraStrings` is its type; `TesseraStringsOverride` takes any group in part, so an app passes a whole translated table or a few keys. `useTesseraStrings()` returns the merged table, for an app's own components. A prop that took wording keeps it, and its default now comes from the table.

- `OperatorSpec.label` is removed. `FilterBar` names an operator with `filterOperators[spec.icon]`.
- `DataTable` group keys for boolean and array fields are now `true`, `false` and the item count; the group row words them through the table (`common.yes`, `common.no`, `records.itemsMany`).
- Left out of the table: key and mouse button names in `Shortcut` and `KeyboardLayout`, the `Tags read namespace:value` hint `namespacedTag` returns, the `yesno` listbox column format (pass a format function), the `<label> item` field `deriveFields` names, colour notation (R, G, B, A, HEX), unit symbols, punctuation such as the truncation ellipsis, developer warnings and errors no user sees.

New exports: `Link`, `LinkProps`, `ClipboardWriter`, `ErrorFallbackProps`, `ImagePlaceholderProps`, `IconSet`, `TESSERA_STRINGS`, `TesseraStrings`, `TesseraStringGroup`, `TesseraStringsOverride` and `useTesseraStrings`.

## 29. Neutral bright greys, one colour set, the backdrop gradient and straight app icons

- `--c-primary-bright`, `--c-secondary-bright` and `--c-tertiary-bright` now mix in oklab, not oklch. In the Tessera palette they drew slightly pink (`#aca0a3`, `#958a8d`, `#b7adb0`), because Chromium draws a near-grey oklch mix at hue 0. They are now greys at the same lightness (`#a3a3ac`, `#8c8c96`, `#afafb7`). `--c-primary-dim`, `--c-secondary-dim` and `--c-tertiary-dim` mix in oklab too, for the same reason (`#050506`, `#030304`, `#060607` in place of `#060505`, `#040303`, `#070606`). Every other palette keeps the same colours.
- The light colour set is gone. Tessera has no light and dark themes: an app's look is its branding, set by its palette. The `[data-theme="light"]` blocks in `canonical.css` and `palette.css` are removed, and the tokens re-derive under `[data-palette]` only, no longer under `[data-theme]`. A host that set `data-theme="light"` can drop it, since it now changes nothing. `tokens.json` keeps its `dark` keys.
- `--brand-backdrop-gradient` is new: the one backdrop every app shares, a glow of `--c-primary` at the top right and of `--c-secondary` at the bottom left over `--c-surface` fading to `--c-bg`. It sits in `src/tokens/brand.css` under `:root, [data-palette]`, so each palette paints its own version. `BACKDROP_GRADIENT` holds the data and `backdropGradientCss()` builds the CSS; `BackdropGlow`, `BackdropGradient` and `BackdropToken` are the types. `pnpm tokens` writes the token, its resolved value per palette in `splash-tokens.css`, and `palettes.<palette>.backdrop` in `tokens.json`.
- `Hero` draws `--brand-backdrop-gradient` behind its `backdrop` slot, so a Hero with no backdrop shows it and a host scene covers it.
- `InteractiveTessera` callouts show the app's logo alone. The wordmark opens beside it, on the side away from the T, while that tile or callout is pointed at or has keyboard focus. Callouts now scale with the component, so they never reach the T, each other or the component's edge at any width. The wordmark sits in `.interactive-tessera__name`, and each callout carries `data-side`. The inner parts are renamed `InteractiveTesseraArt`, `InteractiveTesseraCallout` and `InteractiveTesseraDetail`, with their files and types; none of them is exported.
- `pnpm icons` writes `brand/tessera/mark/mark.ico`, holding 16 to 256: a brand with no app icon gets a `.ico` of its mark, and `iconFiles()` gives it as the mark's `ico`.
- A `straight` app (Relic of the Past, Brock) draws `icon/maskable-512.png`, `icon/android/icon-background.png` and `splash/splash.svg` with `splash-2732.png` on transparent ground: the maskable icon and the splash are the mark alone, and the Android background layer is empty. The paths and names are unchanged. A splash window that relied on the dark ground paints its own background, such as its brand gradient. Archipelia keeps its tile.
- In the gallery, the favicon is Tessera's `mark.ico`. The Logo page's Icon files shows each brand's own files, every PNG size and the `.ico` in one row that scrolls sideways; Sentri's files moved to a new Icon files story on the Mascot page. Colours, Gradients shows the backdrop gradient.

## 30. DropdownMenu builds from data, the hamburger trigger, and WindowTitleBar from config

`DropdownMenu` is now the one data driven menu for the whole app: the title bar menu, toolbar menus and the table and filter menus all take the same groups. There is no second menu component and no alias for the old props.

- `DropdownMenu` takes `groups` in place of `items`. `MenuEntry` and the `'separator'` string are gone: a separator is `{ separator: true }`, and it can sit in a group or in any submenu. An item's `key` is now `id` and `onClick` is now `onSelect`. Wrap a flat list in one group: `groups={[{ id: 'column', items }]}`.
- An item's `icon` takes an `IconName`, drawn with `Icon`, or an element; a bare string is read as an icon name, so wrap text marks such as `'Aa'` in an element. `description` is now drawn as a muted second line. `shortcut` takes display text such as `'Ctrl+Shift+P'` (split on `+`; `Control`, `CmdOrCtrl`, `Command`, `Escape` and the like map to the Shortcut key names) or a list of Shortcut keys, and is drawn with `Shortcut`. It is for display only: the app binds the key. Setting `checked` to true or false makes the item a checkbox item.
- Separators at the start or end of a list, and separators next to each other, are dropped, and a group left with no items is dropped with them. A submenu with no items left draws as a plain item.
- `closeOnSelect` (default true) calls `onClose` after an item's `onSelect`. `onClose` is new and also runs on Escape and Tab. `label` names the menu for screen readers. The menu takes focus on its first item when it opens and gives focus back to its anchor when it closes. The arrows, Home and End move through the items, typing the start of a label jumps to it, the right arrow, Enter or Space opens a submenu, and the left arrow or Escape closes it. The roles are `menu`, `group` (labelled by the group label), `menuitem`, `menuitemcheckbox` with `aria-checked`, and `separator`.
- `trigger="hamburger"` draws the trigger and the menu: three lines in a gold edge with a cast shadow, which turn into a cross while the menu is open (at once under reduced motion). The menu hangs from it as the `Select` list does, with the gold edge running from the trigger around the menu, and its submenus take the same edge. `onOpenChange` reports the open state. It draws nothing when the menu has no items.
- Items look like `SideNav` items: hover and keyboard focus take the hover fill, the full text colour and a dim gold bar on the left, where they used to take the selected fill and bright gold text. A checked item keeps bright gold text. Group labels are small capitals, as in `SideNav`. The `DataTable` field picker follows the same look.
- The `DataTable` column and table menus, the `FilterBar` operator menu and the enum multi select of the field kits moved to `groups`; the multi select passes `closeOnSelect={false}`. The `DataTable` reference column submenu now shows each field path under its name.
- The menu config is the contract a generator fills, for example Brock building the title bar menu from its folders. Every type is exported from the package root:

```ts
interface MenuItem {
  id: string;
  label: string;
  icon?: IconName | ReactElement;
  description?: string;
  shortcut?: string | readonly ShortcutKey[];
  disabled?: boolean;
  checked?: boolean;
  children?: readonly MenuNode[];
  onSelect?: () => void;
}

interface MenuSeparator { separator: true }

type MenuNode = MenuItem | MenuSeparator;

interface MenuGroup {
  id: string;
  label?: string;
  items: readonly MenuNode[];
}
```

- Categories come either way: a labelled group draws as a heading over its items, and an item with an `icon` and `children` draws as a submenu.
- `WindowTitleBar` builds its left menu from `menu`, a `MenuGroup[]`, and draws the hamburger and the menu itself, with `menuLabel` naming it. The `menu` node slot, `menuOpen` and `menuAnchorRef` are gone; an open menu still keeps a concealed bar in view.
- The pin and the full screen, minimize, maximize and close buttons are built in and all report to one callback, `onControl(control)`, where `control` is `'fullscreen' | 'pin' | 'minimize' | 'maximize' | 'close'`. `controls` turns any of them off except close: `controls={{ fullscreen: false, pin: false }}`. `onPinToggle`, `onFullscreenToggle`, `onMinimize`, `onMaximizeToggle`, `onClose` and `WindowControlsState` are removed; `WindowControl` and `WindowControlsConfig` are new.

```tsx
<WindowTitleBar menu={<MenuTrigger />} menuOpen={open} menuAnchorRef={ref} onPinToggle={pin} onMinimize={win.minimize} onMaximizeToggle={win.toggleMaximize} onClose={win.close} />

<WindowTitleBar menu={groups} controls={{ fullscreen: false }} onControl={(control) => win[control]()} />
```

- `useListboxDrop` and `useDismissListeners` take `escape` (default true); a popup that handles Escape itself, one level at a time, passes false. The string table gains `navigation.menu`, the default name of the hamburger.

## 31. Hints on controls, the HintLine, xs sizes and the compact widget options

Controls can now say what each option does. Hover or keyboard focus on an option publishes its hint, and a `HintLine` shows it in a space set aside for it.

- A hint is `{ label, description }`, a short value label and a one-line description; the type is `Hint`. `SegmentOption` and `ToggleOption` take `hint`, and `Toggle`, `Slider` and `IconButton` take `hint` for themselves.
- Every one of those controls takes `onHint(hint | null)`. It fires with the hint while an option is pointed at or holds keyboard focus, and with `null` once nothing is. A click that only moves focus with the mouse does not hold the hint.
- `HintScope` collects the hints of every control inside it, and `useHint()` reads the current one, so any component can show it. `HintLine` reads the scope, or takes `hint` directly (`null` shows the idle line). It shows the value in the text colour and the description muted, an idle line while nothing is pointed at (`idle`, default from the string table), keeps a fixed height of `lines` (1 or 2, default 2) and is a polite live region. `useHintTarget` and `useHintReport` let an app control report to the same scope.
- New strings: `common.hintIdle`.

```tsx
<HintScope>
  <SegmentedControl size="xs" aria-label="Placement" value={edge} onChange={setEdge} options={[
    { value: 'left', icon: 'panel-left', hint: { label: 'Dock left', description: 'Takes the left edge of the app' } },
  ]} />
  <HintLine />
</HintScope>
```

### Sizes

- `SegmentedControl` takes `size`, `'md'` (the default, as before) or `'xs'`, and `aria-label` for when it has no visible `label`. An option is either `{ value, label }` as before or `{ value, icon, hint }`: an `IconName` drawn alone, named by `hint.label` unless `title` is set. `SegmentOption` is now that union (`SegmentTextOption | SegmentIconOption`); code that reads `option.label` checks `option.icon` first.
- `IconButton` `size` adds `'xs'` (20 px square); the type is `IconButtonSize`.
- `Toggle` and `Slider` take `size`, `'md'` (default) or `'xs'`, and `aria-label` for when they have no visible label. `ToggleSize` and `SliderSize` are exported.
- `Shortcut` takes `size`, `'md'` (default) or `'xs'`, its smallest caps; `SHORTCUT_SIZES` and `ShortcutSize` are exported.
- Two icons join the set, `app-window` and `magnet`. An app that passes a whole `icons` set to `TesseraProvider` adds them.

### WidgetOptions

The panel keeps every function and every prop of `WidgetOptionsProps`; only its look changed, so a call site that passes those props needs no change.

- Every choice is an xs icon `SegmentedControl`: Placement (dock left, right, top and bottom, float, own window), Main view (make room or overlay, docked only), Show (always or in context, not in its own window), Pin (off, on top, with app) and Snap (free or snap to edges), both only in its own window. In its own window a pop in button sits beside Placement. Opacity is an xs `Slider`.
- The header holds the title, a keys button that opens the shortcut list, reset and close, all xs `IconButton`s. Reset is an icon now, not a text button.
- One `HintLine` sits at the bottom of the panel, and the panel is a `HintScope`, so the widget's own rows report to it too.
- The shortcut list moved out of the panel into a floating aside anchored beside it, drawn with the xs `Shortcut`. The keys button opens and closes it and the choice is kept for the session.
- `OptionRow` takes `hint` as a `Hint` object, which it reports while the row is pointed at or holds focus; it no longer draws a line of text under the label. A widget's own controls take their own `hint` too.

```tsx
<OptionRow label="Compact rows" hint="One line per player"><Toggle checked={compact} onChange={setCompact} /></OptionRow>

<OptionRow label="Rows">
  <Toggle size="xs" checked={compact} onChange={setCompact} hint={{ label: 'Compact rows', description: 'One line per player' }} />
</OptionRow>
```

- Widget strings: `placementSection`, `windowSection`, `pinHint` and `snapToEdges` are gone. `popInTitle` is `popInHint`, `pinOffTitle`, `pinOnTopTitle` and `pinWithAppTitle` are `pinOffHint`, `pinOnTopHint` and `pinWithAppHint`, and `snapHint` is `snapOnHint`. New: `placement`, `mainView`, `overlay`, `snap`, `snapOff`, `snapOn`, `ownWindow`, `showShortcuts`, `hideShortcuts`, `opacityValue`, and a `...Hint` description for every choice and header button. An app that overrides those strings renames its keys.
- `--widget-options-w` is 240 px, `--widget-options-slider-w` is 128 px, and `--widget-options-aside-w` (256 px) sizes the shortcut aside.
- `Anchored` keeps one ref callback across renders, so a popup can anchor to another `Anchored` popup, as the shortcut aside does.

## 32. The wizard parts replace WizardDialogShell

`WizardDialogShell`, `WizardDialogShellProps` and the `WizardStep` type (`{ label }`) are removed, with no alias. A wizard is now built from the parts in `src/composites/Wizard/`, all exported from the package root. It sits inside a screen by default; a dialog is optional.

- `useWizard({ steps, initialValues, onFinish, onFinished? })` holds the input (`values`, `setValue`, `update`), where the user is (`current`, `index`, `isFirst`, `isLast`, the shown `steps`), what they visited (`visited`), per step errors (`errors`, `setError`), unsaved input (`dirty`) and the finish (`busy`, `finish`). A step is a `WizardStepDef`: `{ id, label, description?, when?, validate? }`. `when(values)` false hides the step; `validate(values)` returns why the step is not ready, or null, and Next stays off until it is null (`invalid` holds the reason for the current step). The reason is a string, or a `WizardProblem` `{ message, inField: true }` when a field already shows it under itself; `hint` is the reason the nav shows, null for an `inField` one, so the same problem is never shown twice. `goNext`, `goBack`, `goTo(id)` and `canGoTo(id)` move: back is always open, forward only over valid steps the user has visited. `onFinish(values)` returns the `CreateOutcome` that `CreateRecordDialog` uses; a failure, or a throw, keeps every input and puts the error on the current step, and a success calls `onFinished(id)` and clears `dirty`. `reset()` starts over.
- `WizardFrame` lays it out: `wizard`, `onExit`, `title`, `presentation` (`'inline'`, the default, or `'dialog'` through `DialogShell`), `orientation` (`'horizontal'` with the strip on top, or `'vertical'` with the strip in a 240 px column on the left), `compactProgress`, `stepInfo` (a summary and sub-steps per step id), `activeSubStepId`, `onSubStepSelect`, `finishLabel`, `busyLabel`, `navExtra` and `headerExtra`. The step content comes in as children, the step scrolls on its own and the buttons stay in a footer.
- `WizardProgress` is the step strip. Each step is a numbered circle; a done step fills with `--c-primary` while its border draws, then the line to the next circle grows, then the next circle lights up. Going back plays a quick reverse, and reduced motion turns it off. It takes `steps` (`{ id, label, summary?, subSteps? }`), `currentId`, `orientation`, `compact` (Step 2 of 5 over a `ProgressBar`), `canSelect`, `onSelect`, `activeSubStepId`, `onSubStepSelect` and `label`. Summaries and sub-steps with their count `Badge` show only when vertical; a count of 0 draws no badge. The current step carries `aria-current="step"`, and a step `canSelect` refuses is a disabled button.
- `WizardStep` draws one step: `title`, `description`, `error` (a danger `Callout` in an alert above the fields), `level` and `focusOnOpen` (on by default: focus moves to the heading when the step mounts).
- `WizardNav` draws Cancel, Back and Next, or the finish button on the last step with `Button` `loading` while `busy`, a `hint` beside them while Next is off, and an `extra` slot. While `busy`, `busyLabel` (default `wizard.finishing`) shows in place of the hint, in a polite live region, since a loading Button hides its own label.
- `WizardReview` draws one block per step from `sections` (`{ stepId, title, rows }`, rows on a `TermList`) with an Edit button that calls `onEdit(stepId)`.
- `WizardExitGuard` asks before unsaved input is thrown away, with the `Dialog` composite in its danger variant; `blocked` asks the user to wait instead while something runs. `useWizardExit({ dirty, busy, onExit })` returns `requestExit` and the `guard` props; `WizardFrame` wires both to its Cancel and to Escape in the dialog.
- `TermListItem.detail` takes any `ReactNode`, not only a string.
- The string table gains a `wizard` group: step names for assistive tech, Step 2 of 5, Back, Next, Finish, Edit and the guard wording.
- Two motion tokens and an easing: `--duration-step-fill` (0.52 s), `--duration-step-line` (0.38 s) and `--ease-in-out`.

```tsx
<WizardDialogShell open={open} onClose={close} title="New session" steps={STEPS} activeStep={step} onStepChange={setStep} actions={buttons}>
  <SessionStep step={step} />
</WizardDialogShell>

const wizard = useWizard({ steps: STEPS, initialValues: EMPTY_SESSION, onFinish: openRoom, onFinished: close });
<WizardFrame wizard={wizard} presentation="dialog" open={open} title="New session" onExit={close}>
  <SessionStep wizard={wizard} />
</WizardFrame>
```

rotp moves its two hand-made step strips and the profile creation form onto these parts; Brock moves its profile screen.

## 33. AnimatedMascot and Sentri's animations

Nothing is removed or renamed, so rotp needs no change to keep working. The additions:

- `AnimatedMascot` draws a mascot that moves: `brand`, `animation`, `playing` (default true, false pauses where it is), `speed` (1 is normal), `loop` (defaults to the animation's own), `size`, `scale`, `title`, `className` and `onFinish`, which runs each time an animation that plays once ends. `animation` is typed per brand through `MascotAnimationNames`, so `brand="rotp"` takes only Sentri's names; without it the mascot plays its rest animation.
- It uses the Web Animations API with no new dependency. Nothing runs during render: the server draws Sentri at rest, and the animation starts in an effect. Under `prefers-reduced-motion: reduce` it stays at rest.
- `BrandMascot` takes `motion`, a `MascotMotion`: the stage margin around the art, the pivot of the whole body, the moving parts (an id, the scene node label it wraps and its pivot), an optional ground shadow, the rest animation and the animations by name. An animation (`MascotAnimation`) has a name, a summary, a duration in ms, whether it loops, and tracks of frames on parts; a frame (`MotionFrame`) sets `x`, `y`, `rotate`, `scale`, `scaleX`, `scaleY` and `opacity` at an offset from 0 to 1, with the easing to the next frame. Another app's mascot adds its own `motion` and an entry in `MascotAnimationNames`.
- Sentri's animations are `idle`, `move`, `jump`, `wave`, `scan` (Look around), `happy` and `alert`; `SentriAnimation` is their type. Idle, Move and Look around loop; the others play once.
- `SceneGroupNode` and `groupNode` take `part`, which `BrandScene` writes as `data-motion-part`. `BrandScene` takes `ref` for its `svg`.
- `useReducedMotion` moved from `ShortcutTour` to `src/primitives/dom/useReducedMotion.ts`, with `REDUCED_MOTION_QUERY` beside it. Neither is exported.

```tsx
<AnimatedMascot brand="rotp" animation="idle" scale={4} />
<AnimatedMascot brand="rotp" animation="wave" onFinish={() => setAnimation('idle')} />
```

rotp can use `AnimatedMascot` wherever it shows Sentri today: idle beside the hookshop, a wave when the app opens, alert when something needs the player.

## 34. A backdrop per brand, and ScrollArea lets the page scroll

The shared backdrop is gone, with no alias. Each brand now has its own.

- `BRAND_FAMILY[app].backdrop` is new on `BrandInfo`: a `BackdropGradient` of soft glows in the brand colours over a dark ground tinted with the brand. A glow (`BackdropGlow`) is `{ colour, strength, at: [x, y], size: [width, height] }`, with `colour` a hex value, `strength` its opacity in percent at the centre and `size` the ellipse in percent of the box. `angle` and `stops` (two hex values) set the ground.
- `backdropGradientCss(backdrop)` builds the CSS: each glow fades to clear on an eased curve, so no circle edge shows.
- `BACKDROP_GRADIENT` and the `BackdropToken` type are removed.
- `--brand-backdrop-gradient` is removed. `--brand-tessera-backdrop`, `--brand-rotp-backdrop`, `--brand-archipelia-backdrop` and `--brand-brock-backdrop` replace it, in `:root` with literal colours, so a palette no longer changes them.
- `tokens.json`: each `brands.<app>` gains `backdrop`, its CSS. `palettes.<palette>.backdrop` stays and now holds the backdrop of the brand with the same name. `splash-tokens.css` holds the four new tokens in `:root` and no longer has a backdrop per palette.
- `Hero` takes `brand` (`'tessera'` by default) and draws that brand's backdrop.

```tsx
<Box style={{ background: 'var(--brand-backdrop-gradient)' }} />
<Box style={{ background: 'var(--brand-rotp-backdrop)' }} />

<Hero title="Randomizer" />
<Hero brand="rotp" title="Randomizer" />
```

rotp passes `brand="rotp"` to its Hero. Brock can read `brands.<app>.backdrop` from `tokens.json` for a splash.

`ScrollArea` holds the wheel only on an axis that has something to scroll. It sets `data-overflow` (`x`, `y` or both) and contains overscroll on those axes alone. Before, every ScrollArea contained both axes, so a sideways one, or one whose content fit, caught the wheel and stopped the page from scrolling. No props change.

In the gallery, Colours, Gradients shows each brand's gradient and backdrop with a Playground; Hero has a brand control and a row per brand; Palettes draws each palette as one continuous strip; Fonts drops the value column; and the token tables, the Shortcut legend tables and the keyboard scroll sideways in a `ScrollArea` instead of a box that also scrolled down by a pixel.

## 35. Menus grow to fit their items

- A `DropdownMenu` no longer takes the 288 px cap of a `Select` list. The hamburger menu, an anchored menu and every submenu grow to fit their items and stop only at the space left between their anchor and the window edge, minus 8 px; past that the menu scrolls inside. An anchored menu or submenu opens towards the side with more room. `Select` and `Combobox` keep their 288 px cap.
- `useListboxDrop` takes `fit` (default false): with it, the drop's space is the room to the window edge with no fixed cap, which `--listbox-space` then carries as before. `dropPlacement` takes the same flag as its fourth argument.

## 36. Every input has two sizes, md and sm

Every input takes `size`: `'md'`, the default, or `'sm'`. The two sizes differ mainly in height, and padding and text follow the height. A row of `md` inputs and a `md` Button shares one height and lines up top and bottom; the same goes for `sm`.

- New token `--control-h-md` (39 px), the standard control height a TextInput and a `md` Button already had, beside `--control-h-sm` (28 px).
- `ControlSize` (`'sm' | 'md'`) and `useControlSize(size)` are exported. The hook returns the size given, or the size of the `Field` around the control, or `'md'`.
- `Field` takes `size` and passes it to the control inside, which takes it unless it sets its own. A `sm` Field also tightens the gap under its label.
- `src/theme/control-size.css` holds the shared size classes, `control-size--md` and `control-size--sm`. Each input sets one on its root, and `field-surface.css` reads the height, padding and text size from them.
- The text boxes (TextInput, Textarea at one row, NativeSelect, NumberInput, Stepper, the Select trigger, the Combobox field and the TagInput field) are 39 px at `md` with 14 px text and 28 px at `sm` with 12 px text. TextInput, Textarea, NumberInput and NativeSelect used to take the HTML `size` attribute through; `size` is now the control size.
- SegmentedControl and ToggleGroup are 39 px and 28 px; RadioGroup options are at least that tall, with a 16 px or 12 px dot.
- Checkbox draws a 16 px box with 14 px text at `md`, and at `sm` the 14 px box with 12 px text it drew before. Toggle, Slider and RangeSlider keep their current look as `md`; `sm` is the smaller switch, thumb and track. RangeInput draws the browser control at three quarters at `sm`.
- ColorSwatch is a square of the control height: 39 px at `md`, 28 px at `sm`. `--swatch-size` still sets any other size.
- DropZone inline is the control height; a `sm` block target has less padding. PositionInput passes its size to both number fields. TagPicker at `sm` tightens its gaps and label; the Tags keep their one size.
- Removed, with no alias: the `xs` size of SegmentedControl, Toggle and Slider, which `sm` replaces, and the types `SegmentedSize`, `ToggleSize` and `SliderSize`, which `ControlSize` replaces. The classes `select-trigger--sm`, `combobox--sm`, `segmented--md`, `segmented--xs`, `toggle--md`, `toggle--xs`, `slider--md` and `slider--xs` are gone; style `control-size--sm` instead. `IconButton` keeps `xs`.
- What changes at the default size: the Select trigger grows from 36 to 39 px with 14 px text, the Combobox field and the TagInput field from 32 to 39 px, SegmentedControl and ToggleGroup from 36 to 39 px, Stepper from 31 to 39 px, ColorSwatch and inline DropZone from 28 to 39 px, and the Checkbox box from 14 to 16 px. A `sm` Select or Combobox now has the same rounded corners as a `sm` Button.
- WidgetOptions draws its choices, its opacity Slider and its own rows at `sm`. The panel is 6 px taller than with `xs`.
- The DataTable row checkbox, the FilterBar checkboxes and the check in a multi-select list pass `size="sm"`, so they look as before.

```tsx
<SegmentedControl size="xs" value={edge} options={EDGES} onChange={setEdge} />
<Checkbox checked={on} onChange={setOn} label="Shuffle" />

<SegmentedControl size="sm" value={edge} options={EDGES} onChange={setEdge} />
<Checkbox size="sm" checked={on} onChange={setOn} label="Shuffle" />
```

rotp replaces `size="xs"` on SegmentedControl, Toggle and Slider with `size="sm"`, and passes `size="sm"` where it wants the old Stepper, Checkbox, ColorSwatch or inline DropZone. A compact form can set `size="sm"` once on each `Field`.

## 37. TabBar is now Tabs, its arrows take no room, and portalDocument wins

- `TabBar` is renamed `Tabs`. The props and the `TabItem` type are unchanged. There is no alias: change the import and the tag.
- Its classes follow the new name: `.tab-bar` and every `.tab-bar__*` part are now `.tabs` and `.tabs__*`. A host stylesheet that reached into the old classes renames them. Both renames are in RENAMES.json.
- The scroll arrows of an overflowing strip no longer keep a blank space at each end. The left arrow shows only once the strip has scrolled away from the start, and the right arrow only while more tabs wait to the right. Each arrow sits over the strip, on a faded edge, so the first tab starts at the left edge. The `.tabs__pager--idle` class is gone; the arrows are `.tabs__pager--back` and `.tabs__pager--forward`.
- The Tab key skips the arrows, and clicking one leaves focus where it was. The arrow keys, Home and End still move along the tabs.
- `HeaderTabs` is a separate composite and keeps its name.
- `portalDocument` in `TesseraProvider` now wins: a `Portal` renders into that document ahead of the one it is rendered in, as an app hosting Tessera in an iframe needs. With no `portalDocument` set, a `Portal` still uses its own document.

```tsx
import { TabBar } from '@drizztdourden08/tessera';
<TabBar tabs={TABS} activeTab={active} onTabChange={setActive} />

import { Tabs } from '@drizztdourden08/tessera';
<Tabs tabs={TABS} activeTab={active} onTabChange={setActive} />
```

rotp and Brock both use `TabBar`: each replaces the import and the tag with `Tabs`, and renames any `.tab-bar` selector to `.tabs`.

## 38. One Slider: range mode, named stops and labels from a rule; Textarea locks its size

`RangeSlider` and `RangeInput` are gone, with no alias. `Slider` does both jobs.

### Slider

- `range` switches the mode. Without it the slider has one thumb and `value` is a number; with `range` it has two thumbs and `value` is `[low, high]`, and `onChange` gets a fresh `[low, high]`. The props are a union on `range`, so TypeScript checks the value type against the mode. The low thumb never passes the high one.
- `stops` (a list of names) turns the track into named positions: `min` is 0, `max` is the last index, and `value` is an index. The readout and the screen reader text read the stop name. With stops and no `labels`, every stop is labelled, as `RangeSlider` did.
- `labels` writes labels under the track, with a tick above each one, in both modes and at both sizes. Labels that would overlap thin out to an even stride, always keeping the first and last; the ticks of hidden labels hide with them. Labels inside the selected part are brighter.
- In range mode, a press on the bare track moves the nearer thumb there, snapped to a step, and focuses it. With both thumbs on one value, the thumb on the side pressed moves. The low thumb still never passes the high one.
- The thumb looks the same in Firefox: `src/theme/slider-thumb.css` styles `::-moz-range-thumb` beside `::-webkit-slider-thumb`, and clears `::-moz-range-track` and `::-moz-range-progress` so the rail draws the bar and the fill in both engines.
- `keyStep` sets a coarser stride for the arrow keys; `step` stays the stride for the pointer and the native keys.
- `min` and `max` are optional, 0 and 100 by default. `value` is optional: leave it out and pass `defaultValue` to let the slider keep its own value. `onChange` is optional too. `id`, `name` and `className` pass through; `name` puts the slider in a form, and in range mode both inputs carry it.
- Kept: `label`, `description`, `showValue`, `formatValue`, `mute` and `onMuteToggle` (one thumb only), `size` (`md`, `sm`), `hint`, `onHint`, `disabled` and `aria-label`.
- In range mode the readout shows both ends, with a dash between them that CSS draws.
- The inputs now always have an accessible name: `aria-label`, then `label`, then `hint.label`. In range mode the thumbs read `<name> start` and `<name> end`.
- The track is drawn by `.slider__rail` and its `::before`; the input is transparent over it. `--slider-lo` and `--slider-hi` set the filled part, and `--slider-thumb`, `--slider-bar` and `--slider-tick` come from the size class. `.slider__marks`, `.slider__mark`, `.slider__mark-text` and the `--start`, `--end`, `--in` and `--hidden` modifiers draw the labels. `.slider--range` marks range mode. The disabled slider dims by `--opacity-disabled`.

### The labels field

`labels` takes one of three things.

1. A rule string, in two halves split by `|`: where the labels go, then how each reads. Either half can be left out.
2. A list of `[value, label]` pairs, where the label is a string or any node. Pairs outside `min` and `max` are dropped.
3. A function `(value) => label`, called on every step. Return `null`, `false` or an empty string for no label there. It runs on up to 2000 steps; past that it warns and draws nothing.

Where the labels go, joined with `+` to combine:

| Write | Places a label |
|---|---|
| `every N` | every N, counted from `min` |
| `count N` | N times, spread evenly from `min` to `max`, each on a step |
| `ends` | at `min` and `max` |
| `steps` | on every step |
| `0, 50, max` | at these values; `min` and `max` name the ends, and `at` in front reads the same |
| `0=Off` | at 0, with its own text, which wins over the template |
| `none` | nowhere |

How each label reads:

| Write | Gives |
|---|---|
| `{v}` | the value |
| `{v:0.0}` | the value in a number format: `0` whole, `0.0` one decimal, `0.##` up to two, `#,##0` grouped, `+0` signed |
| `{v*100}` | the value worked out first, with `*`, `/`, `+` or `-` and a number; it takes a format too, `{v*100:0}` |
| `{p}` | how far along the track, in percent |
| `{stop}` | the stop name |
| `{heart\|hearts}` | the first form at 1 and the second otherwise; `{none\|one\|many}` adds a form for 0 |
| `[Low, Medium, High]` | one word per label, in order |
| any other text | itself |

Left out, the template is the readout text: the stop name, or `formatValue`, or the plain number. Left out, the placement is `steps`, or one label per word for a word list. A rule that does not read gives a warning in development, naming the rule and the problem, and no labels; it never throws. A placement that would make more than 500 labels is refused the same way.

```tsx
<Slider min={0.5} max={4} step={0.25} value={zoom} onChange={setZoom} labels="every 0.5 | {v}x" />
<Slider value={cost} onChange={setCost} labels="every 25 + 0=Off | {v}%" />
<Slider max={1000} step={50} value={delay} onChange={setDelay} labels="0, 250, 500, 1000 | {v} ms" />
<Slider max={0.5} step={0.01} value={deadzone} onChange={setDeadzone} labels="every 0.1 | {v*100:0}%" />
<Slider value={quality} onChange={setQuality} labels="[Low, Medium, High]" />
<Slider min={1} max={8} value={hearts} onChange={setHearts} labels="every 2 + ends | {v} {heart|hearts}" />
<Slider value={volume} onChange={setVolume} labels={[[0, <Glyph name="mute" />], [100, <Glyph name="volume" />]]} />
<Slider max={180} step={15} value={angle} onChange={setAngle} labels={(v) => (v % 45 === 0 ? `${v}°` : null)} />
```

### Moving from RangeSlider and RangeInput

- `RangeSlider` becomes `Slider` with `range`. `ariaLabel` becomes `aria-label`. `step`, which was the keyboard stride over stops, becomes `keyStep`. `labelEvery={n}` becomes `labels="every n"`. `stops`, `value`, `onChange`, `disabled`, `size` and `className` keep their names. A `Slider` shows the readout by default; pass `showValue={false}` for the old look.
- `RangeInput` becomes `Slider`. Pass `value` and `onChange` (which now gets the number, not the event), or `defaultValue` alone. Set `showValue={false}` and leave out `label` for the bare control.
- The classes `range-slider*` and `range-input` are gone. RENAMES.json maps them to the `slider` classes, and maps the props.
- `RangeSliderProps` and `RangeInputProps` are removed; use `SliderProps`. `SliderLabels`, `SliderLabelEntry` and `SliderPair` are exported.
- Inside Tessera, `Video` drew its seek and volume bars on `RangeInput`. They are plain range inputs now, styled by `.video-track` alone; they look the same.

```tsx
<RangeSlider stops={SPEEDS} value={range} onChange={setRange} labelEvery={2} step={2} ariaLabel="Turbo speed range" />
<Slider range stops={SPEEDS} value={range} onChange={setRange} labels="every 2" keyStep={2} aria-label="Turbo speed range" />

<RangeInput value={cost} min={0} max={100} onChange={(event) => setCost(Number(event.target.value))} aria-label="Hint cost" />
<Slider value={cost} onChange={setCost} showValue={false} aria-label="Hint cost" />
```

### Textarea

`Textarea` takes `resize`: `'vertical'` (the default, as before), `'none'` to lock the size, `'horizontal'` or `'both'`. It sets the CSS `resize` through the classes `textarea--resize-none`, `textarea--resize-vertical`, `textarea--resize-horizontal` and `textarea--resize-both`. `rows` still sets the starting height. `TextareaProps` and `TextareaResize` are exported.

```tsx
<Textarea rows={4} resize="none" />
```

rotp and Brock replace each `RangeSlider` and `RangeInput` as above, and pass `resize="none"` to a Textarea whose size must not change.

## 39. PatternInput replaces PositionInput

`PositionInput` is gone, with no alias. `PatternInput`, now named `DynamicInput` (section 41), does its job and many more: the developer writes the field as a pattern of muted text and typed slots, each slot is its own segment, and the slot in focus opens a popover with the control its type calls for.

The API is one pattern string that says what the field shows and asks for. It reads in the spirit of the Slider label rule in section 38: braces hold a value, a colon says what kind it is, and `|` separates alternatives.

DynamicInput is a composite, since a colour slot opens the ColorPicker. It is exported from the package root and from `/composites`. The ColorPicker loads the first time a colour popover opens, so react-color stays out of an app that never shows one.

### Moving from PositionInput

```tsx
<PositionInput label="Spawn tile" value={spawn} onChange={setSpawn} x={{ min: 0, max: 63 }} y={{ min: 0, max: 63 }} />

<Field label="Spawn tile">
  <DynamicInput pattern="X {x:number 0..63}  Y {y:number 0..63}" value={spawn} onChange={setSpawn} />
</Field>
```

- `x` and `y` become the args of each slot: the range, `stepN` and a quoted label, as in `{x:number 0..63 step8 "Column"}`. A fractional step takes a decimal slot: `{x:decimal 2 0..1 step0.05}`.
- `label` moves to a `Field` around the input, or to `aria-label`.
- `value` is still `{ x, y }`, keyed by slot name. A slot left empty is `null`. `onChange` gets the whole object each time a slot holds a new valid value.
- `clampAxis`, `clampPosition`, `isValidForAxis` and `isWithinAxis` are removed, with `PositionAxis`, `PositionValue` and `PositionInputProps`. A number slot settles into its range when it is left, and `onChange` never gets a value outside it.
- The `.position-input` classes are gone. RENAMES.json maps them to the `.dynamic-input` parts.
- Inside Tessera, RecordEditor draws an x and y pair with DynamicInput, and builds the pattern from the field labels and bounds.

### The pattern

| Write | Means |
|---|---|
| any text | Shown as written, muted. Spaces count. |
| `{name:type args}` | A slot. The name keys the value, the type says what it takes, and the args, split by spaces, tune it. |
| `"Label"` inside a slot | The accessible name of the slot. Without one the slot is called by its name, or Hour and Minute. |
| `{=slot}` | The shown value of another slot, as muted text. |
| `{=slot.field}` | One field of the chosen option, such as `{=country.dial}`. |
| `[icon:name]` | A Tessera icon, or an entry of `icons`. |
| `[action:name]` | An icon button from `actions`; `onPress` gets the whole value. |
| `[spacer]` | Takes the free width, so what follows sits at the far end. |
| `\{` `\}` `\[` `\]` `\` | A plain brace, bracket or backslash. `escapePatternText` does this for text from data. |

| Type | Value | Popover |
|---|---|---|
| `number` | a whole number | a Slider when both ends of the range are set, else a Stepper |
| `decimal` | a number; the decimals show muted | a Slider when both ends are set, else a NumberInput |
| `hour` | 0 to 23, or 1 to 12 with `12h` | hour and minute Steppers |
| `minute` | 0 to 59 | hour and minute Steppers |
| `choice` | the value of an option | the option list, with flags and details |
| `text` | a string | none |
| `hex` | a colour such as `#e05a47` | the ColorPicker |

| Arg | Types | Means |
|---|---|---|
| `MIN..MAX` | number, decimal | the range; either end can stay open |
| `padN` | number | zero pads to N digits, and N digits complete the slot |
| `stepN` | number, decimal, hour, minute | the step of the arrow keys and the popover |
| `group` | number, decimal | thousands separators while not editing |
| `wrap` | number | stepping past one end goes to the other |
| `slider`, `stepper` | number, decimal | picks the popover control |
| `N` | decimal | the count of decimals, 2 when left out |
| `12h`, `24h` | hour | the clock, 24h when left out |
| `A\|B\|C` | choice | the options, inline |
| `@name` | choice | the options in `lists.name` |
| `flag` | choice | shows only the flag of the chosen option |
| `maxN`, `minN`, `lenN` | text | the most, the fewest, or exactly N characters |
| `digits`, `letters`, `alnum` | text | the characters the slot takes |
| `upper`, `lower` | text | changes the case while typing |
| `fill` | text | takes the free width |
| `muted` | every type | draws the value muted |

A pattern that does not read never throws. In development each problem is a warning that names the part and says what to write; the part it cannot read shows as text. `parsePattern` returns the parts, the slots and the problems, for a test or a tool.

### Props

- `pattern`, `value`, `onChange`, as above.
- `slots`: per slot `label` and `placeholder`, for app wording. It wins over the pattern label. A slot with no placeholder shows its name.
- `lists`: option lists for `@name`. An option has `value`, and may have `label`, `short` (what the slot shows), `flag` (a region code such as `IE`), `detail` (muted in the list) and any other field an echo reads.
- `actions`: `{ label, icon, disabled, onPress }` per `[action:name]`.
- `icons`: Iconify icons for `[icon:name]` beyond the Tessera set.
- `counter`: the name of a text slot with `maxN` or `lenN`; draws `12 / 100` under the field.
- `size`, `disabled`, `invalid`, `id`, `className` and the `aria-label`, `aria-labelledby` and `aria-describedby` props. Inside a `Field` it takes the label, the hint, the error and the size.

### Behaviour

- Typing fills the slot in focus. A full slot moves focus to the next one: two digits for a padded slot, three for 0..255, or as soon as no further digit fits the range.
- A character the slot cannot take, such as `.`, `:`, `x` or a space, moves on once something was typed in the slot, so `192.168.0.1:8080` types straight through.
- Tab and Shift Tab move between slots. Backspace in an empty slot goes back. The left and right arrows cross into the next slot at the edge of the text. Up and down step a number; on a choice they move through the list. Enter settles the slot; Escape closes the popover.
- Letters on a choice jump to the matching option and pick it, and a single match moves on.
- The popover opens on click, on Tab and on a move from the slot before. It sits under the slot through `Anchored`.
- The strings `Hour`, `Minute` and the counter text are in the `dynamicInput` group of the string table.

rotp and Brock replace each `PositionInput` as above.

## 40. Value rules and ScaleLabels on their own, VolumeControl, and Slider drags both thumbs

### The value rule engine is its own module

The rule syntax from section 38 is no longer inside `Slider`. It lives in `src/primitives/value-rule/` and is exported:

- A **value rule** is a short text that says where labels go on a scale and how each reads, such as `"every 0.5 | {v}x"`. The syntax is unchanged.
- `parseValueRule(text)` reads the text. It returns `{ rule, error: null }`, or `{ rule: null, error }` with a message that names the rule and the problem. It never throws.
- `formatValueRule(rule, scale)` takes a rule (text or parsed) and a `ValueScale` (`{ min, max, step, stops?, formatValue? }`) and returns `{ marks, error }`, where each mark is `{ value, text }`. A bad rule gives no marks and the error.
- `thinLabels(boxes, gap)` takes the measured `{ start, end }` of a row of labels and returns which to show: an even stride that keeps the first and last.
- Types: `ValueRule`, `ValueRuleParse`, `ValueRuleMarks`, `ValueMark`, `ValueScale`, `LabelBox`.

### ScaleLabels

`ScaleLabels` draws labels, each with a tick, along a scale. Slider uses it for its `labels`, and a ProgressBar or a StickPlot axis can use it too.

- `min`, `max`, `step`, `stops` and `formatValue` describe the scale.
- `labels` takes a value rule, a list of `[value, label]` pairs (`ScaleLabelEntry`), or a function from value to label (`ScaleLabelSource` covers all three). With `stops` and no `labels`, every stop is labelled.
- `orientation` is `'horizontal'` (the default) or `'vertical'`, where values rise from the bottom.
- `thin` (default true) hides labels that would overlap. `ticks` (default true) draws the ticks. `highlight` takes `[from, to]` and brightens the labels in that span and fades the rest.
- Its look is `.scale-labels`, `.scale-labels--horizontal` or `--vertical`, `.scale-labels__mark` with `--start`, `--end`, `--in`, `--out` and `--hidden`, and `.scale-labels__text`. Set `--scale-labels-tick` for the tick length and `--scale-labels-overhang` for how far the end labels may reach past the ends. The labels cannot be selected.
- `SliderLabels` and `SliderLabelEntry` are replaced by `ScaleLabelSource` and `ScaleLabelEntry`. The classes `slider__marks`, `slider__mark` and `slider__mark-text` become the `scale-labels` ones.

### Slider

- In range mode, either thumb can be dragged with the mouse, from anywhere on the thumb, with the pointer captured, so the drag holds when the pointer leaves the track. The thumb keeps its offset from the pointer, so it does not jump on grab. When both thumbs sit on one value, the first move picks the one to drag: left takes the low thumb, right the high one. A press on the bare track still brings the nearer thumb there. The range inputs take no pointer events now; the track handles the pointer, and the inputs keep the keyboard and the screen reader.
- The thumb under the pointer or being dragged grows, as a hovered thumb does in single mode (`.slider__input--hot`).
- The readout keeps the width of its longest possible text, worked out from `min`, `max`, `step`, `stops` and `formatValue`, and both ends with the dash in range mode. The track no longer changes width as the value changes. The readout uses tabular numbers and cannot be selected.
- `mute` and `onMuteToggle` are removed, with the `slider__mute` classes. Use `VolumeControl`.
- The labels sit under the rail in the flow of the slider, so a labelled slider is taller by the label row.

### VolumeControl

A composite for a sound level: a mute `IconButton` beside a `Slider`.

- `value` and `onChange` set the level; `min` (0), `max` (100) and `step` (1) set the scale.
- Without `muted`, mute drops the level to `min` and a second press brings back the last level. Pass `muted` and `onMutedChange` to keep the level while muted; the slider then reads `min`, and dragging it unmutes.
- The icon follows the level: `volume-x` when muted or silent, `volume-1` below half, `volume-2` above.
- `label`, `description`, `showValue`, `formatValue` (percent of the range by default), `labels`, `size`, `disabled` and `onHint` pass through. Both parts report hints: the button names mute or unmute, the slider the level.
- New strings in `common`: `volume`, `volumeHint`, `muteHint` and `unmuteHint`.

```tsx
<Slider label="Music volume" value={volume} onChange={setVolume} mute={volume === 0} />
<VolumeControl label="Music volume" value={volume} onChange={setVolume} />
```

Video keeps its own volume bar; nothing in Video changes.

rotp replaces each `Slider` with `mute` by a `VolumeControl`, and renames `SliderLabels` to `ScaleLabelSource`.

## 41. PatternInput is now DynamicInput

`PatternInput` from section 39 is renamed `DynamicInput`, with no alias. The pattern string, the props and the behaviour stay the same.

| Before | After |
|---|---|
| `PatternInput` | `DynamicInput` |
| `PatternInputProps` | `DynamicInputProps` |
| `.pattern-input`, `.pattern-input__*`, `.pattern-input--*` | `.dynamic-input`, `.dynamic-input__*`, `.dynamic-input--*` |
| the `patternInput` group of the string table | the `dynamicInput` group |
| the gallery page `Composites · Inputs/PatternInput` | `Composites · Inputs/DynamicInput` |

The pattern names stay: `parsePattern`, `escapePatternText`, `PatternValue`, `PatternSetup` and the other `Pattern*` types. A development warning about a pattern now starts with `DynamicInput:`.

rotp never used PatternInput, so it moves from `PositionInput` straight to `DynamicInput`. RENAMES.json maps both names.

## 42. Link and RouterLink replace the link override; the gallery gains Core · Setup

- The `link` override is gone from `TesseraOverrides`. No Tessera part routes through the provider any more.
- `Link` is now a styled link for a URL: the Tessera link colour, an underline on hover and the focus ring. It takes `tone` (`primary`, `secondary`, `neutral`, `danger`) and `external`, which sets `target="_blank"`, `rel="noopener noreferrer"` and an icon whose label says the link opens a new tab. A `className` wins over its look. It moves to Primitives · Actions in the gallery.
- `RouterLink` is new, for a route inside the app. It takes `to` and `onNavigate(to)`, and an optional `href` for the address it shows, which defaults to `to`. It renders a real anchor, so middle click, Ctrl click and Copy link work; a plain click calls `onNavigate(to)` instead of loading the page.
- `Box` no longer takes `href` and never draws a link. Use `Link` for a URL and `RouterLink` for a route.
- Toggle's `link` draws an external `Link`. Its look is unchanged.
- The string table has `navigation.opensInNewTab`.

```tsx
const OVERRIDES: TesseraOverrides = { link: AppRouterLink };
<Box href="/saves/slot-2">Open slot 2</Box>

const AppLink = (props: Omit<RouterLinkProps, 'onNavigate' | 'href'>) => {
  const navigate = useNavigate();
  return <RouterLink {...props} href={useHref(props.to)} onNavigate={navigate} />;
};
<AppLink to="/saves/slot-2">Open slot 2</AppLink>
```

The gallery puts every top group under Core: Core · Setup, Core · Brand, Core · Colours, Core · Typography, Core · Text, Core · Icons and Core · Tokens. Core · Setup holds the TesseraProvider page and new pages on the app setup, building compounds and views, and the rare app primitive or composite.

rotp and Brock remove `link` from their overrides, wrap `RouterLink` in an app `AppLink` compound as above, and replace each `<Box href>` and each rendered `Link` that relied on the override with `AppLink` for a route or `Link` for a URL.

## 43. SearchResults gets a fixed head; NavLayout leaves the results to scroll themselves

`SearchResults` now looks like the rotp profile hub search.

- The head is fixed: the summary in `text-lg` semibold, then a chip for each entry of `jumps`, on a row with a bottom border and a min height of the new `--search-results-head-h` token (52px). Only the body below it scrolls.
- A chip reads `navigation.openNamed(label)`, "Open Sessions" by default, so pass the page name as the jump `label`. `onJump` still gets the id.
- `groupHeading` picks the group heading. `split`, the new default, draws the page icon with a glow, an `h3` title, a count pill and an `openLabel` button on the right, shown when `onOpenGroup` is set. `openLabel` defaults to `navigation.openPage`. `button` keeps the old look, the whole heading as one button.
- `idleIcon` sits above the idle message, a 40px `SearchSpark` by default. Pass `null` to hide it.
- With no match, the head stays and `emptyMessage` shows in the body. Its default is the new `navigation.searchTip`; the summary says `navigation.noResultsFor(query)`.
- The root is a `section` named by `navigation.searchResults`, and each group is a `section` named by its label.
- `.search-results__count` is gone: the summary text is `.search-results__summary`. The new parts are `__body`, `__chip`, `__group-head`, `__group-icon`, `__group-title`, `__group-count` and `__open`.
- The string table drops `navigation.nothingMatches` and adds `searchResults`, `searchTip`, `openPage` and `openNamed`.

`NavLayout` takes `paneScroll`:

| Value | The pane scrolls |
|---|---|
| `page` (default) | the page, and leaves the results to scroll themselves |
| `always` | the page and the results, as before |
| `none` | nothing, for pages that scroll themselves, such as a `SettingsPage` |

Pass `paneScroll="always"` for results that cannot scroll on their own.

The glow on the `SettingsPage` icon, the current `SectionNav` item and the search group icons is one shared class, `.icon-glow` in `src/theme/icon-glow.css`: `filter: drop-shadow(0 0 var(--blur-glow) var(--c-primary))`. The card behind a `SettingsPage` and a framed `SearchResults` is one shared class too, `.page-card` in `src/theme/page-card.css`. The looks are unchanged.

```tsx
<NavLayout nav={nav} paneScroll="none" results={(
  <SearchResults
    framed
    query={query}
    count={total}
    summary={`${total} settings match "${query}"`}
    jumps={pagesByName}
    onJump={openPage}
    groups={pagesWithRows}
    onOpenGroup={openPage}
    openLabel="Open tab"
  />
)}>
  <CurrentSettingsPage />
</NavLayout>
```

rotp and Brock can draw their hub search with `SearchResults` and pass each page's rows as a group's `children`. An app that overrides `nothingMatches` moves the text to `searchTip`.

## 44. tessera.config.json says where an app keeps its parts; the usage mode moves into it

Tessera's tools run from `node_modules`, so an app now names its own folders in `tessera.config.json` at the repo root, next to `pnpm-workspace.yaml` in a monorepo. Every key is optional and every path is relative to the file; `docs/using-tessera.md` lists the keys and their defaults. A single-app repo that keeps the default `src/<kind>` folders needs only:

```json
{
  "$schema": "./node_modules/@drizztdourden08/tessera/tessera.config.schema.json"
}
```

- `tessera new` reads it: each kind goes to its `parts` folder, a view to the `parts.views` of the app it runs in, and `--into <folder>` picks a folder when a kind lists more than one. With no file, it writes to the default folders and prints a hint.
- `@drizztdourden08/tessera/config` exports `loadTesseraConfig(fromDir?)` and `findTesseraConfig(fromDir?)` for Node tools, with types. A key the schema does not know, or a value of the wrong type, throws an error that names the key.
- `package.json` declares `"standards": { "extension": "./standards.extension.mjs" }`. An app on `@drizztdourden08/standards` gets the usage file rule for its `parts`, `primitivesGlobs` and the theme token file from `tessera.config.json`.
- `./config` is the first `exports` entry with a `types` condition, so its value is an object. The Vite alias in `docs/using-tessera.md` now takes `target.default ?? target`; an app that copied the old alias updates that line.

The usage mode key under `tessera` in Tessera's `package.json` is gone. The setting moves to Tessera's own `tessera.config.json`, now `guide.usage`, with the same values, `report` or `enforce`, and the same default. The check prints `(tessera.config.json guide.usage)` where it printed the `package.json` key, and a wrong value names the key the same way the loader does.

```json
{
  "$schema": "./tessera.config.schema.json",
  "guide": { "usage": "report" }
}
```

Brock reads the app layout with `loadTesseraConfig`. rotp and Archipelia add a `tessera.config.json` with `$schema` and the folders they use; Archipelia moves its shared parts to `packages/design` and sets `parts.views` per app under `apps`.

## 45. FullScreenLayer's margin follows the room it has

The space around the card used to be a fixed 2xl padding with the card at 90% of the rest, so the sides and the top differed. It is now one gap, the same on all four sides, measured from the size of the layer with a container query:

| Room | Gap on every side |
|---|---|
| 1280 px wide and 800 px high or more | 2xl plus 5% of the smaller side |
| under that | xl plus 3% of the smaller side |
| under 960 px wide or 600 px high | the minimum |
| under 480 px wide or 440 px high | none: the card fills the layer with square corners and no border, and the floating switch moves inside the card, with the title bar pushed down below it |

The minimum is half a control height plus an lg space, so the floating switch, which sits across the top edge of the card, always has room above it; no gap above the minimum tier goes below it.

The padding sits on a new `.fullscreen-layer__inset` wrapper; `.fullscreen-layer` itself has none. A host stylesheet that set the padding of `.fullscreen-layer` sets it on `.fullscreen-layer__inset`. In the gallery the page moves to Composites · Screens.

## 46. ConfirmIconButton takes a placement, InlineCreateForm has a compact form, ErrorBoundary is a primitive

`ConfirmIconButton` takes `placement`, which says which edge of the button stays put when the question opens. The cancel button always takes the place of the icon, so a second click backs out, and the order and alignment follow the writing direction.

| Value | Where it sits | The question grows |
|---|---|---|
| `start` (default) | at the start of a row or a toolbar | toward the end, as before |
| `end` | at the end of a row, such as a list row action | toward the start, with confirm before cancel |
| `center` | in a centred footer | both ways from the middle |

`ProfilePicker` rows and the reset button of a `SettingsGroupList` heading now pass `placement="end"`, and `.settings-group-list__reset` no longer sets `justify-content`. An app that put a `ConfirmIconButton` at the end of a row passes `placement="end"` and drops any `justify-content: flex-end` it added to line the icon up.

```tsx
<ListItemRow
  name={session.name}
  action={(
    <ConfirmIconButton
      placement="end"
      icon={<Icon name="trash-2" />}
      label={`Remove ${session.name}`}
      confirmLabel="Yes, remove it"
      cancelLabel="Keep it"
      onConfirm={() => remove(session.id)}
    />
  )}
/>
```

`InlineCreateForm` takes `compact`: one line at the `sm` control size, with no box. The name field comes first, then `extraFields`, then an icon button that creates and, with `onCancel`, one that cancels. `submitLabel` and `cancelLabel` name the icon buttons and default to Create and Cancel. The name field keeps its accessible name from `label` or the placeholder, and `error` shows on a line below it. In both forms the error now describes the name field through `aria-describedby`. Controls in `extraFields` take the `sm` size unless they set their own.

```tsx
<InlineCreateForm
  compact
  label="New folder name"
  placeholder="New folder"
  submitLabel="Create folder"
  onCreate={createFolder}
  error={error}
/>
```

`ErrorBoundary` moves from the composites tier to the primitives tier: it is a behaviour with a default notice and is built from primitives only. `@drizztdourden08/tessera` and `@drizztdourden08/tessera/composites` still export it, and `@drizztdourden08/tessera/primitives` now does too. Only a deep import of the folder changes:

| Before | After |
|---|---|
| `src/composites/ErrorBoundary` | `src/primitives/ErrorBoundary` |

The gallery regroups its composites. Dialogs keeps `Dialog`, `DialogShell`, `CreateRecordDialog` and `DeleteGuardDialog`. A new Overlays group takes `Overlay`, `Drawer` and `DisabledOverlay`, a new Actions group takes `ConfirmIconButton`, and a new Forms group takes `InlineCreateForm` from Dialogs and `RecordEditor` from Data views. `FullScreenLayer` moves to Screens, and `ErrorBoundary` to Primitives · Feedback. The Drawer page shows file details, filters, notifications and a search sheet in place of the menu examples.

## 47. SectionNav is now SideNav, the old SideNav is gone, and HeaderTabs is HeaderAnchorNav

The gold icon column that was `SectionNav` takes the name `SideNav`. The grouped list that was called `SideNav` is removed: the new `SideNav` replaces it, and `SettingsShell` now draws the new one. There is no alias.

| Before | After |
|---|---|
| `SectionNav` | `SideNav` |
| `SectionNavProps`, `SectionNavConfig`, `SectionNavGroup`, `SectionNavItem`, `SectionNavSearch`, `SectionNavVariant` | `SideNavProps`, `SideNavConfig`, `SideNavGroup`, `SideNavItem`, `SideNavSearch`, `SideNavVariant` |
| `.section-nav` and every `.section-nav__*` and `.section-nav--*` class | `.side-nav`, `.side-nav__*`, `.side-nav--*` |
| `--section-nav-w`, `--section-nav-w-open`, `--section-nav-item-h`, `--section-nav-toggle-d` | `--side-nav-w`, `--side-nav-w-open`, `--side-nav-item-h`, `--side-nav-toggle-d` |
| `src/composites/SectionNav` | `src/composites/SideNav` |
| gallery page Composites · Navigation/SectionNav | Composites · Navigation/SideNav |

`NavLayout` takes the same `nav` data as before, now typed `SideNavProps`. The props of the renamed component are unchanged.

### An app that used the old SideNav

`SideNav`, `SideNavProps`, `SideNavGroup` and `SideNavItem` keep their names but now describe the former `SectionNav`, so RENAMES.json does not map them; it lists the old props as notes instead. Rewrite each use by hand:

| Old SideNav | New SideNav |
|---|---|
| `groups` | `config.groups` |
| a group's `title` | its `label` |
| a group's optional `id` | a required `id` |
| an item's optional `icon` | a required `icon` |
| `searchable`, `searchPlaceholder`, `query`, `onQueryChange` | `search`: `{ value, onChange, placeholder }`, owned by the host |
| `header` | none |
| `activeId`, `onSelect` | unchanged |

What the new SideNav does not do:

- A group heading is a label, never a target of its own. A group that had an `id` and no items becomes a plain item.
- It has no `header` slot.
- It does not filter its own items: the host owns the query and the results, as `NavLayout` does with `SearchResults`.
- It shows only icons until it opens. `defaultOpen` opens it on first render, and the `rail` variant shows its labels unless `collapsed` is set.

The old classes `.side-nav__header`, `.side-nav__list`, `.side-nav__group-title`, `.side-nav__group-title--action` and `.side-nav__group-title--active` are gone. `.side-nav__list` becomes `.side-nav__groups` and `.side-nav__group-title` becomes `.side-nav__group-label`; the others have no counterpart.

### SettingsShell

`SettingsShell` draws the new `SideNav`, open by default so its labels show. It keeps the filter and the header itself:

| Before | After |
|---|---|
| `nav.groups` | `nav.config.groups`, with an id on each group and an icon on each item |
| `nav.searchable` | `filterable` |
| `nav.searchPlaceholder` | `filterPlaceholder`, which defaults to the Filter string |
| `nav.query`, `nav.onQueryChange` | `nav.search`: the host owns the query and filters the groups itself |
| `nav.header` | `header`, a row above the nav and the panel |

With `filterable`, the shell keeps the query and narrows the items by label, hiding a group with no match. The header now spans the top of the shell instead of sitting inside the nav. The nav still hides under 640 pixels wide; the `.settings-shell .side-nav` rule now meets the new nav, and the panel and nav sit in a new `.settings-shell__body` row.

```tsx
<SettingsShell
  nav={{ config: { groups: SETTINGS_GROUPS }, activeId: active, onSelect: setActive }}
  filterable
  header={<Text variant="title">Settings</Text>}
>
  <SettingsPanel id={active} />
</SettingsShell>
```

### HeaderAnchorNav

`HeaderTabs` is renamed `HeaderAnchorNav`: it jumps to the sections of a page and is not a set of tabs.

| Before | After |
|---|---|
| `HeaderTabs`, `HeaderTabsProps`, `HeaderTabItem` | `HeaderAnchorNav`, `HeaderAnchorNavProps`, `HeaderAnchorNavItem` |
| `.header-tabs` | `.header-anchor-nav` |
| `.header-tabs__tab`, `.header-tabs__tab--active` | `.header-anchor-nav__item`, `.header-anchor-nav__item--active` |
| gallery page Composites · Navigation/HeaderTabs | Composites · Navigation/HeaderAnchorNav |

The props are unchanged. The `nav` landmark now holds a list, `.header-anchor-nav__list`, with one item per button, so a screen reader announces how many sections there are. The flex row moves from `.header-anchor-nav` to `.header-anchor-nav__list`; a host stylesheet that set the gap or wrapping on `.header-tabs` sets it on the list. The current button carries `aria-current="location"` in place of `aria-current="true"`. `SettingsPage` uses it for its anchors and its view tabs, and its `tabs.items` are typed `HeaderAnchorNavItem`.

RENAMES.json holds every rename above. rotp and Brock replay it, then rewrite any use of the old `SideNav` by the tables in this section.

## 48. FloatingSwitch slides a thumb to the lit place; SplitPane gets a visible divider, limits and a vertical form

`FloatingSwitch` draws one thumb behind its items, a pill with the lit fill, border and glow. It slides and resizes to the place the user picks, and the lit text changes colour as it arrives. The thumb is measured from the inline start, so it lines up right to left too, and it measures again when the items, their labels or the switch size change. With reduced motion the thumb moves without sliding. Hovering a place no longer fills it: its text brightens and its icon and label gain a soft glow. The props are the same. The lit item no longer sets its own border, background or shadow, and each label now sits in a `.floating-switch__label` span. A host stylesheet that styled `.floating-switch__item--active` for its fill styles `.floating-switch__thumb` instead.

`SplitPane` was hard to use: the divider was a faint line with nothing to grab, and under 960 pixels of window width the panes stacked and the divider disappeared, which is most of the gallery canvas. The divider now shows a hairline with a grip in the middle, lights up under the pointer and on focus, and follows the pointer from where it was grabbed, right to left included. The stacking rule is gone; a host that wants the panes stacked on a narrow screen passes `orientation="vertical"`.

New props:

```ts
type SplitOrientation = 'horizontal' | 'vertical';

interface SplitPaneProps {
  orientation?: SplitOrientation; // 'horizontal' (default): side by side; 'vertical': one above the other
  minRatio?: number;              // default 0.2, the smallest share of the start pane while it is open
  maxRatio?: number;              // default 0.8, the largest share of the start pane while it is open
}
```

A drag between the snap point and a limit stops at the limit; past the snap point the pane still collapses, and `snapAt={0}` turns collapsing off. On the divider, the arrow keys of its axis move it (Shift for bigger steps), a step past a limit collapses the pane, Home and End collapse a side (or go to a limit when `snapAt` is 0), and Enter, Space or a double-click reset it. `aria-valuemin` and `aria-valuemax` follow the limits when nothing can collapse.

The default pane names in the string table change from `navigation.leftPane` and `navigation.rightPane` to `navigation.firstPane` and `navigation.secondPane` ("first pane" and "second pane"), since the start pane is on the right in right to left and on top in the vertical form. An app that overrides those strings renames its keys.

```tsx
<SplitPane
  orientation="vertical"
  start={<Editor />}
  end={<Console />}
  defaultRatio={0.7}
  minRatio={0.3}
  startLabel="editor"
  endLabel="console"
/>
```

The SplitPane page shows a file list beside a preview and an editor above its console, and tells the viewer to drag the divider.

## 49. TextInput takes an icon at either end; SearchInput is a primitive; the SideNav chevron lines up with the first row

`TextInput` and `NumberInput` take `start` and `end`. Each holds one icon, sized to the control: 16 pixels at md and 14 at sm. An icon with `onClick` becomes a real button, which needs a `label`; the types refuse one without it. The button has the hover and focus look of a ghost `IconButton`, it does not take the focus from the input on a mouse click, and a disabled or read-only input disables it. The slots use logical properties, so `start` is on the right in right to left.

```ts
type InputAdornmentIcon = IconName | Exclude<ReactNode, string>;

type InputAdornment =
  | { icon: InputAdornmentIcon; label?: string; onClick?: never } // drawn only; a label names it for a screen reader
  | { icon: InputAdornmentIcon; label: string; onClick: () => void }; // a button

interface TextInputProps {
  start?: InputAdornment;
  end?: InputAdornment;
}

interface NumberInputProps {
  start?: InputAdornment;
  end?: InputAdornment; // before the step buttons
}
```

With `start` or `end` set, `TextInput` draws a `.text-input-frame` span around the input, and `className` goes on that frame; the ref and every other prop still go on the input. With neither, it is the bare input it was. `TextInputProps`, `InputAdornment`, `InputAdornmentAction`, `InputAdornmentMark` and `InputAdornmentIcon` are exported.

```tsx
<TextInput
  type={shown ? 'text' : 'password'}
  start={{ icon: 'lock' }}
  end={{ icon: shown ? 'eye-off' : 'eye', label: shown ? 'Hide password' : 'Show password', onClick: toggle }}
/>
```

`SearchInput` is the search field, built on `TextInput`: a search icon at the start, `type="search"`, and a clear button at the end once there is a query. The clear button and Escape empty the query and keep the focus in the field. A host that handles Escape itself calls `preventDefault` to keep the query, as `CommandPalette` does to close. The placeholder is `common.searchPlaceholder` and the accessible name `common.search` unless the host passes its own or a `Field` labels it; the clear button reads `navigation.clearSearch`. `start` swaps the search icon for another mark.

```ts
interface SearchInputProps extends Omit<TextInputProps, 'type' | 'value' | 'defaultValue' | 'onChange' | 'start' | 'end'> {
  value: string;
  onChange: (value: string) => void; // the query, not the event
  start?: InputAdornment;            // default { icon: 'search' }
}
```

```tsx
const [query, setQuery] = useState('');

<SearchInput value={query} onChange={setQuery} placeholder="Search game presets" />
```

Every search field in Tessera is now a `SearchInput`, with the same behaviour:

| Host | What changed |
|---|---|
| `SideNav` search | the open field is a `SearchInput` with the search mark at the start; the closed nav still shows the mark as a button. `.side-nav__search-input` is on the frame |
| `CommandPalette` | the input row is a `SearchInput`; `.command-palette__input-icon` is gone and `.command-palette__input` is on the frame |
| `FilterBar`, and `LogPanel` through it | the search is a `SearchInput` at sm; `.filter-bar__search` is on the frame |
| `Select` with `searchable` | the search box is a `SearchInput` at sm; `.select-search__input` is on the frame |

The other icons drawn inside an input now come from the same place. The `Combobox` clear button and the `[icon:name]` and `[action:name]` parts of a `DynamicInput` pattern draw through the shared adornment, so their sizes match the control. A `Combobox` filters in its own field and has no separate search box, so it stays as it is.

A host stylesheet that styled one of the classes above as the input now styles the input inside it, for example `.select-search__input > .text-input`. The `.side-nav__search-clear` class is gone; the clear button is the `SearchInput` one.

The `SideNav` chevron now sits level with the first row the nav shows: the search field, the Home item, the first group label when the nav is open, or the first item. The nav carries `side-nav--lead-search`, `side-nav--lead-item` or `side-nav--lead-label` to say which. The search field is as tall as an item, so it lines up closed and open. The nav column has the same space above the first row and below the last: the bottom padding of `.side-nav__groups` drops from md to sm, and the rail no longer adds an extra sm above its first group.

The SearchInput page shows the sizes, the clear button, a disabled field and a list filtered as you type. The TextInput page shows a decorative icon, a password reveal and a copy button at both sizes. The SideNav page shows the chevron beside each kind of first row, closed and open, including a nav with one item.

## 50. PasswordInput is a primitive

`PasswordInput` is the password field, built on `TextInput`. It has an eye button at the end, any mask character, a mono option, a Caps Lock warning, and an optional checklist with a strength meter. Paste always works.

```ts
type PasswordMode = 'current' | 'new';
type PasswordScore = 0 | 1 | 2 | 3 | 4;
type PasswordStrength = false | 'rules' | PasswordScore | ((value: string) => PasswordScore);
type PasswordStrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

interface PasswordRule {
  id: string;
  label: string;
  test: (value: string) => boolean;
}

interface PasswordInputProps extends Omit<TextInputProps, 'type' | 'value' | 'defaultValue' | 'onChange' | 'end'> {
  value: string;
  onChange: (value: string) => void;       // the password, not the event
  mode?: PasswordMode;                     // 'current'; 'new' sets autoComplete="new-password"
  revealed?: boolean;                      // controlled
  defaultRevealed?: boolean;               // false
  onRevealedChange?: (revealed: boolean) => void;
  hideOnBlur?: boolean;                    // false
  maskChar?: string;                       // any character or emoji; leave it out for the browser dots
  monospace?: boolean;                     // false; maskChar turns it on
  capsLockWarning?: boolean;               // true
  rules?: readonly PasswordRule[];
  strength?: PasswordStrength;             // 'rules' in new mode with rules, false otherwise
}
```

```tsx
const RULES = [
  { id: 'length', label: 'At least 12 characters', test: (value: string) => value.length >= 12 },
  { id: 'number', label: 'At least one number', test: (value: string) => /\d/.test(value) },
];

<Field label="Password">
  <PasswordInput mode="new" rules={RULES} value={password} onChange={setPassword} />
</Field>
```

What it does:

| Part | Behaviour |
|---|---|
| Eye button | named `password.showPassword` with `aria-pressed`; a mouse click keeps the focus and the selection in the field, and the keyboard keeps the focus on the button. `hideOnBlur` hides the password once the focus leaves the field and its button. A shown password hides again when its form submits, so the browser offers to save it as a password |
| Attributes | `autoComplete` is `current-password`, or `new-password` in new mode; `spellCheck={false}`, `autoCapitalize="off"` and `autoCorrect="off"`. Each can be overridden. The name is `password.password` unless the host passes its own or a `Field` labels it |
| `maskChar` | draws the given character in place of the dots. The real `type="password"` input stays underneath with transparent text and a visible caret, so password managers, autofill and the mobile password keyboard work as before. Both use the mono font, and each mask cell is as wide as the dot the browser draws, so the caret lines up. A character wider than one mono cell, such as `✱` or an emoji, gets two or three cells, with the same spacing added to the input. The mask follows the field when the password is longer than the field |
| Copy and cut | the browser blocks both while the password is hidden; shown, they work |
| Caps Lock | while the field has focus, a warning shows under it and a polite live region reads `password.capsLockOn` |
| `rules` | a checklist under the field, linked with `aria-describedby`, each item ticked as its rule is met |
| `strength` | a meter of four bars with Weak, Fair, Good or Strong. `'rules'` scores from the share of rules met; a number or a function is the host score, such as one from zxcvbn. Tessera bundles no strength library |
| Announcements | a rule that flips and a new strength word are read in a polite live region once typing pauses for a second, never on each key |

`mode="new"` shows the meter by default only when the host gives rules: Tessera does not know the password policy, so it ships no rules of its own.

The mask has these limits. While the browser shows an autofilled value it has not handed to the page, the field shows the browser dots. Chrome and Safari draw one dot per character as the reader sees it, and Firefox one per UTF-16 unit; the mask counts the same way the browser does, found once per page. On Android and iOS the browser shows the last letter typed for a moment, in its own width, so the caret can sit off by part of a cell until it hides. Right to left works: the mask starts at the right and follows the scroll.

`InputAdornmentAction` takes `pressed`, which sets `aria-pressed` on the button for a toggle such as the eye.

The `password` group joins the string table: `password`, `showPassword`, `capsLockOn`, `strength`, `weak`, `fair`, `good`, `strong`, `requirements`, `met`, `notMet`, `ruleState(label, state)` and `strengthIs(level)`. The icon set gains `arrow-big-up-dash` for Caps Lock and `circle` for a rule not met yet.

The TextInput page no longer builds its own password reveal; its icon examples are a decorative icon, a copy button and both ends, and its description sends passwords to `PasswordInput`. The room password on the Field page is a `PasswordInput`.

The PasswordInput page shows the field hidden and shown, the browser dots beside five mask characters, the mono font on a key, the Caps Lock warning with how to try it, a sign-up form with the checklist and the meter, a score from the host, the sizes, the states, the field in a `Field`, and the field beside another input in one `Field` with a `FieldControlBoundary`.

## 52. Screens come in layers: ScreenLayer, ScreenWindow and four screen kinds

`FullScreenLayer` is split in two building blocks, and four screen kinds are built on them. `SettingsShell` is removed: `NavLayout` takes its filter, and `WorkspaceScreen` replaces it as the frame of a settings hub.

| Layer | Name | What it is |
|---|---|---|
| base | `ScreenLayer` | the overlay, the gap from section 45, the empty card and the floating slot; a building block |
| window | `ScreenWindow` | a `ScreenLayer` with a title, a close button and an empty container; a building block |
| kind | `WorkspaceScreen` | a side list of pages beside the current `SettingsPage`, for a settings hub, a profile hub or a data manager |
| kind | `InfoScreen` | wide margins and one centred column, for About and credits |
| kind | `UtilityScreen` | a compact window with a status, optional progress and details, and an action row, for an update check |
| kind | `StageScreen` | one open stage with an optional toolbar and Done, for calibration or a HUD editor |

App code shows a screen through one of the four kinds. `ScreenWindow` is for a screen none of them fits, and `ScreenLayer` only for building a new kind.

### FullScreenLayer

| Before | After |
|---|---|
| `FullScreenLayer` | `ScreenWindow`, with the same `title`, `subtitle`, `extra`, `floating`, `hidden` and `onClose`; `title` is now required |
| the overlay and the card alone | `ScreenLayer`, which has no title and no padding |
| `.fullscreen-layer` | `.screen-layer` |
| `.fullscreen-layer__inset`, `__frame`, `__card`, `__floating` | `.screen-layer__inset`, `__frame`, `__card`, `__floating` |
| `.fullscreen-layer--hidden` | `.screen-layer--hidden` |
| `.fullscreen-layer__header` | `.screen-window__header` |
| `.fullscreen-layer__content` | `.screen-window__content` |
| the container name `fullscreen-layer` | `screen-layer` |
| `src/composites/FullScreenLayer` | `src/composites/ScreenLayer` and `src/composites/ScreenWindow` |
| gallery page Composites · Screens/FullScreenLayer | Composites · Screens/ScreenLayer and Composites · Screens/ScreenWindow |

The padding inside the window is now the same on all four sides. The title bar had an md by xl padding and the content had none on top, xl at the sides and lg at the bottom; a new `.screen-window` box inside the card now has an xl padding on every side, or md when the card fills a tiny room or a phone, and an lg gap between the title bar and the content. The content of a full window sits a little further in from the top and the bottom than before.

Under 480 px wide or 440 px high, the floating switch moves inside the card, and the card itself now takes the room above its content, so every kind clears the switch, not only the title bar.

`ScreenLayer` takes `size`: `fill`, the default, takes the room inside the gap; `compact` fits the card to its content, up to `--dialog-w-md` wide. `ScreenWindow` passes `size` through, and `UtilityScreen` uses `compact`. A `ScreenLayer` names its dialog with `label` or `labelledBy`.

### SettingsShell

`SettingsShell` and `SettingsShellProps` are removed. Its parts move:

| Before | After |
|---|---|
| `SettingsShell` as the frame of a settings screen | `WorkspaceScreen`, with the page header from `page` and the body as children |
| `SettingsShell` inside a page | `NavLayout` |
| `filterable`, `filterPlaceholder` | the same props on `NavLayout` and `WorkspaceScreen` |
| `header` | the `title` of the `WorkspaceScreen`, or a heading the host places above the `NavLayout` |
| the glass panel around the children | the `SettingsPage` card |
| `.settings-shell`, `.settings-shell__header`, `.settings-shell__body`, `.settings-shell__content` | `.nav-layout` and its pane; the shell classes are gone |
| gallery page Composites · Navigation/SettingsShell | the A filter over the nav example on Composites · Navigation/NavLayout |

`NavLayout` with `filterable` keeps the query and narrows the nav items by label, hiding a group with no match, as the shell did. A nav that passes its own `search` keeps it, and the filter steps aside.

### The screen kinds

```tsx
<WorkspaceScreen
  title="Home"
  subtitle={profile.name}
  floating={<WorkspaceSwitch />}
  onClose={close}
  nav={{ config: HUB_NAV, activeId: tab, onSelect: setTab, defaultOpen: true }}
  page={{ icon: <Icon name="settings" />, title: 'General', anchors: GENERAL_ANCHORS }}
>
  <SettingsGroupList sections={generalSections} />
</WorkspaceScreen>

<InfoScreen title="About" onClose={close} footer={LEGAL}>
  <AboutPanel title="Relic of the Past" brand="rotp" rows={rows} copyText={debugInfo} />
</InfoScreen>

<UtilityScreen
  title="Check for updates"
  onClose={close}
  status={{ tone: 'info', title: 'Version 0.10.0 is ready', message: 'You have 0.9.2.' }}
  progress={downloading ? { value: percent, label: 'Downloaded' } : undefined}
  actions={[{ label: 'Later', variant: 'ghost', onClick: close }, { label: 'Install', variant: 'primary', onClick: install }]}
>
  <ReleaseNotesPanel>{notes}</ReleaseNotesPanel>
</UtilityScreen>

<StageScreen title="Input calibration" onClose={close} toolbar={<RescanButton />} done={{ onClick: close }}>
  <CalibrationPanel {...step} />
</StageScreen>
```

`WorkspaceScreen` holds a `NavLayout` with `paneScroll="none"` and a `SettingsPage`; `page` takes every `SettingsPage` prop but the children. `UtilityScreen` status tones are `busy`, which shows a spinner, and `info`, `success`, `warning` and `danger`, which show their icon; the status is a polite live region. `StageScreen` reads Done from the strings unless `done.label` is set.

`AboutPanel`, `ReleaseNotesPanel` and `CalibrationPanel` keep their props. The gallery shows them inside their kinds: `AboutPanel` in `InfoScreen`, `ReleaseNotesPanel` in `UtilityScreen`, `CalibrationPanel` in `StageScreen`.

The decision tree gains a full screen view, which picks between the four kinds; the leaves a layer over the whole window and the frame around the sections are gone. Each new part has a usage file, and `ScreenLayer` and `ScreenWindow` are marked as building blocks.

### rotp

rotp's `PageRouter` wraps each page in `FullScreenLayer`. Replay `RENAMES.json`, which maps `FullScreenLayer` to `ScreenWindow`, then move each page onto its kind: the profile hub and the data manager onto `WorkspaceScreen`, About and Credits onto `InfoScreen`, the update dialog onto `UtilityScreen`, and Input Calibration onto `StageScreen`. `DesignGallery`, which used `SettingsShell`, moves onto `WorkspaceScreen` with `filterable`.

## 53. App parts follow the usage rules: tessera check, tessera guide and the app tree

The usage file of an app part now goes through the same checks as a Tessera part. `tessera check`, or `brock tessera check` in a Brock app, checks every part in the `parts` folders of `tessera.config.json`, the views of each `apps` entry included:

| Check | What it wants |
|---|---|
| fields | every field filled, `job` on one line, a `tree` or `buildingBlock: true` |
| placeholders | no field still holds a sentence `tessera new` wrote |
| alternatives | each `avoidWhen.use` names a Tessera export or a part of the app |
| tree | each `tree.path` ends on an answer of the Tessera tree or the app tree, and each answer the app tree adds has a part |
| examples | each `example` type-checks against the app |
| props | `propsHash` matches the props in the code; the finding gives the new hash |

`guide.usage` decides what a finding does. `report`, the default, lists every finding and exits 0. `enforce` exits 1 on any finding. `tessera guide` runs the same check, then writes the app guide to `guide.out`, `guide/` by default, with links to the Tessera guide in `node_modules`.

The standards extension runs the same checks on the parts of each package it checks. In `report` mode they print as notes, so an app on report mode sees no new finding; in `enforce` mode each one is a finding. A missing usage file follows the same mode: a note in `report`, a finding in `enforce`.

### The app tree

`guide.tree` names a module that exports `APP_TREE`, the branches the app adds to the Tessera decision tree. Each branch has `at`, the answers that lead to a Tessera question, and `answers`, the new answers to it. Type it with `AppTree`, and add the app part names and the tree to `TesseraApps` by declaration merging so `ComponentUsage` takes them:

```ts
import type { AppTree } from '@drizztdourden08/tessera';

const APP_TREE = [
  { at: [], answers: { 'a saved game': { question: 'What about the save?', answers: { 'one save': null } } } },
] as const satisfies AppTree;

declare module '@drizztdourden08/tessera' {
  interface TesseraApps {
    archipelia: { parts: 'SaveSlot' | 'SaveList'; tree: typeof APP_TREE };
  }
}

export { APP_TREE };
```

Usage files keep `satisfies ComponentUsage`. The module imports types only, like a usage file: the check runs both without the app bundler.

### What an app does

1. Make sure `typescript` is installed in the app or at the repo root. The check reads the props and the examples with it, through the nearest `tsconfig.json` above each part or the one `guide.tsconfig` names.
2. Run `brock tessera check` and fix what it lists: replace the sentences `tessera new` left, set each `propsHash` it gives, and point every alternative at a real part.
3. Give the app answers a home: add the `guide.tree` module above when the app parts need questions of their own. A part that sits on a Tessera answer needs no tree module.
4. Add `guide/` to what the app commits, or ignore it, then run `brock tessera guide`.
5. Switch `guide.usage` to `enforce` once the check is clean.

`tessera new` now names `tessera check` in its next steps, and `--tree` and its tree prompt take the app answers. The example of a shared part imports from the package name; the example of a view imports `../<Name>`, as before.

In Tessera, `pnpm guide` and `pnpm guide --check` print and write the same as before. They read the usage files and the tree with TypeScript instead of Vite, so a usage file imports types only.

## 54. Tessera's tooling moves to @drizztdourden08/standards

Tessera now lints and checks itself with `@drizztdourden08/standards` in place of `@drizztdourden08/brock-build` and `@drizztdourden08/brock-lint-config`. The rules keep their names. `standards prose`, `standards structure --check` and `standards sync --check` replace the Brock commands, and the root `standards.config.mjs` takes the `design-system` preset and Tessera's own extension. CI runs the reusable workflow of the standards repo.

The usage file check of Tessera's extension now follows `guide.usage` for a missing file as well: in `report` mode a part without `Name.usage.ts` prints as a note and the check passes, in `enforce` mode it is a finding. Before, a missing file was a finding in both modes.

### What an app does

Nothing beyond installing Tessera. An app on `@drizztdourden08/standards` discovers the extension from its dependencies, so it lists no extension and names no primitives folder: the extension reads `parts.primitives` from `tessera.config.json`. An app that still passes `primitivesGlobs` for that folder can drop it. A Brock app keeps `brock-lint-config` and `brock-build`, which sit on standards.

## 55. InlineCreateForm and RecordEditor take a size; RecordEditor rows get padding

`InlineCreateForm` takes `size`, `md` or `sm`, like any control. Without it the form follows the size of the `Field` around it, else `md`. `compact` now only sets the layout: one line, unboxed. Before, `compact` forced `sm`. The name field, the controls in `extraFields` and the buttons all follow the size: the Create and Cancel buttons in the boxed form, and the icon buttons in the compact form, which match the height of the field. The error line uses the dense font of the size.

An app that relies on the small compact form passes `size="sm"`:

```tsx
<InlineCreateForm
  compact
  size="sm"
  label="New folder name"
  placeholder="New folder"
  submitLabel="Create folder"
  onCreate={createFolder}
  error={error}
/>
```

`RecordEditor` takes `size` too, with the same rule, and passes it to every field. Each row of the editor now has `--space-sm` of padding on every side, so the label and the control stay clear of the edges of a row marked by a background or a border, at both sizes and with fields that wrap over several lines. The gap between rows drops from `--space-sm` to `--space-xs` to keep the editor compact. `CreateRecordDialog` builds its rows the same way and gets the same padding. An app that styled `.record-editor__row` with its own padding can drop it.

## 56. Icon takes an effect; SearchSpark is removed

`Icon` takes `effect`: a small pop that lands every few seconds on a random point of the drawn shape. The point is sampled from the painted paths, circles, lines, polylines, polygons and rects of the icon, so a pop never lands in empty space. `Icon.Brand` takes it too.

```tsx
<Icon name="search" effect="twinkle" />
<Icon name="settings" effect={{ kind: 'ping', every: 2000, jitter: 400, color: 'secondary', count: 2 }} />
```

| Kind | The pop |
|---|---|
| `twinkle` | a four point star that grows, turns and fades, the old SearchSpark star |
| `glint` | a short bright streak that sweeps across the point |
| `ping` | a ring that grows and fades |
| `burst` | eight tiny rays that fly out |
| `dot` | a dot that pops and fades |
| `shimmer` | a bright dash that runs along the stroke from the point |

`every` is the time between pops in milliseconds, 3500 by default. `jitter` adds or takes up to that many milliseconds at random, a quarter of `every` by default, so icons on one screen never pop in step. `color` is `primary` by default and takes `current`, `secondary`, `tertiary`, `success`, `warning`, `danger` or `info`; each draws in its bright token. `count` pops on that many points at once. The pop length is the new `--duration-icon-pop` token.

The icon keeps its size: the pops draw in a layer laid over the icon, and the icon sits in a `span.icon-effect` of exactly its size. The layer is hidden from assistive tech, and the label of the icon stays as it was. The pops pause while the icon is off screen or the tab is hidden, and never show under reduced motion. A selector that reaches the svg through a direct child combinator, such as `.my-slot > svg`, now meets the `span` first when the icon has an effect.

`SearchSpark` is removed: it was a search glass with a star. Draw it with the search icon, the effect and the new `search-glass` class, which carries the colour and the soft glow:

```tsx
<Icon name="search" size={40} effect="twinkle" className="search-glass" />
```

`SearchSparkProps` goes with it: `size` and `className` are the same props on `Icon`. `SEARCH_ICON_PATHS` is removed; the glass is the `search` icon of the named set. `.search-spark` becomes `.search-glass`, and `.search-spark__star` is gone. `SideNav` search and the idle icon of `SearchResults` now draw this icon.

### What an app does

Replace each `<SearchSpark size={n} />` with `<Icon name="search" size={n} effect="twinkle" className="search-glass" />`, and rename `.search-spark` to `.search-glass` in its styles. Drop any style aimed at `.search-spark__star`.

## 57. Drawer has a header, a padded body and an actions row; DynamicInput popups use the standard look

`Drawer` takes `title`, `subtitle` and `actions`. A title or a subtitle draws a `WindowHeader` at the top of the panel with a close button that calls `onClose`. The children go in a body that pads them by `--space-lg` on every side, stacks them with a `--space-md` gap and scrolls when they run long. `actions` sit in a `ButtonRow` at the bottom, aligned to the end. The header and the actions row are padded by `--space-md` and `--space-lg` and ruled off from the body. Without a `label`, the title names the dialog for screen readers.

```tsx
<Drawer
  open={open}
  onClose={close}
  title="Filters"
  subtitle="2 of 3 statuses"
  actions={<Button variant="primary" onClick={close}>Show results</Button>}
>
  <Checkbox label="Open" checked={showOpen} onChange={setShowOpen} />
</Drawer>
```

The popups of `DynamicInput` now show the standard parts in their own look. The Stepper keeps its own width in place of stretching across the popup, and every popup shares one frame: the surface and border of the `ColorPicker` card, `--space-md` of padding, a `Text` subtitle as the title and a `--space-sm` gap. The option list runs to the edges of the frame under its title. A selected slot no longer shows the browser's blue selection box: the selection draws in `--c-selected` and the text keeps `--c-text`. The class names `dynamic-input__panel-body` and `dynamic-input__panel-title` are gone; the sections are `dynamic-input__section`.

### What an app does

An app that put a `WindowHeader` inside a `Drawer` passes its `title`, `subtitle` and close handler to the `Drawer` instead, moves its buttons to `actions`, and drops the padding it gave the content. An app that styled `.dynamic-input__panel-title` or `.dynamic-input__panel-body` drops those styles.

## 58. Stepper is now NumberStepper

The number field with a minus and a plus button is renamed `NumberStepper`, and its props type `NumberStepperProps`. Its props and look are unchanged. The name `Stepper` goes to the step progress indicator of a wizard in a later release, so this rename ships on its own first.

The class names move with it: `stepper` is `number-stepper`, `stepper__field` is `number-stepper__field`, `stepper__btn` is `number-stepper__btn` and `stepper--disabled` is `number-stepper--disabled`. The custom properties `--stepper-button-w` and `--stepper-field-w` are `--number-stepper-button-w` and `--number-stepper-field-w`.

```tsx
import { NumberStepper } from '@drizztdourden08/tessera';

<NumberStepper value={players} onChange={setPlayers} min={1} max={20} ariaLabel="Players in the session" />
```

### What an app does

An app renames `Stepper` to `NumberStepper` and `StepperProps` to `NumberStepperProps`, and renames the classes and custom properties above in its own styles. Every rename here is in RENAMES.json. The `stepper` keyword in a `DynamicInput` pattern keeps its name.

## 59. Emphasis is a text primitive; the gallery regroups the composites

`Emphasis`, the word that swells along the weight axis, moves from the composites to the primitives, beside the text elements. Its props, class names and look are unchanged. The package root still exports it. Its gallery page is Core · Text, Emphasis animation, next to the `Emphasis` element (`<em>`).

```tsx
import { Emphasis } from '@drizztdourden08/tessera';

<Emphasis trigger="hover" from={400} to={800}>Triforce</Emphasis>
```

The gallery groups change too. Composites · Navigation keeps only navigation. Layout holds `SplitPane`, `MasterDetailLayout` and `NavLayout`; Lists holds `ListItemRow`, `GroupTree` and `SearchResults`; Settings holds `SettingsPage`, `SettingsSection` and `SettingsGroupList`; Windows holds `WindowTitleBar` and `WindowHeader`. `ColorPicker` and `ColorPickerPopover` move to Inputs, `KeyboardLayout` and `ShortcutTour` to Input devices, and `Hero` to Content. No component name or import changes with them.

### What an app does

An app that imports `Emphasis` or its types from `@drizztdourden08/tessera/composites` imports them from the package root or from `@drizztdourden08/tessera/primitives`. No name changes, so RENAMES.json has no entry for this section.

## 60. WindowTitleBar centres its brand on the whole bar; WindowHeader keeps one row; Hero keeps its size; UtilityScreen takes settings and a footnote

`WindowTitleBar` puts its brand, the logos with the title and the instance pill, in the centre of the whole bar, not in the space left between the start slots and the window buttons. When the brand would run into either end, the title and the pill hide and the logo stays alone in the centre; when even the logo has no room, the centre stays empty. The bar measures this itself as it resizes. The hidden brand keeps its place for screen readers under the class `window-title-bar__brand--away`, and the lone logo is `window-title-bar__brand--mark`. The brand no longer grows with `flex: 1` and adds nothing to the width of the bar; the window buttons sit at the end through `margin-inline-start: auto`.

`WindowHeader` stays on one row at any width. As room runs out, the subtitle shortens with an ellipsis, then the `extra` content hides as a whole under the class `window-header__extra--away`, then the title shortens. The close button always stays. `extra` is a row that never wraps, with a `--space-sm` gap, so its children sit side by side.

`Hero` has a fixed height, `--hero-h`, now 408 pixels, and fills the width of its container. What it holds no longer changes its size: the eyebrow and the title stay on one line and shorten with an ellipsis.

`UtilityScreen` takes two new props. `settings` holds the choices that shape the task, such as an Include pre-releases toggle and a version picker; it sits under the status and the progress, above the details, and scrolls with them. `footnote` draws a footnote `Callout` above the row of actions that stays in view, with its `action` at the end, such as a button to report an issue. Its type is `UtilityScreenFootnote`.

```tsx
<UtilityScreen
  title="Check for updates"
  onClose={close}
  status={{ tone: 'info', title: 'Version 0.10.0 is ready', message: 'You have 0.9.2.' }}
  settings={<>
    <Toggle label="Include pre-releases" checked={prereleases} onChange={setPrereleases} />
    <Field label="Version to install"><Select value={version} onChange={setVersion} groups={versions} /></Field>
  </>}
  footnote={{ text: 'Please report anything that stops working.', action: <Button size="sm" variant="secondary">Report an issue</Button> }}
  actions={[{ label: 'Install', variant: 'primary', onClick: install }]}
/>
```

`StageScreen` does not change. Its gallery example is built from the standard parts: `CalibrationPanel`, `StickPlot`, `ProgressBar`, `StatRow`, `Slider` and `PressedGrid`.

### What an app does

An app that puts a `WindowTitleBar` in a box that shrinks to its content gives that box its full width, since the brand no longer widens the bar. An app that sized a `Hero` with its own height or relied on it growing with its content gives it the room of `--hero-h`. An app that wrapped the `extra` of a `WindowHeader` in a column of its own passes the parts side by side. An app with its own pre-release toggle, version picker or report button in the children of a `UtilityScreen` moves them to `settings` and `footnote`. No name changes, so RENAMES.json has no entry for this section.

## 61. Settings come from one model: SettingsRow, one SettingsSection, WorkspaceScreen builds itself, SideNavLayout, and the search result parts

### The settings model

A setting is data. `SettingsItem` holds its `id`, `title`, `description`, `hint`, `keywords`, `disabled`, `lock` and its `input`: a `kind` with the value, `onChange` and the props of that kind. The kinds are `toggle`, `select`, `segmented`, `radio`, `multi`, `slider`, `number`, `text`, `password`, `dynamic` (a `DynamicInput` pattern), `color`, `keybind`, `tags` and `custom`. Options are `SettingsOption`: `{ value, label, hint? }`. A section is `SettingsSectionData`: `{ id, title?, description?, keywords?, rows?, groups?, changedCount?, onReset? }`, and a group is `SettingsGroupData`: `{ id?, title?, description?, rows }`. A row in a section is a `SettingsItem`, or a `SettingsContentRow`, `{ id, content, title?, keywords?, lock? }`, for anything else.

### SettingsRow is new

`SettingsRow` draws one `SettingsItem`: the title, the description, a live hint line and the input on the right.

- The hint line says what the current value does and, while the pointer or the keyboard is on one part of the input, what that part does. `SettingsOption.hint`, the `hints` of a toggle (`{ on, off }`) and the `hintOf(value)` of a slider feed it; `hint` on the row is the line at rest.
- `compact` draws one line with small inputs. The description moves to a tooltip on the title, marked with an info icon, and the hint to a bubble under the input.
- `readOnly` draws the value as text: On or Off, the option label, the slider value as `formatValue` writes it, the number with its unit, the masked password, the pattern text, a swatch with its code, keycaps, tags.
- Every row carries `data-setting-key` and `data-kind`; `flash` pulses it with `search-hit`.
- New strings: the `settings` group (`on`, `off`, `none`, `notSet`, `pressKeys`, `changeShortcut`, `pickColour`, `aboutSetting`, `searchPlaceholder`, `searchIdle`, `searchTip`, `settingsMatch`, `noSettingMatches`).

### SettingsGroupList is folded into SettingsSection

One `SettingsSection` is one section of a page, drawn the way relic-of-the-past draws it: the large underlined title with the reset button that asks once, then groups with their small uppercase title, each a sunken box (`--c-inset`, a hairline border) with a divider between rows. Rows next to each other that share a `lock` run under one `DisabledOverlay`, or under `renderLock`. Its props are the section data plus `flash`, `renderLock`, `compact`, `readOnly`, `children` and `className`. Sections placed one after another keep their own distance.

- `SettingsGroupList` is removed. Render one `SettingsSection` per section, `sections.map((section) => <SettingsSection key={section.id} {...section} />)`, and draw your own empty message.
- `SettingsSectionRow` takes `id` in place of `key`. `anchor` is `id`, `flashKey` is `flash`, and `inset` is gone: the sunken box is the only look. `SettingsSectionLock` is `SettingsLock` and `SettingsSectionLockRenderer` is `SettingsLockRenderer`.
- `filterSettingsSections(sections, query)` keeps the rows that match by title, description, hint, keywords and option labels; a section or group whose title matches keeps all its rows.

### WorkspaceScreen builds itself from content

`WorkspaceScreen` takes `content`, a `WorkspaceContent`: `{ home?, groups: [{ id, label?, pages }] }`. A `WorkspacePage` is `{ id, title, icon?, description?, keywords?, sections?, content?, tabs?, actions?, backdrop?, scroll? }`. From it the screen builds the side nav, the page header with a pill per section, the sections, and the search.

- The page header is a `SettingsPage`: the glowing icon and the title over a backdrop that fades out behind them, compacting from 64 to 40 pixels once the page scrolls. `pageHeader={false}` drops it; `backdrop` replaces the default art, and `null` drops the art.
- The search in the side nav runs over every row of every page. While it runs, the pane shows `SearchResults`: a group per page with its matching rows and their real inputs, a chip for every page whose name matches, and Open page, which opens the page and flashes its first match. `search` takes `placeholder`, `query` with `onQueryChange`, `idleMessage` and `emptyMessage`; `search={false}` turns it off.
- `activeId`, `defaultActiveId` and `onActiveChange` set the current page; otherwise the screen keeps it.
- `compactRows`, `readOnly` and `renderLock` reach every row.
- Removed props: `nav`, `page`, `children`, `results`, `filterable` and `filterPlaceholder`; `compact` is `narrow`. `WorkspaceScreenPage` is removed. New types: `WorkspaceContent`, `WorkspaceGroup`, `WorkspacePage`, `WorkspaceSearch`.

### NavLayout is SideNavLayout

The name says what it is: a side nav beside a content pane. `NavLayoutProps` is `SideNavLayoutProps`, `NavLayoutPaneScroll` is `SideNavLayoutPaneScroll`, `compact` is `narrow`, and the classes are `side-nav-layout`, `side-nav-layout__pane` and `side-nav-layout--narrow`. `filterable` and `filterPlaceholder` are removed: the search in the nav never narrows the menu. The host searches the content of every page with the query and passes the matches as `results`, which the pane shows.

### The search result parts

- `SearchResultGroup` is new: the glowing icon, the title, a count pill and an Open page button (`onOpen`, `openLabel`), then any content. It carries `data-group`.
- `SearchResultHit` is new: an icon, the label and the description with the query marked, and the path, its steps joined by chevrons. The whole row is one button.
- `SearchResults` draws its groups and hits with them, always on the page card. `framed` and `groupHeading` are removed, with `SearchResultsGroupHeading`. `SearchResultsHit` takes `path` (a list of names), `description` and `icon`; `detail` is gone. The classes move with the parts: `search-results__group` is `search-result-group`, `search-results__open` is `search-result-group__open`, `search-results__hit` is `search-result-hit`.

### What an app does

Replay RENAMES.json. Then, in Brock:

- `Hub` and `SettingsHub` import `SideNavLayout` in place of `NavLayout`; the props they pass keep their names.
- `SettingsLayout` renders one `SettingsSection` per section in place of `SettingsGroupList`, with its own empty message; `group-list-sections.ts` returns `SettingsSectionData[]` and builds rows as `{ id: item.key, content, lock }`.
- `hub-result-groups.ts` builds a hit as `{ id, label, path: tail, description: entry.description }` in place of `detail`.
- `HubSearchResults` drops `framed`.
- The review selector for the open button of a group is `.search-result-group__open`.
- `DisplaySettingsTab` keeps `SettingsSection` with children; its title now draws as the large section heading.

```tsx
<SettingsSection
  id="output"
  title="Output"
  rows={[
    { id: 'volume', title: 'Master volume', input: { kind: 'slider', value: volume, onChange: setVolume, min: 0, max: 100 } },
    {
      id: 'channels',
      title: 'Channels',
      input: { kind: 'segmented', value: channels, onChange: setChannels, options: [
        { value: '1', label: 'Mono', hint: 'Folds the output to one channel.' },
        { value: '2', label: 'Stereo', hint: 'Keeps left and right apart.' },
      ] },
    },
  ]}
/>
```

## 62. WizardProgress is the Stepper primitive; the step definition drives the wizard; WizardDialog; ButtonRow has a bar

`WizardProgress` is now the primitive `Stepper`, with `StepperProps`, `StepperStep`, `StepperSubStep`, `StepperStatus` and `StepperOrientation` in place of `WizardProgressProps`, `WizardProgressStep`, `WizardSubStep`, `WizardStepState` and `WizardOrientation`. Its props are the same. A step takes `error` to show that it needs attention. Summaries and sub-steps now show in both orientations: in a horizontal Stepper the sub-steps stack under the line that follows their step. The lines meet the circles exactly in both orientations, and sub-steps never break them.

Each step forward plays one sequence: the circle fills from the side its line leaves, the line runs to the next circle, the colour reaches that circle where the line meets it and spreads both ways round its border until the ends meet, then the current circle breathes. Done and current circles glow. A jump over several steps plays the sequence once per step. The new tokens `--duration-step-ring` and `--duration-step-breathe` time the last two parts. The class names move from `wizard-progress`, `wizard-dot` and `wizard-sub-steps` to `stepper`, `stepper-dot` and `stepper-sub-steps`, and the strings `steps`, `stepOf`, `stepName`, `stepDone`, `sections` and `changedCount` move from the `wizard` group to a new `stepper` group, which adds `stepError`.

The step definition now drives the whole wizard. `WizardStepDef` takes:

- `summary(values)` and `subSteps`, an array or a function of the values, for the Stepper;
- `hint`, a string or a function of the values, shown in the action bar when the step is valid;
- `busyHint`, shown while the finish runs;
- `extra(wizard)`, something of the step's own in the action bar;
- `buttons`, which changes the `label` or the `icon` of `cancel`, `back` and `next` on that step, each on its own. `false` drops Back or Cancel, and `icon: null` drops an icon. On the last step `next` is the finish button.

So `WizardFrame` drops `stepInfo`, `finishLabel`, `busyLabel` and `navExtra`, and `WizardNav` drops `cancelLabel`, `backLabel`, `nextLabel` and `finishLabel` for `buttons`, and renames `busyLabel` to `busyHint`. WizardNav generates Back with an arrow on its left and Next with an arrow on its right, both the same size, and the finish button with a check. It is a `ButtonRow` with the new `variant="bar"`: the dark action bar, padded and ruled off. `ButtonRow` also takes `lead`, content at the start of the row, and every button in a ButtonRow is now the same height. The step content fades out while its circle fills and fades in while the line runs.

`WizardFrame` drops `presentation` and `open`: the dialog form is the new `WizardDialog`, which puts the same wizard under the standard dialog header.

```tsx
const STEPS: readonly WizardStepDef<Draft>[] = [
  { id: 'basics', label: 'Basics', validate: nameProblem, summary: (d) => d.name },
  { id: 'options', label: 'Options', subSteps: (d) => optionTabs(d) },
  { id: 'review', label: 'Review', busyHint: 'Generating seed...', buttons: { next: { label: 'Create profile', icon: 'plus' } } },
];

<WizardDialog wizard={wizard} open={open} title="New profile" onExit={close}>
  <ProfileStep wizard={wizard} />
</WizardDialog>
```

### What an app does

An app renames `WizardProgress` and its types and classes as RENAMES.json lists. It moves `stepInfo` into `summary` and `subSteps` on each step, `finishLabel` into `buttons.next.label` and `busyLabel` into `busyHint` on the last step, and `navExtra` into `extra` on the step that shows it. A `WizardFrame` with `presentation="dialog"` becomes a `WizardDialog` with the same props and `open`. An app that overrides the wizard strings for the step strip moves them to the `stepper` group.

## 63. DropdownMenu draws its own trigger and joins its sub-menus; CommandPalette takes a mascot

The look of the hamburger menu is now the look of every `DropdownMenu`. `trigger` no longer takes `'hamburger'`: it takes the button to draw, and the menu draws it. `iconOnly` draws an `IconButton`, the hamburger unless `icon` names another icon; without it the trigger is a `Button` with the label and an optional icon on either side. The trigger takes the variant of the menu, and the open menu joins it at every size, the coloured edge running on around the menu with a rounded notch where the button meets it.

- `variant` takes the `Button` variants and colours both the trigger and the edge. It defaults to `primary`.
- `intensity` sets how strong the edge is: `strong`, the default, adds the halo; `medium` keeps the coloured edge alone; `subtle` uses the plain border.
- `size` is `sm` or `md`, and `disabled` turns the trigger off.
- A click outside, Escape, or scrolling the trigger out of view closes the menu. A menu hung from `anchorRef` now does this itself as well, and takes `variant` and `intensity` too.

Inside the menu, labels line up whether or not an item has an icon, and every shortcut sits in one column at the right edge; a subtitle runs under the shortcut column and does not move it. `kind: 'radio'` makes an item a radio, and `checked` alone still makes a check; both marks now sit at the start of the row, in a column that only appears when the menu has one. Each run of radio items is its own group. A sub-menu joins the edge of the menu it comes from: the edge between them opens, and each corner where the two edges meet is rounded. `filter` adds a search field above the items that searches every level, sub-menus included, and lists the results in the same menu with the path of each one; `filterPlaceholder` replaces its hint.

```tsx
import { DropdownMenu } from '@drizztdourden08/tessera';

<DropdownMenu trigger={{ label: 'Menu', iconOnly: true }} groups={groups} />
<DropdownMenu
  trigger={{ label: 'View', icon: 'chevron-down', iconSide: 'end' }}
  variant="secondary"
  intensity="medium"
  filter
  groups={[{ id: 'sort', label: 'Sort by', items: [{ id: 'name', label: 'Name', kind: 'radio', checked: sort === 'name', onSelect: () => setSort('name') }] }]}
/>
```

The class names follow: `menu-button` is `dropdown-trigger`, `menu-button__drop` is `dropdown-drop`, and `dropdown__check` is `dropdown__mark`. `dropdown__text` is removed: the label and the subtitle sit straight in the item.

`ChosenMascot` is a new brand component that picks among the mascots. `mascot` names one, or `auto`, the default, takes the mascot of `brand`, then of the palette the page shows through `data-palette`, then the first mascot there is. It takes the `AnimatedMascot` props for the animation. `CommandPalette` takes `mascot` with the same values: a small mascot sits at the start of the field, looks around while the field is empty, and asks the user what they are looking for, which is the placeholder unless `placeholder` is given.

```tsx
import { ChosenMascot, CommandPalette } from '@drizztdourden08/tessera';

<ChosenMascot mascot="auto" animation="scan" />
<CommandPalette open={open} onClose={close} query={query} onQueryChange={setQuery} groups={groups} onSelect={run} mascot="auto" />
```

### What an app does

An app replaces `trigger="hamburger"` with `trigger={{ label: 'Menu', iconOnly: true }}`; the label names the menu unless `label` is given. It renames the classes above in its own styles. A menu hung from `anchorRef` now has the coloured edge; an app that wants the old plain look passes `intensity="subtle"`. Every rename here is in RENAMES.json.

## 64. InputIcon, thinner icon effects with sizes and a comet, PressedGrid glyphs, the pop-out point and the options gear

`InputIcon` is a new primitive: a button prompt for a controller or a keyboard. It draws through `Icon`, so it takes the same `size`, `rotate`, `flip`, `inline`, `label` and `effect`, and draws in `currentColor`.

```tsx
<InputIcon family="xbox" name="a" />
<InputIcon family="playstation" name="l2" size={24} />
<InputIcon family="switch" name="dpad-up" tone="theme" />
<InputIcon family="keyboard" name="space-icon" label="Space" />
```

| Family | What it holds |
|---|---|
| `xbox` | face buttons, `lb` `rb` `lt` `rt`, `ls` `rs`, `menu` `view` `share` `guide`, the d-pad, both sticks in every direction, the controller |
| `playstation` | `cross` `circle` `square` `triangle`, `l1` to `r3`, `create` `options`, the d-pad, both sticks, the controller |
| `switch` | face buttons, `l` `r` `zl` `zr` `gl` `gr` `c`, `plus` `minus` `home` `capture`, the d-pad, both sticks, the controller |
| `gamecube` | `a` `b` `x` `y` `z` `l` `r` `c`, `start` `home` `capture`, the d-pad, the control stick and the C stick, the controller |
| `snes` | `a` `b` `x` `y` `l` `r` `select` `start` and the d-pad, in full colour |
| `generic` | round, square and trigger buttons in solid, fill and outline, sticks, joysticks |
| `keyboard` | letters, digits, F1 to F12, arrows, modifiers and the punctuation keys, with `-icon` variants that draw a symbol in place of a word |

Names come from the file names of the pack, with the family and `button_` dropped: `xbox_button_a` is `a`, `xbox_stick_l_press` is `stick-l-press`. RotP's `gc_button_c` file draws the same C stick art as `stick-c`, so it is left out, and the real C button, `gc_button_chat`, is `c`. The pack holds 278 glyphs. The red generic joysticks are `joystick-highlight`. `INPUT_ICONS` holds every family; `InputIconName<'xbox'>` types the names of one.

A few glyphs carry a highlight: the pressed arm of a d-pad, the ball of a joystick, the coloured GameCube buttons. `tone="color"`, the default, keeps the colours of the pack; `tone="theme"` paints them in `--c-primary-bright`. The SNES glyphs are full colour art and keep their own colours under either tone.

`gamepadInputIcon(family, id)` turns an SDL button id into the glyph of a family: `a`, `b`, `x`, `y` are positions (south, east, west, north), so `gamepadInputIcon('switch', 'a')` is the Switch `b`. It knows `back`, `guide`, `start`, `leftstick`, `rightstick`, `leftshoulder`, `rightshoulder`, `lefttrigger`, `righttrigger`, the d-pad ids, `misc1`, `misc2`, the paddles and `touchpad` where the family has them. For `keyboard` it takes `KeyboardEvent.code`: `KeyW`, `Digit1`, `F5`, `ArrowUp`, `ShiftLeft`. It returns `null` when the family has no glyph for the id. `GAMEPAD_INPUT_ICONS` holds the table.

The Xbox, PlayStation, Switch, GameCube, generic and keyboard glyphs are Kenney's Input Prompts (CC0), the same files Relic of the Past uses. The SNES art is Relic of the Past's own, modified from Tiago Alexander's SNES Controller in Sketch; its texture overlay is left out. README.md credits both.

`PressedGrid` takes `family` and draws each cell with the `InputIcon` that `gamepadInputIcon` finds for its id. An item takes `icon`, an `InputIconSource`, which wins over the family match. A cell with an icon and no `label` shows the icon alone; a cell with no icon shows its label or id as before. The cell icon is 28 pixels, muted while idle and `--c-primary-bright` while held, and cells are at least 40 pixels tall.

```tsx
<PressedGrid family="xbox" items={[{ id: 'a' }, { id: 'b' }, { id: 'dpup' }]} pressed={held} />
<PressedGrid items={[{ id: 'confirm', label: 'Confirm', icon: { family: 'switch', name: 'a' } }]} pressed={held} />
```

The `Icon` effects draw with thinner lines: the ping ring, the burst rays and the comet tail are 0.9 units of the 24 unit grid, the glint 1.1, the shimmer 1.4, and the twinkle star and the dot are slimmer. The effect options take `size`, `sm`, `md` (the default) or `lg`: the pop draws at 0.7, 1 or 1.45 times its size with the same line weight, and a shimmer runs along 4, 6 or 9 sampled points. A new kind, `comet`, draws a short streak that runs into the point and ends in a small four point star. `IconEffectSize` is exported.

```tsx
<Icon name="star" effect={{ kind: 'comet', size: 'lg' }} />
```

The `DynamicInput` popover is as wide as the control it holds: a `NumberStepper` popover is 140 pixels at md where it was at least 218. A slider keeps a floor of 192 pixels so it stays easy to drag, and a decimal field with no range is 12 characters wide.

`Widget` draws its options button with the Lucide `settings` gear in place of the `gear` glyph.

`WidgetOptions` is 256 pixels wide, up from 240: in its own window, the placement row with the pop in button ran past the panel edge.

`DockLayout`, `WidgetManager` and the dock API pass a second argument to `onPopOut`: the screen point where the pointer let go when a widget is dragged out past the window edge.

```ts
interface ScreenPoint { screenX: number; screenY: number }
onPopOut?: (id: WidgetId, point?: ScreenPoint) => void;
```

The pop out button passes no point. `ScreenPoint` is exported.

`visibleLayoutOf(layout, gates)` now applies the show rules to popped widgets too: the `popped` list it returns holds only the widgets that pass them, the same rules a docked or floating widget meets (a definition and content, context only, the page open, developer tools, forced ids).

### What an app does

Nothing is renamed. An app that drew controller prompts from its own SVG files can draw `InputIcon` instead and keep the file credits. An app that passes `onPopOut` to `DockLayout` or `WidgetManager` can open the new window at `point` when it is given. An app that decided by itself which popped windows to show can read `visibleLayoutOf(layout, gates).popped` instead. An app that styled `.widget-options` to a width of 240 pixels moves to 256.

## 65. The gear glyph is a gear

`<Glyph name="gear" />` draws a toothed wheel with a hole: the Lucide `settings` shape, scaled to the 16 unit glyph grid with the 1.5 glyph stroke. It drew a ring with eight rays, which read as a sun. The name stays `gear`, so the gear in the DataTable options button and the gear `Icon name="settings"` draws in `Widget` and `SettingsPage` are the same shape.

### What an app does

Nothing. An app that drew its own gear beside a `Glyph` can use `<Glyph name="gear" />`.

## 66. FilterBar adds every filter with +; LogPanel, ListItemRow and GroupTree are redone; DataTable scrolls inside its border

`FilterBar` has no facets any more. `FacetPicker`, `FacetPickerProps`, `FilterFacet`, `FilterFacetOption` and the `facets` prop are gone. Every filter is a clause, added through the + button, which opens a `DropdownMenu` of the schema fields; `fields` limits that menu to some top level paths. An active filter is a chip of joined segments that reads like a sentence: the field turns the filter on and off, the operator opens the operator menu, the value opens an editor that suits the field (a checkable menu for an enum, the field kit control in a popover for the rest), and the cross removes it. A new filter opens its value right away, and Clear filters shows once there are two. `extra` puts content at the end of the bar, such as a count or a button.

```tsx
<FilterBar
  search={search}
  onSearchChange={setSearch}
  schema={PLAYER_SCHEMA}
  clauses={clauses}
  onChange={setClauses}
  extra={<Button size="sm">Export</Button>}
/>
```

`LogPanel` is one framed box: a `FilterBar` toolbar on top with the search, the + for filters on the type, the tag or the message, the line count and Copy all, then the lines. It filters its lines itself. `hidden` and `onToggleKind` are gone; the type filter is a clause, kept inside the panel or handed to the host with `filters` and `onFiltersChange`. `search` and `onSearchChange` are optional and do the same for the search. `copyText` is optional and receives the lines in view; without it, Copy all copies them as `time [TAG] message`. `toolbar={false}` hides the toolbar. The Newest button only shows once you scroll away from the end.

`ListItemRow` takes `columns`: any number of columns after the name, each `{ primary, secondary?, align? }`, where `align` is `start`, `center` or `end`. `aside` is gone; pass `columns={[{ primary: aside, align: 'end' }]}`. The new `ListItemList` holds rows and lines their columns up from row to row, each column as wide as its widest cell. The class names `list-item-row__info`, `__name`, `__meta` and `__aside` are now `list-item-row__cell`, `__primary` and `__secondary`.

```tsx
<ListItemList label="Sessions">
  {sessions.map((s) => (
    <ListItemRow key={s.id} name={s.name} meta={s.status} columns={[{ primary: `${s.players} players`, secondary: s.preset, align: 'end' }]} />
  ))}
</ListItemList>
```

`GroupTree` is a real tree: `role="tree"` with one tab stop, arrows to move, Right to open or go to the first child, Left to close or go to the parent, Home and End, Enter and Space to select. Each level indents under a guide line, the guide of the selected branch is lit, each group shows an icon (`node.icon`, or a folder) and the count of items under it (`node.count` overrides it; `showCounts={false}` hides it), and the items are tree rows too. `renderItems(items)` is now `renderItem(item)` plus `getItemKey(item)`, with an optional `itemIcon(item)`. `selectedKey` and `onSelect(key, item)` select a group or an item, `onActivate(item)` runs on Enter or a double click, and `onToggleKey(key)` is now `onExpandedChange(keys)`, which takes the full list of open keys. `label` names the tree. The class names `group-tree__group`, `__header`, `__name` and `__content` are gone; rows are `group-tree__row`.

`DataTable` draws its border and corners on the whole table, footer included, and owns its sideways scroll: it takes the width its container gives it, never widens that container, and scrolls its columns inside the border when they do not fit.

### What an app does

An app that passed `facets` to `FilterBar` turns each facet into an enum field of its schema and filters it with a clause. An app that wired `hidden` and `onToggleKind` on `LogPanel` drops them and passes the full rows; the panel filters them. An app that passed `aside` to `ListItemRow` passes it as an end aligned column. An app that used `GroupTree` passes `renderItem` and `getItemKey` in place of `renderItems`, and `onExpandedChange` in place of `onToggleKey`. An app that wrapped `DataTable` in its own scroll box or border drops it.

## 67. AboutPanel, ReleaseNotesPanel, CalibrationPanel and ProfilePicker move to Brock; tessera new takes a layer; useCopy is exported

Four app panels leave Tessera. Brock 0.4.0, built on Tessera 0.6.0, owns them now:

| Removed from Tessera | Where it is now |
|---|---|
| `AboutPanel` and its types | `import { AboutPanel } from '@drizztdourden08/brock-react'`, with the same props: `brand`, `heading`, `title`, `rows`, the copy text and `legal` |
| `ReleaseNotesPanel` and its props type | `import { ReleaseNotesPanel } from '@drizztdourden08/brock-react'`, also used in the Brock updater's `UpdateDialog` |
| `CalibrationPanel` and its types | `import { CalibrationPanel } from '@drizztdourden08/brock-input/renderer'`. It takes the same props plus `reading` and `buttons` |
| `ProfilePicker` and its types | nothing in Tessera. Brock has `ProfilesPanel` in `@drizztdourden08/brock-react`: select, create through `InlineCreateForm`, rename, and delete through `ConfirmIconButton` |

Their gallery pages, the answers of the decision tree that led to them and the strings only they used go with them: `panels.copyDebugInfo`, `panels.releaseNotes`, `panels.newProfile`, `panels.deleteNamed` and `common.keep`. The screen examples show the same content from Tessera parts: the About screen of `InfoScreen` puts the logo and the name in `lead` and the build facts in a `FactsPanel`, the update check of `UtilityScreen` shows its notes in a `Card` under a `SectionHeader`, and each calibration step of `StageScreen` is a `Card` with a `SectionHeader`, a `StatRow` reading, the plot and a `ButtonRow`.

`useCopy` is exported from the package root and from `/primitives`. It gives `{ copied, copy }`: `copy(text)` writes through the `writeText` override of `TesseraProvider` and sets `copied` for a moment. `useTesseraStrings()` already gave the whole string table, `panels` included, with the overrides merged in, so an app part reads Tessera's wording instead of keeping a copy:

```tsx
import { Button, useCopy, useTesseraStrings } from '@drizztdourden08/tessera';

const CopyLogButton = ({ text }: { text: string }) => {
  const { copied, copy } = useCopy();
  const { common, panels } = useTesseraStrings();
  return <Button onClick={() => void copy(text)}>{copied ? common.copied : panels.copyAll}</Button>;
};
```

`tessera new` changes in three ways for an app:

- `tessera.config.json` takes `layer`, at the top or in an `apps` entry, and `tessera new` takes `--layer <name>`. Either sets the `@layer` tag at the top of each file of a new app part, such as `renderer-shell`. The default stays `renderer-app`; a Tessera part always takes `renderer-components`. The value is lowercase words joined by hyphens.
- With a part in another workspace package, the usage example imports it from that package: the `name` of its nearest `package.json`, plus the entry of its `exports` whose file sits in the folder closest above the part, such as `@drizztdourden08/brock-input/renderer`. A relative path is used only when the part and the views share a package. Before, with no `package` set, the example imported a relative path from the default `src/views`.
- The story is written when the package that holds the part lists `@storylite/storylite`. When `stories` is set, it is also written when the repo root or the package of the `stories` folder lists StoryLite. A part in a workspace package with no StoryLite and no `stories` setting gets no story, where it got one whenever the repo root listed StoryLite. With no `stories` setting, the story goes to `stories/` in the package that holds the part.

### What an app does

An app that imports any of the four panels imports them from Brock as in the table; `brock upgrade` rewrites the imports of a Brock app. An app that used `ProfilePicker` moves to Brock's `ProfilesPanel`, or builds its list from `ListItemRow`, `ConfirmIconButton` and `InlineCreateForm`. An app that overrides one of the five removed strings drops that key from its `strings` override. RENAMES.json lists the removed exports in `removedExports`, as notes that point to Brock. An app with its own copy of the clipboard hook or of the string table uses `useCopy` and `useTesseraStrings`. A Brock app adds `"layer": "renderer-shell"` to `tessera.config.json` where its parts use that layer.

## 68. WizardFrame is now Wizard

The wizard layout takes the name of the whole: `WizardFrame` is now `Wizard` and `WizardFrameProps` is now `WizardProps`, with the same props and no alias. Its classes follow: `wizard-frame` is now `wizard`, and `wizard-frame__rail`, `__head`, `__title`, `__main` and `__scroll` are now `wizard__rail`, `__head`, `__title`, `__main` and `__scroll`. Its gallery page was already called Wizard and keeps its place.

```tsx
import { useWizard, Wizard } from '@drizztdourden08/tessera';

<Wizard wizard={wizard} title="New profile" orientation="vertical" onExit={close}>
  <ProfileStep wizard={wizard} />
</Wizard>
```

### What an app does

An app renames `WizardFrame`, `WizardFrameProps` and the `wizard-frame` classes as RENAMES.json lists, under the release named next. `WizardDialog`, `useWizard` and the other wizard parts keep their names.

## 69. Every logo takes a light or a dark rim, and every brand has rimmed icon files

`BrandMark`, `Logo`, `Logo.Combined`, `Logo.Wordmark`, `BrandWordmark` and `PixelWordmark` take `rim?: 'none' | 'light' | 'dark'`. A rim is a thin outline in the rim colour that follows the silhouette, so a dark mark reads on a dark title bar and a light one on a light panel. `'none'` is the default, so nothing changes until an app asks for one. The colours are the tokens `--brand-rim-light` and `--brand-rim-dark`, the widths `--brand-rim-sm` to `--brand-rim-xl`, and `BRAND_RIM`, `BRAND_RIM_TONES` and the types `BrandRim`, `BrandRimTone` and `BrandRimSpec` are exported from `/brand`. `iconFiles(app, rim)` takes the rim as a second argument.

```tsx
<Logo brand="brock" size="sm" rim="light" />
<Logo.Combined brand="archipelia" rim="light" />
```

`pnpm icons` also writes `brand/light-rim/` and `brand/dark-rim/`. Each copies the layout of the brand folders, `<app>.svg` and `<app>/icon`, `mark` and `splash`, with the rim and never a tile. brand/LOGO.md lists them.

### What an app does

An app whose mark is hard to see on its title bar, taskbar or splash passes `rim="light"` to its logo, or reads its icon files from `brand/light-rim/<app>/` in place of `brand/<app>/`. Archipelia can use its bare mark with a light rim there instead of its tile.

## 70. WindowTitleBar takes actions, puts every bar item in its menu, and gives way one item at a time

`WindowTitleBar` drops `left` and takes `actions`, a list of `WindowTitleBarAction`. The host declares each action once, and the bar draws both its button and its menu item from it.

```ts
interface WindowTitleBarAction {
  id: string;
  label: string;
  icon: IconName;
  onSelect: () => void;
  bar?: 'button' | 'status' | 'menu'; // button by default
  status?: string; // the pill text in the bar and the subtitle of the menu item
  tone?: StatusTone;
  shortcut?: MenuItem['shortcut'];
}
```

- `bar: 'button'` shows an icon button at the start of the bar. A `tone` of `danger` makes it a danger button.
- `bar: 'status'` shows a `Status` pill with the text of `status`, in `tone`, only while `status` is set. Pressing the pill runs `onSelect`.
- `bar: 'menu'` keeps the action in the menu only.

Everything the bar shows is also in the hamburger menu, always. The bar adds a group of its own just above the last group of `menu`, or at the end when `menu` has fewer than two groups. It holds a View sub-menu with the pin and full screen as check items that report to `onControl`, then each action as an item, with `status` as its subtitle. The hamburger shows whenever that menu has items, so a bar with the pin or full screen turned on has one even with no `menu`.

As the bar narrows, its items hide one by one, each end hiding only what is in the way of the brand. The hide order is the action buttons, last declared first, then the pin, then the status pills, last first, then full screen. Once every item is hidden, the title goes and the logo stays alone, then the logo shrinks from 20 to 14 pixels, and only then does the middle empty. Minimize, maximize and close never hide. A hidden item keeps its size for the measurement under the class `window-title-bar__item--away` and is `inert`; the small logo is `window-title-bar__brand--small`.

```tsx
<WindowTitleBar
  title="Brock"
  logo={logoSrc}
  menu={menu}
  actions={[
    { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', onSelect: reportBug },
    { id: 'updates', icon: 'download', label: 'Check for updates', bar: 'status', status: update ? 'Update available' : undefined, tone: 'success', onSelect: checkForUpdates },
  ]}
  pinned={pinned}
  fullscreen={fullscreen}
  onControl={(control) => win[control]()}
/>
```

### What an app does

An app turns each child of `left` into an action with a label, an icon and `onSelect`, and an update pill into an action with `bar: 'status'`. It removes from `menu` any item an action now adds, such as Check for updates, so the menu does not list it twice. The tessera strings gain `windows.view`, the label of the View sub-menu. RENAMES.json notes `WindowTitleBar.left` under the release named next.

## 71. InputIcon: SNES art is vector only, every d-pad direction is red, and the generic family has a d-pad

The SNES glyphs were imported with the art's blur filters and with its outline paths filled black, so the d-pad arrows drew as black blobs and the edges went soft. They are now vector paths only: the shadows and highlights are drawn as shapes, and the noise texture, a bitmap in the source, is left out. Every InputIcon is now free of bitmaps and filters, and a test keeps it so.

The pressed arm of each `dpad-up`, `dpad-down`, `dpad-left` and `dpad-right` glyph is red with `tone="color"` in every family that has a d-pad: xbox, playstation, switch, gamecube, snes and generic. With `tone="theme"` it takes `--c-primary`, not `--c-primary-bright`, and a thin gap in `--c-bg` around it, so a pale primary still stands apart from a light glyph. The same applies to the other highlights: the joystick balls and the coloured GameCube buttons.

The generic family adds `dpad`, a plain cross, and the four directions. `gamepadInputIcon('generic', 'dpup')` and the other d-pad ids now give these in place of the stick arrows.

```tsx
<InputIcon family="generic" name="dpad-left" />
<InputIcon family="snes" name="dpad-up" tone="theme" />
gamepadInputIcon('generic', 'dpdown'); // { family: 'generic', name: 'dpad-down' }
```

The SNES art was drawn by drizztdourden_ from scratch for Relic of the Past, inspired by Tiago Alexander's "SNES Controller in Sketch". README.md and the InputIcon page say so.

### What an app does

Nothing, unless it relied on a generic d-pad id drawing a stick arrow or on the theme highlight being `--c-primary-bright`.

## 72. The Stepper sequence runs without a stall between its parts

Each part of a step forward used to ease in and out, so the motion slowed to a stop where the fill met the line, the line met the ring, and the ring met the next fill. The parts now take curves that hand their speed on: the fill speeds up into the line, the line slows to the speed the ring starts at, and the ring meets itself gently. The new tokens are `--ease-step-fill`, `--ease-step-line` and `--ease-step-ring`. The current circle starts breathing as its ring begins to spread, so its glow is already rising when the ring closes. The order, the durations and the quick reverse stay the same, and reduced motion still shows the end state at once.

### What an app does

Nothing.

## 73. InputIcon lists every name it accepts

InputIcon exports the families and names it draws as readonly lists, and the types come from them, so the list and the types cannot disagree.

```ts
const INPUT_ICON_FAMILIES: readonly ['xbox', 'playstation', 'switch', 'gamecube', 'snes', 'generic', 'keyboard'];
const INPUT_ICON_NAMES: { readonly [F in InputIconFamily]: readonly InputIconName<F>[] };
const isInputIconName: <F extends InputIconFamily>(family: F, name: string) => name is InputIconName<F>;

type InputIconFamily = (typeof INPUT_ICON_FAMILIES)[number];
type InputIconName<F extends InputIconFamily = InputIconFamily> = (typeof INPUT_ICON_NAMES)[F][number];
```

`INPUT_ICONS` must hold a glyph for every listed name, which the compiler checks, and a test checks that every glyph has a listed name. `gamepadInputIcon` and PressedGrid check their names against the same list.

A name the family does not have, from untyped data or a cast, draws the keyboard question mark key with the class `input-icon--unknown` and warns once in development. It never draws nothing.

The gallery Playground picks the family and the name from two selects. The name select lists exactly that family's names, with each glyph beside its name, and moves to the family's first name when the one chosen is not in the new family.

### What an app does

Nothing. To build a picker or check stored data, read `INPUT_ICON_NAMES[family]` or call `isInputIconName(family, name)` in place of `Object.keys(INPUT_ICONS[family])`.

## 74. ScrollArea takes a slim gold scrollbar, and SideNav uses it

ScrollArea takes `scrollbar`. The default, `native`, is the bar it always drew. `slim` hides the browser bar and paints a thin line in the primary colour along the edge, on the area's own background, so it takes no layout width and the content keeps its size whether or not it scrolls.

```ts
type ScrollAreaScrollbar = 'native' | 'slim';

interface ScrollAreaProps {
  scrollbar?: ScrollAreaScrollbar;
}
```

The line is 3px wide at rest (`--scrollbar-slim`) and 5px under the pointer or while dragged (`--scrollbar-slim-active`). It keeps 2px from the edge and 4px from each end, and is never shorter than 24px. A host class can change those with `--scroll-thumb-edge`, `--scroll-thumb-ends` and `--scroll-thumb-min`. Content painted right up to that edge covers the line, so leave some padding there.

SideNav's groups now scroll in a slim ScrollArea, with the line kept a corner radius away from each end. In the collapsed column the browser bar used to take 10px from the items, squeezing a 38px item to 28px. The items now keep their width and position, and the groups fade at an edge with more to scroll, as every ScrollArea does.

### What an app does

Nothing. Pass `scrollbar="slim"` to a ScrollArea that should scroll without giving up width.

## 77. The Stepper reverses exactly, skips at 0.4 of the pace, flips done numbers to a check, and takes a colour per step

Going back plays the forward sequence in exact reverse, one step at a time: the breathing stops, the border draws back to the point where the line arrived, the line retracts to the previous circle, then that circle drains. Each part takes 0.6 of its forward time on the mirrored curve, so the speed still matches where one part hands over to the next. One step back takes 0.82 s instead of a 0.15 s fade of everything at once.

A jump over two or more steps still plays the whole sequence for each step in turn, fill, line and border, but each part takes 0.4 of its forward time on the same curves, so the hand overs stay smooth. The step it lands on breathes once its border closes. Skip to Review across six steps takes 2.7 s instead of 6.8 s. One step forward is unchanged.

A done circle now flips its number over to a check, turning about its upright axis. `doneIcon` on the Stepper sets the icon for every step and `false` keeps the numbers; `doneIcon` on a step overrides it. The icon keeps the colours the number had, and reduced motion swaps it at once.

`tone` on the Stepper or on a step takes `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger`, `info` or a tag colour. It colours the fill, the border, the glow, the label of the current step and the line arriving at that step. A step that needs attention stays red. Without a tone the Stepper looks as before.

The new tokens are `--duration-step`, `--duration-step-flip`, `--duration-step-fill-back`, `--duration-step-line-back`, `--duration-step-ring-back`, `--duration-step-flip-back`, `--duration-step-back`, `--duration-step-skip-fill`, `--duration-step-skip-line`, `--duration-step-skip-ring`, `--duration-step-skip-flip`, `--duration-step-skip`, `--ease-step-fill-back`, `--ease-step-line-back` and `--ease-step-ring-back`.

### What an app does

Nothing, unless it wants the numbers back: pass `doneIcon={false}`. A style that targeted `.stepper[data-direction]` now targets `.stepper[data-motion]`, which is `still`, `step`, `skip` or `back`. The number's colour sits on `.stepper-dot__card`, which holds `.stepper-dot__number` and `.stepper-dot__icon`.

## 76. DataTable group rows span the scrolled width, reference cells are Links, and FilterBar shows each field's type

### DataTable group rows

A group row used to be only as wide as the visible area, so scrolling sideways left its background behind. It now lays out on the same column tracks as the data rows and spans their full width. The chevron and group value stay pinned to the start edge of the visible area and the field name and count to its end edge, at any scroll position and in right to left. The indent per level is the `--dt-group-indent` custom property on the row, and the row holds one `.data-table__group-bar` cell.

### DataTable uses the DS parts

The sort toggle, the column menu trigger and the table options gear are `IconButton`s at size `xs`. An unsorted column's toggle carries `.data-table__sort--off`. IconButton takes a `ref` for this.

`FieldPicker` is removed. It drew its own menu with DropdownMenu's classes and nothing used it; DataTable's column and table menus already list fields through `DropdownMenu`.

A reference cell looked like a link but was not one. It is now a `Link` with the new `variant="subtle"`, a dotted underline at rest, when the table gets `resolveIdRefHref` and that returns an address. Without one the cell is plain monospaced text, here and in CompactRecordView and RecordEditor.

```ts
type LinkVariant = 'inline' | 'subtle';

interface LinkProps {
  variant?: LinkVariant;
}

type IdRefHrefResolver = (id: string, targetKind?: string) => string | undefined;

interface DataTableProps<T> {
  resolveIdRefHref?: IdRefHrefResolver;
}

interface CellRenderOptions {
  resolveIdRefHref?: IdRefHrefResolver;
}

interface IconButtonProps {
  ref?: Ref<HTMLButtonElement>;
}
```

### FilterBar shows each field's type

Every entry of the add menu shows its field's type from the schema as a coloured icon and a label under the name: Text, Number, Yes or no, Choice, Reference, List, Group, Mixed or Unknown. Each chip shows the same icon in place of its dot, grey when the filter is off. The labels are the new `fieldKinds` string group, and the icon set gains `type`, `hash`, `toggle-left`, `circle-dot`, `braces` and `split`.

### What an app does

Pass `resolveIdRefHref` to a DataTable whose reference cells should open their record. Build a field picker as a `DropdownMenu` with `children` instead of `FieldPicker`. A style on `.filter-chip__dot` moves to `.filter-bar__kind`, and one on `.data-table__options` or `.data-table__caret` moves to the IconButton.

## 78. The gallery Playground groups its parameters, and every story declares them

The Playground is one card: the live component on a stage at the top and its Parameters panel below, sharing one border with no gap. The panel draws each parameter in a titled group the story names: Content, Value, Appearance, Layout, State, Behaviour, Motion or Data, always in that order. Every control is the small size and one row high, with the names in one column. A changed parameter takes a primary accent on its left edge, a primary name and a dot, and a reset button of its own; Reset in the panel head still puts every parameter back.

A story types its Playground with the gallery's own types, from `stories/_template/controls/playground.type.ts`:

```ts
type PlaygroundGroup = 'Content' | 'Value' | 'Appearance' | 'Layout' | 'State' | 'Behaviour' | 'Motion' | 'Data';
type PlaygroundControl = 'boolean' | 'text' | 'textarea' | 'number' | 'range' | 'color' | 'select' | 'multiselect';

interface PlaygroundArgType<T, A> {
  group: PlaygroundGroup;
  control?: PlaygroundControl;
  options?: readonly OptionOf<T>[] | ((args: A) => readonly OptionOf<T>[]);
  optionView?: (option: OptionOf<T>, args: A) => ReactNode;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

type PlaygroundArgTypes<A> = Partial<{ readonly [Name in keyof A & string]: PlaygroundArgType<A[Name], A> }>;
type PlaygroundStory<A> = Omit<StoryLiteStoryDefinition<A>, 'argTypes'> & { argTypes?: PlaygroundArgTypes<A> };
```

A choice from a known set is a select, a segmented control for up to three short options, or a `multiselect` for a list; text boxes are left for free text. `options` can be a function of the current args, and a value that leaves its options returns to its default or to the first option. InputIcon's family and name pickers are back in Parameters, with the names following the family; `stories/icons/InputIconPlayground.tsx` is gone. Shortcut, ShortcutTour, KeyboardLayout and PressedGrid pick their keys and buttons from lists, and DynamicInput's counter lists the text slots of the pattern. `stories/_template/README.md` describes the convention.

`tessera add` in a Tessera checkout scaffolds the story with these types and a `Content` group on its first parameter. In an app it keeps Storylite's own types.

### What an app does

Nothing.

## 81. Widget windows: sync and group options, a guide while moving or resizing, and square chrome for fullscreen

A widget in its own window can follow the main window and join a window group. Tessera draws the controls and the guide; the host owns the state and moves the windows.

`WidgetOptions` takes two more controlled rows. Each shows only for a widget in its own window (`placement="popped"`) and only when its props are given. Each label carries an info icon whose tooltip says what the option does, and pointing at the control fills the hint line.

```ts
interface WindowGroup {
  id: string;
  label: string;
}

interface WidgetOptionsProps {
  // ...
  sync?: boolean;
  onSyncChange?: (on: boolean) => void;
  group?: string | null;
  groups?: readonly WindowGroup[];
  onGroupChange?: (group: string | null) => void;
}
```

- **Sync with main window** is a switch. On, the window shows, hides, minimizes and comes forward with the main window; off, it is independent and gets its own taskbar entry.
- **Window group** is a select: None, then `groups`. Without `groups` it lists Group 1 to Group 4, with the ids `group-1` to `group-4`. None is `null`.

`WidgetManager` passes the same rows to the options of every widget:

```ts
interface WidgetWindowOptions {
  sync?: boolean;
  group?: string | null;
}

interface WidgetManagerProps {
  // ...
  windowOptions?: (id: WidgetId) => WidgetWindowOptions | undefined;
  windowGroups?: readonly WindowGroup[];
  onWindowOptionsChange?: (id: WidgetId, patch: WidgetWindowOptions) => void;
}
```

A widget whose `windowOptions` is `undefined` shows neither row, and so does a key left out of what it returns.

`WindowGuideOverlay` is new, under Composites · Widgets. It covers the whole window with a dimmed scrim and a centred card while a window is moved or resized: what is happening, whether the window snaps to corners and edges, and the keys. Ctrl moves or resizes without snapping, and while resizing, Ctrl on a shared edge resizes only this window. `hints` adds rows after these, such as group shortcuts, and `defaultHints={false}` drops the built-in ones. It fades in and out in `--duration-normal`, at once under reduced motion. The card is `aria-hidden`; a polite status line says the mode and when snapping turns off. It never takes the pointer, and the host decides when it shows.

```ts
interface WindowGuideHint {
  keys: readonly ShortcutKey[];
  label: string;
}

interface WindowGuideOverlayProps {
  open: boolean;
  mode: 'moving' | 'resizing';
  snapping: boolean;
  hints?: readonly WindowGuideHint[];
  defaultHints?: boolean;
  className?: string;
}
```

`Widget` takes `square`, for a widget window shown fullscreen: the frame drops its corner radius and its outer border, the same prop ScreenLayer and ScreenWindow take.

The new strings sit in `widgets`: `sync`, `syncAbout`, `syncOn`, `syncOnHint`, `syncOff`, `syncOffHint`, `group`, `groupAbout`, `groupNone`, `groupNoneHint`, `groupNumbered`, `groupJoinHint`, `guideMoving`, `guideResizing`, `guideSnapping`, `guideSnappingOff`, `guideMoveFree`, `guideResizeFree`, `guideResizeAlone` and `guideAnnounce`. `OptionRow` takes `about`, the tooltip text beside its label.

### What an app does

Nothing; every new prop is optional. A host that pops widgets into their own windows passes `sync` and `group` to the WidgetOptions of each widget window, shows WindowGuideOverlay while the user drags or resizes one, and sets `square` on the Widget of a window it shows fullscreen.

## 75. WindowTitleBar slides its items and its concealed bar, shows a status as green text, and joins a window group

As the bar narrows, a hiding item no longer vanishes on the spot. It slides out towards its own end of the bar while it fades: the pin and the actions towards the start edge, full screen towards the end edge, mirrored in a right to left layout. When there is room again it slides back in the same way, and the items beside it glide into the space it leaves or needs. The motion moves the items with `transform` and `opacity` only, so no item changes width or scale on any frame. It runs for `--duration-slow` with `--ease-standard`, and under reduced motion each item jumps straight to the end. The measurement now reads the bar's direction, so the bar also fits right to left layouts, where before every item hid.

The concealed bar keeps its full height and slides down from the top edge when the pointer nears it, then slides back up, fading as it goes. Before, its height grew from zero, which folded the content open. `.window-title-bar--concealed` now holds `transform: translateY(-100%)` in place of `height: 0`.

A status action, such as Check for updates with the status Update available, shows its status as plain text in the tone of the action, `info` when it has none, with no pill, border or background. The text uses Emphasis with `trigger="pulse"` and `anchor="center"`, so each letter swells in turn from the centre outwards when the status appears or changes. The menu item still shows the status as its subtitle.

Emphasis `pulse` and `loop` now stop animating under reduced motion, as `hover` and `active` already did.

The bar can also put the window in a window group. Pass `windowGroups` and the View sub-menu gains a Window group radio sub-menu: None first, then each group of the host. `windowGroup` marks the current one, `null` or left out for None, and `onWindowGroupChange` reports a pick, with `null` for None. Without `windowGroups` the entry is not there.

```ts
interface WindowTitleBarGroup {
  id: string;
  label: string;
}

interface WindowTitleBarProps {
  windowGroup?: string | null;
  windowGroups?: readonly WindowTitleBarGroup[];
  onWindowGroupChange?: (id: string | null) => void;
}
```

The labels come from the strings `windows.windowGroup` and `windows.windowGroupNone`.

### What an app does

Nothing. An app that styled the status pill inside the bar, `.window-title-bar__status .status--pill`, styles `.window-title-bar__status .status--text` instead.

## 80. Every screen kind shows the page header, and UtilityScreen looks like rotp's update dialog again

WorkspaceScreen, InfoScreen, UtilityScreen and StageScreen all show the page header container: a card whose header holds a glowing icon and a title over a backdrop that fades out behind the title, and compacts once the body scrolls. Nothing turns it off. A screen without that header is a custom screen built from ScreenWindow or ScreenLayer. In development a screen kind warns when `pageHeader` is forced on it, and the header warns when its icon or title is missing.

The header container is a new building block, ScreenPage. SettingsPage is built on it, so WorkspaceScreen's pages keep their look.

```ts
interface ScreenPageProps {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
  backdrop?: ReactNode; // left out: the default art; null: a plain header
  strip?: ReactNode; // controls after the title
  actions?: ReactNode; // the end of the header
  footer?: ReactNode; // a row under the body that stays in view
  live?: boolean; // the title is a live region
  scroll?: boolean;
  compact?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
  bodyClassName?: string;
  className?: string;
}
```

- WorkspaceScreen drops `pageHeader`, and `WorkspacePage.icon` is required.
- InfoScreen and StageScreen take a required `icon` and `heading`, and an optional `backdrop`. The window keeps `title`; `heading` is the title of the page header.
- StageScreen's toolbar now sits in the header after the heading, and the Done button at the end of the header. The stage is the scrolling body under it.
- UtilityScreen follows rotp's UpdateDialog. The status is the header: `status.title` is its title and the tone picks its icon, a spinner while busy; `status.icon` swaps the icon. `status.message` is one centred line, such as the version. `notes` is a framed box with a tinted title and its own scroll, for release notes. `progress` shows its percent under the bar. `footnote` is replaced by `report`, one ghost icon button in the danger tone with a bug icon, named Report an issue from the strings (`common.reportIssue`), with the same words in a tooltip. The footer under the body stays in view: the report button on the left, the actions on the right.

```ts
interface UtilityScreenStatus { tone: UtilityScreenTone; title: ReactNode; message?: ReactNode; icon?: ReactNode }
interface UtilityScreenNotes { title: ReactNode; children: ReactNode }
interface UtilityScreenReport { onClick: () => void; label?: string }
```

- ScreenLayer and ScreenWindow take `square?: boolean`. It drops the card's corner radius and outer border, for a window shown fullscreen; the host draws what surrounds it.

Renamed classes: `settings-page__head`, `__backdrop`, `__icon`, `__title`, `__actions`, `__body`, `__body--fixed` and `settings-page--compact` become the same names under `screen-page`. `workspace-screen__backdrop` becomes `screen-page__art`. `--settings-page-head-h` and `--settings-page-head-h-compact` become `--screen-page-head-h` and `--screen-page-head-h-compact`. `RENAMES.json` lists them, with the removed classes.

### What rotp does

- Give every WorkspacePage an icon, and drop `pageHeader`.
- Pass `icon` and `heading` to each InfoScreen and StageScreen.
- Build the update check as a UtilityScreen: the state as `status.title` (Checking for updates, Update available, Up to date), the version line as `status.message`, the pre-release toggle and version picker in `settings`, the release notes in `notes`, and `report={{ onClick: openBugReport }}` in place of the BugReportButton footnote.

## 82. A sub-menu sits a small gap from its parent and joins it by a tunnel at the open row

A DropdownMenu sub-menu no longer lays its edge over the parent's border. It opens `--menu-gap` away from the parent, the corner radius by default, and a tunnel as tall as the open row bridges the gap. The tunnel's top and bottom edges curve into both menus with fillets half the gap wide, drawn like the trigger join, and the open row's highlight runs through it and fades into the sub-menu. Everywhere else both menus keep their full border, halo and rounded corners.

When the row sits near an end of a menu, that menu's corner and the fillet beside it share the room along the edge: the parent's first or last row, or a sub-menu whose first item lines up with the row, gets a smaller corner and a smaller fillet. With no room at all the corner goes square and the tunnel's edge runs straight into the menu's. The tunnel stays on the row when the sub-menu opens on the left, when it moves up to stay on screen, and at every level of nesting. A row whose sub-menu opens on the left shows its accent bar on its right edge, away from the tunnel.

The sub-menu's drop shadow no longer falls on the parent. Moving the pointer from the row toward the sub-menu keeps it open: a safe area covers the triangle from the pointer to the sub-menu's near edge, so the rows in between neither highlight nor open their own sub-menus. Stopping over another row for 400 ms hands over to that row. The row itself still takes clicks.

`.dropdown-look` sets the new `--menu-gap`. The class `dropdown__join` becomes `dropdown__tunnel`, and the tunnel draws with `dropdown__tunnel-body`, `dropdown__tunnel-halo`, `dropdown__tunnel-shadow` and `dropdown__tunnel-fillet` with `--parent-top`, `--own-top`, `--parent-bottom` and `--own-bottom`. `dropdown__join-strip` and `dropdown__join-fillet` with its `--top-inside`, `--top-outside`, `--bottom-inside` and `--bottom-outside` modifiers are gone; `RENAMES.json` maps them.

### What an app does

Nothing. A style that targeted a `dropdown__join` class targets the matching `dropdown__tunnel` class.

## 83. Escape closes the innermost popup first

A popup opened inside another popup now takes Escape first and keeps it. In WidgetOptions, Escape on an open Window group select closes only the select, and a second Escape closes the panel. Before, one Escape closed both.

Every popup that uses `useDismissListeners` joins one stack per document: WidgetOptions, Select, Combobox and the other listbox drops, ColorPickerPopover, TagInput, DynamicInput, SideNav's floating panel, the Video rate menu and DropdownMenu. One Escape listener per document closes the popup opened last and stops the key there. A popup that handles Escape itself, such as a DropdownMenu with its filter (`escape: false`), keeps the key, so the popup under it stays open. A press inside a popup higher in the stack no longer counts as outside for the popups under it, even when that popup sits in a portal. Dialogs already stopped at an open Select or menu and still do.

### What an app does

Nothing. A popup that called `useDismissListeners` keeps the same parameters. The hook now reads `onClose`, `escape` and the refs on every render, so passing a new function each render no longer re-registers the listeners.

## 84. InputIcon takes every Status tone, and wordmarks scale down to fit

`InputIcon` `tone` was `'color' | 'theme'`. It is now `'color' | 'theme' | StatusTone`, the same tones as Status: primary, secondary, tertiary, neutral, success, warning, danger and info. A Status tone paints the highlight parts, such as the pressed arm of a d-pad, the ball of a joystick or the coloured GameCube buttons, in the colour of that tone, with the same thin gap in the page background that `theme` cuts. `theme` still paints them in the primary colour, so it matches `primary`.

```tsx
<InputIcon family="generic" name="joystick-highlight" tone="danger" />
```

`PixelWordmark` sets its width from its size and keeps its height in proportion, so a wordmark in a box narrower than the art scales down whole. Before, it kept its full height and drew the art smaller inside, which left empty space above and below. `Logo.Wordmark`, `BrandWordmark` and `Logo.Combined` draw through it. An inline `Logo.Combined` now fits its box: the mark keeps its size and the name shrinks beside it.

The gallery pages under Core · Brand lay their variants out in grids that wrap, so nothing spills out of its cell at any width. The Icon files rows wrap too, and a 512 pixel icon scales down when the page is narrower.

### What an app does

Nothing. A `tone` of `color` or `theme` draws as before, and a wordmark in a box wide enough for it draws at the same size.

## 79. SettingsRow swaps its description for the hint in place, every row has a description and a hint, and compact rows keep a minimum size

A settings row now shows one line under its title. At rest it is the description. While the pointer or the keyboard is on the control, the line shows the row hint instead, in the same place, with no change in row height. Where a part of the input has its own hint, that hint wins while the part is pointed at: a segment, a multi option, a toggle state, a slider value as it moves, and the option highlighted in an open select. The line keeps room for the longest hint it can show, so the row never grows or shrinks as the hints change. The hint starts on the same left edge as the title and the description, and the dark rule that stood to its left is gone. A part's hint starts with the name of that option or value in bold, as in **Fullscreen** Takes over the display; the row hint and the description have no bold part.

`description` and `hint` are now required. A row without a description says so with `noDescription: true`; a row with neither fails the typecheck. Without a description the line rests on the hint. Content rows in a SettingsSection carry the same two fields, and `filterSettingsSections` matches the hint and the description.

```ts
type SettingsDescription =
  | { description: string; noDescription?: never }
  | { noDescription: true; description?: never };

interface SettingsItemFields {
  id: string;
  title: string;
  hint: string;
  keywords?: string;
  input: SettingsInput;
  disabled?: boolean;
  lock?: string | null;
}

type SettingsItem = SettingsItemFields & SettingsDescription;

interface SettingsRowLook {
  compact?: boolean;
  readOnly?: boolean;
  flash?: boolean;
  className?: string;
}

type SettingsRowProps = SettingsItem & SettingsRowLook;

interface SettingsContentFields {
  id: string;
  content: ReactNode;
  title?: string;
  hint: string;
  keywords?: string;
  lock?: string | null;
}

type SettingsContentRow = SettingsContentFields & SettingsDescription;

type SettingsSectionRow = SettingsItem | SettingsContentRow;
```

A select in a row draws the standard option list under its control, as wide as the control, and no longer squeezes each option's label out with its hint. Select takes `onActiveChange`, called with the value of the option the keyboard or the pointer highlights, and with `null` when none is. RadioGroup options take a `hint`, reported through `onHint` or the nearest HintScope.

```ts
interface SelectOptionsProps {
  onActiveChange?: (value: string | null) => void;
}

interface SelectItemsProps<T, F extends FieldOf<T>> {
  onActiveChange?: (value: ValueOf<T, F> | null) => void;
}

interface RadioOption<T extends string = string> {
  hint?: Hint;
}

interface RadioGroupProps<T extends string = string> {
  onHint?: HintReport;
}
```

Compact rows are at least `--settings-row-compact-h` (40px) tall. A slider, a select, a text, password, pattern or tags input takes half the row up to 256px and never less than `--settings-row-compact-control-w` (160px). The description sits in a tooltip on the title as before, and the hint shows in a bubble under the control while it is pointed at, so the row stays one line. Radio options in a compact row drop their subtitles; their hints show in the same bubble.

### What an app does

Give every settings row and every content row a `hint`, and a `description` or `noDescription: true`. A row that used `hint` as text under a missing description moves that text to `description`. A style on `.settings-row__hint` no longer needs a border or a left padding.

## 85. The usage guide tooling is now named guide, and Tessera moves to standards 0.6.0

The usage guide tooling is now named guide everywhere, with no alias:

- In `tessera.config.json`, the object that holds `usage`, `out`, `tree` and `tsconfig` is `guide`, at the top level and in each `apps` entry. `guide.out` defaults to `guide`.
- The command that checks the usage files and writes the app guide is `tessera guide`, or `brock tessera guide` in a Brock app.
- The `package.json` script that builds the guide is `guide`. `tessera new` runs `pnpm guide` after it writes a part when the package has that script.
- Tessera ships its guide in `guide/`, exported as `@drizztdourden08/tessera/guide/*`. The README of an app guide links to `node_modules/@drizztdourden08/tessera/guide/`.
- `@drizztdourden08/tessera/config` exports the type of the usage mode as `GuideUsage`.
- The check writes each example to a `.guide-examples` folder beside the app views.

`RENAMES.json` lists each moved path in a new `configKeys` group, by file: the `tessera.config.json` keys, the same keys under `apps.*`, and the `package.json` script. Its `removedExports` notes the export path, and `components` the type.

Tessera now depends on `@drizztdourden08/standards` `^0.6.0` and calls the shared workflows at `@v0`; 0.6.0 holds everything 1.0.5 did. Its word rule bans the names of one kind of tool and of its vendors in prose, comments, strings and identifier segments: `local/no-tool-brand-words` in ESLint, `BROCK007` in markdownlint and the same rule in `standards prose`. Every check reads the ignored paths from git, so `.gitignore` ignores every dot-folder with `.*/` and lists the tracked ones as exceptions, and the tool folder globs are gone from `.jscpd.json`. `pnpm lint` runs `standards knip` in place of plain knip. `standards sync --check` fails on a changeset that asks for a major bump.

### What an app does

1. In `tessera.config.json`, rename the object that holds the usage settings to `guide`, at the top level and in each `apps` entry. Brock's replay does it from `configKeys`.
2. Rename the `package.json` script that builds the guide to `guide`, if the app has one.
3. Run `brock tessera guide`. It writes the app guide to `guide/` unless `guide.out` names another folder. Delete the folder the app guide used before, and update `.gitignore` if it named that folder.
4. Point every import of a file from the shipped guide at `@drizztdourden08/tessera/guide/*`.
5. Rename uses of the usage mode type to `GuideUsage`.
6. On `@drizztdourden08/standards`, depend on `^0.6.0`, call the workflows at `@v0` and run `standards knip` in place of knip.

## 86. Stepper keeps its size as the current step moves

A Stepper now keeps a summary line under every step by default, so it keeps the same width and height from the first step to the last, and nothing around it moves on Next, Back or a jump. Each label also keeps the room it needs in bold, so a label that wraps once it becomes the current step no longer grows the row. Sub-steps already show under their step at every step and keep their room.

`reserve` picks what the Stepper keeps room for:

| Value | What it does |
|---|---|
| `'summaries'`, the default | Every step keeps a summary line, empty until the step has a summary. |
| `'none'` | A step takes a summary line only while it has one, as before. |

The new type is `StepperReserve`.

### What an app does

Nothing for a Stepper that shows summaries, such as the one inside `Wizard`: it stops moving. A Stepper that never shows summaries and wants its old height passes `reserve="none"`.

## 87. Overview pages open on a lead, short points and a Use instead line

The head of every gallery Overview page now has three parts: a one-sentence lead (`description`), 3 to 6 short `points`, and an optional `instead` that names a better sibling. All three take a small markup that draws Tessera's own parts: backticks draw `Code`, `**bold**` draws `Strong`, `_word_` draws `Em`, `[[Ctrl+S]]` draws `Shortcut` keycaps, `[Pressable]` links to that component's page, and `[label](#/story/...)` draws a `Link`. HTML is never drawn. `stories/_template/README.md` has the limits, the tone and examples under Writing a description. A new test lists the pages that break the limits; it only reports until every page fits, then it fails.

### What an app does

Nothing. This changes the gallery only.

## 88. The widget pin is a menu, PinMode drops with-app, and the title bar takes actions of its own

The pin button of a widget in its own window stepped through three states, and nobody could tell which one was on. It is now an icon button that opens a menu of labelled choices, a DropdownMenu with radio items:

| Choice | Icon | What it does |
|---|---|---|
| Off | `pin-off` | Stacks like any other window |
| On top | `pin`, lit | Stays over every other window |

The button shows the icon of the current choice and lights up while the window stays on top; the menu marks the current choice and gives each one its icon and a line on what it does. Its accessible name says the current choice: `Pin: On top. Click to choose`.

`PinMode` is `'off' | 'top'`. The old `'with-app'` meant the window followed the main window, which the Sync with main window row of WidgetOptions now does, so the Pin row of WidgetOptions has two choices too. `Widget` no longer takes `onTop`: with two choices, the window is on top exactly when `pin` is `'top'`.

`Widget` takes `titleBarActions`, buttons of the widget's own drawn in the title bar before the built-in ones. `WidgetManager` takes `widgetActions(id)` for the same on every widget of a dock. Use an `IconButton` with the class `widget__btn` so it matches the built-in buttons.

| Before | Now |
|---|---|
| `PinMode` `'with-app'` | `'off'` with `sync: true` in the window options |
| `<Widget onTop={…} />` | removed; the pin button lights up while `pin` is `'top'` |
| a node portalled into `.widget__titlebar-actions` | `<Widget titleBarActions={node} />`, or `<WidgetManager widgetActions={(id) => node} />` |
| strings `widgets.pinTitleOff`, `pinTitleTop`, `pinTitleWithApp` | `widgets.pinTitle(choice)`, which names the current choice |
| strings `widgets.pinWithApp`, `pinWithAppHint` | removed |

### What an app does

1. Read a saved `'with-app'` pin as `'off'` and turn sync on for that window.
2. Drop `onTop` from every `Widget`.
3. Pass extra title bar buttons through `titleBarActions` or `widgetActions` in place of a portal into `.widget__titlebar-actions`.
4. An app that overrides the widget strings renames `pinTitleOff`, `pinTitleTop` and `pinTitleWithApp` to one `pinTitle(choice)` function, and drops `pinWithApp` and `pinWithAppHint`.

## 89. Brock has a mascot: Flint

Brock's mascot is Flint, a small round stone cut in flat facets like the Brock logo, with the logo's greys and its orange chip, a flat base it sits on and two stone hands. Nothing an app has today changes; this section lists what is new.

- `<Mascot brand="brock" />` draws Flint, and `<AnimatedMascot brand="brock" animation="wave" />` moves it. Flint has every animation Sentri has, plus two of its own:

| Animation | What Flint does |
|---|---|
| `idle` | breathes as a slight squash on its base; glances, blinks twice |
| `move` | scoots forward in small hops, hands swinging |
| `jump` | squats, springs up, lands with a thud |
| `wave` | tips onto one edge and waves the right hand |
| `scan` | looks around, the smile trailing the eyes |
| `happy` | two hops, hands flapping, wide smile |
| `alert` | jolts up, hands beside its face, mouth in an O |
| `point` | raises the right hand and jabs it towards something |
| `blink` | blinks twice |

- `MascotName` is `'sentri' | 'flint'`. `ChosenMascot` takes `mascot="flint"`, and with `mascot="auto"` picks Flint for `brand="brock"` or inside `data-palette="brock"`.
- `ChosenMascot`'s `animation` takes any mascot's animation name. A name the chosen mascot lacks plays its idle.
- `MascotPose` takes `handAngles: { left, right }`, the turn of Flint's hands in degrees, the way `podAngles` turns Sentri's pods.
- `BrandSceneData` takes `smooth: true` for vector art: `BrandScene` and `sceneMarkup` then draw anti-aliased edges in place of crisp pixels, and `pnpm icons` renders the mascot's PNGs smooth. Sentri leaves it out and stays crisp.
- `pnpm icons` writes Flint's files to `brand/brock/mascot/`.

## 90. The Core pages open on a short lead and points

Every Overview page under Core (Setup, Brand, Colours, Typography, Text, Icons and Tokens) is rewritten to the description format of section 87: a one-sentence lead, 3 to 6 short points and, where a sibling is the better pick, a Use instead line. The Setup guides and `textElementStories` take `points` and `instead` for this.

### What an app does

Nothing. This changes the gallery only.

## 91. Archipelia has a mascot: Pelago

Archipelia's mascot is Pelago: three purple spheres that press into each other and drift apart, never still, with two floating eyes above and two floating hands at its sides. The eyes and hands are not attached; they follow the body a beat late. It hovers over a ring of dots, after the Archipelia mark. Nothing an app has today changes; this section lists what is new.

- `<Mascot brand="archipelia" />` draws Pelago, and `<AnimatedMascot brand="archipelia" animation="alert" />` moves it. Pelago has every animation Sentri has:

| Animation | What Pelago does |
|---|---|
| `idle` | hovers and breathes; the hands sway, the eyes glance right, blink, glance left |
| `move` | leans into the travel, the spheres stretch forward, the hands trail behind |
| `jump` | squashes, stretches tall, floats with the hands flung up, lands in a wobble |
| `wave` | lifts the right hand high and waves it three times with a squint |
| `scan` | the eyes drift out left, blink across to the right, then rise to peek up |
| `happy` | two tipping hops, the spheres bounce, the hands flap, the eyes smile |
| `alert` | the spheres bunch tight together, the hands shoot up, the eyes go wide |

- Under every animation the three spheres drift on slow loops of their own, so Pelago is always moving. Reduced motion stops the drift too and shows Pelago at rest.
- `MascotName` adds `'pelago'`. `ChosenMascot` takes `mascot="pelago"`, and with `mascot="auto"` picks Pelago for `brand="archipelia"` or inside `data-palette="archipelia"`.
- `MascotPose`: `look` floats Pelago's eyes, and `handAngles` (or `podAngles`) lifts its hands.
- `MascotMotion` takes `ambient`, an animation that loops under every clip and keeps running when the clip changes. `MotionTrack` takes `lag`, a delay in milliseconds, so a part can follow another a beat late. A part can carry more than one track in a clip, and their moves add up. A part can wrap more than one node: list it once per node in `parts`.
- `SceneGroupNode` and `groupNode` take `goo`, a blur radius in art units: the group's shapes melt into one soft shape through an SVG filter. `BrandScene` and `sceneMarkup` both draw it, so `pnpm icons` renders it too.
- Svg primitives add `SvgFilter`, `SvgFeGaussianBlur` and `SvgFeColorMatrix`.
- `pnpm icons` writes Pelago's files to `brand/archipelia/mascot/`.

## 92. The Primitives pages open on a short lead and points

Every Overview page under Primitives (Layout, Display, Actions, Inputs, Feedback and Navigation) is rewritten to the description format of section 87: a one-sentence lead, 3 to 6 short points and, where a sibling is the better pick, a Use instead line.

### What an app does

Nothing. This changes the gallery only.

## 94. The Composites pages for dialogs, wizards, menus, inputs and widgets open on a short lead and points

Every Overview page in the Composites groups Dialogs, Overlays, Wizard, Navigation, Menus, Actions, Inputs, Forms and Widgets is rewritten to the description format of section 87: a one-sentence lead, 3 to 6 short points and, where a sibling is the better pick, a Use instead line. The DropdownMenu page writes its lead as a plain string the check can read.

### What an app does

Nothing. This changes the gallery only.

## 93. Screens, SideNavLayout and Hero fit small windows and phones

The owner tried Brock apps at real window sizes, from 2560 × 1440 down to a 360 × 800 phone. Three parts wasted room or broke in small windows; they now follow the room they have.

### The screen card fills a small window

The tiers of section 45 stay, but the tier with no gap starts much earlier, and the space inside the card shrinks with it:

| Room of the layer | Gap on every side | Inside the ScreenWindow |
|---|---|---|
| 1280 px wide and 800 px high or more | 2xl plus 5% of the smaller side | xl |
| under that | xl plus 3% of the smaller side | xl |
| under 960 px wide or 600 px high | the minimum | lg |
| under 840 px wide or 560 px high (was 480 and 440) | none: square corners, no border, the floating switch inside the card | md, with an md gap under the title bar |

A 960 × 540 window, a portrait tablet and a phone now get the whole layer. ScreenPage drops its header, body and footer padding to md at the same tier, and InfoScreen drops its column padding there too. Nothing changes for an app. A host stylesheet that keyed its own rules on the old 480 and 440 px container query moves them to 840 and 560.

### SideNavLayout folds into a bar under 640 px

SideNavLayout now measures its own width with a container query (`container: side-nav-layout / inline-size`). Under 640 px wide, the nav leaves the row:

- a bar runs along the top of the layout: a menu button, then the search field when the nav has one, or else the icon and name of the current page;
- the menu button opens the whole nav as a drawer over the page, with a scrim behind it; picking a page, Escape or a click outside closes it, and focus goes back to the menu button;
- the search lives in the bar, so its results fill the pane under it with nothing on top.

The drawer, not a bottom bar or a row of tabs, because both kinds of host use it: a settings hub has ten pages or more in groups, plus a search, which a bottom bar of four or five places cannot hold, and a scrolling row of tabs hides most pages; a Brock app home has few pages, and the drawer costs it one 40 px bar. Over 640 px nothing changes, and `narrow` still keeps the strip of icons.

The markup gains a level: `.side-nav-layout` is the container and holds `.side-nav-layout__frame`, which holds `.side-nav-layout__bar`, `.side-nav-layout__nav` (the drawer, `display: contents` over 640 px) and `.side-nav-layout__pane`. The `ref` still points at `.side-nav-layout`. A host stylesheet that set the gap or the direction of `.side-nav-layout` sets them on `.side-nav-layout__frame`.

### Hero

- The art has its own column between the intro and the aside, and scales down to fit it (`object-fit: contain`), so the aside never covers the art and the art is never cut off at the edge. `--hero-art-left` is gone; the art starts where the intro ends.
- With an aside, the aside column is never narrower than `--hero-aside-min` (320 px), so its text never wraps a word per line.
- The height is `clamp(var(--hero-h-min), 60cqh, var(--hero-h))`: 408 px in a tall room, down to 288 px (`--hero-h-min`) in a short one. `cqh` reads the height of the ScreenLayer around the hero, or of the window when there is none, so a 540 px tall window gets a 324 px hero. At a given size, changing what the hero holds still never resizes it.
- Hero measures its own width with a container query (`container: hero / inline-size`). Under 720 px wide it stacks: tools, then the intro with the art scaled down behind its right side, then the aside, the facts and the panel across the full width. A stacked hero is at least as tall as the side by side one and grows with what it holds, and the title may take two lines.

The markup gains two levels: `section.hero` is the container and holds `.hero__frame` (border, corners, backdrop, height), which holds `.hero__grid`. `.hero__main` and `.hero__bottom` are `display: contents`, and the facts panel takes `.hero__facts`. A host stylesheet that set the height, border or background of `.hero` sets them on `.hero__frame`.

### What an app does

- Nothing for the layout: every change is inside Tessera.
- Replace `--hero-art-left` if a host stylesheet read it; the art is placed by the grid now.
- Move host rules from `.hero` to `.hero__frame`, and from `.side-nav-layout` to `.side-nav-layout__frame`, as above.

## 95. SettingsRow puts its control under the text in a narrow row

A full SettingsRow used to keep its text and its control side by side at any width, so on a phone a 256 px select squeezed the title and description to a word or two per line. The row now wraps: the text keeps at least `--settings-row-text-min` (192 px), and when the text and the control no longer fit side by side, the control moves under the text, still on the right. Small controls such as a toggle, a colour or a keybind stay beside the text down to about 300 px. Compact rows don't change.

### What an app does

Nothing. A host stylesheet that set `grid-template-columns` on `.settings-row` drops it: a full row is now a wrapping flex row, and only `.settings-row--compact` is a grid.

## 96. The Composites pages for data views, lists, settings, layout, windows, screens, content and input devices open on a short lead and points

Every Overview page in the Composites groups Data views, Lists, Settings, Layout, Windows, Screens, Content and Input devices, and the Data engine page, is rewritten to the description format of section 87: a one-sentence lead, 3 to 6 short points and, where a sibling is the better pick, a Use instead line.

### What an app does

Nothing. This changes the gallery only.

## 97. ContentHeader: the page header is its own component

The header every screen page shows (an icon and a title over a fading backdrop, a strip after the title and actions at the end) is now `ContentHeader`, so any container can carry it: a card, a panel or a page. ScreenPage, every screen kind and SettingsPage draw it, and they look the same as before.

```tsx
<ContentHeader
  icon={<Icon name="settings" />}
  title="General"
  strip={<HeaderAnchorNav items={sections} activeId={section} onSelect={setSection} ariaLabel="General sections" />}
  actions={<Button size="sm">Reset</Button>}
/>
```

- `backdrop`: leave it out for the default art, pass a scene of your own, or `null` for a plain header.
- `compact`: the slim row ScreenPage switches to once its body scrolls.
- `level`: the heading tag of the title, 1 to 4, `h2` by default. `titleId` sets the title's id, so the container can name itself after it with `aria-labelledby`.
- `live`: a screen reader reads each new title.

### What an app does

Nothing, unless a host stylesheet styles the header through its classes. The classes move from ScreenPage to ContentHeader, and the compact modifier moves from the page to the header:

| Was | Now |
|---|---|
| `screen-page__head` | `content-header` |
| `screen-page__backdrop` | `content-header__backdrop` |
| `screen-page__art` | `content-header__art` |
| `screen-page__icon` | `content-header__icon` |
| `screen-page__title` | `content-header__title` |
| `screen-page__actions` | `content-header__actions` |
| `.screen-page--compact` on the page | `.content-header--compact` on the header |
| `--screen-page-head-h`, `--screen-page-head-h-compact` | `--content-header-h`, `--content-header-h-compact` |

## 98. Brand palettes ship in the package

The palettes of the family apps are now part of Tessera: `@drizztdourden08/tessera/palettes/rotp.css`, `archipelia.css` and `brock.css`. Each one sets the palette seeds under `[data-palette="<app>"]`. Brock's palette is new: the logo's orange `#f0862b` as the accent, its stone greys and a neutral charcoal. The gallery's app switcher shows it.

### What an app does

An app that copied a brand's seeds into its `theme.css` can import the palette instead and set the attribute on the root, so later palette changes arrive with a normal upgrade:

```ts
import '@drizztdourden08/tessera/palettes/brock.css';
document.documentElement.dataset.palette = 'brock';
```

Seeds an app sets in `theme.css` still win, because `theme.css` is unlayered. `tokens.json` and `splash-tokens.css` carry the Brock palette too.

## 99. Hero takes many kinds of backdrop and art

`backdrop` used to take any node and always drew the brand gradient under it, and `art` took only an image. Both now name their kind, so a host can pass a live scene, a picture, a pattern or a colour:

```tsx
<Hero backdrop={{ kind: 'node', node: <SceneBackdrop /> }} art={{ kind: 'image', src: heroArt, pixelated: true }} title="Randomizer" />
<Hero backdrop={{ kind: 'image', src: nightPng, fit: 'cover', position: 'center bottom', pixelated: true }} title="Randomizer" />
<Hero backdrop={{ kind: 'image', src: patternSvg, fit: 'tile', tileSize: '48px' }} title="Randomizer" />
<Hero backdrop={{ kind: 'color', color: '--c-tag-violet-dim' }} title="Randomizer" />
<Hero backdrop={null} shade="none" title="Randomizer" />
```

- `backdrop` left out draws the brand gradient of `brand`, as before; `null` draws none, so the frame shows `--c-layer`.
- `{ kind: 'node', node }` fills the hero behind everything. The node's root gets the full width and height, and the layer is a size container named `hero-backdrop`, so the scene can use `cqw` and `cqh`. A scene that places itself with `position: absolute; inset: 0` fills it too.
- `{ kind: 'image', src }` takes a PNG, JPG, WebP or SVG by URL. `fit` is `cover` (the default), `contain` or `tile`; `position` takes any CSS background position; `tileSize` sets the size of one tile; `color` fills the space around a contained or see-through image; `pixelated` keeps pixel art sharp.
- `{ kind: 'color', color }` takes any CSS colour, or a token name such as `--c-surface`, which Hero wraps in `var()`.
- `art` is `{ kind: 'image', src, alt, pixelated }` or `{ kind: 'node', node, label }`. A node takes the height of the art column and keeps its own ratio, so an `svg` with a `viewBox` scales like an image; it sits bottom left beside the intro and bottom right when the hero stacks. A `label` names it to screen readers; without one it is hidden from them.
- `shade` sets the dark fade that keeps the text readable: `fade` (the default, the old shade), `scrim` (stronger, and it also dims the whole backdrop and art, for a busy picture) or `none`.

New types: `HeroBackdrop`, `HeroImageFit` and `HeroShade`, beside `HeroArt` and `HeroProps`. The backdrop layer takes a modifier class for its kind (`hero__backdrop--brand`, `--node`, `--image`, `--color`), and `data-fit` on an image.

### What an app does

- A host that passed a scene as `backdrop={<Scene />}` passes `backdrop={{ kind: 'node', node: <Scene /> }}`. The brand gradient no longer draws under a scene; a scene with see-through parts that relied on it draws its own sky.
- A host that passed `art={{ src, alt, pixelated }}` adds `kind: 'image'`.
- A host stylesheet that set the background of `.hero__backdrop` sets it on `.hero__backdrop--brand`, or passes the colour or image as `backdrop`.

## 100. ScreenWindow can take a page header as its top, UtilityScreen copies rotp's update dialog, and InfoScreen drops the page header

Section 80 made every screen kind show the page header inside its window. The owner changes that rule for two of them: UtilityScreen puts the header at the top of the window itself, and InfoScreen shows no page header at all. WorkspaceScreen and StageScreen keep the page header inside the window, as before.

| Screen kind | Top of the window | Page header |
|---|---|---|
| WorkspaceScreen | the title bar, with the close button | inside the window, on every page |
| StageScreen | the title bar, with the close button | inside the window, with the toolbar and Done |
| UtilityScreen | the page header itself, with the close button at its end | none inside: the header is the top |
| InfoScreen | the title bar, with the close button | none |

### ScreenWindow takes `header`

The title bar stays the default. Pass `header` to make a ContentHeader the window's top edge instead, inside the window's border and corners. `title` is the header's title and names the dialog; the close button sits last in the header's actions.

```ts
type ScreenWindowHeader = Pick<ContentHeaderProps, 'icon' | 'backdrop' | 'strip' | 'actions' | 'compact' | 'level' | 'live'>;

interface ScreenWindowProps {
  // ...as before
  header?: ScreenWindowHeader; // left out: the title bar
}
```

```tsx
<ScreenWindow title="Players" header={{ icon: <Icon name="users" />, actions: <Button size="sm">Invite</Button> }} onClose={close}>
  <PlayerList />
</ScreenWindow>
```

With `header` the window has no padding and no gap, and no card sits inside it: the children pad themselves, so a scrolling body reaches the window edge. `subtitle` and `extra` belong to the title bar and do not show with `header`; in development the window warns when they are passed together. Under 840 px wide or 560 px high the header's side padding drops to md, as ScreenPage's does.

### UtilityScreen

UtilityScreen is now laid out as rotp's UpdateDialog, with one difference: the header at the top of the window is a ContentHeader carrying the status, where rotp has a title bar. There is no ScreenPage card inside the window any more.

- The header shows the status: `status.title` is its title and names the window, the tone picks the icon (a spinner while busy), and the success, warning and danger tones colour it. The close button sits at its end.
- One column under it, with one md gap between every block: the message, the settings, the children, the notes and the progress. The column starts xl under the header and sits 2xl from each side, as rotp's body sits inside its dialog padding. It scrolls when the window is too short.
- The footer stays in view: `report` is a rule over the column's width with the bug button at its end, and `report.footnote` is a short line beside it, as rotp's footnote. The actions sit under it, at the right, lg from the window edge.
- `title` is gone: `status.title` names the window.
- Under 840 px wide or 560 px high the window fills the layer, as in section 93, and the column, the rule and the actions sit md from the sides.

```ts
interface UtilityScreenReport { onClick: () => void; label?: string; footnote?: ReactNode }
```

The class `utility-screen__column` is gone: `utility-screen__body` is the column itself, a ScrollArea. The footer holds `utility-screen__footnote` (the rule, `utility-screen__footnote-text` and `utility-screen__report`) and `utility-screen__actions`.

### InfoScreen

InfoScreen shows no page header. Its window keeps the title bar with the title and the close button, and the reading column scrolls right under it in `info-screen__body`, a ScrollArea. `icon`, `heading` and `backdrop` are gone; put the app name in `lead` with the logo.

### The checks

- ScreenPage warns in development when its icon or title is missing; the message now names WorkspaceScreen and StageScreen, the kinds that always show it.
- A screen kind warns when it gets a prop that would change its header: `pageHeader` on WorkspaceScreen, StageScreen and UtilityScreen, and `pageHeader`, `icon`, `heading` or `backdrop` on InfoScreen, which has no page header.

### What an app does

- UtilityScreen: drop `title`; `status.title` names the window. Move a line that sat next to the report button into `report.footnote`. A host stylesheet that styled `.utility-screen__column` styles `.utility-screen__body`.
- InfoScreen: drop `icon`, `heading` and `backdrop`, and put the app name in `lead`, for example as an `H2` under the logo. A host stylesheet that reached the column through `.info-screen .screen-page__body` uses `.info-screen__body`.
- A custom screen can use `header` on ScreenWindow for a header at the window level, in place of a ScreenPage card inside.

`RENAMES.json` lists the removed props and the class.

## 101. ChosenMascot draws none for a brand without a mascot

With `mascot="auto"`, `ChosenMascot` (and so `CommandPalette`) used to fall back to Sentri when neither the `brand` nor the page's `data-palette` named an app with a mascot. An app on such a brand then showed Relic of the Past's mascot. It now draws nothing in that case; the wrapping `span.chosen-mascot` stays, with `data-mascot="none"`.

`mascotForBrand(brand)` is new in `@drizztdourden08/tessera/brand`: it returns the mascot of a brand (`'sentri'`, `'flint'` or `'pelago'`), or `null`.

### What an app does

An app that wants a mascot whatever its brand names one: `mascot="sentri"`, or `mascot={mascotForBrand(brand) ?? 'sentri'}`. An app that kept its own brand to mascot table can drop it for `mascotForBrand`.

## 102. A sub-menu lines up with its parent's top or bottom, and every item keeps the mark and icon columns

A DropdownMenu sub-menu now opens level with its parent menu. Its top edge sits on the parent's top edge when it still reaches the open row and fits on screen; otherwise its bottom edge sits on the parent's bottom edge. The tunnel then runs from that edge down or up to the open row, so both menus share one straight edge with square corners on that side, and only the other side keeps its curve. A sub-menu that falls short of the row by less than one curve grows by that much to line up. Only when neither end lines up does it sit on the row with its first item level with the row, curved on both sides as before. It still opens on the left without room on the right.

Before, a sub-menu opened from the first row stood 4 px below the parent's top with a small curve on each side, so the top edge stepped. The tunnel's straight edges now draw over both menus' borders, so the join stays flush at 100, 125 and 150 % zoom without a seam at the corners.

Every item in a panel keeps the same columns: the mark, the icon, the label, then the shortcut or the sub-menu chevron. A sub-menu row now reserves the mark column like the other items, so its icon lines up with a checkable item's icon. A checkable item shows a dim check while it is off, and every radio item shows a ring, with a dot in the selected one. Each panel reserves the mark and icon columns on its own, as soon as one of its items uses them.

New classes: `dropdown__tunnel-edge` draws the tunnel's straight edges, `dropdown__radio-ring` holds the radio dot, and `dropdown__mark--off` marks a check that is off or a radio that is not selected. The sub-menu carries `data-join-align` set to `top`, `bottom` or `middle`, and the tunnel body takes `--tunnel-lit-top` and `--tunnel-lit-height` for the open row's highlight.

### What an app does

Nothing. A style that drew the tunnel's edges through `dropdown__tunnel-body` targets `dropdown__tunnel-edge`.

## 103. Brand palettes sit in the ds.palette layer

The brand palettes of section 98 (`@drizztdourden08/tessera/palettes/*.css`) were unlayered, so an app's `theme.css` only won when it was imported after them. They now sit in the `ds.palette` layer with Tessera's own palette, and seeds an app sets in its unlayered `theme.css` win whatever the import order.

### What an app does

An app that imported a palette with `@import '...' layer(ds.palette)` to work around this can drop the `layer(...)`; both work.

## 104. A sub-menu lines up with its row before it sits in the middle, picking a check keeps the menu open, and menus follow the gallery zoom

A DropdownMenu sub-menu now tries five places in order: its top level with the parent menu's top, its bottom level with the parent menu's bottom, its top level with the open row's top, its bottom level with the open row's bottom, and only then the middle of the row as before. The row cases need the sub-menu to fit on screen. In both row cases the join runs as one straight line from the row's edge into the sub-menu's edge, square on that side, and only the other side keeps its curve. The sub-menu's first item may then sit a few pixels off the row's label line.

When the open row is the first or last row of its menu, the tunnel's edge on that side now runs straight along the parent's edge, with the parent's corner square, instead of a small step with two small curves. A sub-menu that is also a parent, such as the middle panel of File, New, Preset, draws both joins this way.

Checkable and radio items keep the menu open when picked, by mouse or by Enter or Space: the mark changes in place and focus stays on the item. Every other item, a leaf in a sub-menu included, still closes every open level. `closeOnSelect={false}` still keeps the menu open for every item.

Sub-menus now place themselves right inside a page or frame scaled with CSS `zoom`, such as the gallery's zoom levels. Before, their offsets were scaled twice and a sub-menu at 150 % opened 42 px away from its parent.

`data-join-align` on a sub-menu now also takes `row-top` and `row-bottom`. The gallery adds Sub-menus inside sub-menus, renames the third join example Level with the row, and the View menu shows a toggle and a radio sub-menu that keep the menu open.

Select, Combobox and the DropdownMenu trigger also follow CSS `zoom`: the list's width, the attach width that draws the join with its trigger, the room it measures and its fallback position were read in screen pixels and used as CSS pixels, so at 150 % the list grew wider than its content and the join's curve stood off the trigger. Tag fitting and scrolling the active option into view read the zoom too. In browsers without CSS anchor positioning, sub-menus now render in the popover layer next to the menu instead of inside it, so the menu's clip no longer cuts them off from the second level on; they keep the menu's look, clicks inside them no longer count as outside the menu, and closing the menu from a sub-menu returns focus to the trigger.

### What an app does

An app that closed the menu by hand after a checkable or radio item, or that passed `closeOnSelect={false}` only to keep toggles open, can drop that code. An app that wants a toggle to close the menu closes it in the item's `onSelect`.

## 105. Pelago is an island spirit

Archipelia's mascot Pelago is drawn again from scratch. The three purple spheres with eyes and gloved hands are gone. Pelago is now a small floating island of faceted purple-grey stone with a few violet tufts and a crystal spire on top, a glowing violet crystal set in its face, and two calm glowing eyes on the crystal. Four smaller islets orbit it, joined to it and to each other by thin threads of light, the way Archipelia links many game worlds into one. Three pebbles hang below, and it still floats over the ring of dots. The islets act as its hands. The name `pelago`, the `archipelia` brand and every way to draw it stay the same.

| Animation | What Pelago does |
|---|---|
| `idle` | bobs and breathes; the islets drift to and fro along the ring, the crystal glow swells and fades, the eyes blink now and then |
| `move` | tips into the travel; the islets trail a beat behind and their threads stretch |
| `jump` | dips, rises high with the islets flung outward, snaps them back and lands with a settle and a pebble bounce |
| `wave` | the upper right islet rises beside the face and rocks side to side like a waving hand |
| `scan` | the eyes glance left, right and up; the island turns a moment after them |
| `happy` | a bounce, a brighter glow, a smiling squint, and the islets loop once around the island |
| `alert` | a jolt and a shake; the islets pull in close, the glow flares and the eyes widen |
| `point` | the upper right islet shoots out to the side and holds there on a taut thread |
| `link` | new: the threads dim, then a spark runs around the ring of islets and each thread lights up behind it; the spokes and the crystal flare last |
| `blink` | blinks twice |

- `PelagoAnimation` adds `'point'`, `'link'` and `'blink'`, so `point` and `blink` now play on Pelago as they do on Flint.
- The islets, the spark and the ring threads pass behind the upper half of the island and in front of its lower half, so in `happy` the islets go behind the island over the top and in front of it below.
- Under every animation the pebbles drift on slow loops of their own. Reduced motion shows Pelago at rest and runs no animation.
- `MascotPose`: `look` moves the eyes on the crystal, up to 1.6 units across and 1.2 up or down. `handAngles` (or `podAngles`) swings the upper left and upper right islets round the island by half the angle, up to 40 degrees, and their threads follow.
- The scene is 58 by 51 units instead of 52 by 42, so Pelago at a given `scale` is a little larger.
- A motion frame's `opacity` fades its part again. Since section 91 every track was added on top of the part's own state, which left a frame's `opacity` with no effect: Sentri's and Flint's shadows stopped fading. A frame's `opacity` now counts from the part's own opacity, so their shadows fade as they were drawn to, and two tracks that both dim a part dim it further.
- Removed with the old Pelago, which was their only user: `goo` on `SceneGroupNode` and on `groupNode`'s third argument (`GroupSpot`), the filter that `BrandScene` and `sceneMarkup` drew for it, and the Svg primitives `SvgFilter`, `SvgFeGaussianBlur` and `SvgFeColorMatrix`.
- `pnpm icons` writes Pelago's new files to `brand/archipelia/mascot/`, under the same names.

```ts
type PelagoAnimation = 'idle' | 'move' | 'jump' | 'wave' | 'scan' | 'happy' | 'alert' | 'point' | 'link' | 'blink';
```

### What an app does

Nothing, for an app that draws Pelago through `Mascot`, `AnimatedMascot`, `ChosenMascot` or the files in `brand/archipelia/mascot/`. An app that built its own scene with `goo` drops it, and one that imported `SvgFilter`, `SvgFeGaussianBlur` or `SvgFeColorMatrix` writes the `filter`, `feGaussianBlur` and `feColorMatrix` elements itself.

## 106. Every mascot plays the same ten clips

Sentri, Flint and Pelago now share one list of animations, in this order: `idle`, `move`, `jump`, `wave`, `scan`, `happy`, `alert`, `point`, `blink` and `link`. A clip name that plays on one mascot plays on all three. No existing animation changes; the missing ones are new.

| Mascot | New animation | What it does |
|---|---|---|
| Sentri | `point` | tilts right, pushes the right pod out and jabs it twice, the eyes looking that way, then pulls it back |
| Sentri | `blink` | the eyes shut like shutters twice, holding a beat each time, and the pods twitch up with each blink |
| Sentri | `link` | the left pod pulses and sends out a spark that hops pixel by pixel up the left edge to the tip, flashes there, and runs down the right edge into the right pod, which pulses; both pods lift and Sentri hops, the eyes following the spark |
| Flint | `link` | the left hand lifts a spark that leaps over the head into the orange chip, which flares, then drops into the raised right hand; it is thrown back faster, and the chip flares brightest as the left hand catches it |

- `MascotClip` is the one type for a clip name, and `MASCOT_CLIPS` lists the ten in order. They replace `SentriAnimation`, `FlintAnimation` and `PelagoAnimation`.
- `MascotAnimationNames` maps every brand to `MascotClip`. `AnimatedMascotProps` is no longer generic: `animation` is a `MascotClip` whatever the `brand`. `ChosenMascot`'s `animation` is a `MascotClip` too.
- Every mascot's motion is typed `MascotMotion<MascotClip>`, so a mascot that misses a clip fails the type check, and a test checks each one plays the ten in order.
- `MascotMotion` takes `effects`, a list of `MotionEffect` (`id`, `piece`, `at`): pieces only the moving mascot draws, on top of its art and hidden until a clip fades them in. A track on an effect counts `opacity` from 0, so a frame without one keeps it hidden. Sentri's spark and Flint's spark and chip glow are effects; the still `Mascot` and the icon files do not change.
- `SceneGroupNode` and `GroupSpot` take `hidden`, which draws the group with opacity 0.
- Reduced motion still shows every mascot at rest and runs no animation, effects included.

```ts
type MascotClip = 'idle' | 'move' | 'jump' | 'wave' | 'scan' | 'happy' | 'alert' | 'point' | 'blink' | 'link';
const MASCOT_CLIPS: readonly MascotClip[];

interface MascotAnimationNames { rotp: MascotClip; brock: MascotClip; archipelia: MascotClip }
interface AnimatedMascotProps { brand: AnimatedMascotBrand; animation?: MascotClip; /* the rest unchanged */ }
interface ChosenMascotProps { animation?: MascotClip; /* the rest unchanged */ }

interface MotionEffect { id: string; piece: BrandPiece; at: ScenePoint }
interface MascotMotion<N extends string = string> { effects?: readonly MotionEffect[]; /* the rest unchanged */ }
```

### What an app does

An app that imported `SentriAnimation`, `FlintAnimation` or `PelagoAnimation` imports `MascotClip` instead, and one that wrote `AnimatedMascotProps<'rotp'>` drops the type argument. Nothing else: `Mascot`, `AnimatedMascot` and `ChosenMascot` draw as before, with three new clips on Sentri and one on Flint.

## 107. A floating widget resizes, the widget options close like a popover, the body keeps a scrollbar gutter, the drag hint sits at the pointer, and window groups are gone

Five fixes from hands-on testing of Brock on Tessera 0.10 to 0.13.

**A floating widget resizes.** DockLayout drew no resize handles on a floating widget, so no prop a host could pass made it resizable. Each floating widget now has a handle on every edge and corner. The side held follows the pointer and the far side stays put; the size never goes below `floatingMin` and never past the main view the widget floats over. Letting go sends a `float-widget` edit with the new rectangle, the same edit a move sends, so a host that applies `LayoutEdit`s with `applyEdit` needs no change. Escape puts the widget back. The handles hide during peek and while the widget is dragged.

```ts
interface DockLayoutProps {
  // ...
  floatingMin?: Size; // default { width: 160, height: 96 }
}

interface WidgetManagerProps {
  // ...
  floatingMin?: Size;
}
```

**WidgetOptions closes like a popover.** A press on any widget title bar starts a possible drag, which cancels `pointerdown`, so the browser never sent the `mousedown` the panel listened for, and the panel stayed open. The panel now reads a press outside it on `pointerdown` in the capture phase, so no handler underneath can hide the press from it. It also closes when focus moves to something outside it, and when the window loses focus. Escape still goes through the shared `useDismissListeners` stack, so an inner popup closes first.

**The widget body keeps a gutter for the scrollbar.** The body of every widget, docked, floating or in its own window, is a slim `ScrollArea` (`scrollbar="slim"`, both axes, no fade). Its right padding is the width of the active thumb and its two margins, 9 pixels, and it gains the same bottom padding while it scrolls sideways, so the thumb never covers text. `.widget__content` is now the `scroll-area` element itself.

**The drag hint sits at the pointer.** While a widget moves inside the app, the card beside the pointer is one line: the widget name, then Shift swap, Ctrl overlay and Esc cancel, on an opaque surface at full opacity. It sits 12 pixels after and below the pointer, flips to the other side near an edge, and stays inside the part of the stage on screen. The pop out entry left the card: past the window edge, the band around the stage still says Pop out or Stays in the app. The edge strips draw at full opacity, and the compass buttons on an opaque surface.

`WindowGuideOverlay` takes `pointer`, the pointer in client pixels. Given, the card sits beside it the same way, follows it, stays inside the window and draws no scrim. Left out, the card sits centred over the scrim as before. The card is smaller in both cases.

```ts
interface WindowGuidePointer {
  x: number;
  y: number;
}

interface WindowGuideOverlayProps {
  // ...
  pointer?: WindowGuidePointer | null;
}
```

**Window groups are removed.** Snapped windows cluster on the host's side, so Tessera draws no group choice.

| Removed | Now |
|---|---|
| `WidgetOptions` props `group`, `groups`, `onGroupChange` | nothing |
| `WidgetManager` prop `windowGroups`, and `group` in `WidgetWindowOptions` | nothing; `WidgetWindowOptions` holds `sync` only |
| `WindowTitleBar` props `windowGroup`, `windowGroups`, `onWindowGroupChange` | nothing; the View sub-menu holds the pin and full screen |
| types `WindowGroup`, `WindowTitleBarGroup` | nothing |
| strings `widgets.group`, `groupAbout`, `groupNone`, `groupNoneHint`, `groupNumbered`, `groupJoinHint` | nothing |
| strings `windows.windowGroup`, `windowGroupNone` | nothing |
| strings `widgets.ghostPastEdge`, `ghostPopOut`, `ghostStays` | the pop out band past the window edge |
| classes `dock-ghost__keys`, `dock-ghost__gesture` | the card is one row, `.dock-ghost` |

### What an app does

1. Drop `group`, `groups` and `onGroupChange` from every `WidgetOptions`, `windowGroups` from `WidgetManager`, `group` from what `windowOptions` returns, and `windowGroup`, `windowGroups` and `onWindowGroupChange` from `WindowTitleBar`. Drop the `WindowGroup` and `WindowTitleBarGroup` imports, and the removed keys from a strings override.
2. Nothing to pass for resizing; a host that wants another least size passes `floatingMin`.
3. A widget whose content wrapped itself in its own scroll box, such as Brock's Performance widget, drops that box and lets the widget body scroll, or fills the body at full height and keeps a right padding of its own.
4. A host that shows `WindowGuideOverlay` while the user moves or resizes a widget window passes `pointer` from the pointer events it already reads.

## 108. Charts: Sparkline, Gauge, StatTile and StackedBar

Four small chart parts, built for a panel that updates every second, such as Brock's Performance widget. They sit in new gallery groups, Primitives · Charts and Composites · Charts, and the decision tree gains data, a chart, with one answer for each.

- `Sparkline` (primitive) draws the latest samples as a line or an area in SVG. `length` keeps room for that many samples, so a new series fills in from the right. `min` and `max` fix the domain; left out, it follows the samples. `band` shades a zone, such as a warning above 80, and `dot` marks the latest sample, in the band tone when it sits inside the band. It fills its box in width and is 32 px tall, or takes `width` and `height`. It is hidden from screen readers until it has a `label`; then it reads the latest, low and high values.
- `Gauge` (primitive) is a 270 degree meter with the value and its unit in the middle, in three sizes. Its tone follows the zone the value is in: success under 60% of the range, warning under 85%, danger above. `thresholds` move the edges, and a danger edge below the warning edge means a low value is bad, as for frame rate. `zones` tints the track; `tone` fixes the colour. It is a `meter` with its value, unit and bounds.
- `StatTile` (composite) holds a label, a big value, a unit, a delta with a trend arrow, and a `chart` slot below or beside the value. `upIs` says whether a rise is good, bad or neither, which sets the delta tone; the arrow is named Rising, Falling or Steady.
- `StackedBar` (composite) splits one bar into parts, each in a status tone or a tag colour, or the next tag colour in turn. `limit` caps the parts; the smallest beyond it join one Other part. `total` leaves the room the parts do not fill as free track. Each part has a `Tooltip` with its value and share, and `legend` lists them.

```ts
type SparklineTone = StatusTone | TagCategoryColor;
interface SparklineBand { from: number; to?: number; tone?: SparklineTone }
interface SparklineProps {
  values: readonly number[]; variant?: 'line' | 'area'; length?: number; min?: number; max?: number;
  band?: SparklineBand; dot?: boolean; tone?: SparklineTone; width?: number; height?: number;
  label?: string; format?: (value: number) => string; className?: string;
}

interface GaugeThresholds { warning: number; danger: number }
interface GaugeProps {
  value: number; min?: number; max?: number; thresholds?: GaugeThresholds; tone?: StatusTone;
  unit?: string; label?: string; size?: 'sm' | 'md' | 'lg'; zones?: boolean;
  format?: (value: number) => string; className?: string;
}

interface StatTileProps {
  label: ReactNode; value: ReactNode; unit?: ReactNode; tone?: StatusTone;
  delta?: ReactNode; trend?: 'up' | 'down' | 'flat'; upIs?: 'good' | 'bad' | 'neutral'; deltaTone?: StatusTone;
  chart?: ReactNode; chartPlacement?: 'below' | 'beside'; className?: string;
}

type StackedBarColor = StatusTone | TagCategoryColor;
interface StackedBarSegment { id: string; label: string; value: number; color?: StackedBarColor }
interface StackedBarProps {
  segments: readonly StackedBarSegment[]; total?: number; limit?: number; legend?: boolean;
  label?: string; size?: 'sm' | 'md'; format?: (value: number) => string; className?: string;
}
```

Every path is built in a memo from the samples, an update changes attributes on the same elements, and nothing remounts. The gauge eases to a new value; under reduced motion it moves at once. The words the parts speak are in a new `charts` group of the string table, so a host can replace them through `TesseraProvider`.

### What an app does

Nothing; the parts are new. An app that drew its own sparklines, gauges or split bars can swap them for these. Brock builds its Performance widget from them; the gallery page of StatTile shows one, fed with made up readings every second.

## 109. Every sub-menu joins its parent the same way, at the open row

A DropdownMenu sub-menu no longer lines up with its parent menu's own top or bottom edge. That rule from sections 102 and 104 let the tunnel fill the whole gap, so a sub-menu as tall as its parent merged into one wide panel, and deeper levels drew long shared edges and stray pieces. Every level now follows one rule: the sub-menu's top sits level with the open row's top when it fits below, else its bottom sits level with the open row's bottom, else it sits on the row as before. The panels stay apart by the gap, and the tunnel joins them only at the open row: flat into the sub-menu on the side that lines up, with the parent's curve kept, and curved on the other side.

`data-join-align` takes `top`, `bottom` or `middle`, where `top` and `bottom` now mean level with the open row; `row-top` and `row-bottom` are gone. The gallery's Where a sub-menu opens example shows a sub-menu at the first, the last and a middle row.

### What an app does

Nothing. A style that targeted `[data-join-align='row-top']` or `[data-join-align='row-bottom']` targets `top` or `bottom`.

## 110. ProgressBar draws one value, StackedBar is a primitive, and StatTile takes a size

A bar split into parts now has one home, StackedBar, so ProgressBar keeps a single value.

- `ProgressBar` drops `parts` and `legend`, and the `ProgressPart` type is gone. It takes `value`, `max`, `tone`, `secondaryValue`, `secondaryTone`, `label`, `live` and `className`, as before the multipart form. The classes `progress-bar-group`, `progress-bar__legend`, `progress-bar__key`, `progress-bar__swatch` and `progress-bar__amount` go with it.
- `StackedBar` moves from the composites to the primitives, into Primitives · Charts. It draws its own markup and uses only primitives, such as `Tooltip`. Its props do not change. The root import `@drizztdourden08/tessera` works as before; `@drizztdourden08/tessera/composites` no longer exports it or its types, which come from `@drizztdourden08/tessera/primitives`.
- `StatTile` takes `size`: `sm`, `md` (the default) or `lg`, which scale the value, the unit and the padding. `StatTileSize` is the new type.
- The StatTile page shows StatTile alone: tones, trends, chart placement and sizes. The live Performance panel moves to the Widget page, inside a real Widget.

```ts
interface ProgressBarProps {
  value: number; max?: number; tone?: ProgressTone; secondaryValue?: number; secondaryTone?: ProgressTone;
  label?: string; live?: boolean; className?: string;
}

type StatTileSize = 'sm' | 'md' | 'lg';
```

### What an app does

1. A ProgressBar with `parts` becomes a StackedBar. Each part takes an `id`; `max` becomes `total`, so the room the parts leave shows as free track; `legend` and `label` stay; a `tone` becomes `color`; a CSS `color` becomes a status tone or a tag colour.

   ```tsx
   <ProgressBar parts={[{ value: 120, label: 'Found', tone: 'success' }]} max={216} label="Checks" legend />
   <StackedBar segments={[{ id: 'found', label: 'Found', value: 120, color: 'success' }]} total={216} label="Checks" legend />
   ```

2. An import of StackedBar or its types from `@drizztdourden08/tessera/composites` imports from `@drizztdourden08/tessera/primitives`, or from the root.
3. Nothing for StatTile; `size` is new and defaults to the old look.

## 111. A click on the title bar closes an open popup

On Windows, a press on a window drag region (`-webkit-app-region: drag`) goes to the system, so the page never saw it. A click on the title bar left an open menu, select or popover open. Now:

- While any popup is open (anything on the shared dismiss stack: DropdownMenu, Select, Combobox, popovers, widget menus), the page root carries `data-popup-open`, and every drag region turns into `no-drag`. A click on the bar reaches the page and closes the popup; dragging works again as soon as it closes. Nested popups count as one: the flag stays until the last one closes.
- Every open popup also closes, innermost first, when the window loses focus or the page is hidden.
- Drag regions are marked with `data-app-region="drag"` (or `"no-drag"`). `tokens.css` turns the attribute into the region and lifts it while a popup is open. WindowTitleBar uses it.
- `APP_REGION_ATTRIBUTE` and `POPUP_OPEN_ATTRIBUTE` are exported from `@drizztdourden08/tessera/primitives`.

### What an app does

Mark its own drag regions with `data-app-region="drag"` in place of `-webkit-app-region: drag` in CSS, so a click on them closes open popups too.

## 113. ControlMenu: a dropdown of compact controls, and WidgetOptions opens in it from the gear

Section 112 is withdrawn: the widget gear does not open a DropdownMenu, and nothing it listed ships. This section takes its place, measured from 0.15.0.

`ControlMenu` is new, under Composites · Menus. It is a dropdown of settings behind one button: each row is a label with one compact control, such as a SegmentedControl, a Toggle, a Slider, a Select or a NumberStepper. It is a component of its own and not a DropdownMenu option, because DropdownMenu entries are actions, checks and radios that a menu walks with the arrow keys, while a ControlMenu row holds a control that takes the keys itself. It looks and closes like a DropdownMenu:

- the trigger and the open panel share one border, joined like the DropdownMenu trigger and its list, with the same curves;
- `ControlMenuSub` opens a sub-panel beside the panel on hover, click, Enter or the right arrow, joined at its row the way a sub-menu is (section 109), with the same safe area for the pointer. When there is no room beside the panel, as in a narrow widget window, the sub-panel opens under its row over the panel instead;
- `filter` adds a field at the top that narrows the rows by label; rows of a sub-panel show inline under its name while the field holds text;
- it sits in the top layer, or the portal where the browser has no anchor positioning, stays inside the window, follows CSS zoom, and closes through the shared popup stack: Escape closes the innermost panel first, and a press outside, a window blur or a hidden page closes it.

```ts
interface ControlMenuProps {
  trigger: MenuTrigger;
  children: ReactNode;
  label?: string;
  header?: ReactNode;
  filter?: boolean;
  filterPlaceholder?: string;
  hints?: boolean; // the hint line at the bottom, default true
  align?: 'start' | 'end' | 'auto'; // default auto: the side of the trigger with more room
  variant?: MenuVariant;
  intensity?: MenuIntensity;
  size?: MenuSize;
  disabled?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  triggerClassName?: string;
}

interface ControlMenuRowProps { label: string; hint?: Hint; about?: string; children: ReactNode }
interface ControlMenuSubProps { label: string; icon?: IconName; description?: string; hint?: Hint; children: ReactNode }
interface ControlMenuGroupProps { label?: string; children: ReactNode }
```

The shared listbox drop under Select, Combobox and the DropdownMenu trigger takes `align` too, `'start'` by default, so a drop can line up with the end of its trigger and keep the same join, mirrored. Nothing changes for an existing caller. The DropdownMenu look, trigger and sub-menu stylesheets move to `theme/dropdown-look.css`, `theme/dropdown-trigger.css` and `theme/dropdown-sub-menu.css`, so both components load them; the rules are the same.

**WidgetOptions** keeps its 0.15.0 rows and controls: Placement, Main view and Show as icon SegmentedControls, the opacity Slider, Pin, Snap and Sync with main window in its own window, the widget's own rows and the hint line. It now opens in a ControlMenu from the gear, with the title and Reset at the top, a filter, and Shortcuts as a sub-panel of rows in place of the list beside the panel. The pin menu of a widget in its own window stays a DropdownMenu and no longer squeezes against the window edge.

| 0.15.0 | Now |
|---|---|
| `<Widget onOpenOptions={(anchor) => …} optionsOpen={open} />` and a `WidgetOptions` anchored to the gear | `<Widget options={<WidgetOptions … />} />`; the gear is the trigger of the ControlMenu |
| `WidgetOptions` props `anchorRef`, `onClose` | removed; it opens and closes itself, and takes `defaultOpen` |
| `OptionRow`, `OptionRowProps` | `ControlMenuRow`, `ControlMenuRowProps` |
| classes `widget-option-row`, `widget-option-row__*` | `control-menu__row`, `control-menu__label`, `control-menu__control`, `control-menu__about`, `control-menu__about-icon` |
| classes `widget-options-aside`, `widget-options__actions`, `__rows`, `__own`, `__section`, `widget-shortcuts__row`, `__keys`, `__does` | removed; the panel is a ControlMenu with `widget-options` on it, and each shortcut is a row in `widget-shortcuts`: what it does on the left, wrapping, and its keycaps or drag on the right |
| class `widget-options__hint` | `control-menu__hint` |
| token `--widget-options-aside-w` | removed |
| strings `widgets.showShortcuts`, `hideShortcuts`, `closeHint` | removed; `shortcutsHint` describes the Shortcuts row |

`WidgetManager` keeps `settingsContent`, now rows inside the gear menu.

**Opening a widget on an edge** (review archipelia-28). A widget opened on its `defaultSide`, through `openWidget`, `useWidgetLayout().open` or `toggle`, `openStartupWidgets` or the dock fallback of `floatInMain`, now takes `defaultDockedSize` as its share of the window, kept between 12 and 45 percent, where it always took 22 percent. When that edge already holds a pane, the widget joins it as a split along the edge, and the stack shares its length evenly, where before every widget added another 22 percent pane further out. `dockOnEdge` takes the size in its fourth argument, which still takes the plain `makeRoom` boolean too:

```ts
interface DockPlace {
  makeRoom?: boolean;
  size?: number;
}

dockOnEdge(layout: WidgetLayout, id: WidgetId, edge: DockEdge, place?: boolean | DockPlace): WidgetLayout;
```

A drop on the outer strip of the dock still opens a new pane there; a drop on a pane still joins it as a tab or a split.

### What an app does

1. Pass the options of a widget as `options={<WidgetOptions … />}` on `Widget` in place of `onOpenOptions` and `optionsOpen`, and drop `anchorRef` and `onClose` from `WidgetOptions`. An app on `WidgetManager` changes nothing.
2. Rename `OptionRow` to `ControlMenuRow`.
3. An app that docked a widget on an edge it already uses and wanted a second pane further out drops it on the outer strip of the dock; opening it now joins the pane on that edge.
4. Reach for `ControlMenu` wherever a button opens a few settings that need more than menu items.

## 114. Mascot states: 29 clips in three groups, and symbol effects

Every mascot now plays 29 clips. The ten from section 106 are unchanged, byte for byte. The new ones follow the owner's state sheet, drawn for Sentri; Flint and Pelago take the same names.

| Group | Clip | What Sentri does |
|---|---|---|
| Motion | `idle-bounce` | a variant of `idle`: bounces on the spot in whole pixel steps, with bounce lines as it lands |
| Motion | `move-wobble` | a variant of `move`: rocks left and right with wobble lines and grins on the last steps |
| Motion | `jump-hop` | a variant of `jump`: crouches, springs nine pixels up with lift lines and lands with sparkles |
| Motion | `spin` | spins round twice in a ring of swooshes, showing its back, then bursts into cyan and gold sparkles |
| Expressions | `default` | the neutral face, still, blinking now and then |
| Expressions | `happy-grin` | a variant of `happy`: caret eyes, bobbing a pixel |
| Expressions | `content` | a soft squint with gently arched eyes |
| Expressions | `curious` | a tilted head and a question mark above |
| Expressions | `focused` | narrowed eyes and a small mark of effort by the tip |
| Expressions | `sleep` | closed eyes and a z, a z and a Z rising |
| Expressions | `alert-exclaim` | a variant of `alert`: an exclamation mark pops up as it flinches |
| Expressions | `love` | a pink heart beating above |
| Interactions | `working` | typing at a laptop in front of it |
| Interactions | `idea` | a bulb above lights up yellow with flashing rays |
| Interactions | `success` | squints with joy and hops in a burst of confetti |
| Interactions | `confused` | tilts hard with arched eyes under a question mark |
| Interactions | `worried` | sweat drops run down its head as it jitters |
| Interactions | `low-power` | a nearly empty red battery blinks above, eyes half shut, pods hanging |
| Interactions | `resting` | lies flat and squashed with its eyes shut and z letters rising |

- Variants are clip names of their own, so the list stays flat and any name works for every mascot. `MASCOT_CLIP_VARIANTS` maps each variant to its original.
- `MASCOT_CLIP_GROUPS` sorts every clip into Motion, Expressions and Interactions, each variant right after its original. The Mascot page's Animations section picks a mascot and shows the three groups.
- `MotionEffect` takes `fixed`: the piece sits on the stage after the body instead of riding with it, so it stays upright and still while the body tilts or bobs. Without it, an effect rides inside the body, which suits a face drawn over the eyes.
- `MascotAnimation` takes `still`, a list of effect ids the clip shows at rest. They are drawn in the resting picture, so reduced motion keeps them with no animation, and while the clip plays a frame without `opacity` keeps them shown. Effects not in the list still start hidden.
- `AnimatedMascot` draws only the effects the playing clip names in its tracks or `still`, so a clip without symbols carries none.
- Sentri's symbols are pixel art: cyan sparkles, a yellow bulb, a pink heart, a red battery, plus a question mark, an exclamation mark, z letters, sweat drops, confetti and a laptop.
- Every clip moves smoothly, as the first ten do: rotation, position, scale and opacity ease continuously between keyframes, and symbols fade in and out instead of popping. Sentri's new clips first shipped with stepped timing and are smooth now, its `link` spark glides along the edges instead of hopping pixel by pixel, and Flint's spin, battery blink and chip flicker no longer use stepped easing.

```ts
type MascotClipGroupId = 'motion' | 'expressions' | 'interactions';
interface MascotClipGroup { id: MascotClipGroupId; label: string; clips: readonly MascotClip[] }
const MASCOT_CLIP_GROUPS: readonly MascotClipGroup[];
const MASCOT_CLIP_VARIANTS: Readonly<Partial<Record<MascotClip, MascotClip>>>;

interface MotionEffect { id: string; piece: BrandPiece; at: ScenePoint; fixed?: boolean }
interface MascotAnimation { name: string; summary: string; duration: number; loop: boolean; tracks: readonly MotionTrack[]; still?: readonly string[] }
```

**Flint's states.** Flint draws all 19 new clips in its smooth facets, with its stone hands and its orange chip as an expression light: the chip flares for `idea`, `success` and `love`, dims for `sleep`, `resting` and `low-power`, and flickers between dim and lit for `worried`. Its symbols are flat vector pieces in Flint's greys and orange with the sheet's accents (a yellow bulb, a pink heart, a red battery), and its eye overlays are drawn over the face in the face's own grey, so the reduced motion picture shows shut, happy, flat or heavy lidded eyes and the symbol.

| Group | Clip | What Flint does |
|---|---|---|
| Motion | `idle-bounce` | bounces in place, a high hop then a lower one, squashing on each landing and blinking on the second |
| Motion | `move-wobble` | waddles from one corner of its base to the other, the lifted side's hand rising for balance |
| Motion | `jump-hop` | hops over to the right and back home, tipping into each hop |
| Motion | `spin` | springs up and turns a full circle around its own middle inside swoosh lines, lands with a squash and sparkles |
| Expressions | `default` | the neutral face, breathing slowly, blinking once |
| Expressions | `happy-grin` | happy arc eyes over a wide grin, wiggling and rubbing its hands together |
| Expressions | `content` | happy arc eyes and a warm smile, hands folded, rocking slowly |
| Expressions | `curious` | tilts with a hand under its chin, looking up at a bobbing question mark |
| Expressions | `focused` | heavy lids and set brows, fists up, reading along a line as a bead of sweat rolls down |
| Expressions | `sleep` | shut eyes, a dim chip and three z rising in turn as it breathes deep |
| Expressions | `alert-exclaim` | stiffens under an exclamation mark that jumps and shakes, then does a double take |
| Expressions | `love` | a beating heart, blushing cheeks and a glowing chip, hands clasped as it sways |
| Interactions | `working` | types on a laptop in front of it with both hands, eyes reading the screen |
| Interactions | `idea` | ponders, hand under chin, until a bulb pops on with rays and the chip flares as it hops |
| Interactions | `success` | hands up high, hops as confetti bursts over its head, chip bright |
| Interactions | `confused` | tips over and scratches its head under a wobbling question mark |
| Interactions | `worried` | pinched brows, trembling and wringing its hands as sweat drops roll down |
| Interactions | `low-power` | a red battery blinks above while it slumps with heavy lids and jerks half awake |
| Interactions | `resting` | settles low and wide with its hands flat out, flat closed eyes, two z drifting up |

**Pelago's states.** Pelago draws all 19 new clips in its smooth facets and keeps its depth rule: anything that orbits passes behind the island on the upper half and in front of it on the lower half. Its four islets are its hands and its mood: they race round the ring for `spin` and `success`, droop low for `low-power` and set down on the ground for `resting`, and huddle in close for `worried`. The threads show the mood too, flashing bright for `idea` and `love` and dimming for `sleep`, and the crystal glow is the expression light. Its symbols are flat vector pieces in Pelago's violets with the sheet's accents (a yellow bulb that sits on the spire, a pink heart, a red battery), and its eye overlays are drawn in the crystal's own violet, so the reduced motion picture shows the symbol and shut, smiling, narrowed or worried eyes.

| Group | Clip | What Pelago does |
|---|---|---|
| Motion | `idle-bounce` | bounces lightly on the air, squashing as it lands, the islets swinging a beat behind |
| Motion | `move-wobble` | waddles, rocking side to side with a hop per step, lower islets lifting like feet |
| Motion | `jump-hop` | two quick hops, the islets tucking in on short threads in the air and springing out on landing |
| Motion | `spin` | rises and turns right round, face edge on and back, while the islets race twice round it; sparkles pop |
| Expressions | `default` | hovers calmly, islets resting, glow steady, one slow blink |
| Expressions | `happy-grin` | happy arch eyes over a wide grin, giggling bobs, the lower islets clapping three times in front |
| Expressions | `content` | soft smiling arch eyes, a slow sway with the islets swinging behind |
| Expressions | `curious` | tilts its head at a rocking question mark while the upper right islet scratches its head |
| Expressions | `focused` | narrowed eyes, leaning in and still, a spark circling the ring, the glow bright |
| Expressions | `sleep` | shut eyes, sinking and breathing slowly, islets drooping on dim threads, three Zs rising |
| Expressions | `alert-exclaim` | an exclamation mark jumps over the spire, islets thrown up like hands, eyes wide, glow flashing |
| Expressions | `love` | a beating heart, a blushing crystal, threads flashing bright on each beat, islets drawn in like a hug |
| Interactions | `working` | leans over a laptop in front of it, eyes reading, the lower islets tapping keys in turn |
| Interactions | `idea` | ponders on dim threads until a bulb lights on the spire with rays, threads bright, a spark round the ring |
| Interactions | `success` | happy arch eyes, a leap as the islets whirl once round it, confetti bursting on both sides |
| Interactions | `confused` | tips one way then the other under a big and a small question mark, eyes darting, islets out of step |
| Interactions | `worried` | brows tipped up, sweat drops running down, shrinking and trembling with the islets huddled in |
| Interactions | `low-power` | a red battery blinks above, lids droop, it sags with islets hanging on dim threads, the glow nearly out |
| Interactions | `resting` | settles low onto its ring with islets set down around it, eyes shut, two Zs drifting up |

### What an app does

Nothing changes for an app that plays the ten clips. Pass any new name to `animation` to use a state, for example `<AnimatedMascot brand="rotp" animation="low-power" />`. A test that read the hidden effects of a mascot from its idle markup renders the clip that uses them instead.

## 115. SideNavLayout opens with labels, and a long segmented choice turns into a Select

From the Archipelia review (archipelia-07, archipelia-14).

- **SideNavLayout opens its nav with labels on a wide layout.** `nav.defaultOpen` now defaults to `true` unless `narrow` is set. A narrow layout keeps its strip of icons, and under 640 px the nav still folds into the bar and its drawer.
- **SideNav remembers the choice.** It takes `open` with `onOpenChange` to hold the state in the host, and `storageKey` to keep the last choice in `localStorage`, like the `storageKey` of the widget layout. SideNavLayout takes them through `nav`. On a `narrow` layout, where the open nav floats over the page, the stored choice is neither read nor written.
- **The nav scrollbar shows on hover only.** The slim scroll thumb of the nav groups drew a long accent bar beside the items whenever the list overflowed by a few pixels. It now shows while the pointer is over the nav, while a key moves focus in it, and while it is dragged. `--scrollbar-slim-rest` is the new rest width token.
- **A segmented SettingsRow choice that does not fit turns into a Select.** The row measures the segmented control against its own width with a ResizeObserver, before paint, so it never flickers. A full row gives the choice its whole content width, since the control can wrap under the text. A compact row leaves the title its own width, up to half the row. The Select keeps the options, the value and the option hints.

```ts
interface SideNavProps {
  // added
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  storageKey?: string;
}
```

### What an app does

1. A hub that wants the old collapsed start passes `nav.defaultOpen: false`.
2. A hub that should remember the choice passes `nav.storageKey`, such as `` `hub.${id}.nav-open` ``, or holds it with `nav.open` and `nav.onOpenChange`.
3. Nothing for SettingsRow: a segmented row picks its look by itself.

## 116. tessera guide writes the part names, and usage examples count for knip

From the Archipelia review (archipelia-36). An app listed its part names by hand in the `TesseraApps` module, and a part that only a usage example imported showed as unused in knip, because the example is a string.

- **`guide.parts`** in `tessera.config.json` names a module that `tessera guide` writes: every part in the folders of that scope, sorted, under the `name` of the nearest `package.json`, merged into `TesseraApps`. Set it at the root for the root `parts` and in each `apps` entry for its views. The module is written before the usage check runs, so a new part is known to `ComponentUsage` on the same run. `tessera check` reports it as `parts-module` once it falls behind the folders.
- **`usageExampleImports`**, exported from `@drizztdourden08/tessera/config`, is a knip compiler for `.ts` files. In a `Name.usage.ts` file it adds the imports of the example as re-exports under names nothing else uses (`__usageExample0` and on), so a part the example imports counts as used. Every other file comes back as it is. It loads `typescript` on the first usage file.

```ts
// @drizztdourden08/tessera/config
declare const usageExampleImports: (text: string, filePath: string) => string;

interface TesseraAppSettings {
  guide?: { usage?: GuideUsage; out?: string; tree?: string; tsconfig?: string; parts?: string };
}
```

### What an app does

1. Set `guide.parts`, such as `"apps/desktop/src/guide/parts.type.ts"` in the `apps` entry, run `tessera guide`, then delete the hand-written list and the `parts` key of the tree module.
2. Keep the module in the tsconfig of the usage files and list it as a knip entry.
3. Until `standards knip` takes compilers, a repo that runs knip itself adds `compilers: { ts: usageExampleImports }` to a `knip.config.mjs`; see "Usage examples and knip" in docs/using-tessera.md.

## 117. Text takes a tone, mono, numeric and an overline, and no text is faint

From the Tessera review (tessera-17, tessera-18, tessera-19) and the UX review (ux-57).

- **`tone`** on Text colours it as on Span and the other text elements: `dim`, `muted`, `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger` or `info`. A tone wins over the colour of the variant, so `<Text variant="caption" tone="danger">` is a red caption.
- **`mono`** sets the code face and **`numeric`** sets tabular figures, for times, seeds, slots, file names and counts.
- **`variant="overline"`** is the small caps heading over a group: extra small, semibold, upper case, caps tracking, muted.
- **No text is faint.** `--c-text-faint` measures about 1.86:1 on the surface; `--c-text-muted` measures 5.29:1 on the LogPanel. Every `color: var(--c-text-faint)` in Tessera is now `--c-text-muted`, in LogPanel, MasterDetailLayout, DataTable, DropdownMenu, ControlMenu, DynamicInput, FilterBar and the field kits, GroupTree, SearchResultHit, SettingsRow and ScaleLabels. `--c-text-faint` stays for borders and decoration.
- The standards extension adds the stylelint rule **`tessera/no-faint-text`**: `color`, `caret-color` or `-webkit-text-fill-color` set to `--c-text-faint` is an error, in Tessera and in every app that installs it.

The review asked for a `faint` tone too. It is left out: faint text is what ux-57 removes, and `muted` is the quietest tone that reads.

```ts
type TextVariant = 'body' | 'label' | 'title' | 'subtitle' | 'caption' | 'overline';

interface TextProps {
  // added
  tone?: TextTone;
  mono?: boolean;
  numeric?: boolean;
}
```

### What an app does

1. Replace the app classes that only colour a Text, set its face or its figures with `tone`, `mono` and `numeric`.
2. Replace hand-made group headings with `<Text variant="overline">`.
3. Change any `color: var(--c-text-faint)` the rule now reports to `var(--c-text-muted)`.

## 118. SectionHeader titles are headings with a count, and ListItemList takes a heading

From the Tessera review (tessera-22, tessera-31) and the UX review (ux-68).

- **SectionHeader draws its title as a heading**, `h3` by default; `level` picks another one. The look is unchanged.
- **SectionHeader takes `count`**, drawn as a tame inline Badge after the title inside the heading, so "Templates · 3" becomes `title="Templates" count={3}` and the number can be styled on its own. A count of 0 shows 0.
- **ListItemList takes `heading` and `count`.** The heading is drawn in the Text overline look with the count as a Badge, and it names the list (`aria-labelledby`) unless `label` is set. With a heading the list sits in a `list-item-list-group` wrapper, which takes `className`.

```ts
interface SectionHeaderProps {
  // added
  count?: number;
  level?: HeadingLevel; // 1 to 6, default 3
}

interface ListItemListProps {
  // added
  heading?: ReactNode;
  count?: number;
}
```

### What an app does

1. Move a count written into a title (`"Players · 2"`) to `count`.
2. Replace a hand-made caption over a ListItemList, or a Stack with `role="list"`, with `<ListItemList heading="…" count={n}>`.
3. A page whose SectionHeader sits under an `h1` or `h2` keeps the default; pass `level` where the outline needs another one.

## 119. LogPanel height, ProgressBar value, EmptyState title and hint, SearchResults emptyIcon

From the Tessera review (tessera-24, tessera-25, tessera-26, tessera-27) and the UX review (ux-69).

- **LogPanel takes `height`.** `"fill"` takes the height of its parent (`block-size: 100%`), a number fixes it in pixels. Left out, it sizes as before, growing in a flex parent.
- **ProgressBar takes `showValue` and `formatValue(value, max)`.** The value is written at the end of the bar, a rounded percent by default, and given to assistive tech as `aria-valuetext`. With `showValue` the bar sits in a `progress-bar-row` wrapper, which takes `className`.
- **EmptyState takes `title`, `hint` and `size`.** `title` sits above the message in bold; `action` (unchanged) is the next step under the message; `hint` is a quiet last line that can hold Shortcut keycaps. `size="sm"` fits a small panel, `size="hero"` fills a whole screen with the parts centred and a large title. The default is `md`, the look it had.
- **SearchResults takes `emptyIcon`**, shown over `emptyMessage` when nothing matches, as `idleIcon` is over `idleMessage`.

```ts
interface LogPanelProps { height?: 'fill' | number }
interface ProgressBarProps { showValue?: boolean; formatValue?: (value: number, max: number) => string }
interface EmptyStateProps { title?: ReactNode; hint?: ReactNode; size?: 'sm' | 'md' | 'hero' }
interface SearchResultsProps { emptyIcon?: ReactNode }
```

### What an app does

1. Drop the Box that wrapped a LogPanel only to set its height; pass `height`.
2. Drop the caption written beside a ProgressBar; pass `showValue`, with `formatValue` for "12 / 40".
3. Build an empty screen from one `<EmptyState size="hero" title message action hint />` in place of a hand-made layout.
4. Pass the icon of an empty search as `emptyIcon` in place of a wrapping Box.

## 120. Dialogs move focus in, keep Tab inside and give focus back

From the UX review (ux-56). Focus stayed on the button behind a dialog, Tab walked out of it, focus was lost on close, and a danger dialog started on its destructive button, so Enter deleted.

- **Focus moves in on open.** DialogShell focuses `initialFocusRef` when it can take focus, else the first control of the body or actions (the header close button is skipped), else the panel itself. A control in the body that focuses itself on open, such as a wizard step heading, keeps it.
- **Tab stays inside.** Tab on the last control goes to the first, Shift+Tab on the first goes to the last, and focus that lands on the page behind comes back. Popups the dialog opens through a Portal, such as a Select list, are not pulled back.
- **Focus returns on close** to the control that had it before the dialog opened, unless the app moved focus elsewhere or that control is gone.
- **Only the top dialog closes on Escape**, so the exit guard of a WizardDialog closes alone and the wizard stays open under it.
- **Dialog with `variant="danger"` starts on Cancel**, or on the panel when `hideCancel` is set. A default Dialog still starts on confirm. CreateRecordDialog starts in its first field, since Create is locked until the form is complete. DeleteGuardDialog starts on Cancel.
- A native `<dialog>` opened with `showModal()` gives focus in, an inert page and focus return, but it sits in the top layer, above the Portal layers, so a Select, menu or tooltip opened from inside it would draw under it and be inert. DialogShell keeps its Portal and does the focus work itself.

```ts
type DialogInitialFocus = 'first' | 'dialog';

interface DialogShellProps {
  // added
  initialFocus?: DialogInitialFocus; // default 'first'
}
```

### What an app does

1. Nothing for most dialogs. Remove any app code that focused a field after opening a DialogShell, unless it picks a field other than the first; pass `initialFocusRef` for that.
2. A dialog whose body has no control and should not start on an action passes `initialFocus="dialog"`.

## 121. ShortcutList: keys in one column, what they do in the next

`ShortcutList` is a new primitive, under Primitives · Display. It lists keys, clicks and drags and what each one does:

- **Two columns.** The key cells share one column as wide as the widest of them, across every group, so all descriptions start at one left edge and wrap inside their own column. Each key cell is as tall as one line of text and its keys sit on that first line, so a key always lines up with the first line of its description, however many lines follow.
- **Gestures look like keys.** A drag or a click is a `gesture`: an outlined cap with an icon and a short verb, such as Drag title, the same height, border and shading as a keycap. Keys and a gesture in one row are joined by a `+`. `mouse` draws a mouse button as `Shortcut` does.
- **Groups.** `groups` puts a small uppercase heading over each group, such as Any time and While dragging, so rows under While dragging say Shift, not Shift + drop.
- **Narrow.** When the description column would get under 160 pixels, each row stacks, its keys above its text, both at the left edge. The list measures this itself, so it also works inside a box sized to its content.

```ts
interface ShortcutGesture { icon: IconName; label: string }

interface ShortcutListItem {
  description: string;
  keys?: ShortcutKeys;
  mouse?: MouseButton;
  gesture?: ShortcutGesture;
}

interface ShortcutListGroup { label?: string; items: readonly ShortcutListItem[] }

type ShortcutListProps = {
  size?: 'xs' | 'md'; // default xs
  label?: string;
  className?: string;
} & ({ items: readonly ShortcutListItem[] } | { groups: readonly ShortcutListGroup[] });
```

Each group is a description list, the keys the term and the text its definition.

Where it is used:

- The Shortcuts sub-panel of `WidgetOptions` is a ShortcutList in two groups, Any time and While dragging, 320 pixels wide.
- The rows of `WindowGuideOverlay` are a ShortcutList too.
- `ShortcutTour` is left as it is: it walks one shortcut on a drawn keyboard, not a list.

The widget title bar no longer carries a native `title` tooltip with the whole drag explanation; the Shortcuts sub-panel says it.

| Before | Now |
|---|---|
| strings `widgets.titlebarHint`, `widgets.outHint` | removed; the title bar has no tooltip |
| string `widgets.shortcutPlusDrop` | removed; the While dragging heading says it |
| strings `widgets.shortcutDragPastEdge` `Drag past the edge`, `shortcutDragGap` `Drag the gap` | `Drag past edge`, `Drag gap`, short enough for a gesture cap |
| | new strings `widgets.shortcutsAnyTime`, `widgets.shortcutsWhileDragging` |
| class `window-guide__hint` | removed; the rows are `shortcut-list__row` |

### What an app does

1. An app that overrides `titlebarHint`, `outHint` or `shortcutPlusDrop` drops them.
2. An app that lists its own shortcuts in a grid of `Shortcut` and text uses `ShortcutList` instead.

## 122. ListItemRow shows its action, and Enter and Space both run onClick

From the UX review (ux-58). Row actions stayed hidden until hover, so touch screens never showed them, and Enter ran `onDoubleClick` while Space ran `onClick`.

- **`actionVisibility` defaults to `"always"`.** `"hover"` stays as an opt-in: it shows the action on hover and while focus is in the row, and on a screen without hover, such as a touch screen, it shows it at all times.
- **Enter and Space both run `onClick`**, as for a click on the native button. Enter no longer runs `onDoubleClick`. A row with `onDoubleClick` and no `onClick` runs `onDoubleClick` from Enter or Space, so it can still be opened from the keyboard; a single click on it does nothing, as before.

```ts
interface ListItemRowProps {
  actionVisibility?: ListItemRowActionVisibility; // default now 'always', was 'hover'
}
```

### What an app does

1. Drop `actionVisibility="always"`, now the default. Pass `actionVisibility="hover"` where a list should stay quiet until hover.
2. A row that opened on Enter through `onDoubleClick` and selects on `onClick`: give the open action a button in `action`, or open on `onClick` where selecting is not needed.

## 123. onEnter on text inputs, a number field on Slider, FactsPanel layouts, copyable values

From the Tessera review (tessera-28, tessera-29, tessera-30) and the UX review (ux-62, ux-67).

- **TextInput takes `onEnter(value)`**, called with the value when Enter is pressed, after the host `onKeyDown`, and not while an input method composes or once the host prevented the key. PasswordInput and SearchInput pass it on.
- **TextInput shows the focus outline of Button**, 2 px of `--c-primary`, 1 px out, on `:focus-visible`, beside the border colour it already took. PasswordInput and SearchInput take it too.
- **Slider takes `input`** (one value only): a NumberInput at its end, bound to the same value, `min`, `max` and `step`. A typed value inside the bounds moves the thumb at once, snapped to the step; the text value beside the track is left out.
- **FactsPanel takes `layout`.** `inline` (the default, the look it had) runs the facts along a line, `rows` puts one per row with the value on the right, `boxed` puts each row in a sunken box.
- **StatRow and FactsPanel values can be selected and copied.** The value takes `user-select: text`. `copyable` on a StatRow or a fact adds a copy button named after the row ("Copy Seed") that copies the value text, or the string `copyable` gives when the value is a node. New string: `common.copyNamed(name)`.

```ts
interface TextInputProps { onEnter?: (value: string) => void }
interface SliderSingleProps { input?: boolean }
interface FactsPanelProps { layout?: 'rows' | 'inline' | 'boxed' }
interface FactsPanelFact { copyable?: boolean | string }
interface StatRowProps { copyable?: boolean | string }
```

### What an app does

1. Replace a hand-written Enter `onKeyDown` with `onEnter`.
2. Replace a Slider beside a field kit number editor with `<Slider input />`.
3. Replace a hand-made line of label and value facts, or restyled StatRow internals, with `<FactsPanel layout="inline">` or `layout="boxed"`, and add `copyable` to addresses, seeds and paths.

## 124. Tooltip opens on focus, toasts are announced, and RadioGroup names its group

From the UX review (ux-60, ux-61, ux-64).

- **Tooltip opens on focus and on hover.** Focus on a control inside it, such as a Button, opens it, and it closes when focus leaves. The bubble has `role="tooltip"` and an id, and while it is open the focused control inside takes `aria-describedby` pointing at it, added to any it had. Escape closes it through the shared dismiss stack, so a tooltip inside a menu or a dialog closes first and the menu or dialog stays. It stays closed after Escape until the pointer and focus have both left.
- **`focusable` puts plain text in the Tab order.** Text, a Status or an icon cannot take focus, so a tooltip on it was out of reach from the keyboard. With `focusable` the anchor takes `tabIndex={0}`, a focus ring and the `aria-describedby` itself. It is off by default, since a tooltip often sits inside a button or a Select trigger, where a second Tab stop would be wrong.
- **ToastContainer is a live region.** It stays in the page with no toasts, with `role="status"` and `aria-live="polite"`, so screen readers announce each toast added to it. A `danger` toast has `role="alert"` and is read at once.
- **RadioGroup gives every group its own `name`** from `useId`, so two groups with no `name` and no `label` no longer share `radio-group` and uncheck each other. A `name` passed in is kept. The legend is now the first child of the fieldset, so it names the group; it looks the same, with the description under it, which now describes the group through `aria-describedby`.

```ts
interface TooltipProps {
  // added
  focusable?: boolean; // default false
}
```

### What an app does

1. Pass `focusable` to a Tooltip whose children are text or an icon that the user needs to read from the keyboard, such as a truncated value.
2. Drop app code that rendered ToastContainer only while toasts were queued; render it once, always.
3. Drop the `name` you passed to RadioGroup only to keep groups apart.
