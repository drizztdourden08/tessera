/* @layer renderer-components @kind component */
import { CopyButton } from '../../CopyButton';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { FilterBar } from '../../FilterBar';
import type { LogToolbarProps } from './LogToolbar.type';

const LogToolbar = (props: LogToolbarProps) => {
  const { filter, side, size, total, countLabel, copyText, extra } = props;
  const { common, panels } = useTesseraStrings();

  return (
    <FilterBar
      className={side ? 'log-panel__filters log-panel__filters--side' : 'log-panel__filters'}
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
          <CopyButton
            text={() => copyText(filter.shown)}
            label={panels.copyAll}
            showLabel
            size={size === 'sm' ? 'xs' : 'sm'}
            disabled={filter.shown.length === 0}
            className="log-panel__copy"
          />
        </>
      )}
    />
  );
};

export { LogToolbar };
