/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { SearchInput } from '../../../primitives/SearchInput';
import { Small } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { filterKey } from '../behavior/filter-key';
import { useMenuFocus } from '../behavior/useMenuFocus';
import type { MenuFilterProps } from './MenuFilter.type';

const MenuFilter = (props: MenuFilterProps) => {
  const { inputRef, menuRef, menuId, value, placeholder, autoFocus, empty, onChange, onExit } = props;
  const { navigation } = useTesseraStrings();
  const hint = placeholder ?? navigation.menuFilter;
  useMenuFocus(inputRef, autoFocus ? 'first' : 'none');

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const menu = menuRef.current;
    if (!menu || !filterKey(event, menu, value, onExit)) return;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box className="dropdown__filter">
      <SearchInput
        ref={inputRef}
        size="sm"
        value={value}
        onChange={onChange}
        placeholder={hint}
        aria-label={hint}
        aria-controls={menuId}
        onKeyDown={onKeyDown}
      />
      {empty && <Small tone="muted" className="dropdown__empty" role="status">{navigation.noResultsFor(value)}</Small>}
    </Box>
  );
};

export { MenuFilter };
