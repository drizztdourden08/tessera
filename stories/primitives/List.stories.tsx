/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Checkbox, List, ListItem } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type ListArgs = Record<string, never>;

const meta = {
  title: 'Primitives · Display/List',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ListArgs>;

const Bullets = {
  name: 'Bullets with a nested list',
  render: () => (
    <List>
      <ListItem>
        Rumble strength
        <List>
          <ListItem>per controller</ListItem>
          <ListItem>per profile</ListItem>
        </List>
      </ListItem>
      <ListItem>Motion sensors</ListItem>
    </List>
  ),
} satisfies StoryLiteStoryDefinition<ListArgs>;

const Numbers = {
  name: 'Numbers from a start',
  render: () => (
    <List ordered start={3}>
      <ListItem>Press each button</ListItem>
      <ListItem>Move each stick</ListItem>
      <ListItem>Take a resting reading</ListItem>
    </List>
  ),
} satisfies StoryLiteStoryDefinition<ListArgs>;

const Bare = {
  name: 'Items with a control and no marker',
  render: () => (
    <List>
      <ListItem bare><Checkbox checked disabled onChange={() => undefined} label="Shipped" /></ListItem>
      <ListItem bare><Checkbox checked={false} disabled onChange={() => undefined} label="Planned" /></ListItem>
    </List>
  ),
} satisfies StoryLiteStoryDefinition<ListArgs>;

const CODE = `import { List, ListItem } from '@drizztdourden08/tessera';

<List>
  <ListItem>Rumble is adjustable</ListItem>
  <ListItem>Motion sensors show on the card</ListItem>
</List>

<List ordered start={3}>
  <ListItem>third</ListItem>
  <ListItem>fourth</ListItem>
</List>`;

const Overview = overviewStory({
  component: 'List',
  importName: 'List',
  description: 'A bulleted or numbered list of short items, with a nested list drawn one step in.',
  points: [
    '`List` is the bulleted list; `ordered` makes it numbered and `start` sets the first number.',
    '`ListItem` is one item; put a nested `List` inside it and the markers change for each level.',
    '`bare` takes the marker off an item that holds its own control, such as a Checkbox.',
    'The markers use the dim text colour; the items sit a small gap apart.',
  ],
  instead: '[ItemList] for a list the user adds to, renames and deletes from, or [CheckList] for choices.',
  variants: [Bullets, Numbers, Bare],
  code: CODE,
});

export default meta;
export { Bare, Bullets, Numbers, Overview };
