/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { DialogShell } from '../DialogShell';
import type { WizardDialogShellProps } from './WizardDialogShell.type';
import './WizardDialogShell.css';

const WizardDialogShell = (props: WizardDialogShellProps) => {
  const { open, onClose, title, headerExtra, steps, activeStep, onStepChange, actions, className = '', children } = props;
  return (
    <DialogShell open={open} onClose={onClose} title={title} headerExtra={headerExtra} actions={actions} className={`wizard-dialog${className ? ` ${className}` : ''}`}>
      <Box className="wizard-dialog__steps">
        {steps.map((s, i) => (
          <Pressable
            key={s.label}
            className={`wizard-dialog__step${i === activeStep ? ' wizard-dialog__step--active' : ''}`}
            onClick={() => onStepChange(i)}
          >
            {i + 1}. {s.label}
          </Pressable>
        ))}
      </Box>
      {children}
    </DialogShell>
  );
};

export { WizardDialogShell };
