/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One field built from a pattern of typed slots, muted text and icons, such as a time, a price with its currency or a lobby code.',
  useWhen: [
    'Several small values read as one, such as a time, a date, a size, a server address or a phone number with its country.',
    'A text value follows a fixed shape, such as a host name or a lobby code with its own characters.',
    'The field has to check itself, by slot or as a whole, and show its own error.',
  ],
  avoidWhen: [
    { case: 'One plain line of text or a single number is asked.', use: 'TextInput' },
    { case: 'A number is typed on its own, with a stepper or a unit.', use: 'NumberInput' },
  ],
  rules: [
    'Write the shape in the pattern, such as {hh:hour 12h}:{mm:minute}, and keep the value as one object keyed by slot name.',
    'Put it in a Field for the label, hint and size.',
    'Write a ? after the slot type, such as {seconds:number? 1..3600}, to make the slot optional: it may stay empty, shows its placeholder in a fainter tone, and patternText drops it with the space before it.',
    'A text slot takes digits, letters or alnum in the pattern. For any other set, pass slots with chars, a string or a Set of the allowed characters.',
    'Pass aliases, from typed to stored, to read a typed character as another, such as I and L as 1. A slot entry wins over the pattern one.',
    'Do not map an alias to a character that is itself an alias, because the text is cleaned again on every key.',
    'chars and aliases follow the case of the slot, so write them in either case.',
    'Pass validate on a slot or on the pattern, from the value to a message or nothing. A message turns the field invalid and shows under it.',
    'Make a list a function of the value, such as lists={{ item: (value) => itemsOf(value.player) }}, so its choices follow another slot; a choice the new list no longer offers is cleared.',
    'An empty slot reaches validate as null. Return nothing for it unless the slot is required.',
    'Add search to a choice slot with a long list, such as {player:choice @players search}: typing filters the options and Enter takes the first match. Add free instead to also keep typed text that no option matches, such as a name the list does not have.',
    'A whole value pasted into any slot, such as ABCD-1234 or 192.168.0.1:8080, fills every slot when it fits the pattern. Separators and letter case are ignored, a choice matches by value or label, and a value a slot rejects leaves the paste in the one slot.',
    'The invalid prop wins over validate, and a Field with an error shows its own message.',
  ],
  a11y: [
    'The field is a group named by the Field label, and each slot is named by its quoted label.',
    'An invalid field sets aria-invalid on its slots and describes them by the message, which is announced as an alert.',
    'Tab and Shift+Tab move between slots, and a choice slot opens with the arrow keys.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'text that follows a pattern'],
    rule: 'DynamicInput reads a pattern of slots, so a time, an address or a lobby code is one field with its own characters and checks.',
  },
  example: `import { useState } from 'react';
import { DynamicInput, Field } from '@drizztdourden08/tessera';
import type { PatternValue } from '@drizztdourden08/tessera';

const SLOTS = {
  code: { chars: 'ABCDEFGHJKLMNOPQRSTVWXYZ0123456789', aliases: { I: '1', L: '1', O: '0' } },
};

const LobbyCode = () => {
  const [value, setValue] = useState<PatternValue>({ code: null });
  return (
    <Field label="Lobby code">
      <DynamicInput pattern="{code:text len6 upper}" value={value} onChange={setValue} slots={SLOTS} />
    </Field>
  );
};
`,
  propsHash: 'f240339187b37790',
} satisfies ComponentUsage;

export { usage };
