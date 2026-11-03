/* @layer renderer-components @kind component */
import { blockSlots } from './block-slots';
import { ListboxGap } from './ListboxGap';
import { ListboxOption } from './ListboxOption';
import type { ListboxEntriesProps } from './listbox-window.type';

const ListboxEntries = <T,>(props: ListboxEntriesProps<T>) => {
  const { view, block, range } = props;
  if (range === undefined) return <>{block.entries.map((entry) => <ListboxOption key={entry.key} view={view} entry={entry} />)}</>;
  const size = block.entries.length;
  const slots = blockSlots(block, range, view.model.active.index);

  return (
    <>
      {slots.map((slot, order) => (slot.entry === undefined
        ? <ListboxGap key={`listbox-gap-${slot.at}`} rows={slot.rows} count={order === 0 ? size : undefined} />
        : <ListboxOption key={slot.entry.key} view={view} entry={slot.entry} place={{ position: slot.at + 1, size }} />))}
    </>
  );
};

export { ListboxEntries };
