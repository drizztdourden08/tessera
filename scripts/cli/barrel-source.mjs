/* @layer tooling-scripts @kind logic */
const barrelSource = ({ layer, mode, names }) => [
  `/* @layer ${layer} @kind barrel */`,
  `export { ${names.name} } from './${names.name}';`,
  ...(mode === 'tessera' ? [`export type { ${names.props} } from './${names.name}.type';`] : []),
  '',
].join('\n');

export { barrelSource };
