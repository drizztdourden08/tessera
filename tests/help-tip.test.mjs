/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FormRow } from '../src/composites/FormRow';
import { Checkbox } from '../src/primitives/Checkbox';
import { Field } from '../src/primitives/Field';
import { Toggle } from '../src/primitives/Toggle';

const noop = () => undefined;
const HELP = 'Counts every rupee you pick up, shops included.';
const MARK = '<span class="tooltip-anchor help-tip"><span role="button" tabindex="0" aria-label="Help" class="help-tip__mark">';

const PARTS = [
  ['Field', h(Field, { label: 'Rupee goal', help: HELP }, h('input'))],
  ['FormRow', h(FormRow, { label: 'Rupee goal', help: HELP }, h('input'))],
  ['Checkbox', h(Checkbox, { label: 'Count shops', help: HELP, checked: false, onChange: noop })],
  ['Toggle', h(Toggle, { label: 'Count shops', help: HELP, checked: false, onChange: noop })],
];

describe('a help mark beside a label', () => {
  it.each(PARTS)('%s draws one circled question mark as one Tab stop and keeps the text off the page', (_part, node) => {
    const html = renderToString(node);
    expect(html).toContain(MARK);
    expect(html.match(/tabindex="0"/g)).toHaveLength(1);
    expect(html).toContain('<svg');
    expect(html).not.toContain(HELP);
  });

  it('sits after the label text, so the label still names the control', () => {
    const field = renderToString(PARTS[0][1]);
    expect(field).toMatch(/<span class="field__head"><label id="[^"]+" class="field__label" for="[^"]+">Rupee goal<\/label><span class="tooltip-anchor help-tip">/);
    const toggle = renderToString(PARTS[3][1]);
    expect(toggle).toMatch(/<span class="toggle__head"><span class="[^"]*toggle__label" id="[^"]+">Count shops<\/span><span class="tooltip-anchor help-tip">/);
    expect(toggle).toContain(`aria-labelledby="${toggle.match(/toggle__label" id="([^"]+)"/)[1]}"`);
    const box = renderToString(PARTS[2][1]);
    expect(box).toContain(`aria-labelledby="${box.match(/checkbox__label" id="([^"]+)"/)[1]}"`);
  });

  it('leaves every part as it was without help', () => {
    expect(renderToString(h(Field, { label: 'Rupee goal' }, h('input')))).not.toContain('field__head');
    expect(renderToString(h(Toggle, { label: 'Count shops', checked: false, onChange: noop }))).not.toContain('toggle__head');
    [h(Checkbox, { label: 'Count shops', checked: false, onChange: noop }), h(FormRow, { label: 'Rupee goal' }, h('input'))]
      .forEach((node) => expect(renderToString(node)).not.toContain('help-tip'));
  });
});
