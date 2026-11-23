/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One line of text that slides back and forth when it is wider than its room, so a long title or a row of chips stays on one line and is still readable.',
  useWhen: [
    'A single line, such as a card title or a strip of chips, must keep its height and can be longer than the space it gets.',
    'The reader may wait a moment to see the end of the text, and can stop the slide by pointing at it.',
  ],
  avoidWhen: [
    { case: 'The text may wrap onto a few lines and fold with a More control.', use: 'FoldText' },
    { case: 'A file path or a name must keep its end visible with a cut in the middle.', use: 'FoldText' },
    { case: 'The text is short and always fits.', use: 'Text' },
  ],
  rules: [
    'Put the text, or a short inline run such as a row of chips, as the children. It keeps to one line and never wraps.',
    'When the children fit, nothing moves and nothing is added. When they are wider than the box, they slide to the end and back, pausing at each end.',
    'The slide stops while the pointer is over the text or focus is inside it.',
    'Under reduced motion the slide is off and the text is cut with an ellipsis.',
    'The full text shows in the title of the box while it overflows: a string child is used as it is, and title replaces it for any other child.',
    'The box takes the width its parent gives it, so put it in a parent that sets one.',
  ],
  a11y: [
    'The text stays in the page whole, so a screen reader reads all of it while it slides.',
    'The slide is paused by hover and focus and is off under reduced motion, so it never has to be read in motion.',
  ],
  tree: {
    path: ['text', 'one line that slides when it is too long'],
    rule: 'TickerText is the one line that slides. A strip of chips or a card title uses it instead of folding or wrapping.',
  },
  example: `import { TickerText } from '@drizztdourden08/tessera';

const CardTitle = ({ text }: { text: string }) => (
  <TickerText>{text}</TickerText>
);
`,
  propsHash: '23ab016c62b87531',
} satisfies ComponentUsage;

export { usage };
