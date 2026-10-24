/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../src/primitives/Checkbox';

const draw = (extra) => renderToString(h(Checkbox, { checked: false, onChange: () => undefined, label: 'Show hints', ...extra }));

describe('the tooltip of Checkbox', () => {
  it('draws no tooltip anchor without a tooltip', () => {
    expect(draw()).not.toContain('tooltip-anchor');
  });

  it('wraps the control in a tooltip anchor for a string', () => {
    const html = draw({ tooltip: 'Shows a hint on every tile' });
    expect(html).toContain('tooltip-anchor');
    expect(html.indexOf('tooltip-anchor')).toBeLessThan(html.indexOf('<label'));
  });

  it('wraps the control for the tooltip content shape', () => {
    expect(draw({ tooltip: { description: 'Shows a hint on every tile', shortcut: 'H' } })).toContain('tooltip-anchor');
  });

  it('passes title to the input', () => {
    expect(draw({ title: 'Hints' })).toMatch(/<input[^>]*title="Hints"/);
  });

  it('sets no title unless one is given', () => {
    expect(draw()).not.toContain('title=');
  });
});
