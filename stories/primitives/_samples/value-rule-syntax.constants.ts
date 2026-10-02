/* @layer stories @kind data */
const VALUE_RULE_SYNTAX: Readonly<Record<string, string>> = {
  'every N': 'A label every N, counted from min: every 0.5 on 0.5 to 2 gives 0.5, 1, 1.5, 2.',
  'count N': 'N labels spread evenly from min to max, each on a step.',
  ends: 'Labels at min and max.',
  steps: 'A label on every step of the scale.',
  none: 'No labels.',
  '0, 50, max': 'Labels at these values. min and max name the ends, and at in front reads the same.',
  '0=Off': 'A value with its own text, which wins over the template.',
  'every 25 + ends': 'Several placements together, joined with +.',
  'where | how': 'The | splits where the labels go from how each reads. Leave out how and each label reads like the value itself: the stop name, formatValue or the plain number.',
  '{v}': 'The value.',
  '{v:0.0}': 'The value in a number format: 0 whole, 0.0 one decimal, 0.## up to two, #,##0 grouped, +0 signed.',
  '{v*100}': 'The value worked out first: *, /, + or - and a number. {v*100:0} turns 0.15 into 15.',
  '{p}': 'How far along the track the value sits, in percent, 0 at min and 100 at max.',
  '{stop}': 'The name of the stop, when the slider has stops.',
  '{heart|hearts}': 'The first word at 1 and the second otherwise. {none|one|many} adds a word for 0.',
  '[Low, Medium, High]': 'One word per label, in order. On its own it places one label per word, spread evenly.',
};

export { VALUE_RULE_SYNTAX };
