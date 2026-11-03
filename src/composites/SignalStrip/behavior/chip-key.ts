/* @layer renderer-components @kind logic */
import type { SignalItem } from '../SignalStrip.type';

const chipKey = (item: SignalItem): string => `${item.id}|${String(item.count ?? '')}|${item.label}`;

export { chipKey };
