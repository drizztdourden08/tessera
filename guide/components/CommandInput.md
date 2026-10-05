# CommandInput

A command line on a free text Combobox: Enter sends the command, Up and Down walk the past commands, Tab completes a known one and Escape clears the line.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { CommandInput } from '@drizztdourden08/tessera';
```

The source is `src/composites/CommandInput/CommandInput.tsx`. Its gallery page is Composites · Inputs/CommandInput (`#/story/composites-commandinput--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Free text or a number. What shape is it? A command, with its history.

CommandInput gives every command line the same keys: Enter to send, Up and Down for history and Escape to clear.

## Use it when

- The user types commands for a server, a game or a debug tool.
- The user often sends the same command again and should find it with the arrow keys.

## Use something else when

- The text is a value to keep, such as a name or a note. Use `TextInput` instead.
- The text filters a list as the user types. Use `SearchInput` instead.
- The user picks one command from a list of every command. Use `CommandPalette` instead.
- The text must be one of the listed values. Use `Combobox` instead.

## Rules

- Pass history when the app already keeps the sent commands; otherwise let the input keep its own and pass storageKey to keep it across launches.
- Pass commands, as names or with a description, so typing lists the closest ones under the input; Tab or Right completes the active row or the top one.
- Return false from onSubmit when the command was not sent, so the text stays in the line.
- Put the replies above the input, such as in a LogPanel, and keep quick commands in actions.
- Disable it while there is nothing to send to, and say why in the text near it.

## Accessibility

- The input is a combobox named Command, or label, and the key hints under it describe it.
- Escape on an empty line passes on, so it still closes a dialog or a popup.
- Up and Down move through the suggestions while their list is open, and walk the history once it is closed or the line is empty.
- The list is a listbox named Commands and the active row its active descendant; no row is active until the arrows or the pointer reach one.

## Example

```tsx
import { CommandInput } from '@drizztdourden08/tessera';

const ServerConsole = ({ send }: { send: (command: string) => void }) => (
  <CommandInput placeholder="/players" storageKey="console.history" commands={['/players', '/hint', '/save']} onSubmit={send} />
);
```

## Props

- `onSubmit`: `CommandSubmit`.
- `history` (optional): `readonly string[]`.
- `commands` (optional): `readonly CommandOption[]`.
- `maxSuggestions` (optional): `number`.
- `storageKey` (optional): `string`.
- `historyLimit` (optional): `number`.
- `value` (optional): `string`.
- `defaultValue` (optional): `string`.
- `onValueChange` (optional): `(value: string) => void`.
- `label` (optional): `string`.
- `sendLabel` (optional): `string`.
- `actions` (optional): `ReactNode`.
- `keyHints` (optional): `boolean`. Default `true`.
- `placeholder` (optional): `string`.
- `disabled` (optional): `boolean`.
- `invalid` (optional): `boolean`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `id` (optional): `string`.
- `className` (optional): `string`.
- `aria-describedby` (optional): `string`.
- `onKeyDown` (optional): `KeyboardEventHandler<HTMLInputElement>`.

## Tokens

It draws on `--c-text`, `--c-text-dim`, `--font-mono`, `--space-md`, `--space-xs`, `--text-sm`.
