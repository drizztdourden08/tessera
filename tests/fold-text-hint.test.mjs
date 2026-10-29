/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FormRow } from '../src/composites/FormRow';
import { SettingsRow } from '../src/composites/SettingsRow';
import { foldState } from '../src/primitives/FoldText/behavior/fold-state';
import { FoldText } from '../src/primitives/FoldText/FoldText';

const noop = () => undefined;
const LONG = 'Items the player starts the game with, on top of what the world gives. '.repeat(5);

describe('foldState', () => {
  it('in more mode folds until opened and offers More only when cut or open', () => {
    expect(foldState(2, 'more', false, false)).toEqual({ clamp: 2, more: false, hint: false });
    expect(foldState(2, 'more', false, true)).toEqual({ clamp: 2, more: true, hint: false });
    expect(foldState(2, 'more', true, false)).toEqual({ clamp: undefined, more: true, hint: false });
  });

  it('in hint mode always clamps, never offers More and hints only when cut', () => {
    expect(foldState(2, 'hint', false, false)).toEqual({ clamp: 2, more: false, hint: false });
    expect(foldState(2, 'hint', false, true)).toEqual({ clamp: 2, more: false, hint: true });
    expect(foldState(2, 'hint', true, true)).toEqual({ clamp: 2, more: false, hint: true });
  });

  it('in clip mode always clamps and offers neither More nor a hint', () => {
    expect(foldState(1, 'clip', false, true)).toEqual({ clamp: 1, more: false, hint: false });
    expect(foldState(1, 'clip', true, true)).toEqual({ clamp: 1, more: false, hint: false });
  });

  it('does nothing without lines', () => {
    expect(foldState(undefined, 'hint', false, true)).toEqual({ clamp: undefined, more: false, hint: false });
    expect(foldState(0, 'hint', false, true)).toEqual({ clamp: undefined, more: false, hint: false });
  });
});

describe('FoldText hint mode', () => {
  const draw = (props) => renderToStaticMarkup(h(FoldText, { lines: 2, ...props }, h('span', null, LONG)));

  it('sets the clamp, draws no More and no hint before the text is measured as cut', () => {
    const html = draw({ overflow: 'hint' });
    expect(html).toContain('-webkit-line-clamp:2');
    expect(html).not.toContain('fold-text__more');
    expect(html).not.toContain('help-tip');
  });

  it('keeps today clamp in the default mode', () => {
    expect(draw({})).toContain('-webkit-line-clamp:2');
  });
});

describe('rows pass the overflow on', () => {
  it('FormRow clamps its description in hint mode', () => {
    const html = renderToStaticMarkup(h(FormRow, { label: 'Start Inventory', description: LONG, descriptionOverflow: 'hint' }, h('span', null, 'x')));
    expect(html).toContain('-webkit-line-clamp:2');
    expect(html).not.toContain('fold-text__more');
  });

  it('SettingsRow clamps its description in hint mode', () => {
    const html = renderToStaticMarkup(h(SettingsRow, { id: 'a', title: 'A', description: LONG, descriptionLines: 3, descriptionOverflow: 'hint', input: { kind: 'toggle', value: true, onChange: noop } }));
    expect(html).toContain('-webkit-line-clamp:3');
    expect(html).not.toContain('fold-text__more');
  });
});
