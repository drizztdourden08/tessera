/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A piece of text that shows as text with a pen and turns into a field when the user clicks it, such as the title of a card.',
  useWhen: [
    'A short text is read far more than it is changed, so a field that is always open would clutter the view.',
    'The user renames a title, a label or a note in place, on the page that shows it.',
  ],
  avoidWhen: [
    { case: 'The field belongs to a form that is filled in and sent.', use: 'FormRow' },
    { case: 'The user creates a new thing from a name.', use: 'InlineCreateForm' },
    { case: 'The text is Markdown that needs a toolbar and a preview.', use: 'MarkdownEditor' },
  ],
  rules: [
    'Own the text in the app: pass it as value, and set the new one in onCommit; the component keeps no copy once the edit ends.',
    'Enter or leaving the field commits through onCommit, trimmed; text that did not change is not committed.',
    'Escape cancels, restores the text and puts focus back on the text.',
    'Click the text, or press Enter or F2 while it has focus, to start editing.',
    'Pass validate to return a message for text that is not allowed; it shows under the field and nothing is committed until it returns nothing.',
    'Pass multiline for a text area, where Enter adds a line and Mod+Enter commits.',
    'Pass renderValue to draw the text when it is not edited, such as Markdown; the click, Enter and F2, and the name stay the same, and the field is unchanged.',
    'A link or a control inside the drawn text does not start the edit when clicked; only a click on the rest of the text does.',
    'Pass label to name the text for a screen reader, placeholder to stand in for an empty text, and disabled to show the text only.',
  ],
  a11y: [
    'The text is a button named Edit with the label and the text, and it says F2 in aria-keyshortcuts.',
    'The field takes focus with its text selected, and it is named the same way as the button.',
    'The message of validate is tied to the field, and the field is marked invalid while it shows.',
    'A disabled text is a disabled button, so it is read but not offered for editing.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'text shown as text, edited in place on click'],
    rule: 'InlineEdit starts, commits and cancels an edit in place with the same keys in every app.',
  },
  example: `import { useState } from 'react';
import { InlineEdit } from '@drizztdourden08/tessera';

const CardTitle = () => {
  const [title, setTitle] = useState('Fix the login redirect');
  return (
    <InlineEdit
      label="Title"
      value={title}
      onCommit={setTitle}
      placeholder="Add a title"
      validate={(text) => (text.length < 3 ? 'Use at least 3 characters.' : undefined)}
    />
  );
};
`,
  propsHash: '16e99e2a183ff159',
} satisfies ComponentUsage;

export { usage };
