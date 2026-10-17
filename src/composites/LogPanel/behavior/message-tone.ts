/* @layer renderer-components @kind logic */
import type { LogKindDef, LogKindTone } from '../LogPanel.type';

const messageTone = (kind: LogKindDef | undefined): LogKindTone | undefined => {
  if (kind === undefined || kind.toneMessage === false) return undefined;
  return kind.toneMessage === true ? kind.tone : kind.toneMessage;
};

export { messageTone };
