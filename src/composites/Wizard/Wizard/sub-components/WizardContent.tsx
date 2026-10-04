/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Stepper } from '../../../../primitives/Stepper';
import { useStepMotion } from '../../../../primitives/Stepper/behavior/useStepMotion';
import { WizardNav } from '../../WizardNav/WizardNav';
import { WizardStep } from '../../WizardStep/WizardStep';
import { navProps } from '../behavior/nav-props';
import { stepperSteps } from '../behavior/stepper-steps';
import { WizardBody } from './WizardBody';
import { WizardHead } from './WizardHead';
import { WizardStepFade } from './WizardStepFade';
import type { WizardValues } from '../../wizard.type';
import type { WizardContentProps } from './WizardContent.type';

const WizardContent = <V extends WizardValues>(props: WizardContentProps<V>) => {
  const {
    wizard, onCancel, showTitle, title, orientation = 'horizontal', compactProgress = false,
    activeSubStepId, onSubStepSelect, headerExtra, className = '', children,
  } = props;
  const { current } = wizard;
  const motion = useStepMotion(wizard.index);
  const steps = useMemo(() => stepperSteps(wizard), [wizard]);
  return (
    <WizardBody
      orientation={orientation}
      stepKey={current.id}
      className={className}
      title={showTitle ? <WizardHead title={title} extra={headerExtra} /> : undefined}
      progress={(
        <Stepper
          steps={steps}
          currentId={current.id}
          orientation={orientation}
          compact={compactProgress}
          canSelect={wizard.canGoTo}
          onSelect={wizard.goTo}
          activeSubStepId={activeSubStepId}
          onSubStepSelect={onSubStepSelect}
        />
      )}
      step={(
        <WizardStepFade stepKey={current.id} direction={motion.direction}>
          <WizardStep title={current.label} description={current.description} error={wizard.errors[current.id]} level={3}>
            {children}
          </WizardStep>
        </WizardStepFade>
      )}
      nav={<WizardNav {...navProps(wizard, onCancel)} />}
    />
  );
};

export { WizardContent };
