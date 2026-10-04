/* @layer tooling-scripts @kind logic */
import { noIconButtonChild } from './no-icon-button-child.mjs';
import { preferNamedInput } from './prefer-named-input.mjs';

const tesseraEslintPlugin = {
  meta: { name: 'tessera' },
  rules: { 'no-icon-button-child': noIconButtonChild, 'prefer-named-input': preferNamedInput },
};

export { tesseraEslintPlugin };
