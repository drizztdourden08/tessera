/* @layer renderer-components @kind logic */
const wrap = (index: number, count: number): number => ((index % count) + count) % count;

const rovingIndex = (key: string, current: number, enabled: readonly boolean[], steps: Readonly<Record<string, number>>): number | null => {
  const open = enabled.flatMap((on, index) => (on ? [index] : []));
  if (open.length === 0) return null;
  if (key === 'Home') return open[0] ?? null;
  if (key === 'End') return open[open.length - 1] ?? null;
  const step = steps[key];
  if (step === undefined) return null;
  const count = enabled.length;
  for (let hop = 1; hop <= count; hop += 1) {
    const index = wrap(current + step * hop, count);
    if (enabled[index]) return index;
  }
  return null;
};

export { rovingIndex };
