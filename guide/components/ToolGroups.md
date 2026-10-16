# ToolGroups

Tools in groups, each under a small label, with a line between groups, for the top bar of a studio or the toolbar of an editor.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { ToolGroups } from '@drizztdourden08/tessera';
```

The source is `src/primitives/ToolGroups/ToolGroups.tsx`. Its gallery page is Primitives · Actions/ToolGroups (`#/story/primitives-toolgroups--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? Several related buttons. How do the buttons relate? Tools in groups, each under a small label.

ToolGroups names each group of tools with a small label and draws a line between groups; StudioLayout uses it for its bar and its toolbar.

## Use it when

- A bar holds several kinds of actions that read better under a name, such as Save to this app and Export a file.
- The toolbar of an editor mixes buttons, toggles and a segmented control, grouped by what they change.

## Use something else when

- Buttons joined into one control with shared borders. Use `ButtonGroup` instead.
- Actions on one item that fold into More when the room runs out. Use [ActionBar](ActionBar.md) instead.
- A plain row of buttons with no names over them. Use `ButtonRow` instead.

## Rules

- Pass groups as { id, label, content }; content holds any controls, such as buttons or a SegmentedControl.
- Keep labels short and in sentence case; they name what the tools do, such as View or Export a file.
- Pass label to name the whole set when it is not the only toolbar on the screen.
- The groups wrap to a new line when the room runs out, so keep each group small.
- Give a SearchInput, Select or Combobox in a group grow={false}: it fills the line otherwise.

## Accessibility

- Each group is a group named by its visible label, so a screen reader reads the label before the tools.
- With label, the whole set is a group named by it.

## Example

```tsx
import { Button, ToolGroups } from '@drizztdourden08/tessera';

const FileActions = ({ onSave, onExport }: { onSave: () => void; onExport: () => void }) => (
  <ToolGroups
    groups={[
      { id: 'save', label: 'Save to this app', content: <Button size="sm" onClick={onSave}>Save</Button> },
      { id: 'export', label: 'Export a file', content: <Button size="sm" variant="secondary" onClick={onExport}>Export PNG</Button> },
    ]}
  />
);
```

## Props

- `groups`: `readonly ToolGroup[]`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--space-2xs`, `--space-md`, `--space-sm`.
