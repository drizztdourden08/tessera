/* @layer renderer-components @kind logic */
const addToHistory = (history: readonly string[], command: string, limit: number): readonly string[] => {
  if (history[history.length - 1] === command) return history;
  const next = [...history, command];
  return next.length > limit ? next.slice(next.length - limit) : next;
};

export { addToHistory };
