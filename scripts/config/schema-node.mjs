/* @layer tooling-scripts @kind logic */
const schemaNode = (schema, root) => {
  if (!schema.$ref) return schema;
  const target = schema.$ref.replace(/^#\//, '').split('/').reduce((node, part) => node[part], root);
  const beside = Object.fromEntries(Object.entries(schema).filter(([key]) => key !== '$ref'));
  return { ...schemaNode(target, root), ...beside };
};

export { schemaNode };
