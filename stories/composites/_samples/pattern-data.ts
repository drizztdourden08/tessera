/* @layer stories @kind data */
import walletIcon from '@iconify-icons/lucide/wallet';
import dicesIcon from '@iconify-icons/lucide/dices';
import type { PatternChoice, PatternIcons, PatternLists, PatternSlotConfigs, PatternValue } from '../../../src/composites';

interface PatternExample {
  key: string;
  label: string;
  hint?: string;
  pattern: string;
  initial: PatternValue;
  slots?: PatternSlotConfigs;
  counter?: string;
  actions?: readonly string[];
}

const COUNTRIES: readonly PatternChoice[] = [
  { value: 'IE', label: 'Ireland', flag: 'IE', dial: '+353', detail: '+353' },
  { value: 'CA', label: 'Canada', flag: 'CA', dial: '+1', detail: '+1' },
  { value: 'US', label: 'United States', flag: 'US', dial: '+1', detail: '+1' },
  { value: 'GB', label: 'United Kingdom', flag: 'GB', dial: '+44', detail: '+44' },
  { value: 'FR', label: 'France', flag: 'FR', dial: '+33', detail: '+33' },
  { value: 'DE', label: 'Germany', flag: 'DE', dial: '+49', detail: '+49' },
  { value: 'JP', label: 'Japan', flag: 'JP', dial: '+81', detail: '+81' },
  { value: 'BR', label: 'Brazil', flag: 'BR', dial: '+55', detail: '+55' },
  { value: 'AU', label: 'Australia', flag: 'AU', dial: '+61', detail: '+61' },
  { value: 'IN', label: 'India', flag: 'IN', dial: '+91', detail: '+91' },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTHS: readonly PatternChoice[] = MONTH_NAMES.map((label) => ({ value: label.slice(0, 3), label, short: label.slice(0, 3) }));

const PATTERN_LISTS: PatternLists = { countries: COUNTRIES, months: MONTHS };

const PATTERN_ICONS: PatternIcons = { wallet: walletIcon, dices: dicesIcon };

const PATTERN_EXAMPLES: readonly PatternExample[] = [
  {
    key: 'Position', label: 'Spawn point', hint: 'Pixels from the top left of a 1920 by 1080 screen.',
    pattern: '[icon:move] X {x:number 0..1920 "X position"}   Y {y:number 0..1080 "Y position"}', initial: { x: 960, y: 540 },
  },
  {
    key: 'Time', label: 'Delivery time', pattern: '[icon:clock] {hh:hour 12h}:{mm:minute step5} {ampm:choice AM|PM muted "AM or PM"}',
    initial: { hh: 12, mm: 30, ampm: 'AM' },
  },
  {
    key: 'Phone', label: 'Phone number',
    pattern: '{country:choice @countries flag "Country"} {=country.dial} {phone:text digits max10 "Phone number"}',
    initial: { country: 'IE', phone: '12345' }, slots: { phone: { placeholder: '123 4567' } },
  },
  {
    key: 'Money', label: 'Wallet balance', pattern: '[icon:wallet] {amount:decimal 2 group "Amount"} [spacer] {currency:choice USD|EUR|CAD "Currency"}',
    initial: { amount: 18742.05, currency: 'USD' },
  },
  {
    key: 'Comment', label: 'Comment below', pattern: '{comment:text max100 fill "Comment"} [action:send]',
    initial: { comment: 'Lovely run, well played.' }, counter: 'comment', actions: ['send'], slots: { comment: { placeholder: 'Say something nice' } },
  },
  {
    key: 'Date', label: 'Release date',
    pattern: '[icon:calendar] {day:number 1..31 pad2 stepper "Day"} {month:choice @months "Month"} {year:number 1985..2099 "Year"}',
    initial: { day: 21, month: 'Nov', year: 1991 },
  },
  {
    key: 'Duration', label: 'Speedrun split', pattern: '{h:number 0..99 stepper "Hours"}h {m:minute "Minutes"}m {s:number 0..59 pad2 wrap "Seconds"}s',
    initial: { h: 1, m: 42, s: 7 },
  },
  {
    key: 'Address', label: 'Server address',
    pattern: '[icon:server] {a:number 0..255 "First part"}.{b:number 0..255 "Second part"}.{c:number 0..255 "Third part"}.{d:number 0..255 "Fourth part"}:{port:number 1..65535 stepper "Port"}',
    initial: { a: 192, b: 168, c: 0, d: 12, port: 55355 },
  },
  {
    key: 'Size', label: 'Window size', pattern: '[icon:monitor] {w:number 320..7680 "Width"} × {h:number 240..4320 "Height"} px',
    initial: { w: 1280, h: 720 },
  },
  {
    key: 'Colour', label: 'Team colour', pattern: '[icon:palette] {kit:hex "Team colour"} [spacer] {team:choice Red|Blue|Green|Gold muted "Team"}',
    initial: { kit: '#e05a47', team: 'Red' },
  },
];

const PLAYGROUND_PATTERN = 'Seed {seed:text len8 alnum upper "Seed"} [spacer] [action:reroll]';

export { PATTERN_EXAMPLES, PATTERN_ICONS, PATTERN_LISTS, PLAYGROUND_PATTERN };
export type { PatternExample };
