/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A hidden file picker that a button of your own opens, and that hands back the chosen files.',
  useWhen: [
    'A toolbar or menu button should open the system file dialog and take the files it returns.',
    'The control that opens the dialog is drawn by the caller, not by a drop area.',
  ],
  avoidWhen: [
    { case: 'The user drops or pastes files into a visible area.', use: 'DropZone' },
    { case: 'The user types or browses to a path on disk.', use: 'PathInput' },
  ],
  rules: [
    'Keep a ref to the input and call click on it from the button that opens the dialog.',
    'Pass accept as a list of types, such as image/*, to narrow the dialog.',
    'Pass multiple to let the user choose several files at once.',
    'onFiles gets the chosen files and is not called when the dialog is cancelled.',
    'The input is cleared after each choice, so the same file can be picked twice in a row.',
  ],
  a11y: [
    'The input is hidden and out of the tab order; the button that opens it carries the name and the focus.',
  ],
  tree: {
    path: ['a value the user sets', 'a file'],
    rule: 'FileInput is the hidden picker behind a button, for a file the user chooses from a dialog.',
  },
  example: `import { useRef } from 'react';
import { Button, FileInput } from '@drizztdourden08/tessera';

const AttachButton = ({ onAttach }: { onAttach: (files: File[]) => void }) => {
  const pick = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button onClick={() => pick.current?.click()}>Attach</Button>
      <FileInput ref={pick} accept={['image/*']} multiple onFiles={onAttach} />
    </>
  );
};
`,
  propsHash: '6041b48c7fadb177',
} satisfies ComponentUsage;

export { usage };
