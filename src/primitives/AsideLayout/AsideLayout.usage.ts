/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A main area with a side rail beside it that shows only while the container is wide enough, and reports whether it shows.',
  useWhen: [
    'A detail page keeps its facts in a rail beside the main text on wide screens.',
    'A panel sits in a split pane whose width changes, so the rail must follow the pane, not the window.',
    'The page must know whether the rail shows, to move its content into the main area when it hides.',
  ],
  avoidWhen: [
    { case: 'The rail is a panel the user drags wider or folds.', use: 'a resizable side panel' },
    { case: 'The pieces are equal columns.', use: 'Grid' },
  ],
  rules: [
    'Pass main and aside; both are plain content.',
    'Set asideWidth sm, md or lg for 200, 280 or 360 px; md is the default.',
    'Set breakpoint to the container width in px at or above which the aside shows; the default is 720.',
    'The width measured is the layout own width, never the window.',
    'Below the breakpoint the aside is not drawn at all, so nothing in it stays focusable.',
    'Set side start to put the rail before main; the default is end.',
    'Pass onAsideChange to learn whether the aside shows; it runs after the first measure and on every change.',
    'Pass asideLabel so the rail is a named landmark.',
  ],
  a11y: [
    'The aside is an aside landmark named by asideLabel.',
    'A hidden aside is absent from the page, not only invisible.',
  ],
  tree: {
    path: ['layout', 'a main area with a side rail'],
    rule: 'AsideLayout puts a rail beside the main content and drops it when its own container is narrow.',
  },
  example: `import { useState } from 'react';
import { AsideLayout, Text } from '@drizztdourden08/tessera';

const Detail = () => {
  const [shown, setShown] = useState(false);
  return (
    <AsideLayout
      main={<Text>{shown ? 'The facts sit in the rail.' : 'The facts moved below.'}</Text>}
      aside={<Text>Owner, state and dates</Text>}
      asideWidth="md"
      breakpoint={720}
      side="end"
      asideLabel="Facts"
      onAsideChange={setShown}
    />
  );
};
`,
  propsHash: '0000000000000000',
} satisfies ComponentUsage;

export { usage };
