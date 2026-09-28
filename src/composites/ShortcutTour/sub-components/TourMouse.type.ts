/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { MouseButton } from '../../../primitives';

interface TourMouseProps {
  button: MouseButton;
  pressed: boolean;
  ref?: Ref<HTMLElement>;
}

export type { TourMouseProps };
