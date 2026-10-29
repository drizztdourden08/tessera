/* @layer tooling-scripts @kind test */
const file = (id) => ({ id, name: id });

const folder = (id, children) => ({ id, name: id, children });

const ITEMS = [folder('a', [file('a1'), file('a2')]), folder('b', [file('b1')]), file('c')];

const ACCESS = { getKey: (item) => item.id, getChildren: (item) => item.children, isBranch: (item) => item.children !== undefined };

export { ACCESS, file, folder, ITEMS };
