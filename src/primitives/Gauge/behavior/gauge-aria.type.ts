/* @layer renderer-components @kind types */
interface GaugeAriaInput {
  name: string;
  min: number;
  max: number;
  fraction: number;
  reading: string;
  unit: string | undefined;
}

export type { GaugeAriaInput };
