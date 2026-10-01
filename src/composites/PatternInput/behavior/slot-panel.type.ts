/* @layer renderer-components @kind types */
type SlotPanel = 'slider' | 'stepper' | 'spin' | 'time' | 'color' | 'list' | 'none';

type NumberPanel = Extract<SlotPanel, 'slider' | 'stepper' | 'spin'>;

export type { NumberPanel, SlotPanel };
