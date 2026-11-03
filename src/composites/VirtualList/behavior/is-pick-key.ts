/* @layer renderer-components @kind logic */
const isPickKey = (key: string, selecting: boolean): boolean => key === 'Enter' || (!selecting && key === ' ');

export { isPickKey };
