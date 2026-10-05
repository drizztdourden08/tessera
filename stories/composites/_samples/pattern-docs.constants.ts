/* @layer stories @kind data */
import type { PatternDocRow } from './PatternDocTable';

const SYNTAX_ROWS: readonly PatternDocRow[] = [
  { key: 'Text', cells: ['Any text', 'Shown as written, in the muted colour. Spaces count, so "X  Y" keeps both spaces.'] },
  { key: 'Slot', cells: ['{name:type args}', 'A place the user fills. The name keys the value, the type says what it takes, and the args, split by spaces, tune it.'] },
  { key: 'Label', cells: ['{x:number "Left edge"}', 'A quoted arg is the name a screen reader gives the slot. Without one, the slot is called by its name, or Hour and Minute for those types.'] },
  { key: 'Echo', cells: ['{=slot}', 'Repeats the shown value of another slot as muted text.'] },
  { key: 'Echo field', cells: ['{=country.dial}', 'Repeats one field of the chosen option, such as the dial code of a country.'] },
  { key: 'Icon', cells: ['[icon:clock]', 'A Tessera icon, or an entry of the icons prop for any other icon.'] },
  { key: 'Action', cells: ['[action:send]', 'An icon button from the actions prop. Pressing it hands the whole value to onPress.'] },
  { key: 'Spacer', cells: ['[spacer]', 'Takes the free width, so whatever follows sits at the far end.'] },
  { key: 'Escape', cells: ['\\{  \\}  \\[  \\]  \\\\', 'A plain brace, bracket or backslash. escapePatternText does this for text that comes from data.'] },
];

const TYPE_ROWS: readonly PatternDocRow[] = [
  { key: 'number', cells: ['{x:number 0..1920}', 'A whole number', 'Digits, and a minus when the range allows it. Moves on once no further digit fits.', 'A Slider when both ends are set, else a NumberInput with its buttons on the sides.'] },
  { key: 'decimal', cells: ['{amount:decimal 2 group}', 'A number', 'Digits and one dot. Moves on once the decimals are typed. The decimals show muted.', 'A Slider when both ends are set, else a NumberInput.'] },
  { key: 'hour', cells: ['{hh:hour 12h}', '0 to 23, or 1 to 12', 'Two digits that wrap at the ends.', 'An hour and a minute NumberInput.'] },
  { key: 'minute', cells: ['{mm:minute step5}', '0 to 59', 'Two digits that wrap at the ends.', 'An hour and a minute NumberInput.'] },
  { key: 'choice', cells: ['{ampm:choice AM|PM}', 'The value of an option', 'Letters jump to the matching option, and a single match moves on.', 'The option list, with flags and details when the options have them.'] },
  { key: 'text', cells: ['{comment:text max100}', 'A string', 'Any characters, or only digits, letters or both. Moves on at lenN.', 'None.'] },
  { key: 'hex', cells: ['{color:hex}', 'A colour such as #e05a47', 'Six hex digits. Three digits grow to six when the slot is left.', 'A ColorPicker.'] },
];

const ARG_ROWS: readonly PatternDocRow[] = [
  { key: 'Range', cells: ['MIN..MAX', 'number, decimal', 'The range. Either end can stay open: 0.. or ..100.'] },
  { key: 'Padding', cells: ['padN', 'number', 'Zero pads to N digits, and N digits complete the slot.'] },
  { key: 'Step', cells: ['stepN', 'number, decimal, hour, minute', 'The step of the arrow keys and of the popover.'] },
  { key: 'Grouping', cells: ['group', 'number, decimal', 'Thousands separators while the slot is not being edited.'] },
  { key: 'Wrap', cells: ['wrap', 'number', 'Stepping past one end goes to the other.'] },
  { key: 'Control', cells: ['slider, stepper', 'number, decimal', 'Picks the popover control. A slider needs both ends of the range.'] },
  { key: 'Decimals', cells: ['N', 'decimal', 'The count of decimals, 2 when left out.'] },
  { key: 'Clock', cells: ['12h, 24h', 'hour', 'The clock, 24h when left out.'] },
  { key: 'Options', cells: ['A|B|C', 'choice', 'The options, written inline. Use a list for options with spaces, flags or details.'] },
  { key: 'List', cells: ['@name', 'choice', 'The options in lists.name.'] },
  { key: 'Flag', cells: ['flag', 'choice', 'Shows only the flag of the chosen option.'] },
  { key: 'Length', cells: ['maxN, minN, lenN', 'text', 'The most, the fewest, or exactly N characters.'] },
  { key: 'Characters', cells: ['digits, letters, alnum', 'text', 'The characters the slot takes.'] },
  { key: 'Case', cells: ['upper, lower', 'text', 'Changes the case while typing.'] },
  { key: 'Fill', cells: ['fill', 'text', 'Takes the free width.'] },
  { key: 'Muted', cells: ['muted', 'every type', 'Draws the value in the muted colour, like the AM of a time.'] },
  { key: 'Label', cells: ['"Label"', 'every type', 'The accessible name of the slot.'] },
];

const PROP_ROWS: readonly PatternDocRow[] = [
  { key: 'pattern', cells: ['string', 'What the field shows and asks for.'] },
  { key: 'value', cells: ['{ [slot]: number | string | null }', 'The whole field as one object. An empty slot is null.'] },
  { key: 'onChange', cells: ['(next) => void', 'Gets the whole object each time a slot holds a new valid value.'] },
  { key: 'slots', cells: ['{ [slot]: { label, placeholder } }', 'Per slot wording, so app strings can be translated. It wins over the pattern label.'] },
  { key: 'lists', cells: ['{ [list]: PatternChoice[] }', 'Options for @list: value, label, short, flag (a region code), detail and any field an echo reads.'] },
  { key: 'actions', cells: ['{ [name]: { label, icon, disabled, onPress } }', 'The buttons of [action:name].'] },
  { key: 'icons', cells: ['{ [name]: IconifyIcon }', 'Icons for [icon:name] beyond the Tessera set.'] },
  { key: 'counter', cells: ['slot name', 'Shows "12 / 100" under the field for a text slot with maxN or lenN.'] },
  { key: 'size', cells: ['md | sm', 'The control height. Inside a Field it follows the Field.'] },
];

export { ARG_ROWS, PROP_ROWS, SYNTAX_ROWS, TYPE_ROWS };
