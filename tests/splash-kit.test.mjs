/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

const KIT = fs.readFileSync('splash.css', 'utf8');
const TOKENS = fs.readFileSync('splash-tokens.css', 'utf8');
const PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const defined = new Set([...TOKENS.matchAll(/^\s*(--[\w-]+):/gm)].map((match) => match[1]));
const OWN = new Set(['--value', '--ts-tone', '--ts-tone-dim', '--ts-tone-bright', '--ts-tone-ink', '--look-angle', '--look-dark-from', '--look-dark-to']);
const CLASSES = [
  'ts-splash', 'ts-splash--layer', 'ts-stage', 'ts-mark', 'ts-title', 'ts-status', 'ts-status--danger', 'ts-detail', 'ts-error', 'ts-error__text', 'ts-actions', 'ts-button',
  'ts-button--primary', 'ts-progress', 'ts-progress--edge', 'ts-progress--danger', 'ts-progress--indeterminate', 'ts-version',
];

describe('the static splash kit', () => {
  it('takes every value from splash-tokens.css or its own custom properties', () => {
    const used = [...KIT.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1]);
    expect(used.filter((name) => !defined.has(name) && !OWN.has(name))).toEqual([]);
    expect(KIT).not.toMatch(/#[\da-f]{3,8}\b|rgba?\(|\d+px/i);
  });

  it('has the classes a static splash page needs', () => {
    for (const name of CLASSES) {
      expect(KIT.includes(`.${name} `) || KIT.includes(`.${name}:`) || KIT.includes(`.${name},`)).toBe(true);
    }
  });

  it('ships in the package beside splash-tokens.css', () => {
    expect(PACKAGE.exports['./splash.css']).toBe('./splash.css');
    expect(PACKAGE.files).toContain('splash.css');
  });
});
