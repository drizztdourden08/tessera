/* @layer renderer-components @kind types */
import type { Dispatch } from 'react';
import type { CreateOutcome } from '../CreateRecordDialog/CreateRecordDialog.type';
import type { WizardAction, WizardState, WizardValues, WizardView } from './wizard.type';

interface FinishRun<V extends WizardValues> {
  view: WizardView<V>;
  state: WizardState<V>;
  dispatch: Dispatch<WizardAction<V>>;
  onFinish: (values: V) => Promise<CreateOutcome>;
  onFinished?: (id: string) => void;
  fallback: string;
}

export type { FinishRun };
