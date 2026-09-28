/* @layer stories @kind component */
import { Box, Shortcut, Text } from '../../../src/primitives';
import type { ShortcutRow } from './shortcut-samples';

const rowLabel = (row: ShortcutRow): string => {
  const { keys = [], mouse, legend, width } = row;
  const names = [...(typeof keys === 'string' ? [keys] : keys), ...(mouse ? [`mouse ${mouse}`] : [])];
  const notes = [legend, width].filter(Boolean);
  return notes.length ? `${names.join(' + ')} (${notes.join(', ')})` : names.join(' + ');
};

const RowShortcut = (props: { row: ShortcutRow }) => {
  const { row } = props;
  const { keys, mouse, ...look } = row;
  return mouse ? <Shortcut keys={keys} mouse={mouse} {...look} /> : <Shortcut keys={keys ?? []} {...look} />;
};

const ShortcutRows = (props: { rows: readonly ShortcutRow[] }) => {
  const { rows } = props;
  return (
    <Box className="story-list">
      {rows.map((row) => (
        <Box key={rowLabel(row)} className="story-list__item">
          <Text className="story-label">{rowLabel(row)}</Text>
          <Box><RowShortcut row={row} /></Box>
        </Box>
      ))}
    </Box>
  );
};

export { ShortcutRows };
