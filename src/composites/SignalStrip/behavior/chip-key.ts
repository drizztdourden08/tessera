/* @layer renderer-components @kind logic */
import type { SignalItem } from '../SignalStrip.type';
import { markKey } from './mark-key';

const chipKey = (item: SignalItem): string =>
  `${item.id}|${String(item.count ?? '')}|${item.label}|${markKey(item.mark2)}|${item.iconOnly === true ? 'icon' : ''}`;

export { chipKey };
