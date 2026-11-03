/* @layer renderer-components @kind types */
import type { CellSpan } from '../../cell-geometry';

interface SpanKeysSetup {
  span: CellSpan;
  total: number;
  minLength: number;
  readOnly: boolean;
  onChange?: (span: CellSpan) => void;
  onActivate?: () => void;
  announce?: (text: string) => void;
}

export type { SpanKeysSetup };
