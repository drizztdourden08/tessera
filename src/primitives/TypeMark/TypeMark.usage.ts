/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small tinted tile that holds an icon in a colour, to mark the type of an item, such as a bug or a story.',
  useWhen: [
    'An item card, a pane title, a tree row or a legend row shows what type the item is.',
    'Each type keeps one icon and one colour on every screen.',
  ],
  avoidWhen: [
    { case: 'The mark stands for a person.', use: 'Avatar' },
    { case: 'The value is a word the user can read and filter on.', use: 'Tag' },
  ],
  rules: [
    'Pass icon with a Tessera icon name and label with the type name; the label is the tooltip and the text a screen reader reads.',
    'Set color to one of the category colours; the tile takes a tint of it and the icon takes the full colour.',
    'Set size xs for 16 px in a dense row and sm for 20 px beside a title.',
    'Set variant outline for the bare icon in the category colour, with no tile, border or padding; the icon fills the box the tile would take, 16 px at xs and 20 px at sm.',
  ],
  a11y: [
    'It is an image with the label as its name, and the label shows in a tooltip on hover and focus.',
    'Colour carries no meaning the label does not give.',
  ],
  tree: {
    path: ['a status, a count or a label', 'a value that sorts an item into a group'],
    rule: 'TypeMark answers what kind of thing an item is with a small icon tile.',
  },
  example: `import { TypeMark } from '@drizztdourden08/tessera';

const BugMarks = () => (
  <>
    <TypeMark icon="bug" label="Bug" color="rose" />
    <TypeMark icon="bug" label="Bug" color="rose" variant="outline" />
  </>
);
`,
  propsHash: 'cfee2ed19acd0cf1',
} satisfies ComponentUsage;

export { usage };
