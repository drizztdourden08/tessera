/* @layer renderer-components @kind types */
import type { Ref, RefObject } from 'react';
import type { MarqueeItem } from '../../marquee';
import type { DataTableHandle } from './row-features.type';

interface UseTableHandleInput {
  ref?: Ref<DataTableHandle>;
  getRects: () => readonly MarqueeItem[];
  rootRef: RefObject<HTMLElement | null>;
  scrollRef?: Ref<HTMLElement>;
}

export type { UseTableHandleInput };
