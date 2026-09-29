<!-- @layer docs @kind doc -->
# Gallery template

Helpers that every stories file builds its Overview page from. `overviewStory` draws the page: the description, the Variants, the States, the Playground and the Code.

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

The States section rewrites the preview stylesheets once, then again each time a sheet is added or replaced. Every selector with `:hover`, `:focus`, `:focus-visible`, `:focus-within` or `:active` also matches inside an element whose `data-force-state` attribute lists that state. The rewrite keeps each selector's specificity, so a forced state wins or loses against other rules exactly as the real one does.

Everything inside a forced row counts as being in that state. Wrap one component per row, since a row holding a whole list would show every item hovered at once. Styles set from script on real pointer or focus events do not follow, since only stylesheet rules are rewritten.
