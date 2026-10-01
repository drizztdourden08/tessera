/* @layer renderer-components @kind types */
import type { CreateOutcome } from '../CreateRecordDialog/CreateRecordDialog.type';

type WizardValues = object;

type WizardProblem = string | { message: string; inField: boolean };

interface WizardStepDef<V extends WizardValues> {
  id: string;
  label: string;
  description?: string;
  when?: (values: V) => boolean;
  validate?: (values: V) => WizardProblem | null;
}

interface WizardOptions<V extends WizardValues> {
  steps: readonly WizardStepDef<V>[];
  initialValues: V;
  onFinish: (values: V) => Promise<CreateOutcome>;
  onFinished?: (id: string) => void;
}

interface WizardState<V extends WizardValues> {
  currentId: string;
  visited: readonly string[];
  errors: Readonly<Record<string, string>>;
  values: V;
  busy: boolean;
  finished: boolean;
}

type WizardAction<V extends WizardValues> =
  | { type: 'go'; id: string }
  | { type: 'update'; patch: Partial<V> }
  | { type: 'error'; id: string; error: string | null }
  | { type: 'finish-start' }
  | { type: 'finish-end'; id: string; error: string | null }
  | { type: 'reset'; values: V; currentId: string };

interface WizardView<V extends WizardValues> {
  steps: readonly WizardStepDef<V>[];
  current: WizardStepDef<V>;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  invalid: string | null;
  hint: string | null;
  canGoTo: (id: string) => boolean;
}

interface WizardApi<V extends WizardValues> extends WizardView<V> {
  values: V;
  visited: readonly string[];
  errors: Readonly<Record<string, string>>;
  dirty: boolean;
  busy: boolean;
  setValue: <K extends keyof V>(key: K, value: V[K]) => void;
  update: (patch: Partial<V>) => void;
  setError: (id: string, error: string | null) => void;
  goNext: () => void;
  goBack: () => void;
  goTo: (id: string) => void;
  finish: () => Promise<void>;
  reset: () => void;
}

type WizardMoves<V extends WizardValues> = Pick<WizardApi<V>, 'goNext' | 'goBack' | 'goTo' | 'setValue' | 'update' | 'setError'>;

export type { WizardAction, WizardApi, WizardMoves, WizardOptions, WizardProblem, WizardState, WizardStepDef, WizardValues, WizardView };
