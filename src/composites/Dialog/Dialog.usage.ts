/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A modal that asks one question, with a message, a confirm button and a cancel button, and room for a short body.',
  useWhen: [
    'The user must confirm an action, acknowledge a notice or answer a short question before going on.',
    'A short form or a block of text, such as a README or a list of details, sits under the message.',
  ],
  avoidWhen: [
    { case: 'The dialog has its own layout, its own buttons or no question to answer.', use: 'DialogShell' },
    { case: 'A long job runs and the user may hide it or cancel it.', use: 'JobDialog' },
  ],
  rules: [
    'Pick the size from the content: sm for a question, md for a form, lg for a README or a table; the default is sm.',
    'The width follows the content between the min and the max of the size, and never passes the window minus a margin.',
    'The height grows with the content up to the window minus a margin; the header and the buttons stay and only the body scrolls.',
    'Set steady when the width must not move while the content changes, such as an error that appears under a form.',
    'Use variant danger for an action that cannot be undone; focus then starts on cancel.',
  ],
  a11y: [
    'The dialog is modal and named by its title; Tab stays inside it and Escape cancels.',
    'Focus starts on confirm, or on cancel for danger, and returns to the opener on close.',
    'A body that scrolls keeps the header and the buttons in view.',
  ],
  tree: {
    path: ['something over the page', 'a question the user must answer'],
    rule: 'Dialog holds a message and a confirm and a cancel button, and takes its width from its content within the size.',
  },
  example: `import { Dialog } from '@drizztdourden08/tessera';

const ReadmeDialog = ({ open, close }: { open: boolean; close: () => void }) => (
  <Dialog open={open} title="README" message="" size="lg" confirmLabel="Close" hideCancel onConfirm={close} onCancel={close}>
    Release notes go here.
  </Dialog>
);
`,
  propsHash: '58f13098eec70cc5',
} satisfies ComponentUsage;

export { usage };
