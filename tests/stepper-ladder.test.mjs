/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Stepper } from '../src/primitives/Stepper';
import { lineLit } from '../src/primitives/Stepper/behavior/line-lit';
import { rootStyle } from '../src/primitives/Stepper/behavior/root-style';
import { stepStatus } from '../src/primitives/Stepper/behavior/step-status';
import { STEPPER_MEDIA_SIZES, STEPPER_SIZES, STEPPER_STEP_WIDTHS } from '../src/primitives/Stepper/behavior/stepper-sizes.constants';
import { STEPPER_TONES } from '../src/primitives/Stepper/behavior/stepper-tones.constants';

const STEPS = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }, { id: 'd', label: 'D' }];
const withStates = (...states) => STEPS.map((step, index) => ({ ...step, state: states[index] }));
const items = (html) => html.split('<li').slice(1);
const buttons = (html) => html.match(/<button[^>]*>/g) ?? [];

describe('Stepper step status', () => {
  it('lets an explicit state win over the position of the step', () => {
    expect(stepStatus({ id: 'a', label: 'A', state: 'upcoming' }, 0, 3)).toBe('upcoming');
    expect(stepStatus({ id: 'a', label: 'A', state: 'done' }, 3, 0)).toBe('done');
    expect(stepStatus({ id: 'a', label: 'A', state: 'current' }, 0, 3)).toBe('current');
  });

  it('lets an explicit state win over the error flag', () => {
    expect(stepStatus({ id: 'a', label: 'A', error: true, state: 'done' }, 0, 0)).toBe('done');
  });

  it('keeps following the position when no state is given', () => {
    expect(stepStatus(STEPS[0], 0, 2)).toBe('done');
    expect(stepStatus(STEPS[2], 2, 2)).toBe('current');
    expect(stepStatus(STEPS[3], 3, 2)).toBe('upcoming');
    expect(stepStatus({ id: 'a', label: 'A', error: true }, 1, 1)).toBe('error');
  });
});

describe('Stepper line lit', () => {
  it('follows the own status of the step when the next step has no state', () => {
    const next = { id: 'n', label: 'N' };
    expect(lineLit('done', next, 'upcoming')).toBe(true);
    expect(lineLit('error', next, 'upcoming')).toBe(true);
    expect(lineLit('current', next, 'upcoming')).toBe(false);
    expect(lineLit('upcoming', next, 'upcoming')).toBe(false);
    expect(lineLit('done', undefined, undefined)).toBe(true);
  });

  it('follows the status of the next step when that step has a state', () => {
    const next = { id: 'n', label: 'N', state: 'done' };
    expect(lineLit('upcoming', next, 'done')).toBe(true);
    expect(lineLit('upcoming', next, 'current')).toBe(true);
    expect(lineLit('done', next, 'upcoming')).toBe(false);
  });

  it('lights the lines around a skipped step the way the ladder reads', () => {
    const steps = withStates('done', 'upcoming', 'done', 'done');
    const statuses = steps.map((step, index) => stepStatus(step, index, -1));
    expect(statuses).toEqual(['done', 'upcoming', 'done', 'done']);
    const lit = [0, 1, 2].map((index) => lineLit(statuses[index], steps[index + 1], statuses[index + 1]));
    expect(lit).toEqual([false, true, true]);
  });
});

describe('Stepper toggle mode', () => {
  const html = (props) => renderToString(h(Stepper, { steps: withStates('done', 'upcoming', 'current', 'upcoming'), selectMode: 'toggle', onSelect: () => {}, ...props }));

  it('marks each step button as pressed for done and current, and not pressed for upcoming', () => {
    const tags = buttons(html());
    expect(tags).toHaveLength(4);
    expect(tags.map((tag) => /aria-pressed="(true|false)"/.exec(tag)?.[1])).toEqual(['true', 'false', 'true', 'false']);
  });

  it('never marks a step as the current one', () => {
    expect(html()).not.toContain('aria-current');
  });

  it('leaves every step button enabled when a select handler is given', () => {
    const tags = buttons(html());
    expect(tags).toHaveLength(4);
    tags.forEach((tag) => expect(tag).not.toContain('disabled'));
  });

  it('names each step plainly, without the done wording', () => {
    const out = html();
    expect(out).toContain('aria-label="Step 1, A"');
    expect(out).toContain('aria-label="Step 3, C"');
    expect(out).not.toContain(', done');
  });

  it('shows no pressed state in the default navigate mode', () => {
    const out = renderToString(h(Stepper, { steps: STEPS, currentId: 'b', onSelect: () => {} }));
    expect(out).not.toContain('aria-pressed');
    expect(out).toContain('aria-current="step"');
  });
});

