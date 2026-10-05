/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CodeBlock } from '../src/composites/CodeBlock';
import { FormGroupTabs } from '../src/composites/FormGroupTabs';
import { FormRow } from '../src/composites/FormRow';
import { KeyValueEditor } from '../src/composites/KeyValueEditor';
import { newEntry } from '../src/composites/KeyValueEditor/behavior/new-entry';
import { rowsOf } from '../src/composites/KeyValueEditor/behavior/rows-of';
import { rowsProblem } from '../src/composites/KeyValueEditor/behavior/rows-problem';
import { TESSERA_STRINGS } from '../src/primitives/strings';
import { TextInput } from '../src/primitives/TextInput';

const BROKEN = '{\n  "uncle_leaving_text": "Have fun, Bram"\n  "ganon_phase_3_alt": "Got wax in your ears?"\n}';
const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const ignore = () => {};

describe('CodeBlock editable', () => {
  it('types over the highlighting in a textarea that holds the text', () => {
    const html = renderToString(h(CodeBlock, { editable: true, language: 'json', value: '{"a": 1}', onChange: ignore, 'aria-label': 'Plando texts' }));
    expect(html).toMatch(/<textarea[^>]*aria-label="Plando texts"/);
    expect(html).toContain('{&quot;a&quot;: 1}</textarea>');
    expect(html).toContain('code-block__line');
    expect(html).not.toContain('aria-invalid');
    expect(html).not.toContain('data-invalid');
  });

  it('marks the field and tints the problem line the app found', () => {
    const html = renderToString(h(CodeBlock, { editable: true, language: 'json', value: BROKEN, onChange: ignore, invalid: true, problemLine: 3 }));
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('data-invalid="true"');
    const lines = html.match(/class="code-block__line[^"]*"/g);
    expect(lines).toHaveLength(4);
    expect(lines.map((line) => line.includes('--changed'))).toEqual([false, false, true, false]);
  });

  it('keeps an empty last line, so the field grows as soon as Enter is pressed', () => {
    const html = renderToString(h(CodeBlock, { editable: true, language: 'text', value: 'one\n', onChange: ignore }));
    expect(html.match(/class="code-block__line[^"]*"/g)).toHaveLength(2);
  });

  it('works for any language and keeps the plain block as it was', () => {
    expect(renderToString(h(CodeBlock, { editable: true, language: 'typescript', value: 'const a = 1;', onChange: ignore }))).toContain('<textarea');
    expect(renderToString(h(CodeBlock, { code: 'const a = 1;', language: 'typescript' }))).not.toContain('<textarea');
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

  it('keeps the row of each name when the value comes back reordered, so a name being typed keeps its field', () => {
    const before = [{ id: 'a', key: 'region', value: 'eu' }, { id: 'b', key: 'mode', value: 'race' }];
    expect(rowsOf({ mode: 'race', region: 'eu' }, 'x', before).map((row) => row.id)).toEqual(['b', 'a']);
    expect(rowsOf({ server: 'eu', mode: 'race' }, 'x', before).map((row) => row.id)).toEqual(['a', 'b']);
    expect(rowsOf({ mode: 'coop', lang: 'fr', extra: 1 }, 'x', before).map((row) => row.id)).toEqual(['b', 'x-1', 'x-2']);
  });

  it('gives the name its own column, as wide as a text or select value and wider than a count', () => {
    const sheet = css('src/composites/KeyValueEditor/KeyValueEditor.css');
    expect(sheet).toMatch(/\.key-value-editor__row \{[^}]*display: grid;[^}]*grid-template-columns: minmax\(0, 1fr\) auto auto;/);
    expect(sheet).toMatch(/\.key-value-editor--text \.key-value-editor__row,\s*\.key-value-editor--select \.key-value-editor__row \{\s*grid-template-columns: minmax\(0, 1fr\) minmax\(0, 1fr\) auto;/);
    expect(sheet).not.toMatch(/\.key-value-editor__key \{[^}]*flex/);
    ['count', 'number', 'text', 'select'].forEach((valueKind) => {
      const html = renderToString(h(KeyValueEditor, { value: { region: 'eu' }, onChange: ignore, valueKind, options: ['eu'] }));
      expect(html).toContain(`key-value-editor--${valueKind}`);
      expect(html).toMatch(/class="key-value-editor__row"[^>]*><input[^>]*class="text-input[^"]*key-value-editor__key"[^>]*value="region"/);
    });
  });

  it('draws a row per name with its value and Remove, then the add row', () => {
    const html = renderToString(h(KeyValueEditor, { value: { 'Moon Pearl': 1, Hookshot: 2 }, onChange: () => {}, keys: ['Moon Pearl', 'Hookshot', 'Lamp'] }));
    expect(html.match(/class="key-value-editor__row"/g)).toHaveLength(2);
    expect(html).toContain('aria-label="Remove Hookshot"');
    expect(html).toContain('aria-label="Value of Moon Pearl"');
    expect(html).toContain('Add an item: type to search 3 items');
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
