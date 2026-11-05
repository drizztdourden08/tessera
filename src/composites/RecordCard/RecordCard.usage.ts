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
    { case: 'A plain line shows or hides some text and nothing else.', use: 'Disclosure' },
  ],
  rules: [
    'Pass icon, code, content and menu to fill the header slots; they sit in that order after the chevron.',
    'The chevron shows only when there are children, and only it toggles the card, never a click in the menu.',
    'Folded, the title sits in the header; open, the header keeps content and the title moves above the children.',
    'Give open and onOpenChange to control it, or defaultOpen to start open and let the card keep its own state.',
    'Use density row for a compact list and card for roomy items.',
  ],
  a11y: [
    'The chevron is a button with aria-expanded and aria-controls pointing at the body.',
    'Pass aria-label to name the card as a group.',
  ],
  tree: {
    path: ['data', 'a card for each item of a list, folded to one line'],
    rule: 'RecordCard is the shared card of every list item: header slots in a fixed order, a body that folds away.',
  },
  example: `import { RecordCard } from '@drizztdourden08/tessera';

const TaskCard = () => (
  <RecordCard title="Fix the login redirect" code="ARG-12" content={<Badge value="Open" color="info" />} menu={<TaskMenu />}>
    <Text>The redirect drops the return path after sign in.</Text>
  </RecordCard>
);
`,
  propsHash: '6dc2c764117f14c6',
} satisfies ComponentUsage;

export { usage };
