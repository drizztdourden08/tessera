/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Interface text in a role, such as a title, a caption or an overline, and the namespace for every text element, such as Text.P or Text.Strong.',
  useWhen: [
    'A label, a caption or a short line of interface copy needs a size and a colour from the scale.',
    'Running text uses the elements under Text, such as Text.P, Text.Strong or Text.Code.',
  ],
  avoidWhen: [
    { case: 'A heading that names a page or a section.', use: 'Title' },
    { case: 'A section title with an action beside it.', use: 'SectionHeader' },
  ],
  rules: [
    'Pick the role with variant: title, subtitle, body, label, caption, or overline over a group; with no variant it takes the size and colour of its parent.',
    'Colour it with tone, as on Span: muted for quiet captions, danger for an error.',
    'Use the faint tone for decoration and secondary hints only, such as a keyboard hint beside a field or a watermark; never for text people must read. It measures about 1.6:1 on the surface (1.5:1 to 1.7:1 across the app palettes), under the 4.5:1 that body text needs, so the quietest tone for text is muted.',
    'The parts of Tessera use muted, never faint; faint is there only for an app that asks for it.',
    'Set mono for file names, seeds and addresses, and numeric for times and counts that line up.',
  ],
  a11y: [
    'It renders a span unless as names another element; pick p, label or a heading element when the text has that role.',
    'Faint text fails the contrast a reader needs, so nothing a user must read or act on may use it.',
  ],
  tree: {
    path: ['text', 'running text'],
    rule: 'Text sets interface copy in a role from the scale, and its members draw each text element.',
  },
  example: `import { Text } from '@drizztdourden08/tessera';

const SyncLine = () => (
  <Text.P>
    <Text variant="caption" tone="muted">Last synced 12 seconds ago</Text>
    <Text variant="caption" tone="faint"> · Hold Shift to snap</Text>
  </Text.P>
);
`,
  propsHash: 'f727b6a67ffcbd3d',
} satisfies ComponentUsage;

export { usage };
