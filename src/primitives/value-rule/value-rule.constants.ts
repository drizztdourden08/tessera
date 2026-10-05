/* @layer renderer-components @kind constants */
import type { RulePlacement } from './value-rule.type';

const MAX_RULE_MARKS = 500;

const NUMBER_LOCALE = 'en-US';

const NUMBER_TEXT = /^-?(?:\d+(?:\.\d+)?|\.\d+)$/;

const PLACEMENT_KEYWORDS: ReadonlyMap<string, RulePlacement> = new Map<string, RulePlacement>([
  ['ends', { kind: 'ends' }],
  ['steps', { kind: 'steps' }],
  ['none', { kind: 'none' }],
]);

const PLACEHOLDER = /^(v|p)\s*(?:([*/+-])\s*(\d+(?:\.\d+)?))?\s*(?::\s*(\S+))?$/;

const NUMBER_FORMAT = /^(\+?)([#0,]*)(?:\.(0*)(#*))?$/;

const GROUP_OPENERS = new Set(['{', '[']);

const GROUP_CLOSERS = new Set(['}', ']']);

export { GROUP_CLOSERS, MAX_RULE_MARKS, GROUP_OPENERS, NUMBER_FORMAT, NUMBER_LOCALE, NUMBER_TEXT, PLACEHOLDER, PLACEMENT_KEYWORDS };
