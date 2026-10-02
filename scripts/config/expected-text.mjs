/* @layer tooling-scripts @kind logic */
import { TYPE_NAMES } from './config.constants.mjs';
import { schemaNode } from './schema-node.mjs';

const expectedText = (schema, root) => {
  const node = schemaNode(schema, root);
  if (node.enum) return node.enum.map((value) => JSON.stringify(value)).join(' or ');
  if (node.anyOf) return node.anyOf.map((branch) => expectedText(branch, root)).join(' or ');
  return TYPE_NAMES[node.type];
};

export { expectedText };
