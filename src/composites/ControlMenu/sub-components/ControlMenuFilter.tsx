/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { SearchInput } from '../../../primitives/SearchInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { focusFirst } from '../behavior/focus-first';
import type { ControlMenuFilterProps } from '../ControlMenu.type';

const ControlMenuFilter = (props: ControlMenuFilterProps) => {
  const { inputRef, bodyRef, panelId, value, placeholder, onChange } = props;
  const { navigation } = useTesseraStrings();
  const hint = placeholder ?? navigation.menuFilter;
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'ArrowDown' || !focusFirst(bodyRef.current)) return;
    event.preventDefault();
  };

  return (
    <Box className="dropdown__filter control-menu__filter">
      <SearchInput ref={inputRef} size="sm" value={value} onChange={onChange} placeholder={hint} aria-label={hint} aria-controls={panelId} onKeyDown={onKeyDown} />
    </Box>
  );
};

export { ControlMenuFilter };
