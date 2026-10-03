/* @layer stories @kind data */
import type { IconName } from '../../../src/primitives';

type SampleNotice = {
  id: string;
  icon: IconName;
  text: string;
  when: string;
  unread: boolean;
};

const FILE_FACTS: readonly (readonly [string, string])[] = [
  ['Type', 'Spreadsheet'],
  ['Size', '48 KB'],
  ['Owner', 'Sam Rivera'],
  ['Modified', 'Today at 09:42'],
  ['Shared with', '3 people'],
];

const FILE_STATUSES: readonly (readonly [string, string])[] = [
  ['open', 'Open'],
  ['review', 'In review'],
  ['done', 'Done'],
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name', label: 'Name, A to Z' },
];

const NOTICES: readonly SampleNotice[] = [
  { id: 'n1', icon: 'message-square', text: 'Alex commented on Launch plan', when: '5 min ago', unread: true },
  { id: 'n2', icon: 'upload', text: 'Your export of Q3 figures is ready', when: '1 h ago', unread: true },
  { id: 'n3', icon: 'user', text: 'Jordan accepted your invite', when: '3 h ago', unread: true },
  { id: 'n4', icon: 'calendar', text: 'Design review moved to Thursday', when: 'Yesterday', unread: false },
];

const RECENT_SEARCHES: readonly string[] = ['budget 2026', 'meeting notes', 'logo final'];

export { FILE_FACTS, FILE_STATUSES, NOTICES, RECENT_SEARCHES, SORT_OPTIONS };
export type { SampleNotice };
