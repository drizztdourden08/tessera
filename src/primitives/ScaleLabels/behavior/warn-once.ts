/* @layer renderer-components @kind util */
import { devWarn } from '../../dom/dev-warn';

const warned = new Set<string>();

const warnOnce = (message: string): void => {
  if (warned.has(message)) return;
  warned.add(message);
  devWarn(message);
};

export { warnOnce };
