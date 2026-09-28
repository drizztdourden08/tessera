/* @layer renderer-components @kind logic */
const committedValue = (draft: string, current: string): string | undefined => {
  const next = draft.trim();
  return next === '' || next === current ? undefined : next;
};

export { committedValue };
