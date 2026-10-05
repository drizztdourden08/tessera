/* @layer tooling-scripts @kind logic */
const RULE = /([^{}]+)\{([^{}]*)\}/g;

const propertiesOf = (body) =>
  body.split(';').flatMap((line) => {
    const at = line.indexOf(':');
    return at > 0 ? [[line.slice(0, at).trim(), line.slice(at + 1).replace(/\s+/g, ' ').trim()]] : [];
  });

const ruleDeclarations = (css, selectors) => {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [...text.matchAll(RULE)].map(([, selector, body]) => [selector.trim(), body]);
  return new Map(selectors.flatMap((wanted) => rules.filter(([selector]) => selector === wanted).flatMap(([, body]) => propertiesOf(body))));
};

export { ruleDeclarations };
