/* @layer renderer-components @kind logic */
const sharePercent = (value: number, capacity: number): string => {
  if (capacity <= 0) return '0%';
  const percent = (value / capacity) * 100;
  return `${percent < 1 && percent > 0 ? '<1' : Math.round(percent)}%`;
};

export { sharePercent };
