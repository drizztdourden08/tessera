/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A chat composer: one rounded box with a growing text input, a send button and an optional bar of tools.',
  useWhen: [
    'A person writes a message to a chat or an agent and sends it with Enter.',
    'The input should start on one line and grow with the text up to a limit.',
  ],
  avoidWhen: [
    { case: 'The text needs a formatting toolbar and a preview.', use: 'MarkdownEditor' },
    { case: 'The field is part of a form with a label and a hint.', use: 'Textarea' },
  ],
  rules: [
    'Pass value and onChange to control the text. onSubmit receives the text when the person sends it.',
    'Enter sends and Shift+Enter starts a new line. Enter while typing with an input method does not send.',
    'The input grows from one line to maxRows lines, 8 by default, then scrolls.',
    'The default send button is disabled while the text is blank or the composer is disabled. Pass sendSlot to put your own.',
    'busy shows a spinner on the default send button and stops Enter and the button from sending. The input stays editable.',
    'bar sits on the left of the bottom row, beside the send button: attachments, a model picker, a hint.',
    'Give the composer an aria-label when no visible label names it.',
  ],
  a11y: [
    'Focus inside the box shows the focus ring on the whole box.',
    'The send button carries a text label from the Tessera strings.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'a chat message, sent with Enter'],
    rule: 'Composer writes and sends one chat message in a rounded box.',
  },
  example: `import { useState } from 'react';
import { Composer } from '@drizztdourden08/tessera';

const ChatInput = () => {
  const [text, setText] = useState('');
  return (
    <Composer
      value={text}
      onChange={setText}
      onSubmit={() => setText('')}
      placeholder="Write a message"
      aria-label="Message"
    />
  );
};
`,
  propsHash: '4d1f6c91cf88a334',
} satisfies ComponentUsage;

export { usage };
