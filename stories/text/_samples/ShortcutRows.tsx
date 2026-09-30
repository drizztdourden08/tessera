/* @layer stories @kind component */
import { Shortcut } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import type { ShortcutRow } from './shortcut-samples';

const rowLabel = (row: ShortcutRow): string => {
  const { keys = [], mouse, legend, width, state } = row;
  const names = [...(typeof keys === 'string' ? [keys] : keys), ...(mouse ? [`mouse ${mouse}`] : [])];
  const notes = [legend, width, state].filter(Boolean);
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
    <Demonstrator
      rows={rows.map((row) => ({ key: rowLabel(row), label: rowLabel(row) }))}
      cell={(label) => {
        const row = rows.find((entry) => rowLabel(entry) === label);
        return row ? <RowShortcut row={row} /> : null;
      }}
    />
  );
};

export { ShortcutRows };
