/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { FacetPicker, FilterBar } from '../../FilterBar';
import type { LogFilterControlsProps } from './LogFilterControls.type';

const LogFilterControls = (props: LogFilterControlsProps) => {
  const { facets, search, onSearchChange } = props;
  const { common, panels } = useTesseraStrings();
  if (onSearchChange === undefined) return facets?.map((facet) => <FacetPicker key={facet.id} facet={facet} />);
  return (
    <FilterBar
      className="log-panel__filter-bar"
      search={search ?? ''}
      onSearchChange={onSearchChange}
      searchPlaceholder={common.filterPlaceholder}
      searchLabel={panels.filterLog}
      facets={facets}
    />
  );
};

export { LogFilterControls };
