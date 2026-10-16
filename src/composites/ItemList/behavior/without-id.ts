/* @layer renderer-components @kind logic */
const withoutId = (ids: readonly string[], id: string): readonly string[] => ids.filter((other) => other !== id);

export { withoutId };
