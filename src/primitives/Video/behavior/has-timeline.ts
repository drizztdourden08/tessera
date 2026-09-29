/* @layer renderer-components @kind logic */
const hasTimeline = (duration: number): boolean => Number.isFinite(duration) && duration > 0;

export { hasTimeline };
