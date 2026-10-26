/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A bulleted or numbered list of short items, with a nested list drawn one step in.',
  useWhen: [
    'A short run of points, such as the changes in a release or the steps to install.',
    'Text from Markdown is drawn with Tessera parts: Markdown draws every list with List and ListItem.',
  ],
  avoidWhen: [
    { case: 'A list the user adds to, renames and deletes from.', use: 'ItemList' },
    { case: 'A list of choices to tick.', use: 'CheckList' },
  ],
  rules: [
    'Put a ListItem inside each List; a nested List goes inside the ListItem it belongs to.',
    'Pass ordered for numbers and start for the first number; without ordered the list has bullets.',
    'Pass bare on a ListItem that holds its own control, such as a Checkbox: it takes the marker off and pulls the control back to the left edge.',
    'Keep each item short; a long item wraps under its marker.',
  ],
  a11y: [
    'It is a real list, so a screen reader reads its length and the position of each item.',
    'A nested List is read as a list inside its item.',
  ],
  tree: {
    path: ['text', 'a bulleted or numbered list of short items'],
    rule: 'List is the bulleted or numbered list; ListItem is one item, and a nested List inside it is drawn one step in.',
  },
  example: `import { List, ListItem } from '@drizztdourden08/tessera';

const Steps = () => (
  <List ordered start={1}>
    <ListItem>Download the zip.</ListItem>
    <ListItem>
      Unpack it anywhere.
      <List>
        <ListItem>Keep the folder name short.</ListItem>
      </List>
    </ListItem>
  </List>
);
`,
  propsHash: 'f7517ddc92b3f355',
} satisfies ComponentUsage;

export { usage };
