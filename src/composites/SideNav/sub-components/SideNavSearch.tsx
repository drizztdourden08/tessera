/* @layer renderer-components @kind component */
import { useEffect, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { SearchInput } from '../../../primitives/SearchInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SEARCH_MARK_SIZE } from '../SideNav.constants';
import type { SideNavSearchProps } from './SideNavSearch.type';
import '../../../theme/search-glass.css';
import './SideNavSearch.css';

const SideNavSearch = (props: SideNavSearchProps) => {
  const { search, open, onOpen } = props;
  const { common } = useTesseraStrings();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusWhenOpen = useRef(false);
  const mark = <Icon name="search" size={SEARCH_MARK_SIZE} effect="twinkle" className="search-glass" />;

  useEffect(() => {
    if (open && focusWhenOpen.current) inputRef.current?.focus();
    focusWhenOpen.current = false;
  }, [open]);

  const openAndFocus = () => {
    focusWhenOpen.current = true;
    onOpen();
  };

  return (
    <Box className={`side-nav__search${open ? ' side-nav__search--open' : ''}`}>
      {open ? (
        <SearchInput
          ref={inputRef}
          className="side-nav__search-input"
          value={search.value}
          onChange={search.onChange}
          placeholder={search.placeholder}
          aria-label={search.placeholder}
          start={{ icon: mark }}
          onFocus={() => search.onFocusChange?.(true)}
          onBlur={() => search.onFocusChange?.(false)}
        />
      ) : (
        <Pressable className="side-nav__search-mark" onClick={openAndFocus} title={common.search} aria-label={common.search}>
          {mark}
        </Pressable>
      )}
    </Box>
  );
};

export { SideNavSearch };
