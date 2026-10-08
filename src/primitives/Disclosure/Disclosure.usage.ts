/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A line, such as Details or Show log, that shows or hides the content under it when clicked.',
  useWhen: [
    'Some content helps only a few readers, such as the raw text of an error, a log or long release notes.',
    'A list of groups where each one opens on its own, such as the records that point at the one being edited.',
  ],
  avoidWhen: [
    { case: 'The views are peers and only one shows at a time.', use: 'Tabs' },
    { case: 'The content needs the whole screen or an answer.', use: 'Dialog' },
    { case: 'A failed load with its raw error.', use: 'LoadError' },
  ],
  rules: [
    'Write summary as what opens, such as Details, What is new or Show log (24).',
    'It keeps no state: pass defaultOpen to start it open, and onOpenChange to hear each toggle, such as to load a log only once it opens.',
    'A later change to defaultOpen opens or closes it, so a part can open it when a job fails.',
    'Use size sm for a line in small text, such as inside a settings row.',
  ],
  a11y: [
    'It is the browser details element: Enter and Space toggle the line, and screen readers say whether it is open.',
    'Closed content stays in the page, so find in page still reaches it.',
  ],
  tree: {
    path: ['layout', 'more content behind a line that shows or hides it'],
    rule: 'Disclosure shows or hides what is under one line with the browser details element, with one look for every app.',
  },
  example: `import { Disclosure, Paragraph } from '@drizztdourden08/tessera';

const ReleaseNotes = ({ notes }: { notes: string }) => (
  <Disclosure summary="What is new">
    <Paragraph tone="dim">{notes}</Paragraph>
  </Disclosure>
);
`,
  propsHash: '3655ce98e34fde90',
} satisfies ComponentUsage;

export { usage };
