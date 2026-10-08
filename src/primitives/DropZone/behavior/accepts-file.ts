/* @layer renderer-components @kind util */
const acceptsType = (type: string, pattern: string): boolean => {
  const have = type.toLowerCase();
  return pattern.endsWith('/*') ? have.startsWith(pattern.slice(0, -1)) : have === pattern;
};

const acceptsFile = (file: File, entry: string): boolean => {
  const pattern = entry.toLowerCase();
  return pattern.includes('/') ? acceptsType(file.type, pattern) : file.name.toLowerCase().endsWith(pattern);
};

export { acceptsFile };
