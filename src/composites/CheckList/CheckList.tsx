/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { checkStatuses } from './behavior/check-statuses';
import { CheckCounts } from './sub-components/CheckCounts';
import { CheckRow } from './sub-components/CheckRow';
import type { CheckListProps } from './CheckList.type';
import './CheckList.css';

const CheckList = (props: CheckListProps) => {
  const { checks, summary, compact = false, label, className } = props;
  const { items } = useTesseraStrings();
  const statuses = useMemo(() => checkStatuses(items), [items]);
  return (
    <Box as="section" className={className ? `check-list ${className}` : 'check-list'} data-compact={compact ? '' : undefined} aria-label={label ?? items.checks}>
      <Box className="check-list__summary">
        {summary !== undefined && summary !== null && <Box className="check-list__title">{summary}</Box>}
        <CheckCounts checks={checks} statuses={statuses} />
      </Box>
      <Box as="ul" className="check-list__rows">
        {checks.map((check) => <CheckRow key={check.id} check={check} statuses={statuses} />)}
      </Box>
    </Box>
  );
};

export { CheckList };
