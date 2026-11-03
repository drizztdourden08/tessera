/* @layer stories @kind logic */
import type { RampStripProps } from '../../../src/composites';
import { BLUES } from './ramp-steps';

type RampEventsFeature = 'click' | 'context' | 'data' | 'keys' | 'wrap';

type NoteSetter = (note: string) => void;

const NOTES: Readonly<Record<RampEventsFeature, string>> = {
  click: 'Click or double click a step.',
  context: 'Right click a step, or focus it and press the menu key.',
  data: 'Each step carries a data-slot attribute; click one to read it.',
  keys: 'The arrow keys only move focus here. Enter or Space picks the focused step.',
  wrap: 'Forty eight steps in a row that is too narrow: they flow onto more lines.',
};

const LONG_RAMP = Array.from({ length: 6 }, () => BLUES).flat();

const eventProps = (feature: RampEventsFeature, setNote: NoteSetter): Partial<RampStripProps> => {
  const table: Record<RampEventsFeature, Partial<RampStripProps>> = {
    click: {
      onStepClick: (index) => setNote(`Clicked step ${index + 1}`),
      onStepDoubleClick: (index) => setNote(`Double clicked step ${index + 1}`),
    },
    context: {
      onStepContextMenu: (index, event) => {
        event.preventDefault();
        setNote(`Context menu on step ${index + 1}`);
      },
    },
    data: {
      stepData: (index) => ({ 'data-slot': `slot-${index + 1}` }),
      onStepClick: (_, event) => setNote(`data-slot is ${event.currentTarget.dataset.slot ?? 'missing'}`),
    },
    keys: { selectionKeys: false },
    wrap: { wrap: true, steps: LONG_RAMP },
  };
  return table[feature];
};

export { eventProps, NOTES };
export type { RampEventsFeature };
