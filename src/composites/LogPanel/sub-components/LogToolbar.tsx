/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box, Text } from '../../../primitives';
import { CopyAllButton } from './CopyAllButton';
import { LogFilterControls } from './LogFilterControls';
import type { FilterFacet } from '../../FilterBar';
import { KIND_FACET_LABEL } from './LogToolbar.constants';
import type { LogToolbarProps } from './LogToolbar.type';

const LogToolbar = (props: LogToolbarProps) => {
  const { shown, total, countLabel, kinds, hidden, onToggleKind, search, onSearchChange, copyText, extra } = props;

  const showFilter = kinds !== undefined && hidden !== undefined && onToggleKind !== undefined;
  const facets = useMemo<FilterFacet[] | undefined>(() => (
    showFilter
      ? [{ id: 'kinds', label: KIND_FACET_LABEL, options: kinds, hidden, onToggle: onToggleKind }]
      : undefined
  ), [showFilter, kinds, hidden, onToggleKind]);

  if (!showFilter && onSearchChange === undefined && copyText === undefined && extra === undefined) return null;

  return (
    <Box className="log-panel__toolbar">
      <Text className="log-panel__count">
        {shown === total ? `${total} ${countLabel}` : `${shown} of ${total} ${countLabel}`}
      </Text>
      <LogFilterControls facets={facets} search={search} onSearchChange={onSearchChange} />
      {extra}
      {copyText !== undefined && <CopyAllButton copyText={copyText} disabled={total === 0} />}
    </Box>
  );
};

export { LogToolbar };
