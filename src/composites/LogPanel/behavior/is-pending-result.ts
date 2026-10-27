/* @layer renderer-components @kind function */
import type { LogInputResult } from './log-input-result.type';

const isPendingResult = (result: LogInputResult): result is Promise<boolean | void> => result instanceof Promise;

export { isPendingResult };
