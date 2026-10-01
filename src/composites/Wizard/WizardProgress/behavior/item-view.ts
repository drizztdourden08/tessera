/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../../../primitives/strings/tessera-strings.type';
import type { WizardItemView } from '../WizardProgress.type';
import type { WizardProgressItemProps } from '../sub-components/WizardProgressItem.type';

const itemView = (props: WizardProgressItemProps, strings: TesseraStrings['wizard']): WizardItemView => {
  const { step, number, state, orientation, selectable, onSelect } = props;
  const vertical = orientation === 'vertical';
  const done = state === 'done';
  return {
    name: done ? strings.stepDone(number, step.label) : strings.stepName(number, step.label),
    current: state === 'current',
    done,
    disabled: !selectable || onSelect === undefined,
    summary: vertical ? step.summary : undefined,
    subSteps: vertical ? step.subSteps ?? [] : [],
  };
};

export { itemView };
