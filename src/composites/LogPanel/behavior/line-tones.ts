/* @layer renderer-components @kind logic */
import type { LogKindDef, LogRow } from '../LogPanel.type';
import type { LineTones } from './line-tones.type';
import { messageTone } from './message-tone';

const lineTones = (row: LogRow, kind: LogKindDef | undefined): LineTones => ({
  tag: row.tone ?? kind?.tone,
  message: row.tone ?? messageTone(kind),
});

export { lineTones };
