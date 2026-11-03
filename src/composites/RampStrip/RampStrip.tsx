/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import type { RampStripProps } from './RampStrip.type';
import { useRampSelection } from './behavior/useRampSelection';
import { useRampStrip } from './behavior/useRampStrip';
import { RampStripStep } from './sub-components/RampStripStep';
import './RampStrip.css';

const RampStrip = (props: RampStripProps) => {
  const { steps, value, onChange, selected, onSelectionChange, onSwatchDragStart, swatchMenu, size = 'md', numbered = false, className, 'aria-label': label } = props;
  const strip = useRampStrip({ steps, value, onChange, onSelectionChange });
  const selection = useRampSelection({ steps, value, selected, onChange, onSelectionChange });
  const multi = selected !== undefined || onSelectionChange !== undefined;
  const classes = ['ramp-strip', `ramp-strip--${size}`, className].filter(Boolean).join(' ');

  return (
    <Box ref={strip.rootRef} role={multi ? 'group' : 'radiogroup'} aria-label={label} className={classes} onKeyDown={strip.onKeyDown}>
      {steps.map((step, index) => (
        <RampStripStep
          key={`${step.color}-${index}`}
          step={step}
          index={index}
          picked={selection.picked(index)}
          multi={multi}
          size={size}
          numbered={numbered}
          strip={strip}
          menu={swatchMenu?.(index)}
          onPress={(event) => selection.press(index, event)}
          onDragStart={onSwatchDragStart && ((event) => onSwatchDragStart(index, event))}
        />
      ))}
    </Box>
  );
};

export { RampStrip };
