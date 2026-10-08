/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAsk } from '../src/composites/ActionBar/behavior/useAsk';
import { ConfirmIconButton } from '../src/composites/ConfirmIconButton';
import { useConfirmAsk } from '../src/composites/ConfirmIconButton/behavior/useConfirmAsk';
import { SettingsRowActionButton } from '../src/composites/SettingsRow/sub-components/SettingsRowActionButton';
import { ITEM_STRINGS } from '../src/primitives/strings/items-strings.constants';
import { escapeDocument } from './escape-document.mjs';
import { mountHook } from './hook-harness.mjs';

vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => page }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraStrings', () => ({ useTesseraStrings: () => ({ items: ITEM_STRINGS }) }));
vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const page = escapeDocument();
vi.stubGlobal('CSS', { escape: (text) => text });

const fakeDom = () => {
  const doc = { body: { name: 'body' }, activeElement: null };
  doc.activeElement = doc.body;
  const node = (name, inside = []) => {
    const own = { name, ownerDocument: doc, contains: (other) => other === own || inside.includes(other) };
    own.focus = vi.fn(() => {
      doc.activeElement = own;
    });
    return own;
  };
  const cross = node('cross');
  return { doc, cross, hold: node('hold', [cross]), trigger: node('trigger'), field: node('field') };
};

const wire = (refs, dom) => {
  refs.holdRef.current = dom.hold;
  if (refs.triggerRef) refs.triggerRef.current = dom.trigger;
};

const goneAfter = (dom, end) => (tree) => {
  end(tree);
  if (dom.doc.activeElement === dom.cross) dom.doc.activeElement = dom.doc.body;
};

describe('a question that ends gives focus back to its trigger', () => {
  let dom;
  let calls;
  beforeEach(() => {
    dom = fakeDom();
    calls = { onConfirm: vi.fn(), onCancel: vi.fn() };
  });

  const asked = () => {
    const ask = mountHook(() => useConfirmAsk(calls));
    wire(ask.current, dom);
    ask.act((a) => a.ask('row'));
    dom.cross.focus();
    return ask;
  };

  it('from the cross or Escape while focus is in the question', () => {
    const ask = asked();
    ask.act(goneAfter(dom, (a) => a.cancel()));
    expect(dom.trigger.focus).toHaveBeenCalledOnce();
    expect(dom.doc.activeElement).toBe(dom.trigger);

    ask.act((a) => a.ask('row'));
    dom.cross.focus();
    ask.act(goneAfter(dom, (a) => a.onKeyDown({ key: 'Escape', preventDefault: vi.fn(), stopPropagation: vi.fn() })));
    expect(dom.trigger.focus).toHaveBeenCalledTimes(2);
  });

  it('and leaves focus alone when it was elsewhere, such as an Escape or a timeout while typing in a field', () => {
    const ask = asked();
    dom.field.focus();
    ask.act(() => page.press('Escape'));
    expect(calls.onCancel).toHaveBeenCalledOnce();
    expect(dom.trigger.focus).not.toHaveBeenCalled();
    expect(dom.doc.activeElement).toBe(dom.field);
  });

  it('and leaves focus where onCancel put it', () => {
    calls.onCancel = vi.fn(() => dom.field.focus());
    const ask = asked();
    ask.act(goneAfter(dom, (a) => a.cancel()));
    expect(dom.trigger.focus).not.toHaveBeenCalled();
    expect(dom.doc.activeElement).toBe(dom.field);
  });

  it('after a confirm too, when the button is still there', () => {
    const ask = asked();
    ask.act(goneAfter(dom, (a) => a.confirm()));
    expect(calls.onConfirm).toHaveBeenCalledWith('row');
    expect(dom.doc.activeElement).toBe(dom.trigger);
  });

  it('and leaves focus to the part when the confirmed action took the button away', () => {
    const removed = { ask: null };
    calls.onConfirm = vi.fn(() => {
      removed.ask.current.triggerRef.current = null;
    });
    const ask = asked();
    removed.ask = ask;
    ask.act(goneAfter(dom, (a) => a.confirm()));
    expect(dom.trigger.focus).not.toHaveBeenCalled();
    expect(dom.doc.activeElement).toBe(dom.doc.body);
  });
});

