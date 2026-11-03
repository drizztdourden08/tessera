/* @layer renderer-components @kind types */
interface SignalFitInput {
  widths: readonly number[];
  gap: number;
  more: number;
  room: number;
  capped: boolean;
}

interface SignalMeasure {
  widths: Map<string, number>;
  more: number;
}

export type { SignalFitInput, SignalMeasure };
