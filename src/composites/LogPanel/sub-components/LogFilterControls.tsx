/* @layer renderer-components @kind component */
import { FacetPicker, FilterBar } from '../../FilterBar';
import type { LogFilterControlsProps } from './LogFilterControls.type';

const LogFilterControls = (props: LogFilterControlsProps) => {
  const { facets, search, onSearchChange } = props;
  if (onSearchChange === undefined) return facets?.map((facet) => <FacetPicker key={facet.id} facet={facet} />);
  return (
    <FilterBar
      className="log-panel__filter-bar"
      search={search ?? ''}
      onSearchChange={onSearchChange}
      searchPlaceholder="Filter..."
      searchLabel="Filter the log"
      facets={facets}
    />
  );
};

export { LogFilterControls };
