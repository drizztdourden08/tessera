/* @layer renderer-components @kind logic */
const matchName = (name: string, query: string): boolean => {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const lower = name.toLowerCase();
  return words.every((word) => lower.includes(word));
};

export { matchName };
