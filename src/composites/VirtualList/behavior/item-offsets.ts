/* @layer renderer-components @kind logic */
const itemOffsets = (count: number, sizeOf: (index: number) => number): readonly number[] => {
  const offsets = [0];
  for (let at = 0; at < count; at += 1) {
    const size = sizeOf(at);
    offsets.push((offsets[at] ?? 0) + (Number.isFinite(size) ? Math.max(0, size) : 0));
  }
  return offsets;
};

export { itemOffsets };
