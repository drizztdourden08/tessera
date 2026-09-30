/* @layer tooling-scripts @kind logic */
const BLOCK = /([^{}]+)\{([^{}]*)\}/g;

const propertiesIn = (body) =>
  body.split(';').flatMap((line) => {
    const at = line.indexOf(':');
    const name = line.slice(0, at).trim();
    return at > 0 && name.startsWith('--') ? [[name, line.slice(at + 1).trim()]] : [];
  });

const declarationsOf = (css, wanted) => {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...text.matchAll(BLOCK)]
    .filter(([, selector]) => selector.split(',').some((part) => wanted(part.trim())))
    .flatMap(([, , body]) => propertiesIn(body));
};

export { declarationsOf };
