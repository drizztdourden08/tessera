/* @layer tooling-scripts @kind logic */
import stylelint from 'stylelint';
import { FAINT_TEXT, FAINT_TONE_SELECTOR, TEXT_COLOUR_PROPS } from '../stylelint-rules.constants.mjs';

const ruleName = 'tessera/no-faint-text';

const messages = stylelint.utils.ruleMessages(ruleName, {
  faint: (prop) => `${prop} takes --c-text-faint, about 1.6:1 on the surface (1.5:1 to 1.7:1 across the app palettes). Use --c-text-muted for text, or tone="faint" on Text for decoration and secondary hints; keep --c-text-faint for borders and decoration.`,
});

const ruleFunction = (primary) => (root, result) => {
  if (!primary) return;
  root.walkDecls((decl) => {
    if (decl.parent?.selector === FAINT_TONE_SELECTOR) return;
    if (TEXT_COLOUR_PROPS.has(decl.prop) && FAINT_TEXT.test(decl.value)) stylelint.utils.report({ ruleName, result, node: decl, message: messages.faint(decl.prop) });
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default stylelint.createPlugin(ruleName, ruleFunction);
