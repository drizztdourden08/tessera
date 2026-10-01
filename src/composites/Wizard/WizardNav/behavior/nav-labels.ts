/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../../../primitives/strings/tessera-strings.type';
import type { WizardNavLabels, WizardNavProps } from '../WizardNav.type';

const navLabels = (props: WizardNavProps, strings: TesseraStrings): WizardNavLabels => ({
  cancel: props.cancelLabel ?? strings.common.cancel,
  back: props.backLabel ?? strings.wizard.back,
  next: props.nextLabel ?? strings.wizard.next,
  finish: props.finishLabel ?? strings.wizard.finish,
});

export { navLabels };
