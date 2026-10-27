/* @layer renderer-components @kind util */
import type { WizardApi, WizardValues } from '../../wizard.type';

const withBusy = <V extends WizardValues>(wizard: WizardApi<V>, busy: boolean): WizardApi<V> => {
  if (!busy) return wizard;
  return {
    ...wizard,
    busy: true,
    canGoTo: () => false,
    goNext: () => undefined,
    goBack: () => undefined,
    goTo: (id, options) => {
      if (options?.force === true) wizard.goTo(id, options);
    },
    finish: () => Promise.resolve(),
  };
};

export { withBusy };
