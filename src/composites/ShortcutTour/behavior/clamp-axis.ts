/* @layer renderer-components @kind util */
const clampAxis = (offset: number, view: number, world: number): number => {
  if (world <= view) return (view - world) / 2;
  return Math.min(0, Math.max(view - world, offset));
};

export { clampAxis };
