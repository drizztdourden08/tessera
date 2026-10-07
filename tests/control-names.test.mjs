/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { resolveFieldKit } from '../src/composites/field-kits';
import { FormRow } from '../src/composites/FormRow';
import { TagInput } from '../src/composites/TagInput';
import { Toggle } from '../src/primitives/Toggle';

const ignore = () => undefined;
const NAMED = { 'aria-labelledby': 'row-label' };
const tagOf = (html, pattern) => html.match(new RegExp(`<[a-z]+[^>]*${pattern}[^>]*>`))?.[0] ?? '';
const field = (kind, extra = {}) => ({ path: kind, label: `The ${kind}`, kind, optional: false, ...extra });
const editor = (kind, value, extra = {}, props = NAMED) => {
  const { EditorControl } = resolveFieldKit(kind);
  return renderToStaticMarkup(h(EditorControl, { field: field(kind, extra), value, onChange: ignore, ...props }));
};

describe('TagInput', () => {
  it('puts aria-labelledby and aria-label on the text field, the combobox', () => {
    expect(tagOf(renderToStaticMarkup(h(TagInput, { value: [], onChange: ignore, ...NAMED })), 'role="combobox"')).toContain('aria-labelledby="row-label"');
    expect(tagOf(renderToStaticMarkup(h(TagInput, { value: [], onChange: ignore, 'aria-label': 'Games' })), 'role="combobox"')).toContain('aria-label="Games"');
  });

  it('takes the id and notes of a FormRow, so the row name is its label', () => {
    const html = renderToStaticMarkup(h(FormRow, { label: 'Games', id: 'games', description: 'The games of the session.' }, h(TagInput, { value: [], onChange: ignore })));
    const entry = tagOf(html, 'role="combobox"');
    expect(entry).toContain('id="games"');
    expect(entry).toContain('aria-describedby="games-description"');
    expect(html).toContain('for="games"');
  });
});

describe('Toggle', () => {
  it('puts aria-labelledby on the switch input in place of aria-label', () => {
    const entry = tagOf(renderToStaticMarkup(h(Toggle, { checked: true, onChange: ignore, 'aria-label': 'Music', ...NAMED })), 'role="switch"');
    expect(entry).toContain('aria-labelledby="row-label"');
    expect(entry).not.toContain('aria-label=');
  });

  it('keeps its own label first', () => {
    const entry = tagOf(renderToStaticMarkup(h(Toggle, { checked: true, onChange: ignore, label: 'Music', ...NAMED })), 'role="switch"');
    expect(entry).not.toContain('aria-labelledby');
  });
});

describe('field kit editors', () => {
  it('put the name on the input of a string, number, boolean or reference', () => {
    expect(tagOf(editor('string', 'Bram'), 'value="Bram"')).toContain('aria-labelledby="row-label"');
    expect(tagOf(editor('number', 42), 'value="42"')).toContain('aria-labelledby="row-label"');
    expect(tagOf(editor('boolean', true), 'role="switch"')).toContain('aria-labelledby="row-label"');
    expect(tagOf(editor('idRef', 'slot-4'), 'value="slot-4"')).toContain('aria-labelledby="row-label"');
  });

  it('name a boolean switch by its field label when nothing else names it', () => {
    expect(tagOf(editor('boolean', true, {}, {}), 'role="switch"')).toContain('aria-label="The boolean"');
  });

  it('put the name on the radio group or the select of an enum', () => {
    expect(tagOf(editor('enum', 'idle', { options: ['idle', 'playing'], closed: true }), 'role="radiogroup"')).toContain('aria-labelledby="row-label"');
    const many = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
    expect(tagOf(editor('enum', 'a', { options: many, closed: true }), 'role="combobox"')).toContain('aria-labelledby="row-label"');
    const tags = ['a', 'b', 'c', 'd', 'e'];
    expect(tagOf(editor('enum', 'a', { options: tags, closed: true }, { 'aria-label': 'Mode' }), 'role="radiogroup"')).toContain('aria-label="Mode"');
  });

  it('put the name on the select of a reference with options', () => {
    const { EditorControl } = resolveFieldKit('idRef');
    const html = renderToStaticMarkup(h(EditorControl, {
      field: field('idRef', { targetKind: 'slot' }), value: 'slot-4', onChange: ignore, ...NAMED,
      resolveIdRefOptions: () => [{ value: 'slot-4', label: 'Bram' }],
    }));
    expect(tagOf(html, 'role="combobox"')).toContain('aria-labelledby="row-label"');
  });
});
