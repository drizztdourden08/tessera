/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DisabledOverlay } from '../src/composites/DisabledOverlay';

const ignore = () => undefined;
const draw = (placement) => renderToString(h(DisabledOverlay, { active: true, placement, message: 'Hosting is off.', onOpenSettings: ignore }, 'Body'));
const sheet = fs.readFileSync('src/composites/DisabledOverlay/DisabledOverlay.css', 'utf8');

describe('DisabledOverlay placement', () => {
  it('centres the message by default and takes top', () => {
    expect(draw()).toContain('disabled-overlay--center');
    expect(draw('top')).toContain('disabled-overlay--top');
    expect(draw('top')).not.toContain('disabled-overlay--center');
  });

  it('keeps the message and the button together in one notice', () => {
    expect(draw()).toMatch(/class="disabled-overlay__notice"><span class="[^"]*disabled-overlay__message[^"]*">Hosting is off\.<\/span><button/);
  });

  it('lays the notice out of the way when centred, and holds it at the top in view with top', () => {
    expect(sheet).toMatch(/\.disabled-overlay__notice \{\s+display: contents;/);
    expect(sheet).toMatch(/\.disabled-overlay--top \.overlay\.disabled-overlay__scrim \{\s+justify-content: flex-start;\s+overflow: clip;/);
    expect(sheet).toMatch(/\.disabled-overlay--top \.disabled-overlay__notice \{\s+position: sticky;\s+top: var\(--density-pad, var\(--space-md\)\);/);
  });
});
