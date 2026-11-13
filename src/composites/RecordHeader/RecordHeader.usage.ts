/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The one title line every item uses: a chevron, an icon, a code, a title, badges and a menu, centred in a single row.',
  useWhen: [
    'An item shows its identity in one line, such as a task with a code, a title, a status badge and an actions menu.',
    'A Kanban group bar or a Tree row needs the same line as a RecordCard, with no frame around it.',
  ],
  avoidWhen: [
    { case: 'The item needs a frame, a fold and a body under its title line.', use: 'RecordCard' },
    { case: 'The line is plain text with no slots.', use: 'Text' },
    { case: 'The item is a catalogue tile with a picture or media.', use: 'ItemCard' },
  ],
  rules: [
    'Pass icon, code, title, content and menu to fill the slots; they sit in that order after the chevron, and content sits at the end, next to the menu.',
    'Pass chevron with expanded and onToggle to show the fold button; leave it out and no button shows. A click anywhere on the row also toggles, except a click on a button, link or field inside it. That row counts as a control, so its click never opens a Kanban card or a clickable Card around it. controls names the folded element and label replaces the default name.',
    'The header has no padding and no surface, so the parent gives them: a card, a Kanban group bar or a tree row.',
    'Use density row for a compact line and card for a roomy one; it only changes the gap between the slots.',
    'In a Kanban group bar, pass the fold of renderGroupHeader to chevron: { expanded: fold.open, onToggle: fold.toggle, controls: fold.controls }.',
    'In a Tree, draw it from renderLabel with density row and no chevron, since the tree has its own twisty.',
  ],
  a11y: [
    'The chevron is a bare button with aria-expanded and, when controls is set, aria-controls; Enter and Space on it toggle. The row has no role of its own.',
    'A long title is cut with an ellipsis. The title keeps a minimum width; when the row is too narrow for it, the content and the menu drop to their own line under the title.',
  ],
  tree: {
    path: ['data', 'the title line of an item, with icon, code, badges and actions'],
    rule: 'RecordHeader is the shared title line of every item: slots in a fixed order, centred, with no frame of its own.',
  },
  example: `import { useState } from 'react';
import { Badge, RecordHeader, TypeMark } from '@drizztdourden08/tessera';

const TaskLine = () => {
  const [open, setOpen] = useState(true);
  return (
    <RecordHeader
      icon={<TypeMark icon="bug" label="Bug" color="violet" variant="outline" />}
      code="ARG-12"
      title="Fix the login redirect"
      content={<Badge variant="inline" value="Open" color="info" />}
      chevron={{ expanded: open, onToggle: () => setOpen(!open), controls: 'task-body' }}
    />
  );
};
`,
  propsHash: '58903893b66e56b8',
} satisfies ComponentUsage;

export { usage };
