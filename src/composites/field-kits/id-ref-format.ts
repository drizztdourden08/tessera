/* @layer renderer-components @kind logic */
const formatIdRefDisplay = (id: string, resolved?: string): string => {
  const name = resolved?.trim();
  return name && name !== id ? `${name} (${id})` : id;
};

export { formatIdRefDisplay };
