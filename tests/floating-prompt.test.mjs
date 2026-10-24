/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FloatingPrompt } from '../src/composites/FloatingPrompt';
import { aroundOf } from '../src/composites/FloatingPrompt/behavior/around-of';
import { promptScope } from '../src/composites/FloatingPrompt/behavior/prompt-scope';
import { useDialogFocus } from '../src/composites/DialogShell/behavior/useDialogFocus';
import { useInertSiblings } from '../src/composites/ScreenLayer/behavior/useInertSiblings';
import { useEscapeLayer } from '../src/primitives/escape-stack/useEscapeLayer';

const BAR = { nodeType: 1, ownerDocument: {} };
const onKeyDown = () => undefined;

vi.mock('../src/composites/DialogShell/behavior/useDialogFocus', () => ({ useDialogFocus: vi.fn() }));
vi.mock('../src/composites/ScreenLayer/behavior/useInertSiblings', () => ({ useInertSiblings: vi.fn() }));
vi.mock('../src/primitives/escape-stack/useEscapeLayer', () => ({ useEscapeLayer: vi.fn() }));

const apply = vi.fn();
const cancel = vi.fn();
const ACTIONS = [
  { id: 'apply', label: 'Apply', onSelect: apply },
  { id: 'cancel', label: 'Cancel', onSelect: cancel, cancel: true },
];

const draw = (props) => renderToStaticMarkup(h(FloatingPrompt, { open: true, message: 'Apply the edits?', actions: ACTIONS, ...props }));

const element = (parent, extra = {}) => {
  const el = { nodeType: 1, offsetHeight: 0, inert: false, parentElement: parent, children: [], matches: () => false, ...extra };
  if (parent) parent.children.push(el);
  return el;
};

describe('FloatingPrompt focus', () => {
  beforeEach(() => {
    vi.mocked(useDialogFocus).mockReset().mockReturnValue({ node: BAR, ref: () => undefined, onKeyDown });
    vi.mocked(useInertSiblings).mockReset();
    vi.mocked(useEscapeLayer).mockReset();
  });

  it('moves focus into the bar while open and lets the dialog focus give it back on close', () => {
    draw({});
    const [params] = vi.mocked(useDialogFocus).mock.calls[0];
    expect(params).toMatchObject({ open: true, initialFocus: 'first' });
    expect(params.scopeOf).toBe(promptScope);
  });

  it('asks for focus handling with open false while closed, and draws nothing', () => {
    expect(draw({ open: false })).toBe('');
    expect(vi.mocked(useDialogFocus).mock.calls[0][0].open).toBe(false);
  });

  it('keeps the focus pull inside the container, or inside the page for the window scope', () => {
    const body = { tag: 'body' };
    const parent = { tag: 'parent' };
    const bar = (classes, host) => ({ ownerDocument: { body }, closest: () => (classes === null ? null : { classList: { contains: (name) => classes.includes(name) }, parentElement: host }) });
    expect(promptScope(bar([], parent))).toBe(parent);
    expect(promptScope(bar(['floating-prompt--window'], parent))).toBe(body);
    expect(promptScope(bar(null, parent))).toBe(body);
  });
});

describe('FloatingPrompt Escape', () => {
  beforeEach(() => {
    vi.mocked(useDialogFocus).mockReset().mockReturnValue({ node: BAR, ref: () => undefined, onKeyDown });
    vi.mocked(useEscapeLayer).mockReset();
    cancel.mockReset();
    apply.mockReset();
  });

  it('runs the cancel action on Escape and leaves the other actions alone', () => {
    draw({});
    const [doc, level, onEscape] = vi.mocked(useEscapeLayer).mock.calls[0];
    expect(doc).toBe(BAR.ownerDocument);
    expect(level).toBe('dialog');
    onEscape();
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(apply).not.toHaveBeenCalled();
  });

  it('listens for no Escape without a cancel action, while closed, or when cancel is off', () => {
    draw({ actions: [ACTIONS[0]] });
    draw({ open: false });
    draw({ actions: [ACTIONS[0], { ...ACTIONS[1], disabled: true }] });
    for (const call of vi.mocked(useEscapeLayer).mock.calls) expect(call[0]).toBeNull();
  });
});

describe('FloatingPrompt blocking', () => {
  beforeEach(() => {
    vi.mocked(useDialogFocus).mockReset().mockReturnValue({ node: BAR, ref: () => undefined, onKeyDown });
    vi.mocked(useInertSiblings).mockReset();
  });

  it('makes the siblings of the layer inert in the container scope, with the hook of ScreenLayer', () => {
    draw({});
    expect(useInertSiblings).toHaveBeenCalled();
  });

  it('covers its parent with a clear layer, or the window with the window scope', () => {
    expect(draw({})).toMatch(/^<div class="overlay overlay--clear floating-prompt"/);
    expect(draw({ scope: 'window' })).toMatch(/^<div class="overlay overlay--clear floating-prompt floating-prompt--window"/);
  });

  it('marks every region around the layer, up to the page, in the window scope, but not the portal root', () => {
    const body = element(null);
    const app = element(body);
    const portal = element(body, { matches: (selector) => selector === '#portal-root' });
    const content = element(app);
    const layer = element(app);
    const inside = element(layer);
    const made = aroundOf(Object.assign(layer, { ownerDocument: { body } }));
    expect(made).toEqual([content]);
    const root = element(body);
    const nested = element(app);
    const deep = element(nested);
    const bar = element(nested);
    const all = aroundOf(Object.assign(bar, { ownerDocument: { body } }));
    expect(all).toEqual(expect.arrayContaining([deep, content, layer, root]));
    expect(all).not.toContain(portal);
    expect(all).not.toContain(inside);
  });
});

describe('FloatingPrompt semantics', () => {
  beforeEach(() => {
    vi.mocked(useDialogFocus).mockReset().mockReturnValue({ node: BAR, ref: () => undefined, onKeyDown });
  });

  it('is an alert dialog that is not modal, named by its message', () => {
    const html = draw({});
    expect(html).toMatch(/role="alertdialog" aria-modal="false"/);
    const id = /aria-labelledby="([^"]+)"/.exec(html)?.[1];
    expect(html).toContain(`toast__message" id="${id}"`);
  });

  it('takes the name from label when given', () => {
    const html = draw({ label: 'Pending edits' });
    expect(html).toContain('aria-label="Pending edits"');
    expect(html).not.toContain('aria-labelledby');
  });

  it('reuses the surface of Toast and draws the actions as buttons, cancel as a ghost', () => {
    const html = draw({ variant: 'warning' });
    expect(html).toMatch(/class="toast toast--warning floating-prompt__bar"/);
    expect(html).toMatch(/<button[^>]*>.*Apply.*<\/button>/);
    expect(html).toMatch(/btn--ghost[^>]*>.*Cancel/);
  });
});
