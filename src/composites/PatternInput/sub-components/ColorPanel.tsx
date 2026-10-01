/* @layer renderer-components @kind component */
import { Suspense } from 'react';
import { Spinner } from '../../../primitives/Spinner';
import { hexKind } from '../behavior/hex-kind';
import { LazyColorPicker } from '../behavior/lazy-color-picker';
import { slotLabel } from '../behavior/slot-label';
import { DEFAULT_COLOR } from '../PatternInput.constants';
import type { SlotPanelProps } from './SlotPanel.type';

const ColorPanel = (props: SlotPanelProps) => {
  const { field, slot } = props;
  const value = field.value[slot.name];
  const color = typeof value === 'string' ? value : DEFAULT_COLOR;
  const set = (hex: string) => {
    const next = hexKind.settle(hexKind.clean(hex, slot), slot);
    if (next !== undefined) field.setSlot(slot.name, next);
  };

  return (
    <Suspense fallback={<Spinner size="sm" />}>
      <LazyColorPicker value={color} onChange={set} disableAlpha title={slotLabel(slot, field)} onClose={field.dismiss} />
    </Suspense>
  );
};

export { ColorPanel };
