/* @layer stories @kind component */
import { useState } from 'react';
import { SortControl } from '../../../src/composites';
import type { SortState } from '../../../src/composites';
import type { SortControlDemoProps } from './SortControlDemo.type';

const SORT_FIELDS = [
  { id: 'name', label: 'Name' },
  { id: 'updated', label: 'Last updated' },
  { id: 'owner', label: 'Owner' },
];

const SortControlDemo = ({ start, label }: SortControlDemoProps) => {
  const [sort, setSort] = useState<SortState>(start);
  return <SortControl options={SORT_FIELDS} value={sort} onChange={setSort} label={label} />;
};

export { SortControlDemo };
