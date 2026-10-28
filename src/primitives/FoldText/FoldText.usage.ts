/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A block of text clamped to a few lines, with a More control or a hint that reveals the rest, such as the description under a form row.',
  useWhen: [
    'A description or a note can run long and must not push the rest of the screen down.',
    'The reader should be able to open the full text in place, or read it in a hint, without leaving the page.',
  ],
  avoidWhen: [
    { case: 'The text is short and always shown in full.', use: 'Text' },
    { case: 'A whole section hides behind a summary line, not only a few lines of text.', use: 'Disclosure' },
    { case: 'Only a short label is cut off and needs its full text on hover.', use: 'Tooltip' },
  ],
  rules: [
    'Pass lines for the number of lines to show; with no lines the text is never clamped.',
    'Leave overflow on more for a More control that opens the text in place, and show less to fold it again.',
    'Set overflow to hint to keep the text clamped and show a hint beside it, which holds the full text unless hint is passed.',
    'Set overflow to clip to cut the text at lines with no control at all, for text whose full form is shown elsewhere.',
    'The control and the hint only appear when the text runs past lines, so short text shows nothing extra.',
    'Pass fill to give the text the full width of its parent and contain it, so a table cell holding long text keeps the width the table gives it.',
    'Pass truncate middle with a string to keep one line, the start and the end of it, and an ellipsis between, such as a file path; the full text, or hint, shows in a tip while it is cut.',
    'Pass hug with truncate middle to take only the width the text needs, so a button can sit right after it; it still shortens when the parent is narrower than the text.',
  ],
  a11y: [
    'The More control is a button that says whether the text is open and names the text it opens.',
    'The text stays in the page whole, so a screen reader reads all of it even when it is clamped.',
    'Clipped text has no control, so never use clip for text a reader needs and cannot reach another way.',
  ],
  tree: {
    path: ['text', 'long text clamped to a few lines'],
    rule: 'FoldText is the one clamp for long text. FormRow and SettingsRow draw their descriptions with it.',
  },
  example: `import { FoldText } from '@drizztdourden08/tessera';

const Notes = ({ text }: { text: string }) => (
  <FoldText lines={3}>{text}</FoldText>
);
`,
  propsHash: '43ee055b8264d67a',
} satisfies ComponentUsage;

export { usage };
