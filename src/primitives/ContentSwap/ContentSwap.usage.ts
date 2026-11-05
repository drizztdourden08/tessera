/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Shows its content and, when the key changes, moves from the old content to the new with a fade, a slide or a scale, without the layout jumping.',
  useWhen: [
    'A panel shows one of several views, and the change should read as a change, such as a wizard step or a detail pane.',
    'The content is replaced in the same place, and the key says when it is a different thing.',
  ],
  avoidWhen: [
    { case: 'A set of slides the user pages through with controls.', use: 'Carousel' },
    { case: 'Content that only shows or hides in place.', use: 'Disclosure' },
  ],
  rules: [
    'Give swapKey a value that changes only when the content is a different thing, not on every render.',
    'Pick the effect by meaning: fade for a replacement, slide for steps with a direction, scale for a detail that opens.',
    'Set direction to back for a slide that goes to an earlier step.',
    'The old content stays on screen for the length of the motion, then is dropped; it is a copy, so it does not take input.',
  ],
  a11y: [
    'The leaving content is hidden from assistive tools; only the new content is read.',
    'Under reduced motion the content swaps at once, with no animation.',
  ],
  tree: {
    path: ['layout', 'content that changes with a key'],
    rule: 'ContentSwap replaces content in place and animates the change when its key changes.',
  },
  example: `import { ContentSwap, Text } from '@drizztdourden08/tessera';

const StepPanel = ({ step }: { step: number }) => (
  <ContentSwap swapKey={step} effect="slide">
    <Text>Current step</Text>
  </ContentSwap>
);
`,
  propsHash: 'd872196a9992c2db',
} satisfies ComponentUsage;

export { usage };