describe('Stepper ladder attributes', () => {
  const html = (props) => renderToString(h(Stepper, { steps: STEPS, currentId: 'b', ...props }));

  it('puts labels above only for a horizontal stepper', () => {
    expect(html({ labelPlacement: 'above' })).toContain('data-label-at="above"');
    expect(html({ labelPlacement: 'above', orientation: 'vertical' })).not.toContain('data-label-at');
    expect(html()).not.toContain('data-label-at');
  });

  it('marks the ring dot variant', () => {
    expect(html({ dotVariant: 'ring' })).toContain('data-dot="ring"');
    expect(html()).not.toContain('data-dot');
  });

  it('marks media on the root and renders one media slot per step', () => {
    const steps = [{ ...STEPS[0], media: 'x' }, ...STEPS.slice(1)];
    const out = html({ steps });
    expect(out).toContain('data-media=""');
    expect(out.match(/stepper__media/g)).toHaveLength(4);
    expect(html()).not.toContain('data-media');
    expect(html()).not.toContain('stepper__media');
  });

  it('marks scroll on the root only when asked', () => {
    expect(html({ scroll: true })).toContain('data-scroll=""');
    expect(html()).not.toContain('data-scroll');
  });

  it('lights the line of the items that reach a lit step', () => {
    const out = html({ steps: withStates('done', 'upcoming', 'done', 'done'), currentId: undefined });
    const [first, second, third] = items(out);
    expect(first).not.toContain('data-line="lit"');
    expect(second).toContain('data-line="lit"');
    expect(third).toContain('data-line="lit"');
  });

  it('strikes the label of a struck step only', () => {
    const out = html({ steps: [STEPS[0], { ...STEPS[1], struck: true }, ...STEPS.slice(2)] });
    expect(out.match(/data-struck/g)).toHaveLength(1);
    expect(items(out)[1]).toContain('data-struck=""');
  });

  it('drops the done icon flip for the ring variant', () => {
    expect(html().match(/data-flip/g)).toHaveLength(4);
    expect(html({ dotVariant: 'ring' })).not.toContain('data-flip');
  });
});

describe('Stepper root style', () => {
  it('maps step width, media size and label lines to custom properties', () => {
    expect(rootStyle({ stepWidth: 'lg', mediaSize: 'sm', labelLines: 2 })).toEqual({
      '--stepper-step-w': STEPPER_STEP_WIDTHS.lg,
      '--stepper-media-h': STEPPER_MEDIA_SIZES.sm,
      '--stepper-label-lines': 2,
    });
    expect(STEPPER_STEP_WIDTHS.lg).toBe('var(--size-128)');
    expect(STEPPER_MEDIA_SIZES.sm).toBe('var(--size-24)');
  });

  it('returns nothing when nothing is set', () => {
    expect(rootStyle({})).toBeUndefined();
  });

  it('writes the custom properties into the rendered root', () => {
    const out = renderToString(h(Stepper, { steps: STEPS, currentId: 'a', stepWidth: 'sm', mediaSize: 'md', labelLines: 3 }));
    expect(out).toContain('--stepper-step-w:var(--size-80)');
    expect(out).toContain('--stepper-media-h:var(--size-32)');
    expect(out).toContain('--stepper-label-lines:3');
  });

  it('offers a neutral tone', () => {
    expect(STEPPER_TONES.neutral).toBeDefined();
    expect(rootStyle({ tone: 'neutral' })).toEqual({ '--stepper-tone': STEPPER_TONES.neutral.tone, '--stepper-on-tone': STEPPER_TONES.neutral.on });
  });
});

describe('Stepper media below, hidden labels and size', () => {
  const withMedia = STEPS.map((step) => ({ ...step, media: 'x' }));
  const html = (props) => renderToString(h(Stepper, { steps: withMedia, currentId: 'b', ...props }));

  it('marks media below on the root only when media exists and below is asked', () => {
    expect(html({ mediaPlacement: 'below' })).toContain('data-media-at="below"');
    expect(html({ mediaPlacement: 'above' })).not.toContain('data-media-at');
    expect(html()).not.toContain('data-media-at');
    expect(html({ steps: STEPS, mediaPlacement: 'below' })).not.toContain('data-media-at');
  });

  it('hides the label visually, keeps it in the step and leaves no label row', () => {
    const out = html({ labelPlacement: 'hidden' });
    expect(out).toContain('data-label-at="hidden"');
    expect(out.match(/class="visually-hidden"/g)).toHaveLength(4);
    expect(out).not.toContain('stepper__text');
    expect(out).not.toContain('stepper__label');
    expect(out).toContain('aria-label="Step 1, A, done"');
    expect(html()).not.toContain('visually-hidden');
  });

  it('hides the label for a vertical stepper too', () => {
    expect(html({ labelPlacement: 'hidden', orientation: 'vertical' })).toContain('data-label-at="hidden"');
  });

  it('maps the size to dot, digit and gap custom properties', () => {
    expect(rootStyle({ size: 'sm' })).toEqual({
      '--stepper-dot': STEPPER_SIZES.sm.dot,
      '--stepper-digit': STEPPER_SIZES.sm.digit,
      '--stepper-gap': STEPPER_SIZES.sm.gap,
      '--stepper-gap-min': STEPPER_SIZES.sm.gapMin,
    });
    expect(STEPPER_SIZES.sm.dot).toBe('var(--size-24)');
    expect(STEPPER_SIZES.sm.digit).toBe('var(--text-xs)');
    expect(STEPPER_SIZES.md.digit).toBe('var(--text-base)');
  });

  it('writes the small size into the rendered root and leaves the default alone', () => {
    expect(html({ size: 'sm' })).toContain('--stepper-dot:var(--size-24)');
    expect(html()).not.toContain('--stepper-dot');
  });

  it('keeps the compact view separate from size', () => {
    const out = html({ size: 'sm', compact: true });
    expect(out).not.toContain('--stepper-dot');
    expect(out).not.toContain('stepper__item');
  });
});
