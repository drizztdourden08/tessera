/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Shows its content and, when the key changes, moves from the old content to the new with a fade, a slide, a scale or a reflow of its items, without the layout jumping.',
  useWhen: [
    'A panel shows one of several views, and the change should read as a change, such as a wizard step or a detail pane.',
    'The content is replaced in the same place, and the key says when it is a different thing.',
  ],
  avoidWhen: [
    { case: 'A set of slides the user pages through with controls.', use: 'Carousel' },
    { case: 'Content that only shows or hides in place.', use: 'Disclosure' },
  ],
  rules: [
    'Give swapKey a value that changes only when the content is a different thing, not on every render.',
    'Pick the effect by meaning: fade for a replacement, slide for steps with a direction, scale for a detail that opens.',
    'Use reflow around a list: the items inside collapse and fade, then the new items grow in. Items take part when they carry data-swap-item; KanbanBoard cards, ItemList rows, ListItemRow and DataTable rows already do. The frame around the items does not move.',
    'Set direction to back for a slide that goes to an earlier step.',
    'Set sequence to out-in for tab panels whose contents should never mix: the old content fades out and is removed, then the new content shows. The default overlap crossfades both at once.',
    'In out-in a quick second change shows only the newest content; the one that never appeared is skipped.',
    'The old content stays on screen for the length of the motion, then is dropped; it is a copy, so it does not take input.',
  ],
  a11y: [
    'The leaving content is hidden from assistive tools; only the new content is read.',
    'Under reduced motion the content swaps at once in both sequences, with no animation.',
    'The old layer leaves on animationend or after its computed animation time, whichever comes first, so a hidden tab or a test with no styles still shows the new content.',
  ],
  tree: {
    path: ['layout', 'content that changes with a key'],
    rule: 'ContentSwap replaces content in place and animates the change when its key changes.',
  },
  example: `import { ContentSwap, ItemList, Text } from '@drizztdourden08/tessera';

const StepPanel = ({ step }: { step: number }) => (
  <ContentSwap swapKey={step} effect="slide">
    <Text>Current step</Text>
  </ContentSwap>
);

const TabPanel = ({ tab }: { tab: string }) => (
  <ContentSwap swapKey={tab} sequence="out-in">
    <Text>{tab}</Text>
  </ContentSwap>
);

interface Task {
  id: string;
  name: string;
}

const ReflowList = ({ view, tasks }: { view: string; tasks: Task[] }) => (
  <ContentSwap swapKey={view} effect="reflow">
    <ItemList title="Tasks" items={tasks} getId={(task) => task.id} getName={(task) => task.name} />
  </ContentSwap>
);
`,
  propsHash: 'eaa6bde622254f8f',
} satisfies ComponentUsage;

export { usage };
