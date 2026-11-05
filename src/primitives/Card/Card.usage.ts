/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One raised surface that groups related content, with an optional header, and that can act as one target when pressed.',
  useWhen: [
    'Related content sits together on a raised surface, with or without a title and actions.',
    'The whole card opens a detail view when pressed, while buttons and menus inside it keep their own jobs.',
  ],
  avoidWhen: [
    { case: 'The whole surface is one button with no inner controls.', use: 'Pressable' },
    { case: 'A plain block with no raised look.', use: 'Box' },
  ],
  rules: [
    'Give the card a title for a header, or a header node for a custom one; without either it is a bare surface.',
    'onActivate makes the surface focusable and fires on a click and on Enter or Space when the card itself has focus. The look is interactive unless a variant is given.',
    'onActivate never fires from an inner button, link, field, menu or editable text, nor from a menu drawn in a portal.',
    'The card gets no button role, since it may hold buttons. Pass aria-label to name it.',
  ],
  a11y: [
    'With onActivate the card is a Tab stop; Enter and Space activate it only while the card itself has focus.',
    'Every action reachable by pressing the card is also reachable by a real button or link inside it.',
  ],
  tree: {
    path: ['layout', 'one raised item'],
    rule: 'Card is the raised surface that groups related content and can open a detail view when pressed.',
  },
  example: `import { Button, Card } from '@drizztdourden08/tessera';

const openDetail = () => undefined;
const archive = () => undefined;

const Task = () => (
  <Card title="Fix the login form" aria-label="Task: Fix the login form" onActivate={openDetail}>
    <Button onClick={archive}>Archive</Button>
  </Card>
);
`,
  propsHash: 'c0d4c940b3d1e1c2',
} satisfies ComponentUsage;

export { usage };
