/* @layer tooling-scripts @kind logic */
const code = (text) => `\`${text}\``;

const propLine = (prop) => {
  const optional = prop.optional ? ' (optional)' : '';
  const choices = prop.literals ? `, one of ${prop.literals.map(code).join(', ')}` : '';
  const fallback = prop.default === undefined ? '' : ` Default ${code(prop.default)}.`;
  return `- ${code(prop.name)}${optional}: ${code(prop.text)}${choices}.${fallback}`;
};

const inheritedLine = ({ count, from, extends: through }) => {
  if (count === 0) return [];
  const source = through.length > 0 ? through : from;
  return [`It also takes the ${count} attributes it inherits through ${source.map(code).join(', ')}.\n`];
};

const renderProps = (props) => {
  const own = props.own.length > 0 ? [`${props.own.map(propLine).join('\n')}\n`] : ['It takes no props of its own.\n'];
  return ['## Props\n', ...own, ...inheritedLine(props.inherited)];
};

export { renderProps };
