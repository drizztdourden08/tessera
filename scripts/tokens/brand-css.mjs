/* @layer tooling-scripts @kind logic */
const GRADIENT_LINE = /\n {2}--brand-[\w-]+-gradient: [^\n]*/g;
const BACKDROP_BLOCK = /\n+:root, \[data-palette\] \{\n\}/g;
const LAYER_END = /\n}\n}\s*$/;

const brandCss = (current, gradients, [backdropName, backdropValue]) => {
  const lines = gradients.map(([name, value]) => `\n  ${name}: ${value};`).join('');
  const backdrop = `\n\n:root, [data-palette] {\n  ${backdropName}: ${backdropValue};\n}`;
  return current.replace(/\r\n/g, '\n').replace(GRADIENT_LINE, '').replace(BACKDROP_BLOCK, '').replace(LAYER_END, `${lines}\n}${backdrop}\n}\n`);
};

export { brandCss };
