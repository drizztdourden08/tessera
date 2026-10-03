/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import type { TesseraStrings } from '../../../../primitives/strings/tessera-strings.type';
import type { WizardNavProps } from '../WizardNav.type';

const navMessage = (props: WizardNavProps, strings: TesseraStrings): ReactNode => {
  if (props.busy) return props.busyHint ?? strings.wizard.finishing;
  return props.hint;
};

export { navMessage };
