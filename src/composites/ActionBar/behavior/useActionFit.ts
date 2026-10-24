/* @layer renderer-components @kind hook */
import type { RefObject } from 'react';
import { useAxisFit } from './useAxisFit';

const useActionFit = (barRef: RefObject<HTMLElement | null>, measureRef: RefObject<HTMLElement | null>, restCount: number, contentKey: string): number =>
  useAxisFit({ barRef, measureRef, restCount, contentKey, axis: 'width' });

export { useActionFit };
