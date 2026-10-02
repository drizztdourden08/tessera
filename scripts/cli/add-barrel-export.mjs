/* @layer tooling-scripts @kind logic */
const addBarrelExport = (text, { name, props }) =>
  `${text.trimEnd()}\nexport { ${name} } from './${name}';\nexport type { ${props} } from './${name}';\n`;

export { addBarrelExport };
