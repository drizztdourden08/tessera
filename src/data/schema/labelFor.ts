/* @layer renderer-components @kind logic */
const labelFor = (segment: string): string => {
  const spaced = segment.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

export { labelFor };
