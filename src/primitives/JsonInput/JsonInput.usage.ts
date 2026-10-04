/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'JSON typed over the code highlighting of CodeBlock, checked as the user types, with the problem, its line and its column, and Format.',
  useWhen: [
    'An option or a record field holds free JSON, such as plando texts, and no form fits its shape.',
    'A tool screen lets a developer edit a raw value and must never save text that does not parse.',
  ],
  avoidWhen: [
    { case: 'The value is a map of names to numbers or words.', use: 'KeyValueEditor' },
    { case: 'The value is plain text over several lines.', use: 'Textarea' },
    { case: 'The JSON is only shown, never edited.', use: 'CodeBlock' },
  ],
  rules: [
    'Store the value from onChange; it only comes while the text parses, so a typo never reaches the saved value.',
    'Pass onProblem when a form must hold its Save, and say so in the row, such as Not saved: fix the JSON first.',
    'Set shape to object or array when the option needs one, so a valid value of the wrong kind is turned away too.',
    'Pass defaultText only to bring back a draft that did not parse; otherwise the text is the formatted value.',
  ],
  a11y: [
    'The text is a real textarea that takes the label, hint and error of its Field or FormRow.',
    'The status line under it, valid or the problem with its line and column, describes the textarea.',
    'A problem marks the textarea invalid; Format is a button with its name, after the textarea.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'structured data, as JSON'],
    rule: 'JsonInput checks JSON as it is typed and only hands on a value that parses, the same way in every app.',
  },
  example: `import { JsonInput } from '@drizztdourden08/tessera';
import { useState } from 'react';

const PlandoTexts = ({ value, save }: { value: Record<string, string>; save: (value: unknown) => void }) => {
  const [blocked, setBlocked] = useState(false);
  return (
    <>
      <JsonInput value={value} onChange={save} onProblem={(problem) => setBlocked(problem !== null)} shape="object" aria-label="Plando texts" />
      {blocked && <p>Not saved: fix the JSON first.</p>}
    </>
  );
};
`,
  propsHash: '404daf41a735a427',
} satisfies ComponentUsage;

export { usage };
