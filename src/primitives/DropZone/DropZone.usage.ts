/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A visible target for files, dropped in, pasted or picked with a click that opens the file dialog.',
  useWhen: [
    'The user brings files onto a screen by dragging them in, such as a ROM, an icon or an avatar picture.',
    'A header row needs a one line box that takes a file, with the inline variant.',
  ],
  avoidWhen: [
    { case: 'A button of your own opens the file dialog and no area takes a drop.', use: 'FileInput' },
    { case: 'The user types or browses to a path on disk.', use: 'PathInput' },
  ],
  rules: [
    'Pass accept as extensions such as .png or media types such as image/*; onDrop gets only the files that pass.',
    'Pass onReject to hear about the files accept refused, and tell the user why, for example through status.',
    'Set status after a check, success or error with a message, to show the result under the label.',
    'Set variant inline for a one line box in a header row; block is the tall target with a glyph and a hint.',
    'Set disabled to show the not allowed pointer and swallow drops.',
  ],
  a11y: [
    'The inline box is a button: a click, Enter or Space opens the file dialog.',
    'Ctrl+V pastes files while the box is pointed at or focused.',
  ],
  tree: {
    path: ['a value the user sets', 'files dropped or pasted onto an area'],
    rule: 'DropZone is the visible area that takes files dragged in, pasted or picked.',
  },
  example: `import { useState } from 'react';
import { DropZone } from '@drizztdourden08/tessera';
import type { DropZoneStatus } from '@drizztdourden08/tessera';

const IconUpload = ({ onIcon }: { onIcon: (file: File) => void }) => {
  const [status, setStatus] = useState<DropZoneStatus | undefined>(undefined);
  return (
    <DropZone
      accept={['.png', '.svg']}
      label="Drop an icon here"
      status={status}
      onDrop={([file]) => {
        if (!file) return;
        setStatus(undefined);
        onIcon(file);
      }}
      onReject={() => setStatus({ tone: 'error', message: 'Only PNG and SVG' })}
    />
  );
};
`,
  propsHash: 'ebc4a7f413e0f0f5',
} satisfies ComponentUsage;

export { usage };
