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
    'Use the faint tone for the quietest text, such as a keyboard hint beside a field. It stays at or above 4.5:1 on the main ground, but it is dimmer than muted, so keep it to short secondary hints.',
    'Never colour text with --c-text-disabled; it is under 2:1 and only for text inside a disabled control, borders and decoration.',
    'Set size md for the 13 px step between the small and base sizes, such as a dense row of values; with no size the variant sets it.',
    'Set size lead for the 15 px step between the base and large sizes.',
    'Set leading 16 to fix the line height at 16 px, so a caption in a card head row stays one 16 px line beside a 2xs IconButton and an Icon with a hue.',
    'Set font title to draw the text in the title face at weight 600 without changing its size, such as a 14 px name in a list; weight still overrides the 600.',
    'Set smartTimes to draw a multiplication sign for an x between two digits, as in a size written 1920x1080; only text children change, and a nested element is left as it is.',
    'Set clamp to a line count to cut longer text with an ellipsis; the full text shows in a tooltip only when it is cut.',
    'Set indent to a depth from 0 to 8 to pad the start of a tree row by that many indent steps; a depth above 8 counts as 8. A span has no box of its own, so pair indent with as="div" or put it inside a cell.',
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
  propsHash: '6959ec76ee231729',
} satisfies ComponentUsage;

export { usage };
