/* @layer tooling-scripts @kind logic */
import { resolve } from 'node:path';
import stylelint from 'stylelint';
import { posixPath } from '../../config/posix-path.mjs';
import { TESSERA_ROOT } from '../../guide/tessera-root.constants.mjs';
import { blockOf } from '../block-of.mjs';
import { CLASS_NAME } from '../stylelint-rules.constants.mjs';
import { tesseraBlocks } from '../tessera-blocks.mjs';

const ruleName = 'tessera/no-tessera-internals';

const messages = stylelint.utils.ruleMessages(ruleName, {
  internal: (className, block) => `.${className} is a class of the Tessera part ${block}. Its classes are internal and change without notice: ask Tessera for a prop or a token.`,
});

const insideTessera = (file) => typeof file === 'string' && posixPath(resolve(file)).startsWith(`${TESSERA_ROOT}/`);

const ruleFunction = (primary, secondary = {}) => (root, result) => {
  if (!primary || insideTessera(root.source?.input.file)) return;
  const blocks = tesseraBlocks(secondary.tesseraRoot);
  root.walkRules((rule) => {
    for (const found of rule.selector.matchAll(CLASS_NAME)) {
      const block = blockOf(found[1]);
      if (blocks.has(block)) stylelint.utils.report({ ruleName, result, node: rule, message: messages.internal(found[1], block), word: `.${found[1]}` });
    }
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default stylelint.createPlugin(ruleName, ruleFunction);
