/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A plain stacked section with a heading, optional action and a body.',
  useWhen: ['A side pane needs a consistently headed section.', 'A list or detail pane needs the shared panel heading and body structure.'],
  avoidWhen: [{ case: 'Content needs a card surface, outline or interactive state.', use: 'Card' }],
  rules: [
    'Pass title for the heading and children for the body.',
    'The title is always shown above the body without a card surface or border.',
    'Pass sublabel for a muted label right after the title; it shrinks first, then the title, and a clipped one shows in a Tooltip.',
    'Pass action for a control in the header.',
    'Pass fill to take the room left in a flex column; the body then has a definite height, so a DataTable inside scrolls on its own.',
  ],
  a11y: ['The title is a heading; the body remains arbitrary content.'],
  buildingBlock: true,
  example: `import { PanelContainer } from '@drizztdourden08/tessera';

<PanelContainer title="Profiles" action="New">
  Profiles go here.
</PanelContainer>`,
  propsHash: '4dcec4742a425e1b',
} satisfies ComponentUsage;

export { usage };
