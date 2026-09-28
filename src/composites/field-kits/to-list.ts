/* @layer renderer-components @kind logic */
const toList = (value: unknown): readonly unknown[] => (Array.isArray(value) ? value : []);

export { toList };
