/* @layer renderer-components @kind logic */
const headerToggle = (key: string, collapsed: boolean): boolean | undefined => {
  if (key === 'Enter' || key === ' ') return !collapsed;
  if (key === 'ArrowLeft' && !collapsed) return true;
  if (key === 'ArrowRight' && collapsed) return false;
  return undefined;
};

export { headerToggle };
