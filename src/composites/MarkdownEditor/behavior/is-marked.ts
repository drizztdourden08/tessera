/* @layer renderer-components @kind logic */
const isMarked = (run: number, mark: string): boolean => (mark.length === 1 ? run % 2 === 1 : run >= mark.length);

export { isMarked };
