/* @layer renderer-components @kind types */
import type { MouseEvent, PointerEvent } from 'react';

interface ToggleSweepInput {
  onSet?: (key: string, value: boolean) => void;
  onEnd?: (keys: readonly string[], value: boolean) => void;
  order?: readonly string[];
  startWhen?: (event: PointerEvent<HTMLElement>) => boolean;
  expandStart?: (key: string) => readonly string[];
}

interface ToggleSweepBind {
  'data-sweep-key': string;
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onClickCapture: (event: MouseEvent<HTMLElement>) => void;
}

interface ToggleSweep {
  sweeping: boolean;
  touched: readonly string[];
  value: boolean | null;
  bind: (key: string, current: boolean) => ToggleSweepBind;
}

interface SweepSession {
  value: boolean;
  over: (key: string) => boolean;
  keys: () => readonly string[];
}

interface SweepSessionInput {
  first: string;
  value: boolean;
  order?: readonly string[];
  together?: readonly string[];
  onSet?: (key: string, value: boolean) => void;
}

export type { SweepSession, SweepSessionInput, ToggleSweep, ToggleSweepBind, ToggleSweepInput };
