/* @layer renderer-components @kind component */
import { SearchInput } from '../../SearchInput';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { SelectSearchProps } from './SelectSearch.type';

const SelectSearch = <T,>(props: SelectSearchProps<T>) => {
  const { select } = props;
  const { model } = select;
  const { common } = useTesseraStrings();
  const activeId = model.active.index >= 0 ? model.optionId(model.active.index) : undefined;

  return (
    <div className="select-search">
      <SearchInput
        ref={select.searchRef}
        id={`${model.listId}-search`}
        className="select-search__input"
        size="sm"
        aria-label={common.search}
        aria-autocomplete="list"
        aria-controls={model.listId}
        aria-activedescendant={activeId}
        value={select.search}
        onChange={select.setSearch}
        onKeyDown={select.onKeyDown}
      />
    </div>
  );
};

export { SelectSearch };
