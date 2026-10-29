/* @layer tooling-scripts @kind logic */
const addBarrelExport = (text, { name, props }, from = '.') =>
  `${text.trimEnd()}\nexport { ${name} } from '${from}/${name}';\nexport type { ${props} } from '${from}/${name}';\n`;

export { addBarrelExport };
