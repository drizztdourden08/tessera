/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import { SECONDS_PER_MINUTE } from '../RetryButton.constants';
import type { RetryLineParams } from '../RetryButton.type';

const waitText = (seconds: number, common: TesseraStrings['common']): string => {
  if (seconds < SECONDS_PER_MINUTE) return common.waitSeconds(seconds);
  return common.waitMinutes(Math.floor(seconds / SECONDS_PER_MINUTE), seconds % SECONDS_PER_MINUTE);
};

const retryLine = (params: RetryLineParams, common: TesseraStrings['common']): string => {
  const { secondsLeft, attempt, attempts } = params;
  const counted = attempt !== undefined && attempts !== undefined;
  if (secondsLeft <= 0) return counted ? common.tryOf(attempt, attempts) : '';
  const wait = waitText(secondsLeft, common);
  return counted ? common.tryOfIn(attempt, attempts, wait) : common.nextTryIn(wait);
};

export { retryLine };
