/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FormGroupTabs } from '../src/composites/FormGroupTabs';
import { FormRow } from '../src/composites/FormRow';
import { KeyValueEditor } from '../src/composites/KeyValueEditor';
import { newEntry } from '../src/composites/KeyValueEditor/behavior/new-entry';
import { rowsProblem } from '../src/composites/KeyValueEditor/behavior/rows-problem';
import { JsonInput } from '../src/primitives/JsonInput';
import { checkJson } from '../src/primitives/JsonInput/behavior/check-json';
import { jsonProblem } from '../src/primitives/JsonInput/behavior/json-problem';
import { scanJson } from '../src/primitives/JsonInput/behavior/scan-json';
import { NamedRange } from '../src/primitives/NamedRange';
import { SetPicker } from '../src/primitives/SetPicker';
import { toggleIn } from '../src/primitives/SetPicker/behavior/toggle-in';
import { TESSERA_STRINGS } from '../src/primitives/strings';
import { TextInput } from '../src/primitives/TextInput';

const BROKEN = '{\n  "uncle_leaving_text": "Have fun, Bram"\n  "ganon_phase_3_alt": "Got wax in your ears?"\n}';
const SAMPLES = [
  '{}', '[]', '0', '-0.5e+3', 'true', 'null', '"a\\u00e9\\n"', '{"a": [1, 2, {"b": null}]}', ' [ "x" , false ] ',
  '', '{', '[1,]', '{"a":1,}', '{"a" 1}', '{a: 1}', '01', '1.', '.5', '"abc', '"a\\x"', 'tru', '[1 2]', '{"a":1} x', '"tab\there"',
];

const parses = (text) => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

describe('JsonInput checks', () => {
  it('agrees with JSON.parse on what is valid', () => {
    SAMPLES.forEach((text) => expect([text, scanJson(text) === null]).toEqual([text, parses(text)]));
  });

  it('names each problem and where it is', () => {
    expect(scanJson(BROKEN)).toEqual({ at: 42, reason: 'objectNext' });
    expect(scanJson('{"a":1,}')).toEqual({ at: 6, reason: 'trailingComma' });
    expect(scanJson('[1 2]')).toEqual({ at: 2, reason: 'arrayNext' });
    expect(scanJson('{"a" 1}')).toEqual({ at: 5, reason: 'colon' });
    expect(scanJson('{a: 1}')).toEqual({ at: 1, reason: 'key' });
    expect(scanJson('{"a": "b\n}')).toEqual({ at: 6, reason: 'unclosed' });
    expect(scanJson('  ')).toEqual({ at: 0, reason: 'empty' });
    expect(scanJson('1 2')).toEqual({ at: 2, reason: 'extra' });
  });

  it('gives the line and column and checks the shape', () => {
    const problem = jsonProblem(BROKEN, scanJson(BROKEN), TESSERA_STRINGS);
    expect(problem).toMatchObject({ line: 2, column: 41 });
    expect(problem.message).toBe("Expected ',' or '}' after the value on line 2, column 41.");
    expect(checkJson('[1]', 'object').fault).toEqual({ at: 0, reason: 'wantObject' });
    expect(checkJson(' {"a": 1}', 'array').fault).toEqual({ at: 1, reason: 'wantArray' });
    expect(checkJson('{"a": 1}', 'object')).toEqual({ value: { a: 1 }, fault: null });
  });

  it('draws the code, the summary and Format, and marks the line of a problem', () => {
    const valid = renderToString(h(JsonInput, { value: { a: 1, b: 2 }, onChange: () => {} }));
    expect(valid).toContain('Valid JSON object, 2 keys');
    expect(valid).toContain('code-block');
    expect(valid).not.toContain('aria-invalid');
    const broken = renderToString(h(JsonInput, { value: {}, onChange: () => {}, defaultText: BROKEN }));
    expect(broken).toContain('aria-invalid="true"');
    expect(broken).toContain('on line 2, column 41.');
    expect(broken.match(/code-block__line code-block__line--changed/g)).toHaveLength(1);
    expect(broken).toMatch(/<button[^>]*disabled=""[^>]*>.*Format/);
  });
});

