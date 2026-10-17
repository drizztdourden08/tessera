/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SpeechBubble, useReducedMotion } from '../src/primitives';

const sheet = (file) => fs.readFileSync(file, 'utf8');

describe('SpeechBubble', () => {
  it('draws a plain box with no tail by default', () => {
    expect(renderToString(h(SpeechBubble, null, 'Hi'))).toBe('<div class="speech-bubble">Hi</div>');
  });

  it('names the tone and the pointer side in classes, before the class it is given', () => {
    const html = renderToString(h(SpeechBubble, { tone: 'info', pointer: 'left', className: 'mine' }, 'Hi'));
    expect(html).toContain('class="speech-bubble speech-bubble--info speech-bubble--left mine"');
  });

  it('puts the tail offset and the widest size in custom properties and keeps the style it is given', () => {
    const html = renderToString(h(SpeechBubble, { pointer: 'bottom', pointerOffset: 24, maxWidth: 200, style: { color: 'red' } }, 'Hi'));
    expect(html).toContain('--speech-offset:24px');
    expect(html).toContain('--speech-max:200px');
    expect(html).toContain('color:red');
  });

  it('passes the role and the other attributes to the box', () => {
    expect(renderToString(h(SpeechBubble, { role: 'status', 'data-side': 'top' }, 'Hi'))).toContain('role="status" data-side="top"');
  });

  it('paints an opaque surface with the tone tint over it, a border and a shadow', () => {
    const css = sheet('src/primitives/SpeechBubble/SpeechBubble.css');
    expect(css).toMatch(/background: linear-gradient\(var\(--speech-soft, var\(--c-surface\)\), var\(--speech-soft, var\(--c-surface\)\)\) var\(--c-surface\);/);
    expect(css).toMatch(/border: var\(--border-width-thin\) solid var\(--speech-ink\);/);
    expect(css).toMatch(/border-radius: var\(--radius-md\);/);
    expect(css).toMatch(/box-shadow: var\(--shadow-overlay\);/);
  });

  it('draws the tail in the fill and the ink of the box, on every side', () => {
    const css = sheet('src/primitives/SpeechBubble/SpeechBubble.css');
    expect(css).toMatch(/background: inherit;/);
    for (const side of ['top', 'bottom', 'left', 'right']) expect(css).toContain(`.speech-bubble--${side}::after {`);
  });
});

describe('GuidedTour bubble', () => {
  it('is drawn by SpeechBubble and keeps only its own size, corner and shadow', () => {
    expect(sheet('src/composites/GuidedTour/sub-components/TourBubble.tsx')).toContain('<SpeechBubble');
    const css = sheet('src/composites/GuidedTour/GuidedTour.css');
    const rule = css.slice(css.indexOf('.guided-tour__bubble {'), css.indexOf('}', css.indexOf('.guided-tour__bubble {')));
    expect(rule).not.toMatch(/background|border:/);
    expect(rule).toMatch(/border-radius: var\(--radius-lg\);/);
    expect(rule).toMatch(/box-shadow: var\(--shadow-lg\);/);
  });
});

describe('useReducedMotion', () => {
  it('is exported from the package', () => {
    expect(typeof useReducedMotion).toBe('function');
  });
});
