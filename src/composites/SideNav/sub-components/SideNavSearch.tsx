/* @layer renderer-components @kind component */
import { useEffect, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { SearchInput } from '../../../primitives/SearchInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SearchSpark } from '../../SearchSpark';
import { SEARCH_MARK_SIZE } from '../SideNav.constants';
import type { SideNavSearchProps } from './SideNavSearch.type';
import './SideNavSearch.css';

const SideNavSearch = (props: SideNavSearchProps) => {
  const { search, open, onOpen } = props;
  const { common } = useTesseraStrings();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusWhenOpen = useRef(false);

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
          start={{ icon: <SearchSpark size={SEARCH_MARK_SIZE} /> }}
          onFocus={() => search.onFocusChange?.(true)}
          onBlur={() => search.onFocusChange?.(false)}
        />
      ) : (
        <Pressable className="side-nav__search-mark" onClick={openAndFocus} title={common.search} aria-label={common.search}>
          <SearchSpark size={SEARCH_MARK_SIZE} />
        </Pressable>
      )}
    </Box>
  );
};

export { SideNavSearch };
