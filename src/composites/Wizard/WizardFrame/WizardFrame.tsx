/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { DialogShell } from '../../DialogShell';
import { WizardExitGuard } from '../WizardExitGuard/WizardExitGuard';
import { useWizardExit } from '../WizardExitGuard/behavior/useWizardExit';
import { WizardNav } from '../WizardNav/WizardNav';
import { WizardProgress } from '../WizardProgress/WizardProgress';
import { WizardStep } from '../WizardStep/WizardStep';
import { navProps } from './behavior/nav-props';
import { progressSteps } from './behavior/progress-steps';
import { WizardFrameBody } from './sub-components/WizardFrameBody';
import { WizardFrameHead } from './sub-components/WizardFrameHead';
import type { WizardValues } from '../wizard.type';
import type { WizardFrameProps } from './WizardFrame.type';
import './WizardFrame.css';

const WizardFrame = <V extends WizardValues>(props: WizardFrameProps<V>) => {
  const {
    wizard, onExit, title, presentation = 'inline', open = true, orientation = 'horizontal', compactProgress = false,
    stepInfo, activeSubStepId, onSubStepSelect, headerExtra, className = '', children,
  } = props;
  const { current } = wizard;
  const exit = useWizardExit({ dirty: wizard.dirty, busy: wizard.busy, onExit });
  const steps = useMemo(() => progressSteps(wizard.steps, stepInfo), [wizard.steps, stepInfo]);
  const inline = presentation === 'inline';
  const closeDialog = () => {
    if (!exit.guard.open) exit.requestExit();
  };
  const progress = (
    <WizardProgress
      steps={steps}
      currentId={current.id}
      orientation={orientation}
      compact={compactProgress}
      canSelect={wizard.canGoTo}
      onSelect={wizard.goTo}
      activeSubStepId={activeSubStepId}
      onSubStepSelect={onSubStepSelect}
    />
  );
  const body = (
    <WizardFrameBody
      orientation={orientation}
      presentation={presentation}
      stepKey={current.id}
      className={className}
      title={inline ? <WizardFrameHead title={title} extra={headerExtra} /> : undefined}
      progress={progress}
      step={(
        <WizardStep key={current.id} title={current.label} description={current.description} error={wizard.errors[current.id]} level={3}>
          {children}
        </WizardStep>
      )}
      nav={<WizardNav {...navProps(wizard, exit.requestExit, props)} />}
    />
  );
  return (
    <>
      {inline ? body : (
        <DialogShell open={open} onClose={closeDialog} dismissable={!wizard.busy} title={title} headerExtra={headerExtra} className="wizard-frame-dialog">
          {body}
        </DialogShell>
      )}
      <WizardExitGuard {...exit.guard} />
    </>
  );
};

export { WizardFrame };
