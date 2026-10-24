/* @layer stories @kind logic */
const triggerAt = (t: number): number => Math.max(0, Math.sin(t * 1.9)) ** 1.5;

export { triggerAt };
