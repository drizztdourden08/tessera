/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Stepper } from '../src/primitives/Stepper';

const draw = (props) => renderToString(h(Stepper, props));

describe('Stepper step name', () => {
  it('equals the visible text of the step, the digit first', () => {
    const steps = [{ id: 'a', label: 'Account', summary: 'Name and email' }, { id: 'b', label: 'Plan' }];
    const out = draw({ steps, currentId: 'a', onSelect: () => {} });
    const pairs = [...out.matchAll(/<button[^>]*aria-label="([^"]*)"[^>]*>(.*?)<\/button>/g)];
    expect(pairs).toHaveLength(2);
    pairs.forEach(([, name, inner]) => {
      const shown = inner.replace(/<!--.*?-->/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      expect(name).toBe(shown);
      expect(name).toMatch(/^\d /);
    });
  });

  it('separates the digit, the label and the summary with real spaces in the text', () => {
    const out = draw({ steps: [{ id: 'a', label: 'Account', summary: 'Name' }], currentId: 'a' });
    expect(out).toMatch(/stepper-dot__number">1<\/span>[^]*<\/span><\/span><\/span><\/span> <span[^>]*stepper__text/);
    expect(out).toMatch(/Account<\/span><\/span> <span[^>]*stepper__summary/);
  });

  it('says done or needs attention through a described note, not in the name', () => {
    const out = draw({ steps: [{ id: 'a', label: 'A', error: true }, { id: 'b', label: 'B' }], currentId: 'b' });
    const described = /aria-describedby="([^"]*)"/.exec(out)?.[1];
    expect(described).toBeTruthy();
    expect(out).toContain(`id="${described}"`);
    expect(out).toContain('Needs attention');
    expect(out).not.toMatch(/aria-label="[^"]*(attention|done)/i);
  });

  it('describes no note for a step that is neither done nor in error', () => {
    const out = draw({ steps: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }], currentId: 'a' });
    expect(out).not.toContain('aria-describedby');
  });
});
