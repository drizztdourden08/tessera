/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A sunken frame for the thing being worked on, with its toolbar on the top edge, such as an editor, a canvas or a log.',
  useWhen: [
    'An editor or a canvas has tools that belong to it, such as View, Zoom or a filter, on its top edge.',
    'A block of content scrolls inside a fixed frame under its own tools.',
  ],
  avoidWhen: [
    { case: 'A well with no tools of its own.', use: 'Box' },
    { case: 'A raised item with a heading and actions.', use: 'Card' },
    { case: 'A stream of log lines with a filter and Copy.', use: 'LogPanel' },
  ],
  rules: [
    'Pass the tools in toolbar, such as ToolGroups or a FilterBar; it sits on the surface colour over a line.',
    'Give a SearchInput, Select or Combobox in the toolbar grow={false}, so it keeps a set width and sits on one line with the other tools.',
    'The content scrolls under the toolbar; give the frame a height or a flex parent.',
    'Pass padded for space around the content; leave it off when the content has its own, such as a list.',
    'Pass as and aria-label to name it, such as as="section" aria-label="Sprite sheet".',
  ],
  a11y: [
    'It adds no role; name it with as and aria-label when it holds the main work of the screen.',
    'The toolbar comes first in reading order, before the content.',
  ],
  tree: {
    path: ['layout', 'a frame with a toolbar on its top edge'],
    rule: 'ToolFrame is the one frame with tools on its top edge: StudioLayout holds its editor in it and LogPanel its lines.',
  },
  example: `import { Button, ToolFrame, ToolGroups } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const ScriptEditor = ({ script, onRun }: { script: ReactNode; onRun: () => void }) => (
  <ToolFrame
    as="section"
    aria-label="Intro script"
    padded
    toolbar={<ToolGroups groups={[{ id: 'file', label: 'File', content: <Button size="sm" onClick={onRun}>Run</Button> }]} />}
  >
    {script}
  </ToolFrame>
);
`,
  propsHash: 'c23f4226e8e79e0d',
} satisfies ComponentUsage;

export { usage };
