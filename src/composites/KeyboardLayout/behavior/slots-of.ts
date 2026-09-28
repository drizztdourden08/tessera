/* @layer renderer-components @kind util */
import type { PrintableKey } from '../../../primitives';
import type { KeySlot } from '../KeyboardLayout.type';

const slotsOf = (keys: string, shifted: string): KeySlot[] => [...keys].map((key, index) => {
  const upper = shifted[index]?.trim();
  return { id: key as PrintableKey, also: upper ? [upper as PrintableKey] : undefined };
});

export { slotsOf };
