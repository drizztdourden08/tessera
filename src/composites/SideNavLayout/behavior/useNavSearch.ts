/* @layer renderer-components @kind hook */
import { useMemo, useState } from 'react';
import type { SideNavSearch } from '../../SideNav';

const useNavSearch = (search: SideNavSearch | undefined) => {
  const [focused, setFocused] = useState(false);
  const watched = useMemo<SideNavSearch | undefined>(() => search && {
    ...search,
    onFocusChange: (next: boolean) => {
      setFocused(next);
      search.onFocusChange?.(next);
    },
  }, [search]);
  const searching = search !== undefined && (focused || search.value.trim() !== '');
  return { search: watched, searching };
};

export { useNavSearch };
