/* @layer renderer-components @kind types */
type UnsavedSave = () => boolean | void | Promise<boolean | void>;

type UnsavedAsk = 'go' | 'ask' | 'wait';

interface UnsavedGuardOptions<M> {
  dirty: boolean;
  busy?: boolean;
  onSave?: UnsavedSave;
  onDiscard?: () => void;
  perform: (move: M) => void;
}

interface UnsavedGuard<M> {
  pending: M | null;
  blocked: boolean;
  saving: boolean;
  request: (move: M) => void;
  stay: () => void;
  discard: () => void;
  save: (() => void) | undefined;
}

export type { UnsavedAsk, UnsavedGuard, UnsavedGuardOptions, UnsavedSave };
