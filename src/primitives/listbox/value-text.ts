/* @layer renderer-components @kind util */
const valueText = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value);
  if (value instanceof Date) return value.toLocaleDateString();
  if (Array.isArray(value)) return value.map((part: unknown) => valueText(part)).join(', ');
  return '';
};

export { valueText };
