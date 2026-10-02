/* @layer tooling-scripts @kind logic */
import { createHash } from 'node:crypto';

const propsHash = (props) => {
  const own = props.own.map((prop) => [prop.name, prop.optional, prop.text, [...(prop.literals ?? [])].sort()]).sort(([a], [b]) => a.localeCompare(b));
  const facts = JSON.stringify({ own, from: props.inherited.from, extends: [...props.inherited.extends].sort() });
  return createHash('sha1').update(facts).digest('hex').slice(0, 16);
};

export { propsHash };
