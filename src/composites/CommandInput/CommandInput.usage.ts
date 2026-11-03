/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A command line on a free text Combobox: Enter sends the command, Up and Down walk the past commands, Tab completes a known one and Escape clears the line.',
  useWhen: [
    'The user types commands for a server, a game or a debug tool.',
    'The user often sends the same command again and should find it with the arrow keys.',
  ],
  avoidWhen: [
    { case: 'The text is a value to keep, such as a name or a note.', use: 'TextInput' },
    { case: 'The text filters a list as the user types.', use: 'SearchInput' },
    { case: 'The user picks one command from a list of every command.', use: 'CommandPalette' },
    { case: 'The text must be one of the listed values.', use: 'Combobox' },
  ],
  rules: [
    'Pass history when the app already keeps the sent commands; otherwise let the input keep its own and pass storageKey to keep it across launches.',
    'Pass commands, as names or with a description, so typing lists the closest ones under the input; Tab or Right completes the active row or the top one.',
    'Pass commandSpecs to add a picker of every command: a chosen one swaps the line for its fields and sends what its format returns.',
    'Give a spec a pattern, such as /hint {player:choice @players} {item:choice @items}, and a setup with its lists, and the line becomes one DynamicInput that sends its composed text, or what format returns when the spec gives one.',
    'Make a list of the setup a function of the slot values, such as items: (value) => itemsOf(value.player), to list choices that follow another slot; a choice the new list no longer offers is cleared.',
    'Give a field a placeholder to show a hint in the empty text, number or choice field.',
    'Set dependsOn to the name of another field so it stays disabled until that one is filled and clears when that one changes; make options a function of the values to list choices that follow it.',
    'Return false from onSubmit when the command was not sent, so the text stays in the line.',
    'Put the replies above the input, such as in a LogPanel, and keep quick commands in actions.',
    'Disable it while there is nothing to send to, and say why in the text near it.',
  ],
  a11y: [
    'The input is a combobox named Command, or label, and the key hints under it describe it.',
    'Escape on an empty line passes on, so it still closes a dialog or a popup.',
    'Up and Down move through the suggestions while their list is open, and walk the history once it is closed or the line is empty.',
    'The list is a listbox named Commands and the active row its active descendant; no row is active until the arrows or the pointer reach one.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'a command, with its history'],
    rule: 'CommandInput gives every command line the same keys: Enter to send, Up and Down for history and Escape to clear.',
  },
  example: `import { CommandInput } from '@drizztdourden08/tessera';

const ServerConsole = ({ send }: { send: (command: string) => void }) => (
  <CommandInput placeholder="/players" storageKey="console.history" commands={['/players', '/hint', '/save']} onSubmit={send} />
);
`,
  propsHash: 'f944d1fb7618167a',
} satisfies ComponentUsage;

export { usage };
