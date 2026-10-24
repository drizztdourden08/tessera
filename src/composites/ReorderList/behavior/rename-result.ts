/* @layer renderer-components @kind util */
const renameResult = (name: string, next: string): string | null => (next === name ? null : next);

export { renameResult };
