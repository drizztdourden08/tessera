/* @layer tooling-scripts @kind logic */
const nameOf = (node) => (node.type === 'JSXIdentifier' ? node.name : undefined);

const isIconElement = (child) => child.type === 'JSXElement' && nameOf(child.openingElement.name) === 'Icon';

const noIconButtonChild = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Pass an icon to Button through its icon prop, not as a child' },
    messages: { iconChild: 'Pass the icon as the `icon` prop of Button, not as a child; IconButton is the button that holds only an icon.' },
    schema: [],
  },
  create: (context) => ({
    JSXElement: (node) => {
      if (nameOf(node.openingElement.name) !== 'Button') return;
      for (const child of node.children.filter(isIconElement)) context.report({ node: child, messageId: 'iconChild' });
    },
  }),
};

export { noIconButtonChild };
