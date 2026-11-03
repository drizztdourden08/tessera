/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SidePanel } from '../../SidePanel';
import { isSideFilter } from '../behavior/is-side-filter';
import { SIDE_FILTER_WIDTH, SIDE_FILTER_WIDTH_SM } from '../LogPanel.constants';
import type { LogFilterSlotProps } from './LogFilterSlot.type';

const LogFilterSlot = ({ props, children }: LogFilterSlotProps) => {
  const { filterPlacement, size, filtersCollapsed, defaultFiltersCollapsed, onFiltersCollapsedChange, storageKey } = props;
  const { panels } = useTesseraStrings();
  if (!isSideFilter(filterPlacement)) return <>{children}</>;
  return (
    <SidePanel
      title={panels.logFilters}
      side={filterPlacement === 'right' ? 'end' : 'start'}
      showTitle={false}
      width={size === 'sm' ? SIDE_FILTER_WIDTH_SM : SIDE_FILTER_WIDTH}
      collapsed={filtersCollapsed}
      defaultCollapsed={defaultFiltersCollapsed}
      onCollapsedChange={onFiltersCollapsedChange}
      storageKey={storageKey}
      containers={[{ title: panels.logFilterSection, content: children }]}
      className="log-panel__filters-panel"
    />
  );
};

export { LogFilterSlot };
