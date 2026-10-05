/* @layer renderer-components @kind util */
import { foldText } from '../../data/text/fold-text';

const typeaheadIndex = (labels: readonly string[], enabled: readonly boolean[], current: number, buffer: string): number => {
  const cycling = [...buffer].every((char) => char === buffer[0]);
  const needle = foldText(cycling ? buffer.slice(0, 1) : buffer);
  const start = cycling ? current + 1 : Math.max(current, 0);
  for (let offset = 0; offset < labels.length; offset += 1) {
    const at = (start + offset) % labels.length;
    if (enabled[at] && foldText(labels[at] ?? '').startsWith(needle)) return at;
  }
  return -1;
};

export { typeaheadIndex };
