/* @layer tooling-scripts @kind logic */
import { TYPE_NAMES } from './config.constants.mjs';
import { expectedText } from './expected-text.mjs';
import { keyPath } from './key-path.mjs';
import { schemaNode } from './schema-node.mjs';
import { valueType } from './value-type.mjs';

const named = (path) => (path ? `"${path}"` : 'the file');

const typeMatches = (value, type) => {
  const actual = valueType(value);
  return actual === type || (type === 'number' && actual === 'integer');
};

const childSchema = (node, key) => {
  if (node.properties && Object.hasOwn(node.properties, key)) return node.properties[key];
  return typeof node.additionalProperties === 'object' ? node.additionalProperties : undefined;
};

const unknownKey = (node, path, at) => {
  const keys = Object.keys(node.properties ?? {}).join(', ');
  return `unknown key "${at}"; ${path ? `the keys of "${path}" are` : 'the top keys are'} ${keys}`;
};

const objectErrors = (value, node, root, path) => Object.entries(value).flatMap(([key, child]) => {
  const at = keyPath(path, key);
  const schema = childSchema(node, key);
  return schema ? schemaErrors(child, schema, root, at) : [unknownKey(node, path, at)];
});

const arrayErrors = (value, node, root, path) => {
  if (value.length < (node.minItems ?? 0)) return [`${named(path)} is an empty list; give it one entry or more`];
  return value.flatMap((item, index) => schemaErrors(item, node.items, root, `${path}[${index}]`));
};

const rangeErrors = (value, node, path) => {
  if (typeof value === 'string' && value.length < (node.minLength ?? 0)) return [`${named(path)} is empty; write a value or leave the key out`];
  const low = node.minimum ?? -Infinity;
  const high = node.maximum ?? Infinity;
  if (typeof value === 'number' && (value < low || value > high)) return [`${named(path)} is ${value}; it takes ${low} to ${high}`];
  return [];
};

const branchErrors = (value, node, root, path) => {
  const branch = node.anyOf.find((option) => typeMatches(value, schemaNode(option, root).type));
  if (!branch) return [`${named(path)} is ${TYPE_NAMES[valueType(value)]}; it takes ${expectedText(node, root)}`];
  return schemaErrors(value, branch, root, path);
};

const schemaErrors = (value, schema, root, path = '') => {
  const node = schemaNode(schema, root);
  if (node.anyOf) return branchErrors(value, node, root, path);
  if (node.enum) return node.enum.includes(value) ? [] : [`${named(path)} is ${JSON.stringify(value)}; it takes ${expectedText(node, root)}`];
  if (!typeMatches(value, node.type)) return [`${named(path)} is ${TYPE_NAMES[valueType(value)]}; it takes ${expectedText(node, root)}`];
  if (node.type === 'object') return objectErrors(value, node, root, path);
  if (node.type === 'array') return arrayErrors(value, node, root, path);
  return rangeErrors(value, node, path);
};

export { schemaErrors };
