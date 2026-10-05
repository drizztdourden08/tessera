/* @layer renderer-components @kind logic */
const ticks = new Set<() => void>();
let frame = 0;

const run = (): void => {
  for (const tick of [...ticks]) tick();
  frame = ticks.size > 0 ? requestAnimationFrame(run) : 0;
};

const joinFrameLoop = (tick: () => void): (() => void) => {
  ticks.add(tick);
  if (frame === 0) frame = requestAnimationFrame(run);
  return () => {
    ticks.delete(tick);
    if (ticks.size > 0 || frame === 0) return;
    cancelAnimationFrame(frame);
    frame = 0;
  };
};

export { joinFrameLoop };
