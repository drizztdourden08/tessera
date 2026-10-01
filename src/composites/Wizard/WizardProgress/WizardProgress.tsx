/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { stepState } from './behavior/step-state';
import { useStepDirection } from './behavior/useStepDirection';
import { WizardProgressCompact } from './sub-components/WizardProgressCompact';
import { WizardProgressItem } from './sub-components/WizardProgressItem';
import type { WizardProgressProps } from './WizardProgress.type';
import './WizardProgress.css';

const WizardProgress = (props: WizardProgressProps) => {
  const {
    steps, currentId, orientation = 'horizontal', compact = false, canSelect, onSelect,
    activeSubStepId, onSubStepSelect, label, className = '',
  } = props;
  const { wizard } = useTesseraStrings();
  const current = Math.max(steps.findIndex((step) => step.id === currentId), 0);
  const direction = useStepDirection(current);
  const name = label ?? wizard.steps;
  if (compact) return <WizardProgressCompact steps={steps} current={current} label={name} className={className} />;
  return (
    <Box
      as="nav"
      className={`wizard-progress${className ? ` ${className}` : ''}`}
      data-orientation={orientation}
      data-direction={direction}
      aria-label={name}
    >
      <Box as="ol" className="wizard-progress__list">
        {steps.map((step, index) => (
          <WizardProgressItem
            key={step.id}
            step={step}
            number={index + 1}
            state={stepState(index, current)}
            last={index === steps.length - 1}
            orientation={orientation}
            selectable={index !== current && (canSelect?.(step.id) ?? false)}
            onSelect={onSelect}
            activeSubStepId={activeSubStepId}
            onSubStepSelect={onSubStepSelect}
          />
        ))}
      </Box>
    </Box>
  );
};

export { WizardProgress };
