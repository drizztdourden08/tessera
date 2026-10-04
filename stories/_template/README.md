<!-- @layer docs @kind doc -->
# Gallery template

Helpers that every stories file builds its Overview page from. `overviewStory` draws the page: the description, the Variants, the States, the Playground and the Code.

Two optional parts suit a page that is not about variants, such as TesseraProvider:

- `points`: a bullet list under the description.
- `sections`: extra sections after the Variants, each `{ title, node }` with its own heading.

## Demonstrator

Every layout that shows variants across rows, columns or both is a `Demonstrator`. A story never builds its own grid, table or list of labelled rows for this: one component draws them all, so every page spaces and rules its variants the same way.

```tsx
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';

<Demonstrator
  corner="Glyph"
  rows={axis(NAMES)}
  columns={axis(['12px', '16px', '24px'])}
  cell={(name, size) => <PathIcon {...GLYPHS[name]} size={Number.parseInt(size, 10)} />}
/>
```

It takes:

- `rows`: the row labels, drawn down the left. Each entry is `{ key, label }`; `axis(keys)` builds them from a list of strings, using each key as its label.
- `columns`: the column labels, drawn across the top, in the same shape. A column entry can add `fill: true` to take the width the other columns leave, for one long text column beside narrow ones.
- `cell(row, column)`: draws one cell from the row key and the column key.
- `corner`: an optional label for the top left cell, naming what the rows list.
- `align`: where the content sits across its cell, `start`, `center` or `stretch`. It defaults to `center` when there are columns and to `start` for rows only.
- `valign`: where the content sits down its cell, `start`, `center` or `end`. It defaults to `center`; use `start` or `end` when cells of different heights should line up on an edge.
- `fill`: when true, every column shares the width instead of fitting its content. It defaults to true for rows only.
- `className`: an extra class on the grid, for a story that sets a custom property on it.

Give it rows and columns for a grid, rows alone for a list of labelled rows, or columns alone for one labelled row. With rows only, `cell` gets the row key; with columns only, write `cell={(_row, column) => ...}`.

### The look

- Row and column labels are centred both ways in their cells.
- Each row label has a rule on its right edge, each column label a rule under it, and a rule runs between rows.
- Cells sit a gap apart in both directions, and each rule stops at its own cell, so neighbouring rules break at every gap and never touch.

`Demonstrator.css` holds the look. `--demonstrator-gap` sets the gap between cells and `--demonstrator-rule` the rules; both are declared once on `.demonstrator`, so changing either changes every story.

## States

A state is how one component looks at a given moment: hovered, focused, disabled, in error. A variant is a different version of the component: a size, a tone, an icon or no icon. A state is not a variant. Keep variants in `variants` and list states in `states`, never the other way round.

```tsx
import { STATE } from '../_template/states/states.constants';

const Overview = overviewStory({
  component: 'TextInput',
  description: '...',
  variants: [Types],
  states: {
    render: (props) => <TextInput placeholder="Player name" {...props} />,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
      { ...STATE.disabled, props: { disabled: true, defaultValue: 'Hyrule Castle' } },
    ],
  },
});
```

`render` draws the component at rest. Each entry in `list` becomes one row: the state name, then the component in that state. An entry takes:

- `name`: the row label.
- `pseudo`: an interaction state the gallery forces: `hover`, `focus`, `focus-visible`, `focus-within` or `active`, or a list of them.
- `props`: real props merged into `render`, for states the component draws from its props.
- `render`: an override for a row that needs more around the component, such as a Field that shows the error message.
- `target`: a selector for the one element that takes the forced state, such as `.side-nav__item` for one nav item. Without it, the component's root element takes it.

### Ready-made entries

`STATE` in `states/states.constants.ts` holds the common entries:

| Entry | Forces or sets |
|---|---|
| `STATE.idle` | nothing |
| `STATE.hover` | `:hover` |
| `STATE.focus` | `:focus-visible`, the keyboard ring, with `:focus` and `:focus-within` |
| `STATE.active` | `:hover` and `:active`, a pointer press |
| `STATE.selected` | `selected: true` |
| `STATE.checked` | `checked: true` |
| `STATE.open` | `open: true` |
| `STATE.readOnly` | `readOnly: true` |
| `STATE.loading` | `loading: true` |
| `STATE.error` | `invalid: true` |
| `STATE.disabled` | `disabled: true` |

When the component names a prop differently, or the row needs a value to look right, spread the entry and replace its props: `{ ...STATE.error, props: { error: 'Required' } }`.

### Which states to list

