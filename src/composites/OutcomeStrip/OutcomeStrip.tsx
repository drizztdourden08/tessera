/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import type { OutcomeStripProps } from './OutcomeStrip.type';
import { useOutcomeStrip } from './behavior/useOutcomeStrip';
import { OutcomeCell } from './sub-components/OutcomeCell';
import './OutcomeStrip.css';

const OutcomeStrip = (props: OutcomeStripProps) => {
  const { steps, onSelect, size = 'sm', className, 'aria-label': label } = props;
  const strip = useOutcomeStrip({ steps, enabled: onSelect !== undefined });
  const classes = ['outcome-strip', `outcome-strip--${size}`, className].filter(Boolean).join(' ');

  return (
    <Box
      ref={strip.rootRef}
      role={onSelect === undefined ? 'group' : 'toolbar'}
      aria-label={label}
      className={classes}
      onKeyDown={onSelect === undefined ? undefined : strip.onKeyDown}
    >
      {steps.map((step, index) => (
        <OutcomeCell
          key={step.id}
          step={step}
          index={index}
          tabStop={index === strip.tabStop}
          onPick={onSelect === undefined ? undefined : () => onSelect(step.id)}
          onFocusCell={strip.onFocusCell}
        />
      ))}
    </Box>
  );
};

export { OutcomeStrip };
