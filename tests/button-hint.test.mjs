/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../src/primitives/Button';
import { HintScope } from '../src/primitives/HintScope';

const SAVE = { label: 'Save', description: 'Writes the slot to the memory card.' };

const drawn = (props) => {
  let element;
  const Probe = () => {
    element = Button.render(props, null);
    return element;
  };
  const html = renderToString(h(HintScope, null, h(Probe)));
  return { element, html };
};

describe('a Button with a hint', () => {
  it('takes the hint handlers and keeps hint and onHint off the button element', () => {
    const { element, html } = drawn({ hint: SAVE, onHint: () => undefined, children: 'Save' });
    for (const name of ['onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur']) expect(typeof element.props[name]).toBe('function');
    expect(element.props.hint).toBeUndefined();
    expect(element.props.onHint).toBeUndefined();
    expect(html).toMatch(/^<button class="[^"]*btn[^"]*"><span class="btn__label">Save<\/span><\/button>$/);
  });

  it('still calls the handlers the caller passes', () => {
    const onMouseEnter = vi.fn();
    const onBlur = vi.fn();
    const { element } = drawn({ hint: SAVE, onMouseEnter, onBlur, children: 'Save' });
    element.props.onMouseEnter({ type: 'mouseenter' });
    element.props.onBlur({ type: 'blur' });
    expect(onMouseEnter).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledOnce();
  });

  it('draws the same button with no hint', () => {
    expect(drawn({ children: 'Save' }).html).toBe(drawn({ hint: SAVE, children: 'Save' }).html);
  });
});
