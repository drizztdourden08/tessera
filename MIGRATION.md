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

- `Icon` is now the Iconify icon, drawn offline from bundled data. Pass `name` (one of `ICONS`: 117 Lucide icons in app, interface and status groups) or `icon` (any `@iconify` icon object), plus `size`, `rotate` (0, 90, 180 or 270), `flip`, `inline` and `label`. Without a `label` it is hidden from screen readers.
- The old path-drawn `Icon` is `PathIcon`, with the same props (`paths`, `circles`, `viewBox`). Code that passes `paths` to `Icon` renames it to `PathIcon`, or moves to a `name`.
- `Icon.Brand` draws a brand mark (`tessera`, `rotp`, `archipelia`, `brock`, `rotp-mascot`) with the same props as `Icon`. `tone="mono"` draws it in the current colour.
- The brand entry adds `Logo`: `<Logo brand="rotp" />` is the mark, `<Logo.Wordmark brand="rotp" />` the wordmark, and `<Logo.Combined brand="rotp" direction="stacked" />` both together, `stacked` or `inline`.
- Every app's icon files ship under `brand/<app>/icon/` (svg, ico, PNG sizes 16 to 1024, maskable, Android layers) and `brand/<app>/splash/`. `pnpm icons` rebuilds them from the brand marks.
- Shared control looks (button and field surfaces, select popups, focus ring, glass panel and others) live in `src/theme/`, loaded by the components that use them.
- Logic files are kebab-case and named after what they export (`to-text.ts` exports `toText`); hooks stay `useThing.ts`. Deep imports into `src/` paths changed with this; the package entries did not.

## 17. Text elements, Title and popups in other documents

- Every HTML text element is a component, by full name and by short name: `Paragraph` and `P`, `Bold` and `B`, `Strikethrough` and `S`, `Highlight` and `Mark`, `Keyboard` and `Kbd`, and the rest. Each is also on the `Text` namespace (`Text.Paragraph`, `Text.P`). The `<em>` element imports as `Em`, because `Emphasis` stays the weight animation composite; `Text.Emphasis` and `Text.Em` both work.
- Each element takes the typesetting props of `Text` (weight, italic, optical size, OpenType features) and the native attributes of its tag, such as `cite` on `Q`, `dateTime` on `Time` and `title` on `Abbr`. `TextElement` renders any tag with the same props.
- Every text element and heading takes a `tone`: `dim`, `muted`, `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger` or `info`. A Highlight takes the soft tint of its tone, and a block quote its rule.
- `Title` is a heading in the title face with a `level` from 1 to 6; H1 to H3 are set in capitals. `Title.H1` to `Title.H6` and `Title.Heading1` to `Title.Heading6` are the same headings by name, and `H1` or `Heading1` import on their own.
- `Portal` renders into the document it lives in. An app that renders Tessera into an iframe or a second window can pass that document through `PortalDocumentContext`.
