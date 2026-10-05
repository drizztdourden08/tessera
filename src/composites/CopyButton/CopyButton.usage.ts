/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A button that copies a text to the clipboard and confirms it with a check and the word Copied.',
  useWhen: [
    'One action copies something the user does not see in full, such as debug info or a whole log.',
    'A panel needs a copy action beside its other buttons, with or without its word.',
  ],
  avoidWhen: [
    { case: 'The value itself is on screen and the copy belongs at its end.', use: 'CopyValue' },
    { case: 'Labelled values sit together in a panel, some of them to copy.', use: 'FactsPanel' },
  ],
  rules: [
    'Name the button after what it copies, such as Copy address or Copy debug info.',
    'Pass a function as text when the text is costly to build or changes often, so it is built at the click.',
    'Keep it icon only in tight rows and toolbars; show the word where the button stands alone.',
  ],
  a11y: [
    'An icon only button is named by its label and shows the same name as a tooltip.',
    'After a copy, a polite status region says Copied once, and the name reads Copied for two seconds.',
  ],
  tree: {
    path: ['actions', 'one action', 'copies a text'],
    rule: 'CopyButton writes to the clipboard through the one copy path every Tessera part uses, with the same check and announcement.',
  },
  example: `import { CopyButton } from '@drizztdourden08/tessera';

const AboutActions = ({ debugInfo }: { debugInfo: () => string }) => (
  <CopyButton text={debugInfo} label="Copy debug info" showLabel variant="secondary" />
);
`,
  propsHash: 'b39e8ed376a355a2',
} satisfies ComponentUsage;

export { usage };