1. List only the states the component draws differently. If a state looks like another one, leave it out. A text input has no Active row: pressing it only focuses it.
2. Keep the standard order: Idle, Hover, Focus, Active, then content states such as Filled or Empty, then prop states: Selected or Checked, Open, Read only, Loading, Error, Disabled.
3. Interactive primitives list Idle, Hover and Focus at the least, plus Disabled when they take `disabled`.
4. Composites list only the states that belong to them. A composite built from a Button does not repeat the Button states.
5. When a state has no look yet, add the look to the component with tokens. Do not fake it in the story.

### How forcing works

The States section rewrites the preview stylesheets once, then again each time a sheet is added or replaced. Every selector with `:hover`, `:focus`, `:focus-visible`, `:focus-within` or `:active` also matches an element whose `data-force-state` attribute lists that state. The rewrite keeps each selector's specificity, so a forced state wins or loses against other rules exactly as the real one does.

Each row marks one element, the way a real pointer or keyboard would: the component's root, or the element `target` names. The forced state then follows browser rules. Hover and active also hold on that element's ancestors, as a real hover does, and focus holds on the element with focus-within on its ancestors. Children never take the state, so a button inside a hovered row stays idle.

To mark an element from the entry's own `render`, spread `forceAttributes` from `states/force-attributes.ts` on it: `<Button {...forceAttributes('hover')}>Load</Button>`. The element must pass unknown props through. Styles set from script on real pointer or focus events do not follow, since only stylesheet rules are rewritten.

## Playground

The Playground is one card: the live component on a stage at the top, its Parameters panel below, sharing one border with no gap between them. The Overview page and the Playground story draw the same card.

A story declares its parameters on its Playground story, typed `PlaygroundStory<Args>`, with `argTypes` typed `PlaygroundArgTypes<Args>`, both from `controls/playground.type.ts`. Each parameter names its group, and the panel draws one titled group per name:

```tsx
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';

const ARG_TYPES: PlaygroundArgTypes<ButtonArgs> = {
  label: { group: 'Content', control: 'text' },
  variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
  disabled: { group: 'State', control: 'boolean' },
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Button variant={args.variant} size={args.size}>{args.label}</Button>,
} satisfies PlaygroundStory<ButtonArgs>;
```

### Groups

A story picks the groups its parameters fall in and the order of the parameters inside each. The groups themselves always come in this order, so every panel reads the same way:

| Group | Holds |
|---|---|
| `Content` | What the component shows: text, labels, an icon name, which parts it draws. |
| `Value` | The value and its bounds: `value`, `min`, `max`, `step`. |
| `Appearance` | How it looks: variant, size, tone, colour, weight. |
| `Layout` | Where things sit: orientation, alignment, gap, placement, width. |
| `State` | A moment of the component: disabled, loading, invalid, open, selected. |
| `Behaviour` | What it does: searchable, closes on select, persists, rejects a save. |
| `Motion` | Animation: an effect, its speed, its timing, whether it loops. |
| `Data` | The data a data component works on: grouping, sorting, filters. |

### Controls

Every control is the small size, and every row is one control high, so the labels and the controls line up in one grid. `control` picks the control:

| `control` | Draws | Takes |
|---|---|---|
| `text` | a TextInput | free text only: a label, a title, a placeholder |
| `textarea` | a Textarea one row high that drags taller | free text over several lines |
| `number` | a NumberInput | `min`, `max`, `step` |
| `range` | a Slider with its value | `min`, `max`, `step` |
| `boolean` | a Toggle | |
| `color` | a ColorSwatch and a TextInput | |
| `select` | a SegmentedControl for up to three short options, a Select for more | `options` |
| `multiselect` | a Select with several picks, kept in the order they are picked | `options`; the value is a list |

A parameter whose values are a known set is never a text box. Sizes, variants, tones, icon names and key names are a `select` or a `multiselect`; a bounded number is a `range`. Text stays only for text the user writes. A Select with more than twelve options takes a search box. An empty option shows as `none`.

`optionView(option, args)` draws something before each option's label in the Select list, such as the glyph for an icon name.

### Options that depend on another parameter

`options` can be a function of the current args. The panel asks again on every change, and a value that falls outside its new options returns to its default when the default fits, or to the first option. A `multiselect` drops the picks that left.

```tsx
const ARG_TYPES: PlaygroundArgTypes<InputIconArgs> = {
  family: { group: 'Content', control: 'select', options: INPUT_ICON_FAMILIES },
  name: { group: 'Content', control: 'select', options: (args) => INPUT_ICON_NAMES[args.family] },
};
```

### Changed parameters

A parameter that differs from the story's args is marked: a primary accent on its left edge, its name in the primary colour and a dot after it. A reset button after its control puts it back and returns the focus to the control. Reset, in the panel head, puts every parameter back.

Each name is the label of its control, the description is the control's hint, and each group is a fieldset with its title as the legend.
