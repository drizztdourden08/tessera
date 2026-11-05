/* @layer renderer-components @kind logic */
import type { ViewControlsProps } from '../ViewControls.type';

const activeCount = (props: Pick<ViewControlsProps, 'filter' | 'group' | 'sort'>): number => {
  const { filter, group, sort } = props;
  const filters = (filter?.clauses ?? []).filter((clause) => clause.enabled).length;
  const search = filter !== undefined && filter.search !== '' ? 1 : 0;
  const grouped = group !== undefined && group.value !== null ? 1 : 0;
  const sorted = sort !== undefined && sort.value.key !== null ? 1 : 0;
  return filters + search + grouped + sorted;
};

export { activeCount };
