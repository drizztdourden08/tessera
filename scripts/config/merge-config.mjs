/* @layer tooling-scripts @kind logic */
const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const mergeConfig = (base, change) => {
  const merged = { ...base };
  for (const [key, value] of Object.entries(change)) {
    merged[key] = isPlainObject(merged[key]) && isPlainObject(value) ? mergeConfig(merged[key], value) : value;
  }
  return merged;
};

export { mergeConfig };
