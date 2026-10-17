/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Splash } from '../src/composites/Splash';

const KIT = fs.readFileSync('splash.css', 'utf8');
const noop = () => undefined;
const draw = (props) => renderToStaticMarkup(h(Splash, { title: 'Archipelia', ...props }));
const PRESSABLE = 'pressable';
const classesIn = (html) => new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(' ')));

describe('Splash', () => {
  it('draws only classes that splash.css defines, besides the zero weight reset of Pressable', () => {
    const html = draw({
      mark: '/mark.svg', status: 'Failed', detail: 'Port taken', failed: true, progress: 0.5, version: 'v1',
      actions: [{ label: 'Retry', primary: true, onSelect: noop }, { label: 'Quit', onSelect: noop }],
    });
    for (const name of [...classesIn(html)].filter((cls) => cls !== PRESSABLE)) expect(KIT).toMatch(new RegExp(`\\.${name}[ :,{]`));
  });

  it('lays out a starting splash as the static page does', () => {
    const html = draw({ mark: '/mark.svg', status: 'Loading the engine', progress: 0.62, version: 'v0.4.2' });
    expect(html).toContain('<div class="ts-splash ts-splash--layer"><div class="ts-stage"><img class="ts-mark" src="/mark.svg" alt=""/>');
    expect(html).toContain('<h1 class="ts-title">Archipelia</h1><p class="ts-status" aria-live="polite">Loading the engine</p></div>');
    expect(html).toContain('<span class="ts-version">v0.4.2</span>');
    expect(html).toContain('class="ts-progress ts-progress--edge" role="progressbar" aria-label="Loading" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62" style="--value:0.62"');
  });

  it('turns the status and the bar red when it failed, and the status into an alert', () => {
    const html = draw({ status: 'Engine failed', detail: 'Port taken', failed: true, progress: 0.4 });
    expect(html).toContain('<p class="ts-status ts-status--danger" role="alert">Engine failed</p><p class="ts-detail">Port taken</p>');
    expect(html).toContain('ts-progress ts-progress--edge ts-progress--danger');
  });

  it('sweeps with no value for indeterminate, and keeps a fraction between 0 and 1', () => {
    const sweep = draw({ progress: 'indeterminate' });
    expect(sweep).toContain('ts-progress ts-progress--edge ts-progress--indeterminate');
    expect(sweep).not.toContain('aria-valuenow');
    expect(sweep).not.toContain('--value');
    expect(draw({ progress: 1.7 })).toContain('aria-valuenow="100" style="--value:1"');
    expect(draw({ progress: -1 })).toContain('aria-valuenow="0" style="--value:0"');
  });

  it('puts an inline bar in the column, and draws no bar without progress', () => {
    expect(draw({ progress: 0.3, bar: 'inline' })).toMatch(/<div class="ts-stage">.*<div class="ts-progress" role="progressbar".*<\/div><\/div>$/);
    expect(draw({ status: 'Ready' })).not.toContain('ts-progress');
  });

  it('draws the actions as buttons, the primary one first in look, and a node mark in a hidden box', () => {
    const html = draw({ mark: h('svg', { width: 48 }), actions: [{ label: 'Retry', primary: true, onSelect: noop }, { label: 'Quit', onSelect: noop, disabled: true }] });
    expect(html).toContain('<div class="ts-mark" aria-hidden="true"><svg width="48"></svg></div>');
    expect(html).toContain('<div class="ts-actions"><button type="button" class="pressable ts-button ts-button--primary">Retry</button><button type="button" class="pressable ts-button" disabled="">Quit</button></div>');
  });

  it('names the bar with progressLabel and passes other props to the root', () => {
    const html = draw({ progress: 0.1, progressLabel: 'Updating', className: 'app-splash', 'data-phase': 'update' });
    expect(html).toContain('aria-label="Updating"');
    expect(html).toContain('<div class="ts-splash ts-splash--layer app-splash" data-phase="update">');
  });

  it('draws a wordmark image in the h1 in place of the title text, named by the title', () => {
    const html = draw({ wordmark: '/wordmark.svg', status: 'Starting' });
    expect(html).toContain('<h1 class="ts-title"><img class="ts-wordmark" src="/wordmark.svg" alt="Archipelia"/></h1>');
    expect(html).not.toContain('>Archipelia<');
    expect(KIT).toMatch(/\.ts-wordmark \{[^}]*max-block-size: var\(--size-48\);[^}]*object-fit: contain;/);
  });
});

describe('the splash wordmark', () => {
  const ruleOf = (selector) => KIT.match(new RegExp(`\\n${selector.replace(/[.-]/g, '\\$&')} \\{([^}]*)\\}`))?.[1] ?? '';
  const mark = (wordmarkPixelated) => draw({ wordmark: '/sprite.png', status: 'Starting', wordmarkPixelated });
  const PLAIN = '<img class="ts-wordmark" src="/sprite.png" alt="Archipelia"/>';
  const SHARP = '<img class="ts-wordmark ts-wordmark--pixelated" src="/sprite.png" alt="Archipelia"/>';

  it('draws smooth by default and with false, and sharp with wordmarkPixelated true', () => {
    expect(mark(undefined)).toContain(PLAIN);
    expect(mark(false)).toContain(PLAIN);
    expect(mark(true)).toContain(SHARP);
  });

  it('waits for the picture to load before auto turns sharp, so the server draws it smooth', () => {
    expect(mark('auto')).toContain(PLAIN);
  });

  it('keeps the height of the picture up to 48 px and its width up to 384 px, so a wide one leaves no band', () => {
    const rule = ruleOf('.ts-wordmark');
    expect(rule).toContain('inline-size: auto;');
    expect(rule).toContain('max-inline-size: min(var(--size-384), 100%);');
    expect(rule).toMatch(/\n {2}block-size: auto;/);
    expect(rule).toContain('max-block-size: var(--size-48);');
  });

  it('scales a pixel art wordmark up to the 384 px row with hard pixel edges in ts-wordmark--pixelated', () => {
    const rule = ruleOf('.ts-wordmark--pixelated');
    expect(rule).toContain('inline-size: var(--size-384);');
    expect(rule).toContain('image-rendering: pixelated;');
  });
});
