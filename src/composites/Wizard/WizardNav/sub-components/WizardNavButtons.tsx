/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { WizardNavButton } from './WizardNavButton';
import type { WizardNavButtonsProps } from './WizardNavButtons.type';

const WizardNavButtons = (props: WizardNavButtonsProps) => {
  const { isFirst, isLast, canGoNext, busy, onCancel, onBack, onNext, onFinish, looks } = props;
  return (
    <Box className="wizard-nav__buttons">
      {onCancel && looks.cancel && <WizardNavButton look={looks.cancel} variant="ghost" side="start" disabled={busy} onClick={onCancel} />}
      <Box className="wizard-nav__pair">
        {looks.back && <WizardNavButton look={looks.back} variant="secondary" side="start" disabled={isFirst || busy} onClick={onBack} />}
        {isLast
          ? <WizardNavButton look={looks.next} variant="primary" side="end" disabled={!canGoNext} loading={busy} onClick={onFinish} />
          : <WizardNavButton look={looks.next} variant="primary" side="end" disabled={!canGoNext || busy} onClick={onNext} />}
      </Box>
    </Box>
  );
};

export { WizardNavButtons };
