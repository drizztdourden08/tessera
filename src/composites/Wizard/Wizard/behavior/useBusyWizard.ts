/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { WizardApi, WizardValues } from '../../wizard.type';
import { withBusy } from './with-busy';

const useBusyWizard = <V extends WizardValues>(wizard: WizardApi<V>, busy = false): WizardApi<V> =>
  useMemo(() => withBusy(wizard, busy), [wizard, busy]);

export { useBusyWizard };
