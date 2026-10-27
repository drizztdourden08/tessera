/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The frame of a modal: a backdrop, a panel with a header and a close button, a scrolling body and a row of actions.',
  useWhen: [
    'The dialog has its own body and its own buttons, such as a details view, a form or a README.',
    'A composite needs a modal frame with focus, Escape and the backdrop handled for it.',
  ],
  avoidWhen: [
    { case: 'The dialog asks one question with confirm and cancel.', use: 'Dialog' },
    { case: 'A long job runs and the user may hide it or cancel it.', use: 'JobDialog' },
  ],
  rules: [
    'Pass size sm, md or lg; each has a min and a max width from tokens, and the default is sm.',
    'The width follows the content between the min and the max, and never passes the window minus a margin.',
    'The height grows with the content up to the window minus a margin; the header and the actions stay and only the body scrolls.',
    'Set steady to pin the width to the max of the size, for a body whose content changes, such as a wizard step or an error line.',
    'Set dismissable to false while a save runs, so only your own actions close it.',
  ],
  a11y: [
    'The panel has role dialog and aria-modal, and the title names it.',
    'Tab and Shift+Tab stay inside; Escape and the close button close it unless it is not dismissable.',
    'Focus moves in on open and returns to the opener on close.',
  ],
  tree: {
    path: ['something over the page', 'a dialog with its own layout'],
    rule: 'DialogShell gives the frame, the focus and the scrolling body, and leaves the content and the buttons to you.',
  },
  example: `import { Button, DialogShell } from '@drizztdourden08/tessera';

const DetailsDialog = ({ open, close }: { open: boolean; close: () => void }) => (
  <DialogShell open={open} onClose={close} title="Friday async" size="md" actions={<Button onClick={close}>Close</Button>}>
    Eight players are connected.
  </DialogShell>
);
`,
  propsHash: '80113886b20170a4',
} satisfies ComponentUsage;

export { usage };