describe('KeyValueEditor', () => {
  const row = (id, key, value = 1) => ({ id, key, value });

  it('finds empty names, names listed twice and names not on the list', () => {
    expect(rowsProblem([row('a', 'Bombs'), row('b', ' Bombs ')], undefined, TESSERA_STRINGS)).toEqual({ rows: new Set(['a', 'b']), message: 'Bombs is listed twice.' });
    expect(rowsProblem([row('a', '')], undefined, TESSERA_STRINGS).message).toBe('Every row needs a name.');
    expect(rowsProblem([row('a', 'Lamp')], ['Bombs'], TESSERA_STRINGS)).toEqual({ rows: new Set(['a']), message: 'Lamp is not on the list.' });
    expect(rowsProblem([row('a', 'Bombs')], ['Bombs'], TESSERA_STRINGS).message).toBeNull();
  });

  it('starts a new row at a value that fits its kind', () => {
    expect(newEntry({ value: {}, onChange: () => {} })).toBe(1);
    expect(newEntry({ value: {}, onChange: () => {}, valueKind: 'number', min: 3 })).toBe(3);
    expect(newEntry({ value: {}, onChange: () => {}, valueKind: 'select', options: ['eu', 'us'] })).toBe('eu');
    expect(newEntry({ value: {}, onChange: () => {}, valueKind: 'text' })).toBe('');
  });

  it('draws a row per name with its value and Remove, then the add row', () => {
    const html = renderToString(h(KeyValueEditor, { value: { 'Moon Pearl': 1, Hookshot: 2 }, onChange: () => {}, keys: ['Moon Pearl', 'Hookshot', 'Lamp'] }));
    expect(html.match(/class="key-value-editor__row"/g)).toHaveLength(2);
    expect(html).toContain('aria-label="Remove Hookshot"');
    expect(html).toContain('aria-label="Value of Moon Pearl"');
    expect(html).toContain('Add an item: type to search 3 items');
  });
});

describe('NamedRange and SetPicker', () => {
  const names = [{ label: 'Normal', value: 50 }];

  it('opens Custom with a stepper for a value with no name', () => {
    const custom = renderToString(h(NamedRange, { value: 65, onChange: () => {}, names, min: 0, max: 99 }));
    expect(custom).toContain('Normal (50)');
    expect(custom).toContain('0 to 99');
    expect(custom).toContain('aria-label="Custom value"');
    expect(renderToString(h(NamedRange, { value: 50, onChange: () => {}, names, min: 0, max: 99 }))).not.toContain('Custom value');
  });

  it('keeps the order of the options and draws the chosen ones as tags', () => {
    expect(toggleIn(['a', 'b', 'c'], ['c'], 'a', true)).toEqual(['a', 'c']);
    expect(toggleIn(['a', 'b', 'c'], ['a', 'c'], 'a', false)).toEqual(['c']);
    const html = renderToString(h(SetPicker, { options: ['Lamp', 'Hookshot'], value: ['Hookshot'], onChange: () => {} }));
    expect(html).toContain('aria-label="Remove Hookshot"');
    expect(html).toContain('placeholder="Search 2 items"');
  });
});

describe('FormRow and FormGroupTabs', () => {
  it('names its control, marks a change and holds the reset until something changed', () => {
    const html = renderToString(h(FormRow, { label: 'Player Name', description: 'The name others see.', id: 'name', onReset: () => {} }, h(TextInput, {})));
    expect(html).toContain('id="name"');
    expect(html).toContain('aria-describedby="name-description"');
    expect(html).toMatch(/aria-label="Reset Player Name"[^>]*disabled=""|disabled=""[^>]*aria-label="Reset Player Name"/);
    const changed = renderToString(h(FormRow, { label: 'Player Name', changed: true, advanced: true, problem: 'Too long.', onReset: () => {} }, h(TextInput, {})));
    expect(changed).toContain('>changed<');
    expect(changed).toContain('>advanced<');
    expect(changed).toMatch(/role="alert"[^>]*>Too long\./);
    expect(changed).toContain('aria-invalid="true"');
  });

  it('writes the changed count in each tab and the advanced switch with its count', () => {
    const html = renderToString(h(FormGroupTabs, {
      tabs: [{ id: 'a', label: 'Game Options', count: 41, changed: 3 }, { id: 'b', label: 'Dungeon Items', count: 6 }],
      activeTab: 'a', onTabChange: () => {}, onQueryChange: () => {}, onAdvancedChange: () => {}, advancedCount: 9,
    }));
    expect(html).toContain('Game Options · 3 changed');
    expect(html).toContain('Dungeon Items');
    expect(html).toContain('Show advanced (9)');
    expect(html).toContain('placeholder="Search options"');
  });
});
