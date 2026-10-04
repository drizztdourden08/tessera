/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/guide/usage.type';

const usage = {
  job: 'A value that sorts an item into a group, plain, removable or selectable.',
  useWhen: ['An item carries labels such as a genre or a platform.'],
  avoidWhen: [{ case: 'The label is the live state of a job.', use: 'Status' }],
  rules: ['Use the category colours for groups and the urgency colours for priority.'],
  a11y: ['A removable tag names its remove button from the name prop.'],
  tree: {
    // @ts-expect-error the second answer is not in the tree: the off-tree fixture
    path: ['a status, a count or a label', 'a tag on an item'],
    rule: 'A label that files an item into a group.',
  },
  example: `import { Tag } from '@drizztdourden08/tessera';

const Genre = ({ name }: { name: string }) => <Tag variant="category" color="teal">{name}</Tag>;
`,
  propsHash: '914a0eb338c4324b',
} satisfies ComponentUsage;

export { usage };
