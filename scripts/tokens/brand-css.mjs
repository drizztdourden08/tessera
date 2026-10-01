/* @layer tooling-scripts @kind logic */
const BRAND_LINE = /\n {2}--brand-[\w-]+-(?:gradient|backdrop): [^\n]*/g;
const LAYER_END = /\n}\n}\s*$/;

const brandCss = (current, lines) => {
  const declarations = lines.map(([name, value]) => `\n  ${name}: ${value};`).join('');
  return current.replace(/\r\n/g, '\n').replace(BRAND_LINE, '').replace(LAYER_END, `${declarations}\n}\n}\n`);
};

export { brandCss };
