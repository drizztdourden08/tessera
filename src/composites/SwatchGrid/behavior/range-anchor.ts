/* @layer renderer-components @kind util */
const rangeAnchor = (selectedIndex: number, fallback: number): number => (selectedIndex < 0 ? fallback : selectedIndex);

export { rangeAnchor };
