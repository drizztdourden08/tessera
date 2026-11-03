/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent } from 'react';

interface LaneRovingState {
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { LaneRovingState };
