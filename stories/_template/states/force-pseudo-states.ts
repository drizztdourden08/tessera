/* @layer stories @kind logic */
import { ownerWindowOf } from '../../../src/primitives/dom/owner-window';
import { forceSelector } from './force-selector';

const forcedSheets = new WeakSet<CSSStyleSheet>();
const watchedDocuments = new WeakSet<Document>();

const isStyleRule = (rule: CSSRule): rule is CSSStyleRule => 'selectorText' in rule && 'style' in rule;
const isGroupRule = (rule: CSSRule): rule is CSSGroupingRule => 'cssRules' in rule;
const isImportRule = (rule: CSSRule): rule is CSSImportRule => 'styleSheet' in rule;

const forceStyleRule = (rule: CSSStyleRule): void => {
  const forced = forceSelector(rule.selectorText);
  if (forced !== rule.selectorText) rule.selectorText = forced;
};

const forceRules = (rules: CSSRuleList): CSSStyleSheet[] => Array.from(rules).flatMap((rule) => {
  if (isStyleRule(rule)) forceStyleRule(rule);
  const nested = isGroupRule(rule) ? forceRules(rule.cssRules) : [];
  return isImportRule(rule) && rule.styleSheet ? [...nested, rule.styleSheet] : nested;
});

const readRules = (sheet: CSSStyleSheet): CSSRuleList | null => {
  try {
    return sheet.cssRules;
  } catch {
    return null;
  }
};

const forceSheets = (sheets: readonly CSSStyleSheet[]): void => {
  const pending = [...sheets];
  for (let sheet = pending.pop(); sheet; sheet = pending.pop()) {
    const rules = forcedSheets.has(sheet) ? null : readRules(sheet);
    if (rules) {
      forcedSheets.add(sheet);
      pending.push(...forceRules(rules));
    }
  }
};

const forceDocument = (doc: Document): void => forceSheets(Array.from(doc.styleSheets));

const forcePseudoStates = (doc: Document): void => {
  forceDocument(doc);
  if (watchedDocuments.has(doc)) return;
  watchedDocuments.add(doc);
  const Observer = (ownerWindowOf(doc.head) as Window & typeof globalThis).MutationObserver;
  const observer = new Observer(() => forceDocument(doc));
  observer.observe(doc.head, { childList: true, subtree: true, characterData: true });
};

export { forcePseudoStates };
