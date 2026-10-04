/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { FormRow } from '../src/composites/FormRow';
import { focusRowControl } from '../src/composites/FormRow/behavior/focus-row-control';
import { JsonInput } from '../src/primitives/JsonInput';
import { Toggle } from '../src/primitives/Toggle';

const ignore = () => undefined;
const labelOf = (html) => html.match(/<label[^>]*class="[^"]*form-row__label[^"]*"[^>]*>/)?.[0] ?? '';

describe('FormRow name', () => {
  it('is a label for the control, so a click on the name focuses it', () => {
    const html = renderToStaticMarkup(h(FormRow, { label: 'Death Link', id: 'death-link' }, h(JsonInput, { value: {}, onChange: ignore })));
    expect(labelOf(html)).toContain('for="death-link"');
    expect(labelOf(html)).toContain('id="death-link-label"');
    expect(html).toMatch(/<textarea[^>]*id="death-link"/);
  });

  it('points at the switch input, so a click on the name flips it', () => {
    const html = renderToStaticMarkup(h(FormRow, { label: 'Death Link' }, h(Toggle, { checked: false, onChange: ignore })));
    const target = labelOf(html).match(/for="([^"]+)"/)?.[1];
    expect(target).toMatch(/\S/);
    expect(html).toMatch(new RegExp(`<input id="${target}" type="checkbox"[^>]*role="switch"`));
  });

  it('focuses the first stop of a group control, which no label can reach', () => {
    const first = { nodeType: 1, offsetHeight: 20, tabIndex: 0, closest: () => null, getClientRects: () => [{}], focus: vi.fn() };
    const boxOf = (target) => ({ ownerDocument: { getElementById: () => target }, querySelectorAll: () => [first] });
    focusRowControl(boxOf(null), 'balancing');
    expect(first.focus).toHaveBeenCalledTimes(1);
    focusRowControl(boxOf({ labels: [] }), 'balancing');
    expect(first.focus).toHaveBeenCalledTimes(1);
  });
});
