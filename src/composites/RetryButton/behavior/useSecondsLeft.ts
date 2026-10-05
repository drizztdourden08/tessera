/* @layer renderer-components @kind hook */
import { useRepeatTick } from '../../../primitives/dom/useRepeatTick';
import { TICK_MS } from '../RetryButton.constants';
import { secondsUntil } from './seconds-until';

const useSecondsLeft = (until: number | null | undefined): number => {
  const secondsLeft = secondsUntil(until, Date.now());
  useRepeatTick(secondsLeft > 0 ? TICK_MS : null);
  return secondsLeft;
};

export { useSecondsLeft };
