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
  it('steps from an X to one, two and three waves as the level rises', () => {
    expect([0, 0.25, 0.5, 0.75, 1].map((level) => volumeStep(level))).toEqual([0, 1, 2, 3, 3]);
    expect(volumeStep(0.33)).toBe(1);
    expect(volumeStep(0.34)).toBe(2);
    expect(volumeStep(0.67)).toBe(3);
    expect(volumeStep(0.9, true)).toBe(0);
    expect(volumeStep(-1)).toBe(0);
    expect(volumeStep(Number.NaN)).toBe(0);
    expect(volumeStep(4)).toBe(3);
  });

  it('keeps the same parts at every step, so a change morphs in place', () => {
    const parts = (level, muted) => renderToString(h(VolumeIcon, { level, muted })).replace(/ data-step="\d"/, '');
    const all = [[0, false], [0.2, false], [0.5, false], [1, false], [1, true]].map(([level, muted]) => parts(level, muted));
    expect(new Set(all).size).toBe(1);
    const html = renderToString(h(VolumeIcon, { level: 0.5, size: 18 }));
    expect(html).toMatch(/^<svg class="volume-icon" data-step="2" viewBox="0 0 24 24" width="18" height="18" stroke-width="2" aria-hidden="true"/);
    expect(html.match(/class="volume-icon__wave /g)).toHaveLength(3);
    expect(html.match(/pathLength="1"/g)).toHaveLength(8);
  });

  it('draws the waves in the volume wave colour and the X in the danger colour', () => {
    expect(CSS).toMatch(/\.volume-icon__wave \{[^}]*stroke: var\(--c-volume-wave\);/);
    expect(CSS).toMatch(/\.volume-icon__cross \{[^}]*stroke: var\(--c-danger\);/);
    expect(CSS).toMatch(/\.volume-icon__speaker \{\s+stroke: currentcolor;/);
    expect(read('src/tokens/canonical.css')).toContain('--c-volume-wave:    var(--c-primary-bright);');
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
