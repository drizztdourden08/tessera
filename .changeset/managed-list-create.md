---
"@drizztdourden08/tessera": minor
---

`ManagedList` takes `create`, a render prop `(close: () => void) => ReactNode` for a create form such as an `InlineCreateForm` with more fields. New opens it at the top of the list and moves focus into it; Escape or Cancel closes it and focus goes back to New; after a create, focus goes to the new row when the app picks it. `createOpen` with `onCreateOpenChange` lets the app decide whether the form is open, such as on a first run with no items; without them the list tracks it. `onCreate` still runs New for an app that opens its own flow. `MasterDetail` passes all three through its `list`. The ManagedList page shows a profile form with a name, a game and a template, and a first run where it starts open.
