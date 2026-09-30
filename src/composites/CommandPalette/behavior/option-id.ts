/* @layer renderer-components @kind logic */
const optionId = (listId: string, index: number): string | undefined => (index >= 0 ? `${listId}-option-${index}` : undefined);

export { optionId };
