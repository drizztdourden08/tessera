/* @layer renderer-components @kind types */
import type { LogKindTone } from '../LogPanel.type';

interface LineTones {
  tag: LogKindTone | undefined;
  message: LogKindTone | undefined;
}

export type { LineTones };
