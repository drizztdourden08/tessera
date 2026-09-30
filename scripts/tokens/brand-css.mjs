/* @layer tooling-scripts @kind logic */
const GRADIENT_LINE = /\n {2}--brand-[\w-]+-gradient: [^\n]*/g;
const LAYER_END = /\n}\n}\s*$/;

const brandCss = (current, gradients) => {
  const lines = gradients.map(([name, value]) => `\n  ${name}: ${value};`).join('');
  return current.replace(/\r\n/g, '\n').replace(GRADIENT_LINE, '').replace(LAYER_END, `${lines}\n}\n}\n`);
};

export { brandCss };
