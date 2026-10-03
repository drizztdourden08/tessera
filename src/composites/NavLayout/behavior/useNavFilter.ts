/* @layer renderer-components @kind hook */
import { useMemo, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { SideNavProps } from '../../SideNav';
import { filterGroups } from './filter-groups';

const useNavFilter = (nav: SideNavProps, filterable: boolean | undefined, placeholder: string | undefined): SideNavProps => {
  const [query, setQuery] = useState('');
  const { common } = useTesseraStrings();
  const { config } = nav;
  const groups = useMemo(() => filterGroups(config.groups, query), [config.groups, query]);
  if (nav.search !== undefined || filterable !== true) return nav;
  return { ...nav, config: { ...config, groups }, search: { value: query, onChange: setQuery, placeholder: placeholder ?? common.filterPlaceholder } };
};

export { useNavFilter };
