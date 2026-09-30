/* @layer renderer-components @kind component */
import type { SelectSearchProps } from './SelectSearch.type';

const SelectSearch = <T,>(props: SelectSearchProps<T>) => {
  const { select } = props;
  const { model } = select;
  const activeId = model.active.index >= 0 ? model.optionId(model.active.index) : undefined;

  return (
    <div className="select-search">
      <input
        ref={select.searchRef}
        className="select-search__input"
        type="text"
        placeholder="Search..."
        autoComplete="off"
        aria-label="Search"
        aria-autocomplete="list"
        aria-controls={model.listId}
        aria-activedescendant={activeId}
        value={select.search}
        onChange={(event) => select.setSearch(event.target.value)}
        onKeyDown={select.onKeyDown}
      />
    </div>
  );
};

export { SelectSearch };