describe('the parts on the shared ask hand it their question and trigger', () => {
  it('ConfirmIconButton gives focus back to its button', () => {
    const dom = fakeDom();
    const props = { icon: h('i'), label: 'Delete', confirmLabel: 'Delete it', cancelLabel: 'Keep it', onConfirm: vi.fn() };
    const button = mountHook(() => ConfirmIconButton(props));
    wire({ holdRef: button.current.props.ref, triggerRef: button.current.props.children[0].props.ref }, dom);
    button.act(() => button.current.props.children[0].props.onClick());
    dom.cross.focus();
    const [, question] = button.current.props.children;
    button.act(goneAfter(dom, () => question.props.onCancel()));
    expect(dom.doc.activeElement).toBe(dom.trigger);
  });

  it('SettingsRow gives focus back to its action button', () => {
    const dom = fakeDom();
    const action = { id: 'forget', label: 'Forget', confirm: 'Forget the cache?', onSelect: vi.fn() };
    const row = mountHook(() => SettingsRowActionButton({ action, disabled: false }));
    const triggerRef = row.current.props.ref;
    row.act((tree) => tree.props.onClick());
    wire({ holdRef: row.current.props.ask.holdRef, triggerRef }, dom);
    dom.cross.focus();
    row.act(goneAfter(dom, (tree) => tree.props.ask.cancel()));
    expect(dom.doc.activeElement).toBe(dom.trigger);
  });

  it('ActionBar keeps focus on the action after the question, unless focus was elsewhere on a cancel', () => {
    const dom = fakeDom();
    const bar = { querySelector: vi.fn(() => dom.trigger) };
    const action = { id: 'delete', label: 'Delete', kind: 'danger', onSelect: vi.fn() };
    const ask = mountHook(() => useAsk({ current: bar }));
    wire({ holdRef: ask.current.holdRef }, dom);
    const run = (end) => {
      ask.act((a) => a.ask(action));
      dom.cross.focus();
      ask.act(goneAfter(dom, end));
    };
    run((a) => a.cancel());
    expect(dom.trigger.focus).toHaveBeenCalledTimes(1);
    run((a) => a.confirm());
    expect(dom.trigger.focus).toHaveBeenCalledTimes(2);
    ask.act((a) => a.ask(action));
    dom.field.focus();
    ask.act(() => page.press('Escape'));
    expect(dom.trigger.focus).toHaveBeenCalledTimes(2);
    expect(dom.doc.activeElement).toBe(dom.field);
  });
});

describe('a question that goes away with its part runs onCancel', () => {
  const settled = () => Promise.resolve();

  it('when the part unmounts while it asks', async () => {
    const onCancel = vi.fn();
    const ask = mountHook(() => useConfirmAsk({ onConfirm: vi.fn(), onCancel }));
    ask.act((a) => a.ask('row'));
    ask.unmount();
    await settled();
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledWith('row');
  });

  it('and not when it unmounts idle, after a confirm or for a remount in strict mode', async () => {
    const onCancel = vi.fn();
    const idle = mountHook(() => useConfirmAsk({ onConfirm: vi.fn(), onCancel }));
    idle.unmount();
    const confirmed = mountHook(() => useConfirmAsk({ onConfirm: vi.fn(), onCancel }));
    confirmed.act((a) => a.ask('row'));
    confirmed.current.confirm();
    confirmed.unmount();
    const strict = mountHook(() => useConfirmAsk({ onConfirm: vi.fn(), onCancel, initial: 'row' }));
    strict.strictRemount();
    await settled();
    expect(onCancel).not.toHaveBeenCalled();
    expect(strict.current.asking).toBe('row');
  });
});
