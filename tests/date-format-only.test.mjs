/* @layer tooling-scripts @kind test */
import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { formatDate } from '../src/primitives/date-format';
import { valueText } from '../src/primitives/listbox/value-text';

const HOME = 'src/primitives/date-format/';
const ROOTS = ['src', 'stories'];
const DATE_OPTION = String.raw`\b(?:dateStyle|timeStyle|weekday|era|year|month|day|hour|minute|second|hourCycle|hour12|timeZone)\b`;

const DATE_CODE = [
  /\.toLocale(?:Date|Time)String\s*\(/,
  /\bIntl\.(?:DateTimeFormat|RelativeTimeFormat)\b/,
  new RegExp(String.raw`\.toLocaleString\s*\([^)]*${DATE_OPTION}`),
  /\bDate\([^)]*\)\.toLocaleString\s*\(/,
  /\.get(?:UTC)?(?:Hours|Minutes|Seconds)\s*\(/,
];

const sourceFiles = () => ROOTS.flatMap((root) => readdirSync(new URL(`../${root}`, import.meta.url), { recursive: true })
  .map((file) => `${root}/${file.replace(/\\/g, '/')}`)
  .filter((file) => /\.(?:ts|tsx)$/.test(file)));

const ANY_DATE_CODE = /toLocale|Intl\.|\.get(?:UTC)?(?:Hours|Minutes|Seconds)/;

const isDateCode = (line) => DATE_CODE.some((pattern) => pattern.test(line));

const dateLinesOf = (file) => {
  const code = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  if (!ANY_DATE_CODE.test(code)) return [];
  return code.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter(isDateCode).map((line) => `${file}: ${line.trim()}`);
};

const dateCodeIn = (files) => files.flatMap(dateLinesOf);

describe('one way to write a date', () => {
  it('finds the date calls it looks for', () => {
    const lines = [
      'value.toLocaleDateString()', 'at.toLocaleTimeString()', 'new Intl.DateTimeFormat(locale)', 'new Intl.RelativeTimeFormat(locale)',
      "at.toLocaleString(undefined, { month: 'short' })", 'new Date(ms).toLocaleString()', 'at.getHours()',
    ];
    expect(lines.filter((line) => !isDateCode(line) || !ANY_DATE_CODE.test(line))).toEqual([]);
    expect(isDateCode('size.toLocaleString(undefined, { maximumFractionDigits: 1 })')).toBe(false);
  });

  it('keeps every toLocale date call and Intl date formatter inside date-format', () => {
    const files = sourceFiles();
    expect(dateCodeIn(files.filter((file) => file.startsWith(HOME))).length).toBeGreaterThan(0);
    expect(dateCodeIn(files.filter((file) => !file.startsWith(HOME)))).toEqual([]);
  }, 30_000);

  it('writes a Date in a list the way the date format does', () => {
    const at = new Date(2026, 9, 16, 21, 40, 12);
    expect(valueText(at)).toBe(formatDate(at, 'date'));
    expect(valueText([at, 'Saved'])).toBe(`${formatDate(at, 'date')}, Saved`);
  });
});
