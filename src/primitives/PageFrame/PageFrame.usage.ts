/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A full-height, padded page that scrolls inside its own frame, for a web app whose html and body stay locked.',
  useWhen: [
    'A web app screen is longer than the window and the frame, not the document, should scroll, such as a settings or account page.',
    'The content should sit in a column of a set width, centred in a wide window.',
  ],
  avoidWhen: [
    { case: 'A website page should scroll with the document, with its own scrollbar and a full-bleed Hero.', use: 'PageRoot' },
    { case: 'Only a box inside a screen scrolls, such as a list or a log.', use: 'ScrollArea' },
  ],
  rules: [
    'It is the scroller: the reset keeps html and body locked and the frame is 100dvh tall, so the page behind it never moves.',
    'Set fill to take the height of its parent instead of the window, such as a page inside a pane.',
    'Set width to sm, md or lg to centre the content in a column of that size; leave it out for the full width.',
    'The padding is the page padding token. It is a ScrollArea, so it takes className and the other ScrollArea props except axis.',
    'PageFrame keeps the root locked and scrolls inside one frame; PageRoot instead lets the whole document scroll.',
  ],
  a11y: [
    'It adds no role, so put a main landmark inside it.',
    'The frame is a scrolling region the keyboard can scroll once it has focus; give it tabIndex 0 when it holds no focusable content.',
  ],
  tree: {
    path: ['layout', 'a full-height page that scrolls inside one frame'],
    rule: 'PageFrame is the page of an app that keeps the root locked; PageRoot is the page of a site that scrolls the document.',
  },
  example: `import { PageFrame, Title } from '@drizztdourden08/tessera';

const AccountPage = () => (
  <PageFrame width="md">
    <Title>Account</Title>
  </PageFrame>
);
`,
  propsHash: '135ed98db17e24a8',
} satisfies ComponentUsage;

export { usage };
