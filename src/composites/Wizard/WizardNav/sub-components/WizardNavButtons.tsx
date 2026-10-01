/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { Button } from '../../../../primitives/Button';
import { Icon } from '../../../../primitives/Icon';
import type { WizardNavButtonsProps } from './WizardNavButtons.type';

const WizardNavButtons = (props: WizardNavButtonsProps) => {
  const { isFirst, isLast, canGoNext, busy, onCancel, onBack, onNext, onFinish, labels } = props;
  return (
    <Box className="wizard-nav__buttons">
      {onCancel && <Button variant="ghost" disabled={busy} onClick={onCancel}>{labels.cancel}</Button>}
      <Button variant="secondary" disabled={isFirst || busy} icon={<Icon name="chevron-left" />} onClick={onBack}>{labels.back}</Button>
      {isLast
        ? <Button variant="primary" disabled={!canGoNext} loading={busy} onClick={onFinish}>{labels.finish}</Button>
        : <Button variant="primary" disabled={!canGoNext || busy} onClick={onNext}>{labels.next}</Button>}
    </Box>
  );
};

export { WizardNavButtons };
