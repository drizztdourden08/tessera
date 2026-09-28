/* @layer renderer-components @kind logic */
import { SETTLED } from './draft-rules.constants';

const displayValue = (draft: number | null, value: number): number | '' => {
  const shown = draft === SETTLED ? value : draft;
  return Number.isFinite(shown) ? shown : '';
};

export { displayValue };
