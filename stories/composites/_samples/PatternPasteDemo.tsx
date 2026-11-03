/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import { PatternRulesCard } from './PatternRulesCard';
import type { PatternSlotConfigs } from '../../../src/composites';
import type { PatternRulesCase } from './PatternRulesDemo.type';

const CODE_SLOTS: PatternSlotConfigs = { head: { placeholder: 'ABCD' }, tail: { placeholder: '1234' } };

const CASES: readonly PatternRulesCase[] = [
  {
    key: 'code', label: 'Access code', hint: 'Paste a full value, such as ABCD-1234, into any slot. The case and the dash do not matter.',
    pattern: '{head:text len4 alnum upper "Letters"}-{tail:number 0..9999 pad4 "Number"}', initial: { head: null, tail: null }, slots: CODE_SLOTS,
  },
  {
    key: 'address', label: 'Server address', hint: 'Paste a full value, such as 192.168.0.1:8080, into any slot. A value that does not fit stays in the one slot.',
    pattern: '[icon:server] {a:number 0..255 "First part"}.{b:number 0..255 "Second part"}.{c:number 0..255 "Third part"}.{d:number 0..255 "Fourth part"}:{port:number 1..65535 "Port"}',
    initial: { a: null, b: null, c: null, d: null, port: null },
  },
];

const PatternPasteDemo = () => (
  <Box className="pattern-story__rules">
    {CASES.map((paste) => <PatternRulesCard key={paste.key} rule={paste} />)}
  </Box>
);

export { PatternPasteDemo };
