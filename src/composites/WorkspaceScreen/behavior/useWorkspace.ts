/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { navConfigOf } from './nav-config-of';
import { navSearchOf } from './nav-search-of';
import { pagesOf } from './pages-of';
import { useOwnedValue } from './useOwnedValue';
import type { WorkspaceInput } from './useWorkspace.type';

const useWorkspace = (input: WorkspaceInput) => {
  const { content, activeId, defaultActiveId, onActiveChange, search } = input;
  const { settings } = useTesseraStrings();
  const pages = useMemo(() => pagesOf(content), [content]);
  const config = useMemo(() => navConfigOf(content), [content]);
  const own = search === false ? undefined : search;
  const { value: current, set: setActive } = useOwnedValue(activeId, defaultActiveId ?? pages[0]?.id ?? '', onActiveChange);
  const { value: query, set: setQuery } = useOwnedValue(own?.query, '', own?.onQueryChange);
  const [flash, setFlash] = useState<string | undefined>(undefined);
  const page = pages.find((candidate) => candidate.id === current) ?? pages[0];
  const navSearch = navSearchOf(search, query, setQuery, settings.searchPlaceholder);

  const open = useCallback((id: string, row?: string) => {
    setQuery('');
    setFlash(row);
    setActive(id);
  }, [setQuery, setActive]);

  return { pages, page, config, query, navSearch, flash, open };
};

export { useWorkspace };
