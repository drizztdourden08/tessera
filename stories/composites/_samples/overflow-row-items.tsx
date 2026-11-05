/* @layer stories @kind logic */
import type { OverflowRowItem } from '../../../src/composites';
import { Icon, IconButton, Tag, Text } from '../../../src/primitives';

const fact = (id: string, text: string, priority: number): OverflowRowItem => ({
  id,
  priority,
  node: <Text as="span" variant="caption">{text}</Text>,
  menuNode: <Text as="span" variant="body">{text}</Text>,
});

const headerItems = (): readonly OverflowRowItem[] => [
  { id: 'name', pinned: true, node: <Text as="span" variant="title">Keysanity</Text> },
  { id: 'status', priority: 5, node: <Tag variant="urgency" color="success">Running</Tag> },
  fact('players', '3 players', 3),
  fact('games', 'Timespinner, A Link to the Past', 2),
  fact('updated', 'Updated 2 hours ago', 1),
  { id: 'refresh', priority: 4, node: <IconButton label="Refresh" variant="ghost"><Icon name="refresh-cw" /></IconButton> },
  { id: 'gear', pinned: true, node: <IconButton label="Settings" variant="ghost"><Icon name="settings" /></IconButton> },
];

const tightItems = (): readonly OverflowRowItem[] => [
  { id: 'name', pinned: true, node: ({ tight }) => <Text as="span" variant="title">{tight ? 'Keysanity' : 'Keysanity multiworld board'}</Text> },
  { id: 'status', priority: 5, node: <Tag variant="urgency" color="success">Running</Tag> },
  { id: 'gear', pinned: true, node: <IconButton label="Settings" variant="ghost"><Icon name="settings" /></IconButton> },
];

export { headerItems, tightItems };
