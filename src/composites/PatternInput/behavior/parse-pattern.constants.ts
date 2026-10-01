/* @layer renderer-components @kind data */
import type { PatternSlotType } from './parse-pattern.type';
import type { SlotArg, SlotArgKey } from './slot-arg.type';

const SLOT_TYPES: readonly PatternSlotType[] = ['number', 'decimal', 'hour', 'minute', 'choice', 'text', 'hex'];

const SLOT_NAME = /^[A-Za-z_]\w*$/;

const ARG_SPACE = /\s/;

const RANGE_ARG = /^(-?\d+(?:\.\d+)?)?\.\.(-?\d+(?:\.\d+)?)?$/;

const WHOLE_ARG = /^(pad|max|min|len)(\d+)$/;

const STEP_ARG = /^step(\d+(?:\.\d+)?)$/;

const PLACES_ARG = /^\d+$/;

const LIST_ARG = /^@([A-Za-z_]\w*)$/;

const ECHO_BODY = /^=([A-Za-z_]\w*)(?:\.([A-Za-z_]\w*))?$/;

const BRACKET_BODY = /^(icon|action):([A-Za-z_][\w-]*)$/;

const SPACER = 'spacer';

const CHOICE_SEPARATOR = '|';

const ARG_KEYS: Readonly<Record<PatternSlotType, readonly SlotArgKey[]>> = {
  number: ['range', 'pad', 'step', 'group', 'wrap', 'control', 'muted', 'label'],
  decimal: ['places', 'range', 'step', 'group', 'control', 'muted', 'label'],
  hour: ['clock', 'step', 'muted', 'label'],
  minute: ['step', 'muted', 'label'],
  choice: ['choices', 'list', 'flag', 'muted', 'label'],
  text: ['max', 'min', 'len', 'chars', 'case', 'fill', 'muted', 'label'],
  hex: ['muted', 'label'],
};

const ARG_FORMS: Readonly<Record<SlotArgKey, string>> = {
  label: '"Label"',
  list: '@list',
  choices: 'A|B|C',
  range: 'MIN..MAX',
  pad: 'padN',
  step: 'stepN',
  max: 'maxN',
  min: 'minN',
  len: 'lenN',
  places: 'a count of decimals',
  clock: '12h or 24h',
  group: 'group',
  wrap: 'wrap',
  control: 'slider or stepper',
  muted: 'muted',
  flag: 'flag',
  fill: 'fill',
  chars: 'digits, letters or alnum',
  case: 'upper or lower',
};

const WORD_ARGS: ReadonlyMap<string, SlotArg> = new Map<string, SlotArg>([
  ['group', { key: 'group', patch: { group: true } }],
  ['wrap', { key: 'wrap', patch: { wrap: true } }],
  ['slider', { key: 'control', patch: { control: 'slider' } }],
  ['stepper', { key: 'control', patch: { control: 'stepper' } }],
  ['muted', { key: 'muted', patch: { muted: true } }],
  ['flag', { key: 'flag', patch: { flag: true } }],
  ['fill', { key: 'fill', patch: { fill: true } }],
  ['digits', { key: 'chars', patch: { chars: 'digits' } }],
  ['letters', { key: 'chars', patch: { chars: 'letters' } }],
  ['alnum', { key: 'chars', patch: { chars: 'alnum' } }],
  ['upper', { key: 'case', patch: { letterCase: 'upper' } }],
  ['lower', { key: 'case', patch: { letterCase: 'lower' } }],
  ['12h', { key: 'clock', patch: { clock: 12 } }],
  ['24h', { key: 'clock', patch: { clock: 24 } }],
]);

const WHOLE_ARGS: Readonly<Record<string, (count: number) => SlotArg>> = {
  pad: (count) => ({ key: 'pad', patch: { pad: count } }),
  max: (count) => ({ key: 'max', patch: { maxLength: count } }),
  min: (count) => ({ key: 'min', patch: { minLength: count } }),
  len: (count) => ({ key: 'len', patch: { length: count } }),
};

export {
  ARG_FORMS, ARG_KEYS, ARG_SPACE, BRACKET_BODY, CHOICE_SEPARATOR, ECHO_BODY, LIST_ARG, PLACES_ARG, RANGE_ARG, SLOT_NAME,
  SLOT_TYPES, SPACER, STEP_ARG, WHOLE_ARG, WHOLE_ARGS, WORD_ARGS,
};
