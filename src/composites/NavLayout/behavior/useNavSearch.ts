/* @layer renderer-components @kind hook */
import { useMemo, useState } from 'react';
import type { SectionNavSearch } from '../../SectionNav';

const useNavSearch = (search: SectionNavSearch | undefined) => {
  const [focused, setFocused] = useState(false);
  const watched = useMemo<SectionNavSearch | undefined>(() => search && {
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
