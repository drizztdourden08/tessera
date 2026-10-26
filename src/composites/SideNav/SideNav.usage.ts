/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The side list of a window with several sections: a column of icons that a chevron on its edge opens to show the labels.',
  useWhen: [
    'A window has several top-level sections and the user moves between them from a side list.',
    'The list needs a top block with Home and a few pages under it, then labelled groups below.',
  ],
  avoidWhen: [
    { case: 'The nav sits beside a content pane that shows the page and the search results.', use: 'SideNavLayout' },
    { case: 'A side panel with a heading folds beside the main view.', use: 'SidePanel' },
    { case: 'The pages are chosen from the header of a site.', use: 'SiteHeader' },
  ],
  rules: [
    'Pass config with groups, each with an id, an optional label and its items; an item has an id, a label and an icon.',
    'Pass config.home for the Home row at the very top.',
    'Pass config.top for more top-level pages under Home, in the same top block: no heading, and one divider after the whole block.',
    'The top block is the search field, then Home, then the top pages; nothing else is drawn between them.',
    'Leave the label of a group out for a group with no heading and no gap; prefer config.top for pages that belong under Home.',
    'Pass activeId and onSelect; the host owns the active page.',
    'Pass badge on an item for a count pill, which shows as a dot over the icon when the nav is collapsed.',
    'Pass search to add a field that grows when the nav opens; the host owns the query and shows the results.',
    'Pass defaultOpen, open with onOpenChange, or storageKey to set and keep the choice; overlay slides the open nav over the content.',
    'Pass variant="rail" for the screen list of an app, flush on the window edge.',
  ],
  a11y: [
    'It is a nav named by ariaLabel, and each group is a group named by its label; a group with no label has no name.',
    'The edge toggle says Show or Hide the navigation pane and reports aria-expanded.',
    'The active item reports aria-current; a disabled item stays in the list but takes no click.',
  ],
  tree: {
    path: ['navigation', 'between pages, from a side list'],
    rule: 'SideNav is the one side list of a window: icons that open to labels, a top block with Home and pages, then labelled groups.',
  },
  example: `import { useState } from 'react';
import { Icon, SideNav } from '@drizztdourden08/tessera';

const HOME = { id: 'home', label: 'Home', icon: <Icon name="menu" /> };
const PAGES = [{ id: 'inbox', label: 'Inbox', icon: <Icon name="list" /> }];
const GROUPS = [{ id: 'play', label: 'Play', items: [{ id: 'sessions', label: 'Sessions', icon: <Icon name="map" /> }] }];

const AppNav = () => {
  const [active, setActive] = useState('home');
  return <SideNav config={{ home: HOME, top: PAGES, groups: GROUPS }} activeId={active} onSelect={setActive} />;
};
`,
  propsHash: '52f4f156ab209696',
} satisfies ComponentUsage;

export { usage };
