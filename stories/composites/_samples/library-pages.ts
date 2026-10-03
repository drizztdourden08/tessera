/* @layer stories @kind data */
import type { IconName } from '../../../src/primitives';

interface LibraryEntry {
  id: string;
  title: string;
  text: string;
}

interface LibraryPage {
  id: string;
  title: string;
  icon: IconName;
  group: string;
  entries: readonly LibraryEntry[];
}

const LIBRARY_GROUPS = [{ id: 'guides', label: 'Guides' }, { id: 'reference', label: 'Reference' }] as const;

const LIBRARY_PAGES: readonly LibraryPage[] = [
  {
    id: 'hosting', title: 'Hosting', icon: 'globe', group: 'guides',
    entries: [
      { id: 'port', title: 'Open a port', text: 'Players reach your session on the port you pick, 38281 by default.' },
      { id: 'relay', title: 'Use the relay', text: 'When the port is closed, the relay server carries the traffic.' },
    ],
  },
  {
    id: 'joining', title: 'Joining', icon: 'log-in', group: 'guides',
    entries: [
      { id: 'address', title: 'Enter an address', text: 'Paste the host address and the port from the invite.' },
      { id: 'password', title: 'Session passwords', text: 'A locked session asks for its password once.' },
    ],
  },
  {
    id: 'keys', title: 'Keyboard', icon: 'keyboard', group: 'reference',
    entries: [
      { id: 'search', title: 'Search', text: 'Ctrl+K opens the search from any screen.' },
      { id: 'mute', title: 'Mute', text: 'Ctrl+M silences the game and keeps the level.' },
    ],
  },
  {
    id: 'files', title: 'Files', icon: 'folder', group: 'reference',
    entries: [
      { id: 'saves', title: 'Saves', text: 'Each profile keeps its saves in its own folder.' },
      { id: 'logs', title: 'Logs', text: 'The last ten sessions keep a log next to the saves.' },
    ],
  },
];

export { LIBRARY_GROUPS, LIBRARY_PAGES };
