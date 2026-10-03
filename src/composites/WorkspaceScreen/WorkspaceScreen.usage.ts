/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../ai/usage.type';

const usage = {
  job: 'A screen to work in: a side list of pages beside the current page, with its header pills and a body that scrolls.',
  useWhen: [
    'A settings hub, a profile hub or a data manager with several pages.',
    'The user moves between pages and changes things on them.',
  ],
  avoidWhen: [
    { case: 'The screen is read and holds no settings, such as About or credits.', use: 'InfoScreen' },
    { case: 'The screen runs one short task with a status, such as an update check.', use: 'UtilityScreen' },
    { case: 'The screen is one big surface with no pages, such as calibration.', use: 'StageScreen' },
    { case: 'The side list and the page sit inside an app frame, not over it.', use: 'NavLayout' },
  ],
  rules: [
    'The host owns the active page: swap page and children when nav.onSelect fires.',
    'Set page.anchors for one long page, or page.tabs for views of one area, never both.',
    'Give the nav a search and set results to search every page; use filterable only to narrow the side list by label.',
    'Use the floating slot for a switch between sibling workspaces, and hidden to keep the screen mounted while it is closed.',
  ],
  a11y: [
    'The card is a modal dialog named by the title, and each page is a section named by its title.',
    'The side list is a navigation landmark; set nav.ariaLabel when the screen holds more than one.',
    'Escape clears a filled search before it reaches the screen.',
  ],
  tree: {
    path: ['a full screen view', 'working across pages, picked from a side list'],
    rule: 'A side list of pages beside the current page.',
  },
  example: `import { Icon, SettingsGroupList, WorkspaceScreen } from '@drizztdourden08/tessera';
import type { SettingsGroupListSection, SideNavConfig } from '@drizztdourden08/tessera';

interface HubProps {
  config: SideNavConfig;
  active: string;
  onSelect: (id: string) => void;
  sections: SettingsGroupListSection[];
  onClose: () => void;
}

const SettingsHub = ({ config, active, onSelect, sections, onClose }: HubProps) => (
  <WorkspaceScreen
    title="Settings"
    onClose={onClose}
    nav={{ config, activeId: active, onSelect, defaultOpen: true }}
    page={{ icon: <Icon name="settings" />, title: 'General' }}
  >
    <SettingsGroupList sections={sections} />
  </WorkspaceScreen>
);
`,
  propsHash: 'e62e15d55e47e2f7',
} satisfies ComponentUsage;

export { usage };
