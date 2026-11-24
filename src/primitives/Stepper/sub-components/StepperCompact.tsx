/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { ProgressBar } from '../../ProgressBar';
import { Span, Strong } from '../../text-elements';
import { compactPosition } from '../behavior/compact-position';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { StepperCompactProps } from './StepperCompact.type';
import './StepperCompact.css';

const StepperCompact = (props: StepperCompactProps) => {
  const { steps, current, label, className } = props;
  const { stepper } = useTesseraStrings();
  const position = compactPosition(current, steps.length, stepper);
  const shown = Math.min(Math.max(current, 0), steps.length - 1);
  return (
    <Box as="nav" className={`stepper-compact${className ? ` ${className}` : ''}`} aria-label={label}>
      <Box className="stepper-compact__head">
        <Span tone="muted" className="stepper-compact__position">{position}</Span>
        <Strong className="stepper-compact__label" aria-current="step">{current < 0 ? undefined : steps[shown]?.label}</Strong>
      </Box>
      <ProgressBar value={Math.min(Math.max(current + 1, 0), steps.length)} max={steps.length} label={position} />
    </Box>
  );
};

export { StepperCompact };
