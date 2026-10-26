/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The root of a website page: it lets the whole document scroll, which a desktop app screen locks, and puts the page inside one box.',
  useWhen: [
    'A website page is longer than the window and the browser should scroll the page itself, with its own scrollbar.',
    'A page has a full-bleed Hero or a sticky header that needs the document to scroll under it.',
  ],
  avoidWhen: [
    { case: 'A desktop app screen scrolls inside its panes and the window stays fixed.', use: 'ScrollArea' },
    { case: 'A web app keeps the root locked and scrolls inside one padded frame.', use: 'PageFrame' },
    { case: 'A list or a table scrolls inside a box on the page.', use: 'ScrollArea' },
  ],
  rules: [
    'Mount one PageRoot at the top of the page; it sets data-scroll="document" on the html element and restores the old value when it unmounts.',
    'Without a PageRoot the reset still locks html and body, so desktop apps stay exactly as they are.',
    'Open dialogs lock the page again while they are shown, so the page behind does not scroll.',
    'It renders a plain box and takes the props of a div, such as className and children.',
    'PageRoot lets the whole document scroll; PageFrame keeps the root locked and scrolls inside one frame.',
  ],
  a11y: [
    'It adds no role, so give the page a main landmark inside it.',
    'The browser scrolls the document, so the keys, the scrollbar and find in page work as on any website.',
  ],
  tree: {
    path: ['layout', 'website chrome', 'the root of the page'],
    rule: 'PageRoot is the one part that turns document scrolling on; everything inside it is built from the usual parts.',
  },
  example: `import { Hero, PageRoot, SiteHeader } from '@drizztdourden08/tessera';
import type { SiteHeaderProps } from '@drizztdourden08/tessera';

interface HomePageProps {
  header: SiteHeaderProps;
}

const HomePage = ({ header }: HomePageProps) => (
  <PageRoot>
    <SiteHeader {...header} />
    <Hero size="full" title="Relic of the Past" art={{ kind: 'image', src: '/art/hills.png', motion: 'pan' }} />
  </PageRoot>
);
`,
  propsHash: '5fd9a46cb23cc3ab',
} satisfies ComponentUsage;

export { usage };
