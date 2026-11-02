/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ColorSwatch } from '../../primitives/ColorSwatch';
import { RAMP_INDEX_ATTRIBUTE } from './RampStrip.constants';
import type { RampStripProps } from './RampStrip.type';
import { stepCaption } from './behavior/step-caption';
import { stepLabel } from './behavior/step-label';
import { useRampStrip } from './behavior/useRampStrip';
import './RampStrip.css';

const RampStrip = (props: RampStripProps) => {
  const { steps, value, onChange, size = 'md', numbered = false, className, 'aria-label': label } = props;
  const strip = useRampStrip({ steps, value, onChange });
  const preview = size === 'preview';
  const classes = ['ramp-strip', `ramp-strip--${size}`, className].filter(Boolean).join(' ');

  return (
    <Box ref={strip.rootRef} role="radiogroup" aria-label={label} className={classes} onKeyDown={strip.onKeyDown}>
      {steps.map((step, index) => (
        <ColorSwatch
          key={`${step.color}-${index}`}
          color={step.color}
          size={preview ? undefined : size}
          fill={preview}
          caption={stepCaption(step, index, numbered)}
          unused={step.unused}
          disabled={step.disabled}
          selected={index === value}
          focusRing="apart"
          className="ramp-strip__step"
          role="radio"
          aria-checked={index === value}
          aria-label={stepLabel(step)}
          title={stepLabel(step)}
          tabIndex={index === strip.tabStop ? 0 : -1}
          {...{ [RAMP_INDEX_ATTRIBUTE]: index }}
          onFocus={() => strip.onFocusStep(index)}
          onClick={() => onChange(index)}
        />
      ))}
    </Box>
  );
};

export { RampStrip };
