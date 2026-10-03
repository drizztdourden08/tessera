/* @layer renderer-components @kind component */
import { Button } from '../../../../primitives/Button';
import { Icon } from '../../../../primitives/Icon';
import type { WizardNavButtonProps } from './WizardNavButton.type';

const WizardNavButton = (props: WizardNavButtonProps) => {
  const { look, variant, side, disabled = false, loading = false, onClick } = props;
  const icon = look.icon === null ? null : <Icon name={look.icon} className="wizard-nav__icon" />;
  return (
    <Button variant={variant} className="wizard-nav__button" disabled={disabled} loading={loading} onClick={onClick}>
      {side === 'start' && icon}
      {look.label}
      {side === 'end' && icon}
    </Button>
  );
};

export { WizardNavButton };
