/* @layer tooling-scripts @kind logic */
const NAMED_INPUTS = { password: 'PasswordInput', search: 'SearchInput' };

const typeValue = (attribute) => {
  const value = attribute.value;
  if (value?.type === 'Literal') return value.value;
  if (value?.type === 'JSXExpressionContainer' && value.expression.type === 'Literal') return value.expression.value;
  return undefined;
};

const typeAttribute = (opening) => opening.attributes.find((attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'type');

const preferNamedInput = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Use PasswordInput or SearchInput in place of a TextInput of that type' },
    messages: { named: 'Use {{part}} in place of <TextInput type="{{type}}">; it brings the reveal, clear and key handling of that field.' },
    schema: [],
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (node.name.type !== 'JSXIdentifier' || node.name.name !== 'TextInput') return;
      const attribute = typeAttribute(node);
      const type = attribute ? typeValue(attribute) : undefined;
      const part = typeof type === 'string' ? NAMED_INPUTS[type] : undefined;
      if (part) context.report({ node, messageId: 'named', data: { part, type } });
    },
  }),
};

export { preferNamedInput };
