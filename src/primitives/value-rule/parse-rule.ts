/* @layer renderer-components @kind util */
import type { ValueRule } from './value-rule.type';
import { parsePlacements } from './parse-placements';
import { parseTemplate } from './parse-template';
import { splitTopLevel } from './split-top-level';

const looksLikeTemplate = (text: string): boolean => text.startsWith('[') || text.includes('{');

const parseRule = (rule: string): ValueRule => {
  const sections = splitTopLevel(rule, '|');
  if (sections.length > 2) throw new Error('A rule has one | between where the labels go and how they read. Inside braces, | separates the forms of a choice.');
  const [where = '', how] = sections.map((section) => section.trim());
  if (how !== undefined) {
    return { placements: where === '' ? null : parsePlacements(where), template: how === '' ? null : parseTemplate(how) };
  }
  return looksLikeTemplate(where) ? { placements: null, template: parseTemplate(where) } : { placements: parsePlacements(where), template: null };
};

export { parseRule };
