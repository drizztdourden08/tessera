/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The one card every item of a list uses: a single line when folded, its title and body when open.',
  useWhen: [
    'A list shows records, such as tasks or runs, that each have a title, a short code, badges and an actions menu.',
    'Each record has details that stay hidden until the user opens it.',
  ],
  avoidWhen: [
    { case: 'The content is a plain surface with no fold and no header slots.', use: 'Card' },
    { case: 'The item is a catalogue tile with a picture or media.', use: 'ItemCard' },
    { case: 'Only the title line is needed, in a Kanban group bar or a Tree row, with no frame and no body.', use: 'RecordHeader' },
    { case: 'A plain line shows or hides some text and nothing else.', use: 'Disclosure' },
  ],
  rules: [
    'Pass icon, code, content and menu to fill the header slots; they sit in that order after the chevron.',
    'The chevron shows only when there are children, and only it toggles the card, never a click in the menu.',
    'Folded, the title sits in the header and the body is not rendered; open, the title moves above the children, so it shows once.',
    'Give open and onOpenChange to control it, or defaultOpen to start open and let the card keep its own state.',
    'Use density row for a compact list and card for roomy items.',
    'Pass edge, edgeTone and variant as on Card for a coloured edge; never wrap a RecordCard in another Card.',
    'Pass fill when cards sit in a grid, so every card of a row takes the full cell height.',
  ],
  a11y: [
    'The chevron is a button with aria-expanded, and aria-controls pointing at the body while it is open.',
    'Pass name, or aria-label, so the chevron reads Expand ARG-12, not a bare Expand.',
    'Pass aria-label to name the card as a group.',
  ],
  tree: {
    path: ['data', 'a card for each item of a list, folded to one line'],
    rule: 'RecordCard is the shared card of every list item: header slots in a fixed order, a body that folds away.',
  },
  example: `import { Badge, Icon, IconButton, RecordCard, Text } from '@drizztdourden08/tessera';

const TaskCard = () => (
  <RecordCard
    title="Fix the login redirect"
    code="ARG-12"
    content={<Badge variant="inline" value="Open" color="info" />}
    menu={<IconButton variant="ghost" size="sm" label="Actions"><Icon name="ellipsis" /></IconButton>}
  >
    <Text>The redirect drops the return path after sign in.</Text>
  </RecordCard>
);
`,
  propsHash: 'e3d90a3afb688deb',
} satisfies ComponentUsage;

export { usage };
