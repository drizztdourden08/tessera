/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { VolumeIcon } from '../src/primitives/VolumeIcon';
import { volumeStep } from '../src/primitives/VolumeIcon/behavior/volume-step';
import { STEADY_PARTS } from '../scripts/storylite/check-steady.constants.mjs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const CSS = read('src/primitives/VolumeIcon/VolumeIcon.css');

describe('VolumeIcon', () => {
  it('steps from an X to one, two, three and four waves, one per quarter of the level', () => {
    expect([0, 0.25, 0.5, 0.75, 1].map((level) => volumeStep(level))).toEqual([0, 1, 2, 3, 4]);
    expect(volumeStep(0.01)).toBe(1);
    expect(volumeStep(0.26)).toBe(2);
    expect(volumeStep(0.51)).toBe(3);
    expect(volumeStep(0.76)).toBe(4);
    expect(volumeStep(0.9, true)).toBe(0);
    expect(volumeStep(-1)).toBe(0);
    expect(volumeStep(Number.NaN)).toBe(0);
    expect(volumeStep(4)).toBe(4);
  });

  it('keeps the same parts at every step, so a change morphs in place', () => {
    const parts = (level, muted) => renderToString(h(VolumeIcon, { level, muted })).replace(/ data-step="\d"/, '');
    const all = [[0, false], [0.2, false], [0.5, false], [0.7, false], [1, false], [1, true]].map(([level, muted]) => parts(level, muted));
    expect(new Set(all).size).toBe(1);
    const html = renderToString(h(VolumeIcon, { level: 0.5, size: 18 }));
    expect(html).toMatch(/^<svg class="volume-icon" data-step="2" viewBox="0 0 24 24" width="18" height="18" stroke-width="2" aria-hidden="true"/);
    expect(html.match(/class="volume-icon__wave /g)).toHaveLength(4);
    expect(html.match(/pathLength="1"/g)).toHaveLength(10);
  });

  it('grows the shown waves taller with every step, drawing each arc out from its middle', () => {
    const offset = (step) => CSS.match(new RegExp(`\\[data-step='${step}'\\][^{]*\\{\\s+stroke-dashoffset: ([\\d.]+);`))?.[1];
    expect([1, 2, 3, 4].map(offset)).toEqual(['0.4', '0.27', '0.13', '0']);
  });

  it('draws a white speaker, waves in the primary colour and the X in the danger colour', () => {
    expect(CSS).toMatch(/\.volume-icon__wave \{[^}]*stroke: var\(--c-volume-wave\);/);
    expect(CSS).toMatch(/\.volume-icon__cross \{[^}]*stroke: var\(--c-danger\);/);
    expect(CSS).toMatch(/\.volume-icon__speaker \{\s+stroke: var\(--c-text\);/);
    expect(read('src/tokens/canonical.css')).toContain('--c-volume-wave:    var(--c-primary);');
  });

  it('morphs on transform, opacity and stroke offset only, and switches at once under reduced motion', () => {
    const moving = [...CSS.matchAll(/^\s+([a-z-]+) var\(--duration-volume-morph\)/gm)].map(([, prop]) => prop);
    expect(new Set(moving)).toEqual(new Set(['transform', 'opacity', 'stroke-dashoffset']));
    expect(CSS).toMatch(/@media \(prefers-reduced-motion: reduce\) \{[^}]*transition: none;/);
    expect(STEADY_PARTS).toContainEqual({ page: 'icons-volumeicon--overview', parts: ['.volume-icon'] });
  });

  it('is the one volume icon: VolumeControl, the video bar and the title bar menu draw it', () => {
    expect(read('src/composites/VolumeControl/sub-components/VolumeMuteButton.tsx')).toContain('<VolumeIcon level={level} muted={muted}');
    expect(read('src/composites/Video/sub-components/VideoVolume.tsx')).toContain('<VolumeIcon level={volume} muted={muted} size={18} />');
    expect(read('src/composites/WindowTitleBar/behavior/volume-menu-items.ts')).toContain('createElement(VolumeIcon,');
  });
});
