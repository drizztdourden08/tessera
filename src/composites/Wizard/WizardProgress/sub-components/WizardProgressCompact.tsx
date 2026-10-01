/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { ProgressBar } from '../../../../primitives/ProgressBar';
import { Span, Strong } from '../../../../primitives/text-elements';
import { useTesseraStrings } from '../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { WizardProgressCompactProps } from './WizardProgressCompact.type';
import './WizardProgressCompact.css';

const WizardProgressCompact = (props: WizardProgressCompactProps) => {
  const { steps, current, label, className } = props;
  const { wizard } = useTesseraStrings();
  const position = wizard.stepOf(current + 1, steps.length);
  return (
    <Box as="nav" className={`wizard-progress-compact${className ? ` ${className}` : ''}`} aria-label={label}>
      <Box className="wizard-progress-compact__head">
        <Span tone="muted" className="wizard-progress-compact__position">{position}</Span>
        <Strong className="wizard-progress-compact__label" aria-current="step">{steps[current]?.label}</Strong>
      </Box>
      <ProgressBar value={current + 1} max={steps.length} label={position} />
    </Box>
  );
};

export { WizardProgressCompact };
