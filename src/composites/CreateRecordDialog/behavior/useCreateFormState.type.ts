/* @layer renderer-components @kind types */
import type { CreateOutcome } from '../CreateRecordDialog.type';

interface CreateFormStateParams<T> {
  initialRecord: T;
  requiredPaths: readonly string[];
  open: boolean;
  onCreate: (record: T) => Promise<CreateOutcome>;
}

export type { CreateFormStateParams };
