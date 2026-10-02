/* @layer tooling-scripts @kind logic */
import { KINDS, NAME_RULE } from './new.constants.mjs';

const readRequest = (positionals) => {
  const [kind, name, ...extra] = positionals;
  const problems = [];
  if (kind === undefined || name === undefined) problems.push('tessera new takes a kind and a name, such as tessera new compound SaveSlot');
  else {
    if (!KINDS.includes(kind)) problems.push(`"${kind}" is not a kind. Pick one of ${KINDS.join(', ')}`);
    if (!NAME_RULE.test(name)) problems.push(`"${name}" is not a component name. Write it in PascalCase, such as SaveSlot`);
  }
  if (extra.length > 0) problems.push(`tessera new takes one name; it also got ${extra.join(' ')}`);
  return { kind, name, problems };
};

export { readRequest };
