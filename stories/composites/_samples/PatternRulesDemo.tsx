/* @layer stories @kind component */
import { useState } from 'react';
import { DynamicInput } from '../../../src/composites';
import { Box, Field, Text } from '../../../src/primitives';
import type { PatternRuleMessage, PatternSlotConfigs, PatternValue } from '../../../src/composites';
import type { PatternRulesCase } from './PatternRulesDemo.type';

const HOST_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789.-';

const LOBBY_CHARS = 'ABCDEFGHJKLMNOPQRSTVWXYZ0123456789';

const LOBBY_ALIASES = { I: '1', L: '1', O: '0' };

const hostRule = (value: PatternValue[string]): PatternRuleMessage => {
  const host = typeof value === 'string' ? value : '';
  return host.startsWith('-') || host.endsWith('-') ? 'A host name cannot start or end with a dash.' : undefined;
};

const rangeRule = (value: PatternValue): PatternRuleMessage =>
  typeof value.from === 'number' && typeof value.to === 'number' && value.from > value.to
    ? 'The first port must not be above the last.'
    : undefined;

const HOST_SLOTS: PatternSlotConfigs = { host: { chars: HOST_CHARS, validate: hostRule, placeholder: 'play.example.net' } };

const LOBBY_SLOTS: PatternSlotConfigs = { code: { chars: LOBBY_CHARS, aliases: LOBBY_ALIASES, placeholder: 'K7M2Q9' } };

const CASES: readonly PatternRulesCase[] = [
  {
    key: 'host', label: 'Host name', hint: 'Letters, digits, dot and dash. Type a dash first to see the rule.',
    pattern: '[icon:server] {host:text max40 lower "Host name"}', initial: { host: '-play.example.net' }, slots: HOST_SLOTS,
  },
  {
    key: 'lobby', label: 'Lobby code', hint: 'Six characters, no U. I and L read as 1, O as 0.',
    pattern: '{code:text len6 upper "Lobby code"}', initial: { code: null }, slots: LOBBY_SLOTS,
  },
  {
    key: 'range', label: 'Port range', hint: 'A rule on the whole pattern.',
    pattern: '{from:number 1..65535 "First port"} to {to:number 1..65535 "Last port"}', initial: { from: 9000, to: 8000 },
    validate: rangeRule,
  },
];

const PatternRulesCard = (props: { rule: PatternRulesCase }) => {
  const { rule } = props;
  const [value, setValue] = useState<PatternValue>(rule.initial);
  return (
    <Box className="pattern-story__card">
      <Field label={rule.label} hint={rule.hint}>
        <DynamicInput pattern={rule.pattern} value={value} onChange={setValue} slots={rule.slots} validate={rule.validate} />
      </Field>
      <Text className="pattern-story__value">{JSON.stringify(value)}</Text>
    </Box>
  );
};

const PatternRulesDemo = () => (
  <Box className="pattern-story__rules">
    {CASES.map((rule) => <PatternRulesCard key={rule.key} rule={rule} />)}
  </Box>
);

export { PatternRulesDemo };
