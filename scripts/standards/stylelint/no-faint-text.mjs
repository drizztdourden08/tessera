/* @layer tooling-scripts @kind logic */
import stylelint from 'stylelint';
import { FAINT_TEXT, TEXT_COLOUR_PROPS } from '../stylelint-rules.constants.mjs';

const ruleName = 'tessera/no-faint-text';

const messages = stylelint.utils.ruleMessages(ruleName, {
  faint: (prop) => `${prop} takes --c-text-faint, about 1.7:1 on the surface. Use --c-text-muted for text; keep --c-text-faint for borders and decoration.`,
});

const ruleFunction = (primary) => (root, result) => {
  if (!primary) return;
  root.walkDecls((decl) => {
    if (TEXT_COLOUR_PROPS.has(decl.prop) && FAINT_TEXT.test(decl.value)) stylelint.utils.report({ ruleName, result, node: decl, message: messages.faint(decl.prop) });
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default stylelint.createPlugin(ruleName, ruleFunction);
