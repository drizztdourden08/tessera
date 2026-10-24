/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A bar at the foot of a region that asks a question with actions such as Apply and Cancel, and blocks the region until the user answers.',
  useWhen: [
    'The user must answer before going on in one area, such as applying or dropping a change to a canvas, while the rest of the app stays usable.',
    'A question needs actions that stay on screen until chosen, in the look of a Toast.',
  ],
  avoidWhen: [
    { case: 'The whole app must wait for the answer.', use: 'Dialog' },
    { case: 'A short message passes by itself and needs no answer.', use: 'Toast' },
    { case: 'A note stays on the page and blocks nothing.', use: 'Callout' },
  ],
  rules: [
    'Put it in a positioned parent, beside the region it blocks: it covers that parent and its siblings go inert.',
    'Set scope to window only when the whole page must wait; it then covers the window and everything outside the bar goes inert.',
    'Pass actions as data, each with an id, a label and onSelect; the app owns open and closes it from onSelect.',
    'Mark one action cancel for the way out: Escape runs it, and it draws as a ghost button.',
    'Keep the message to one short sentence that says what will happen, such as Apply the 3 pending edits to the canvas.',
    'Use variant for the tone, the same names as Toast; info is the default.',
  ],
  a11y: [
    'The bar is an alert dialog that is not modal to the app: a screen reader reads its message at once, and only the region it covers is out of reach.',
    'On open focus moves to the first action, Tab stays in the bar, and on close focus returns to where it was.',
    'The siblings of the bar in its parent are inert while it is open, so the region gets no pointer or keyboard input.',
    'Escape runs the action marked cancel; with none, Escape does nothing.',
    'Pass label when the message is not enough to name the bar; otherwise the message names it.',
    'Under reduced motion the bar and its layer appear with no animation.',
  ],
  tree: {
    path: ['feedback', 'a question that blocks one region until it is answered'],
    rule: 'FloatingPrompt asks the user to answer before going on in one region, with actions from data and the look of a Toast.',
  },
  example: `import { FloatingPrompt } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

interface CanvasAreaProps {
  canvas: ReactNode;
  pending: number;
  apply: () => void;
  cancel: () => void;
}

const CanvasArea = ({ canvas, pending, apply, cancel }: CanvasAreaProps) => (
  <div style={{ position: 'relative' }}>
    {canvas}
    <FloatingPrompt
      open={pending > 0}
      message={\`Apply the \${pending} pending edits to the canvas.\`}
      actions={[
        { id: 'apply', label: 'Apply', onSelect: apply },
        { id: 'cancel', label: 'Cancel', onSelect: cancel, cancel: true },
      ]}
    />
  </div>
);
`,
  propsHash: 'f5f1a4b561e85c92',
} satisfies ComponentUsage;

export { usage };
