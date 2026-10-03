/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { PALETTE_ATTRIBUTE } from '../ChosenMascot.constants';

const usePaletteName = (ref: RefObject<HTMLElement | null>, active: boolean): string | null => {
  const [palette, setPalette] = useState<string | null>(null);

  useLayoutEffect(() => {
    const host = ref.current?.closest(`[${PALETTE_ATTRIBUTE}]`);
    if (!active || !host) return undefined;
    const read = () => setPalette(host.getAttribute(PALETTE_ATTRIBUTE));
    read();
    const observer = new (ownerWindowOf(host) as Window & typeof globalThis).MutationObserver(read);
    observer.observe(host, { attributes: true, attributeFilter: [PALETTE_ATTRIBUTE] });
    return () => observer.disconnect();
  }, [ref, active]);

  return palette;
};

export { usePaletteName };
