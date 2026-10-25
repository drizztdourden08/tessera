/* @layer tooling-scripts @kind test */
const def = (id, defaultSide, extra = {}) => ({ id, label: id, defaultSide, ...extra });

const DEFS = [def('a', 'top'), def('b', 'top'), def('c', 'left'), def('d', 'bottom', { hiddenByDefault: true })];

const fullDefs = () => ['top', 'left', 'right', 'bottom'].flatMap((side) => [def(`${side}1`, side), def(`${side}2`, side)]);

const bar = (id, start = 0, size = 1) => ({ id, start, size });

const v2 = (sides, extra = {}) => ({
  v: 2,
  sides: { top: [], bottom: [], left: [], right: [], ...sides },
  corners: {},
  hidden: [],
  last: {},
  ...extra,
});

export { DEFS, bar, def, fullDefs, v2 };
