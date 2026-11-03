/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small round or square mark for a person, drawn as one or two initials, an icon or a picture, or as a dashed circle when nobody is assigned.',
  useWhen: [
    'An item card or a list row shows who owns it, in 16 px beside other text.',
    'A detail pane names the assignee at 24 px.',
    'The signed-in person must stand out among the rest, so their items carry a ring.',
  ],
  avoidWhen: [
    { case: 'The mark names a kind of thing, not a person.', use: 'TypeMark' },
    { case: 'The value is a word that sorts an item into a group.', use: 'Tag' },
  ],
  rules: [
    'Pass label with the name of the person; it is the tooltip and the text a screen reader reads.',
    'Pass initials, one or two letters, icon, or src for a picture, never more than one; with none it draws the unassigned circle.',
    'A picture fills the shape and is cropped to it, named once by label on the avatar, with the picture itself hidden from screen readers; if it fails to load, the initials of the label show instead.',
    'Set shape square for a rounded square instead of a circle, for a team or a workspace.',
    'Set color to one of the category colours so a person keeps one colour on every screen.',
    'Set size xs for 16 px on a card and sm for 24 px in a pane.',
    'Set variant owner for the signed-in person; it draws a ring around the circle.',
  ],
  a11y: [
    'It is an image with the label as its name, and the label shows in a tooltip on hover and focus.',
    'Colour carries no meaning the label does not give.',
  ],
  tree: {
    path: ['a status, a count or a label', 'a value that sorts an item into a group'],
    rule: 'Avatar answers who an item belongs to with a small round mark.',
  },
  example: `import { Avatar } from '@drizztdourden08/tessera';

const Assignees = () => (
  <>
    <Avatar label="Wren Archer" initials="WA" color="teal" />
    <Avatar label="You" icon="user" color="violet" variant="owner" size="sm" />
    <Avatar label="Wren Archer" src="/people/wren.png" size="sm" />
    <Avatar label="Platform team" src="/teams/platform.png" shape="square" size="sm" />
    <Avatar label="Unassigned" />
  </>
);
`,
  propsHash: '1a99b8d85560ce48',
} satisfies ComponentUsage;

export { usage };
