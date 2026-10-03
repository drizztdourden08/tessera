/* @layer renderer-components @kind component */
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { FilterBar } from '../../FilterBar';
import { CopyAllButton } from './CopyAllButton';
import type { LogToolbarProps } from './LogToolbar.type';

const LogToolbar = (props: LogToolbarProps) => {
  const { filter, total, countLabel, copyText, extra } = props;
  const { common, panels } = useTesseraStrings();

  return (
    <FilterBar
      className="log-panel__toolbar"
      search={filter.search}
      onSearchChange={filter.setSearch}
      searchPlaceholder={common.filterPlaceholder}
      searchLabel={panels.filterLog}
      schema={filter.schema}
      clauses={filter.filters}
      onChange={filter.setFilters}
      extra={(
        <>
          <Text className="log-panel__count" aria-live="polite">
            {panels.logCount(filter.shown.length, total, countLabel)}
          </Text>
          {extra}
          <CopyAllButton copyText={() => copyText(filter.shown)} disabled={filter.shown.length === 0} />
        </>
      )}
    />
  );
};

export { LogToolbar };
