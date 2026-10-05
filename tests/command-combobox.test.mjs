/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CommandInput } from '../src/composites/CommandInput';
import { Combobox } from '../src/primitives/Combobox';

const noSubmit = () => undefined;

const GAMES = ['Tetris', 'Dr. Mario'];

describe('CommandInput draws its field with Combobox', () => {
  it('is a Combobox field in the mono class, with the prompt mark and no chevron', () => {
    const html = renderToString(h(CommandInput, { onSubmit: noSubmit, commands: ['/save'], value: '/sa' }));
    expect(html).toContain('class="combobox listbox-anchor control-size--md command-input__field"');
    expect(html).toContain('class="input-adornment combobox__start"');
    expect(html).toContain('value="/sa"');
    expect(html).not.toContain('combobox__chevron');
    expect(html).not.toContain('text-input');
  });

  it('passes size, disabled and invalid on to the field', () => {
    const html = renderToString(h(CommandInput, { onSubmit: noSubmit, size: 'sm', disabled: true, invalid: true }));
    expect(html).toContain('control-size--sm');
    expect(html).toContain('combobox--disabled');
    expect(html).toContain('aria-invalid="true"');
  });

  it('joins its own description with the key hints', () => {
    const html = renderToString(h(CommandInput, { onSubmit: noSubmit, 'aria-describedby': 'room-note' }));
    const id = /<span id="([^"]+)" class="command-input__keys">/.exec(html)[1];
    expect(html).toContain(`aria-describedby="room-note ${id}"`);
  });
});

describe('Combobox freeText', () => {
  it('shows the text the app holds, with no chevron and no search placeholder', () => {
    const html = renderToString(h(Combobox, { items: GAMES, freeText: true, query: 'Tet', 'aria-label': 'Game' }));
    expect(html).toContain('value="Tet"');
    expect(html).toContain('spellCheck="false"');
    expect(html).not.toContain('combobox__chevron');
    expect(html).not.toContain('placeholder=');
  });

  it('draws a start mark before the input', () => {
    const html = renderToString(h(Combobox, { items: GAMES, start: { icon: 'search' }, 'aria-label': 'Game' }));
    expect(html.indexOf('combobox__start')).toBeLessThan(html.indexOf('combobox__input'));
  });

  it('leaves a Combobox that picks from its list as it was', () => {
    const html = renderToString(h(Combobox, { items: GAMES, value: 'Tetris', 'aria-label': 'Game' }));
    expect(html).toContain('combobox__chevron');
    expect(html).toContain('value="Tetris"');
    expect(html).toContain('placeholder="Type to search..."');
    expect(html).not.toContain('spellCheck');
  });
});
