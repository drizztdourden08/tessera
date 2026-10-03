/* @layer renderer-components @kind component */
import { useEffect, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { Icon } from '../../../primitives/Icon';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SearchSpark } from '../../SearchSpark';
import { SEARCH_MARK_SIZE } from '../SideNav.constants';
import type { SideNavSearchProps } from './SideNavSearch.type';
import './SideNavSearch.css';

const SideNavSearch = (props: SideNavSearchProps) => {
  const { search, open, onOpen } = props;
  const { common, navigation } = useTesseraStrings();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusWhenOpen = useRef(false);

  useEffect(() => {
    if (open && focusWhenOpen.current) inputRef.current?.focus();
    focusWhenOpen.current = false;
  }, [open]);

  const handleMark = () => {
    if (open) {
      inputRef.current?.focus();
      return;
    }
    focusWhenOpen.current = true;
    onOpen();
  };

  return (
    <Box className={`side-nav__search${open ? ' side-nav__search--open' : ''}`}>
      {open && (
        <TextInput
          ref={inputRef}
          className="side-nav__search-input"
          type="text"
          role="searchbox"
          enterKeyHint="search"
          value={search.value}
          placeholder={search.placeholder}
          aria-label={search.placeholder}
          onChange={(e) => search.onChange(e.target.value)}
          onFocus={() => search.onFocusChange?.(true)}
          onBlur={() => search.onFocusChange?.(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') search.onChange(''); }}
        />
      )}
      <Pressable className="side-nav__search-mark" onClick={handleMark} title={common.search} aria-label={common.search}>
        <SearchSpark size={SEARCH_MARK_SIZE} />
      </Pressable>
      {open && search.value && (
        <Pressable className="side-nav__search-clear" onClick={() => search.onChange('')} aria-label={navigation.clearSearch}>
          <Icon name="x" size={14} />
        </Pressable>
      )}
    </Box>
  );
};

export { SideNavSearch };
