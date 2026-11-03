/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { Tooltip } from '../../../primitives/Tooltip';
import { OUTCOME_INDEX_ATTRIBUTE } from '../OutcomeStrip.constants';
import type { OutcomeCellProps } from './OutcomeCell.type';

const OutcomeCell = (props: OutcomeCellProps) => {
  const { step, index, tabStop, onPick, onFocusCell } = props;
  const cellClass = `outcome-strip__cell outcome-strip__cell--${step.outcome}`;
  const cell = onPick === undefined
    ? <Box role="img" aria-label={step.label} className={cellClass} />
    : (
      <Pressable
        className={cellClass}
        aria-label={step.label}
        aria-current={step.outcome === 'current' ? 'step' : undefined}
        tabIndex={tabStop ? 0 : -1}
        {...{ [OUTCOME_INDEX_ATTRIBUTE]: index }}
        onFocus={() => onFocusCell(index)}
        onClick={onPick}
      />
    );

  return <Tooltip content={step.label} className="outcome-strip__tip">{cell}</Tooltip>;
};

export { OutcomeCell };
