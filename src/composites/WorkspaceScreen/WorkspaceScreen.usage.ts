/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A screen to work in, built from one content object: a side nav of pages, the current page under a header that compacts as it scrolls, and a search over every setting.',
  useWhen: [
    'A settings hub, a profile hub or a data manager with several pages.',
    'The user moves between pages and changes things on them.',
  ],
  avoidWhen: [
    { case: 'The screen is read and holds no settings, such as About or credits.', use: 'InfoScreen' },
    { case: 'The screen runs one short task with a status, such as an update check.', use: 'UtilityScreen' },
    { case: 'The screen is one big surface with no pages, such as calibration.', use: 'StageScreen' },
    { case: 'The side nav and the page sit inside an app frame, not over it.', use: 'SideNavLayout' },
  ],
  rules: [
    'Describe every page in content: its id, title and icon, and either sections of SettingsRow data or content of its own.',
    'Every page shows the page header with its icon and title, and nothing turns it off. A screen without it is a custom screen built from ScreenWindow.',
    'The nav, the header pills, the rows and the search all come from content; never build them by hand beside it.',
    'Give options a hint, toggles hints for on and off and sliders hintOf, so the live hint says what each value does.',
    'Pass activeId and onActiveChange, or search.query and search.onQueryChange, only when the host must own them.',
    'Use the floating slot for a switch between sibling workspaces, and hidden to keep the screen mounted while it is closed.',
    'The screen follows the room it has, not the viewport: under 640 px the side nav turns into a bar with a menu, and each page header moves its tabs under the title when they no longer fit.',
  ],
  a11y: [
    'The card is a modal dialog named by the title, and each page is a section named by its title.',
    'The side nav is a navigation landmark, and every row input is named by its row title.',
    'Escape clears a filled search before it reaches the screen.',
  ],
  tree: {
    path: ['a full screen view', 'working across pages, picked from a side list'],
    rule: 'A side list of pages beside the current page.',
  },
  example: `import { Icon, WorkspaceScreen } from '@drizztdourden08/tessera';
import type { WorkspaceContent } from '@drizztdourden08/tessera';

interface HubProps {
  volume: number;
  setVolume: (value: number) => void;
  onClose: () => void;
}

const SettingsHub = ({ volume, setVolume, onClose }: HubProps) => {
  const content: WorkspaceContent = {
    groups: [{
      id: 'app',
      label: 'App',
      pages: [{
        id: 'audio',
        title: 'Audio',
        icon: <Icon name="volume-2" />,
        sections: [{
          id: 'output',
          title: 'Output',
          rows: [{ id: 'volume', title: 'Master volume', description: 'The loudness of every sound.', hint: 'Drag or use the arrow keys.', input: { kind: 'slider', value: volume, onChange: setVolume, min: 0, max: 100 } }],
        }],
      }],
    }],
  };
  return <WorkspaceScreen title="Settings" onClose={onClose} content={content} />;
};
`,
  propsHash: '1ea37992852ce5e6',
} satisfies ComponentUsage;

export { usage };
