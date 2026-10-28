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
    'Leave backdrop out for the default art, pass a scene of your own, or pass null for a plain header. For an image or a colour, pass a BackdropLayer.',
    'Use strip for a few controls after the title, such as HeaderAnchorNav pills, and actions for the end.',
    'Set variant to plain for a title row with no panel: no backdrop, no gradient and no bottom border.',
    'Set compact once the content under it scrolls; it shrinks to a slim row.',
    'On a sub-page, pass back: label names the parent page and onSelect returns to it. It reads Back to and the label, or Back alone with no label, before the icon, and folds to an arrow when the row has no room for it.',
    'level sets the heading tag, h2 by default; pick the level that fits the page outline.',
    'For the header of one subject, such as a sprite or a project, put its kind as a Tag, its path as a Link and its marks as Badge nodes in strip, and a pin Toggle in actions.',
  ],
  a11y: [
    'The title is a real heading; pass titleId to name the container with aria-labelledby.',
    'With live, a screen reader reads each new title, as a status does.',
    'The icon is hidden from screen readers; the title carries the name.',
    'The back button sits outside the heading, so the title stays the name of the page. Folded, the arrow keeps Back to and the page name as its label and shows them as a tooltip.',
  ],
  tree: {
    path: ['layout', 'a header with an icon and a title over a block'],
    rule: 'ContentHeader is the header with an icon, a title and a backdrop that any container can carry.',
  },
  example: `import { Badge, ContentHeader, HeaderAnchorNav, Icon, Link, Tag, Toggle } from '@drizztdourden08/tessera';

const GeneralHeader = ({ section, onSection }: { section: string; onSection: (id: string) => void }) => (
  <ContentHeader
    icon={<Icon name="settings" />}
    title="General"
    strip={<HeaderAnchorNav items={[{ id: 'startup', label: 'Startup' }, { id: 'tray', label: 'Tray' }]} activeId={section} onSelect={onSection} ariaLabel="General sections" />}
  />
);

interface SubjectHeaderProps {
  name: string;
  path: string;
  pinned: boolean;
  onPin: (pinned: boolean) => void;
  openFolder: (path: string) => void;
}

const SubjectHeader = ({ name, path, pinned, onPin, openFolder }: SubjectHeaderProps) => (
  <ContentHeader
    icon={<Icon name="image" />}
    title={name}
    strip={
      <>
        <Tag>Sprite</Tag>
        <Link variant="subtle" href={path} navigate={openFolder}>{path}</Link>
        <Badge variant="inline" value={3} label="Frame count" />
      </>
    }
    actions={<Toggle checked={pinned} onChange={onPin} aria-label="Pin to the sidebar" size="sm" />}
  />
);
`,
  propsHash: 'bc6ef7432d73439d',
} satisfies ComponentUsage;

export { usage };
