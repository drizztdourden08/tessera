/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { logInk } from '../src/composites/LogPanel/behavior/log-ink';
import { messageTone } from '../src/composites/LogPanel/behavior/message-tone';
import { LogLine } from '../src/composites/LogPanel/sub-components/LogLine';
import { hexRgb } from '../src/primitives/hex-ink/hex-rgb';
import { readableInk } from '../src/primitives/hex-ink/readable-ink';
import { rgbLuminance } from '../src/primitives/hex-ink/rgb-luminance';

const ROW = { id: 'r1', gutter: '20:00:00', tag: 'SEQ', kind: 'seq', message: 'Sequence 1' };
const line = (kind) => renderToString(h(LogLine, { row: ROW, kind }));
const spans = (html) => [...html.matchAll(/<span([^>]*)>/g)].map((m) => m[1]);
const hexOf = (r, g, b) => `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
const contrastOnGround = (hex) => (rgbLuminance(hexRgb(hex)) + 0.05) / (0.02 + 0.05);

describe('readableInk', () => {
  it('keeps a colour that already reads on a dark panel', () => {
    expect(readableInk('#ffd54f')).toBe('#ffd54f');
    expect(readableInk('#4dd0e1')).toBe('#4dd0e1');
    expect(readableInk('#fff')).toBe('#ffffff');
  });

  it('lifts a dark colour toward white until it reads at 4.5:1, keeping its hue', () => {
    const lifted = readableInk('#2b3a8c');
    expect(lifted).not.toBe('#2b3a8c');
    const [r, g, b] = hexRgb(lifted);
    expect(b).toBeGreaterThan(r);
    expect(b).toBeGreaterThan(g);
    for (let r0 = 0; r0 < 256; r0 += 51) {
      for (let g0 = 0; g0 < 256; g0 += 51) {
        for (let b0 = 0; b0 < 256; b0 += 51) {
          const hex = hexOf(r0, g0, b0);
          expect(contrastOnGround(readableInk(hex)), hex).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  });

  it('reads nothing from a value that is not a hex colour', () => {
    expect(readableInk('teal')).toBeNull();
    expect(readableInk('#12345678')).toBeNull();
  });
});

describe('logInk', () => {
  it('passes a text tone through, and falls back when there is none', () => {
    expect(logInk('danger')).toEqual({ tone: 'danger' });
    expect(logInk(undefined, 'muted')).toEqual({ tone: 'muted' });
    expect(logInk(undefined)).toEqual({ tone: undefined });
  });

  it('paints a tag tint from its token and a hex colour once it reads', () => {
    expect(logInk('teal')).toEqual({ className: 'log-panel__ink', style: { '--log-ink': 'var(--c-tag-teal)' } });
    expect(logInk('#ffd54f')).toEqual({ className: 'log-panel__ink', style: { '--log-ink': '#ffd54f' } });
    expect(logInk('#nope', 'muted')).toEqual({ tone: 'muted' });
  });
});

describe('messageTone', () => {
  it('takes the kind tone on true, its own tone on a tone, and none otherwise', () => {
    expect(messageTone({ id: 'a', label: 'A', tone: 'info', toneMessage: true })).toBe('info');
    expect(messageTone({ id: 'a', label: 'A', tone: 'muted', toneMessage: 'dim' })).toBe('dim');
    expect(messageTone({ id: 'a', label: 'A', tone: 'info', toneMessage: false })).toBeUndefined();
    expect(messageTone({ id: 'a', label: 'A', tone: 'info' })).toBeUndefined();
    expect(messageTone(undefined)).toBeUndefined();
  });
});

describe('LogLine', () => {
  it('keeps the markup of a text tone kind: a muted tag by default, no ink and no style', () => {
    const [, tag, msg] = spans(line(undefined));
    expect(tag).toBe(' class="text-el text-el--span text-el--toned text-el--tone-muted log-panel__tag log-panel__tag--seq"');
    expect(msg).toBe(' class="text-el text-el--span log-panel__msg log-panel__msg--seq"');
    const [, infoTag, infoMsg] = spans(line({ id: 'seq', label: 'Seq', tone: 'info', toneMessage: true, strong: true }));
    expect(infoTag).toContain('text-el--tone-info log-panel__tag log-panel__tag--seq"');
    expect(infoMsg).toBe(' class="text-el text-el--span text-el--toned text-el--tone-info log-panel__msg log-panel__msg--seq log-panel__msg--strong"');
  });

  it('inks the tag and message in a tint or a hex colour, and sets capitals with uppercase', () => {
    const [, tag, msg] = spans(line({ id: 'seq', label: 'Seq', tone: 'teal', toneMessage: '#2b3a8c', uppercase: true }));
    expect(tag).toBe(' class="text-el text-el--span log-panel__tag log-panel__tag--seq log-panel__ink" style="--log-ink:var(--c-tag-teal)"');
    expect(msg).toMatch(/^ class="text-el text-el--span log-panel__msg log-panel__msg--seq log-panel__msg--upper log-panel__ink" style="--log-ink:#[0-9a-f]{6}"$/);
    expect(msg).not.toContain('#2b3a8c');
  });
});
