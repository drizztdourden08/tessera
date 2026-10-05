/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../../../primitives/strings/tessera-strings.type';
import type { WizardButtonLook, WizardStepButtons } from '../../wizard.type';
import type { WizardNavLook, WizardNavLooks } from '../WizardNav.type';

const lookOf = (base: WizardNavLook, override: WizardButtonLook | undefined): WizardNavLook => ({
  label: override?.label ?? base.label,
  icon: override?.icon === undefined ? base.icon : override.icon,
});

const navLooks = (buttons: WizardStepButtons | undefined, isLast: boolean, strings: TesseraStrings): WizardNavLooks => {
  const { cancel, back, next } = buttons ?? {};
  const forward = isLast ? { label: strings.wizard.finish, icon: 'check' as const } : { label: strings.wizard.next, icon: 'arrow-right' as const };
  return {
    cancel: cancel === false ? null : lookOf({ label: strings.common.cancel, icon: null }, cancel),
    back: back === false ? null : lookOf({ label: strings.navigation.back, icon: 'arrow-left' }, back),
    next: lookOf(forward, next),
  };
};

export { navLooks };
