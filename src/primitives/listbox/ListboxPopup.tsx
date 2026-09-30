/* @layer renderer-components @kind component */
import { ListboxList } from './ListboxList';
import { ListboxPanel } from './ListboxPanel';
import type { ListboxPopupProps } from './listbox-view.type';

const ListboxPopup = <T,>(props: ListboxPopupProps<T>) => {
  const { drop, view, invalid, size, loading, emptyText, labelledBy, label, header } = props;
  if (!drop.open) return null;
  return (
    <ListboxPanel drop={drop} invalid={invalid} size={size}>
      {header}
      <ListboxList view={view} loading={loading} emptyText={emptyText} labelledBy={labelledBy} label={label} />
    </ListboxPanel>
  );
};

export { ListboxPopup };
