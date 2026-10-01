/* @layer renderer-components @kind constants */
import type { LabelPlacement } from './label-rule.type';

const NUMBER_TEXT = /^-?(?:\d+(?:\.\d+)?|\.\d+)$/;

const PLACEMENT_KEYWORDS: ReadonlyMap<string, LabelPlacement> = new Map<string, LabelPlacement>([
  ['ends', { kind: 'ends' }],
  ['steps', { kind: 'steps' }],
  ['none', { kind: 'none' }],
]);

const PLACEHOLDER = /^(v|p)\s*(?:([*/+-])\s*(\d+(?:\.\d+)?))?\s*(?::\s*(\S+))?$/;

const NUMBER_FORMAT = /^(\+?)([#0,]*)(?:\.(0*)(#*))?$/;

const GROUP_OPENERS = new Set(['{', '[']);

const GROUP_CLOSERS = new Set(['}', ']']);

export { GROUP_CLOSERS, GROUP_OPENERS, NUMBER_FORMAT, NUMBER_TEXT, PLACEHOLDER, PLACEMENT_KEYWORDS };
