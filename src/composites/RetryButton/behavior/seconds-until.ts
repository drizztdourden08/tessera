/* @layer renderer-components @kind logic */
const secondsUntil = (until: number | null | undefined, now: number): number => {
  if (until === null || until === undefined || !Number.isFinite(until)) return 0;
  return Math.max(0, Math.ceil((until - now) / 1000));
};

export { secondsUntil };
