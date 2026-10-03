/* @layer renderer-components @kind hook */
import { useMemo, useState } from 'react';
import type { SideNavProps } from '../../SideNav';
import { filterGroups } from './filter-groups';

const useShellNav = (nav: SideNavProps, placeholder: string | undefined): SideNavProps => {
  const [query, setQuery] = useState('');
  const { config } = nav;
  const groups = useMemo(() => filterGroups(config.groups, query), [config.groups, query]);
  if (nav.search !== undefined || placeholder === undefined) return nav;
  return { ...nav, config: { ...config, groups }, search: { value: query, onChange: setQuery, placeholder } };
};

export { useShellNav };
