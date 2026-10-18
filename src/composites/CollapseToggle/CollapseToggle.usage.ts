/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The round button on the edge of a panel that folds it to a rail and opens it again, with a chevron that points where the panel goes.',
  useWhen: [
    'A part draws its own panel that folds to its edge and needs the one fold button every Tessera panel uses.',
    'A rail of an app sits beside the main view and folds away, such as a list of profiles.',
  ],
  avoidWhen: [
    { case: 'A side panel with a heading folds beside the main view.', use: 'SidePanel' },
    { case: 'A list sits beside the detail of the picked item.', use: 'ListDetailLayout' },
    { case: 'The left side is the navigation of the app.', use: 'SideNav' },
    { case: 'A block of content shows or hides below its line.', use: 'Disclosure' },
  ],
  rules: [
    'Pass side="start" for a panel on the left and side="end" for one on the right: the chevron points toward that edge to fold and away from it to unfold.',
    'Pass label with the name of the panel, such as profiles: the button reads Hide profiles or Show profiles.',
    'Pass controls with the id of the panel, and collapsed with onToggle from the state that folds it.',
    'In a pane, place it beside the edge line of the panel, level with its heading, with a 4 px gap (--space-xs) between the line and the button; SidePanel, ListDetailLayout and SplitPane do this for you through their edge. Only the navigation panel SideNav keeps it half over its border.',
    'Prefer SidePanel; a panel of your own folds to its rail: the sunken surface, --side-nav-w wide, the title written sideways.',
    'Use it as it is: it draws at 24 px and takes clicks on 28 by 28 px, and the chevron turns on its own.',
  ],
  a11y: [
    'It is a button named Hide or Show and the panel name, with aria-expanded and aria-controls.',
    'The name shows as a tooltip; the chevron is hidden from screen readers.',
    'Keep focus on it when the panel folds, as SidePanel, ListDetailLayout and SideNav do.',
  ],
  tree: {
    path: ['layout', 'the button that folds a panel to its edge'],
    rule: 'CollapseToggle is the one fold button of every Tessera panel: SideNav, SidePanel, StudioLayout and ListDetailLayout all draw it.',
  },
  example: `import { CollapseToggle } from '@drizztdourden08/tessera';
import { useId, useState } from 'react';
import type { ReactNode } from 'react';

const ProfileRail = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const id = useId();
  return (
    <div className="profile-rail" id={id}>
      <CollapseToggle collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} label="profiles" controls={id} className="profile-rail__toggle" />
      {!collapsed && children}
    </div>
  );
};
`,
  propsHash: '45769d9ecbc33e21',
} satisfies ComponentUsage;

export { usage };
