/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The big header of a content container: an icon and a title over a fading backdrop, with a strip of controls after the title and actions at the end.',
  useWhen: [
    'A card, a panel or a page needs a header that names it, with an icon and a title.',
    'Section pills or a status sit right after the title, and a few buttons at the end.',
  ],
  avoidWhen: [
    { case: 'A small heading row inside a panel, with a subtitle and one action.', use: 'SectionHeader' },
    { case: 'The title bar of a window, dialog or drawer, with a close button.', use: 'WindowHeader' },
    { case: 'A whole page with a header over a body that scrolls.', use: 'ScreenPage' },
  ],
  rules: [
    'Leave backdrop out for the default art, pass a scene of your own, or pass null for a plain header.',
    'Use strip for a few controls after the title, such as HeaderAnchorNav pills, and actions for the end.',
    'Set compact once the content under it scrolls; it shrinks to a slim row.',
    'level sets the heading tag, h2 by default; pick the level that fits the page outline.',
  ],
  a11y: [
    'The title is a real heading; pass titleId to name the container with aria-labelledby.',
    'With live, a screen reader reads each new title, as a status does.',
    'The icon is hidden from screen readers; the title carries the name.',
  ],
  tree: {
    path: ['layout', 'a header with an icon and a title over a block'],
    rule: 'ContentHeader is the header with an icon, a title and a backdrop that any container can carry.',
  },
  example: `import { ContentHeader, HeaderAnchorNav, Icon } from '@drizztdourden08/tessera';

const GeneralHeader = ({ section, onSection }: { section: string; onSection: (id: string) => void }) => (
  <ContentHeader
    icon={<Icon name="settings" />}
    title="General"
    strip={<HeaderAnchorNav items={[{ id: 'startup', label: 'Startup' }, { id: 'tray', label: 'Tray' }]} activeId={section} onSelect={onSection} ariaLabel="General sections" />}
  />
);
`,
  propsHash: '6be8fa77225629f3',
} satisfies ComponentUsage;

export { usage };
