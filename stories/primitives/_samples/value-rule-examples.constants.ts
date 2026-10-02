/* @layer stories @kind data */
import type { ValueScale } from '../../../src/primitives';

type RuleExample = { rule: string; scale: ValueScale };

const VALUE_RULE_EXAMPLES: Readonly<Record<string, RuleExample>> = {
  'Zoom in 0.5x steps': { rule: 'every 0.5 | {v}x', scale: { min: 0.5, max: 4, step: 0.25 } },
  Percent: { rule: 'every 25 | {v}%', scale: { min: 0, max: 100, step: 5 } },
  'Set values, in ms': { rule: '0, 250, 500, 1000 | {v} ms', scale: { min: 0, max: 1000, step: 50 } },
  'Worked out, then formatted': { rule: 'every 0.1 | {v*100:0}%', scale: { min: 0, max: 0.5, step: 0.01 } },
  'Percent along the scale': { rule: 'count 5 | {p}%', scale: { min: 10, max: 30, step: 1 } },
  'Grouped thousands': { rule: 'ends + 10000 | {v:#,##0} pts', scale: { min: 0, max: 25000, step: 500 } },
  Signed: { rule: '-10, 0, 10 | {v:+0} dB', scale: { min: -10, max: 10, step: 1 } },
  Words: { rule: '[Low, Medium, High]', scale: { min: 0, max: 100, step: 1 } },
  'Plural words': { rule: 'every 2 + ends | {v} {heart|hearts}', scale: { min: 1, max: 8, step: 1 } },
  'One value renamed': { rule: 'every 25 + 0=Off | {v}%', scale: { min: 0, max: 100, step: 5 } },
  'Stop names': { rule: 'every 2 | {stop}', scale: { min: 0, max: 6, step: 1, stops: ['0.5x', '1x', '1.5x', '2x', '3x', '4x', '6x'] } },
  'A rule that does not read': { rule: 'every banana', scale: { min: 0, max: 100, step: 1 } },
};

export { VALUE_RULE_EXAMPLES };
