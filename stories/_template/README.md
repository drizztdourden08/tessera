<!-- @layer docs @kind doc -->
# Gallery template

Helpers that every stories file builds its Overview page from. `overviewStory` draws the page: the description, the Variants, the States, the Playground and the Code.

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
- `columns`: the column labels, drawn across the top, in the same shape.
- `cell(row, column)`: draws one cell from the row key and the column key.
- `corner`: an optional label for the top left cell, naming what the rows list.
- `align`: where the content sits in its cell, `start`, `center` or `stretch`. It defaults to `center` when there are columns and to `start` for rows only.
- `fill`: when true, the columns share the width instead of fitting their content. It defaults to true for rows only.
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
