/* @layer renderer-components @kind util */
import { devWarn } from '../../dom/dev-warn';

const reported = new Set<string>();

const warnUnknownInputIcon = (family: string, name: string): void => {
  const key = `${family}/${name}`;
  if (reported.has(key)) return;
  reported.add(key);
  devWarn(`InputIcon has no "${name}" in the "${family}" family, so it draws a question mark key instead. INPUT_ICON_NAMES lists every accepted name.`);
};

export { warnUnknownInputIcon };
