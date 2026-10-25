/* @layer tooling-scripts @kind logic */
import stylelint from 'stylelint';
import { DISABLED_SELECTOR, DISABLED_TEXT, TEXT_COLOUR_PROPS } from '../stylelint-rules.constants.mjs';

const ruleName = 'tessera/no-disabled-text';

const messages = stylelint.utils.ruleMessages(ruleName, {
  disabled: (prop) => `${prop} takes --c-text-disabled, under 2:1 on the surface. Use --c-text-faint for the quietest text people read; keep --c-text-disabled for text inside a disabled control, and for borders and decoration.`,
});

const ruleFunction = (primary) => (root, result) => {
  if (!primary) return;
  root.walkDecls((decl) => {
    if (DISABLED_SELECTOR.test(decl.parent?.selector ?? '')) return;
    if (TEXT_COLOUR_PROPS.has(decl.prop) && DISABLED_TEXT.test(decl.value)) stylelint.utils.report({ ruleName, result, node: decl, message: messages.disabled(decl.prop) });
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default stylelint.createPlugin(ruleName, ruleFunction);
