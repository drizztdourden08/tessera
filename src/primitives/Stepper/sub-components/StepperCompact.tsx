/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { ProgressBar } from '../../ProgressBar';
import { Span, Strong } from '../../text-elements';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { StepperCompactProps } from './StepperCompact.type';
import './StepperCompact.css';

const StepperCompact = (props: StepperCompactProps) => {
  const { steps, current, label, className } = props;
  const { stepper } = useTesseraStrings();
  const position = stepper.stepOf(current + 1, steps.length);
  return (
    <Box as="nav" className={`stepper-compact${className ? ` ${className}` : ''}`} aria-label={label}>
      <Box className="stepper-compact__head">
        <Span tone="muted" className="stepper-compact__position">{position}</Span>
        <Strong className="stepper-compact__label" aria-current="step">{steps[current]?.label}</Strong>
      </Box>
      <ProgressBar value={current + 1} max={steps.length} label={position} />
    </Box>
  );
};

export { StepperCompact };
