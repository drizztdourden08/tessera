/* @layer renderer-components @kind component */
import { columnId } from './column-id';
import type { ListboxHeaderProps } from './listbox-view.type';

const ListboxHeader = <T,>(props: ListboxHeaderProps<T>) => {
  const { columns } = props;
  return (
    <div className="listbox-header" role="presentation" aria-hidden>
      <span className="listbox-header__mark" />
      {columns.map((column, index) => (
        <span key={columnId(column, index)} className="listbox-header__cell" data-align={column.align}>
          {column.header}
        </span>
      ))}
    </div>
  );
};

export { ListboxHeader };
