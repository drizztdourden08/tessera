/* @layer renderer-components @kind util */
const badgeText = (value: number | string | undefined, max: number | undefined): string => {
  if (value === undefined) return '';
  if (typeof value === 'number' && max !== undefined && value > max) return `${max}+`;
  return String(value);
};

export { badgeText };
