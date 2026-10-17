/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ArmedIconButton } from '../src/composites/ArmedIconButton';
import { CONFIRM_AGAIN_MS } from '../src/composites/ConfirmIconButton/behavior/useConfirmAsk.constants';
import { ITEM_STRINGS } from '../src/primitives/strings/items-strings.constants';
import { escapeDocument } from './escape-document.mjs';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => page }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraStrings', () => ({
  useTesseraStrings: () => ({ items: { confirmAgain: ITEM_STRINGS.confirmAgain } }),
}));

const page = escapeDocument();

const mount = (extra = {}) => {
  const calls = { onConfirm: vi.fn(), onCancel: vi.fn(), onArm: vi.fn() };
  const view = mountHook(() => ArmedIconButton({ icon: 'load-state', label: 'Load Slot 1', ...calls, ...extra }));
  const tooltip = () => view.current.props.children[0];
  const button = () => tooltip().props.children;
  const status = () => view.current.props.children[1];
  return { calls, view, tooltip, button, status, press: () => view.act(() => button().props.onClick()) };
};

const escape = () => ({ key: 'Escape', stopPropagation: vi.fn(), preventDefault: vi.fn() });

describe('ArmedIconButton arms and confirms', () => {
  afterEach(() => vi.useRealTimers());

  it('arms on the first press: the icon morphs and loops, and nothing runs yet', () => {
    const { calls, button, press } = mount();
    expect(button().props['data-armed']).toBeUndefined();
    expect(button().props.children.props).toMatchObject({ name: 'load-state', armed: false, size: 16 });
    press();
    expect(calls.onArm).toHaveBeenCalledTimes(1);
    expect(calls.onConfirm).not.toHaveBeenCalled();
    expect(button().props['data-armed']).toBe(true);
    expect(button().props.children.props.armed).toBe(true);
  });

  it('confirms on the second press and goes back to its still icon', () => {
    const { calls, button, press } = mount();
    press();
    press();
    expect(calls.onConfirm).toHaveBeenCalledTimes(1);
    expect(calls.onCancel).not.toHaveBeenCalled();
    expect(button().props.children.props.armed).toBe(false);
  });

  it('disarms after the shared timeout, and runs onCancel', () => {
    vi.useFakeTimers();
    const { calls, button, view, press } = mount();
    press();
    view.act(() => vi.advanceTimersByTime(CONFIRM_AGAIN_MS - 1));
    expect(button().props.children.props.armed).toBe(true);
    view.act(() => vi.advanceTimersByTime(1));
    expect(button().props.children.props.armed).toBe(false);
    expect(calls.onCancel).toHaveBeenCalledTimes(1);
    expect(CONFIRM_AGAIN_MS).toBe(4000);
  });

  it('stays armed with timeout={false} until something else ends it', () => {
    vi.useFakeTimers();
    const { button, view, press } = mount({ timeout: false });
    press();
    view.act(() => vi.advanceTimersByTime(CONFIRM_AGAIN_MS * 10));
    expect(button().props.children.props.armed).toBe(true);
  });

});

describe('ArmedIconButton disarms and speaks', () => {
  it('disarms on blur, on Escape at the button and on an Escape anywhere on the page', () => {
    const { calls, button, view, press } = mount();
    press();
    view.act(() => button().props.onBlur());
    expect(calls.onCancel).toHaveBeenCalledTimes(1);
    press();
    const key = escape();
    view.act(() => button().props.onKeyDown(key));
    expect(key.stopPropagation).toHaveBeenCalled();
    expect(calls.onCancel).toHaveBeenCalledTimes(2);
    press();
    view.act(() => page.press('Escape'));
    expect(calls.onCancel).toHaveBeenCalledTimes(3);
    expect(button().props.children.props.armed).toBe(false);
    view.act(() => button().props.onBlur());
    expect(calls.onCancel).toHaveBeenCalledTimes(3);
  });

  it('drops a waiting press when it turns disabled', () => {
    const { calls, view, press, button } = mount();
    press();
    view.rerender(() => ArmedIconButton({ icon: 'load-state', label: 'Load Slot 1', ...calls, disabled: true }));
    expect(calls.onCancel).toHaveBeenCalledTimes(1);
    expect(button().props.disabled).toBe(true);
  });

  it('names the armed state for screen readers, in the tooltip and once in a status region', () => {
    const { button, tooltip, status, press } = mount();
    expect(button().props.label).toBe('Load Slot 1');
    expect(tooltip().props.content).toBe('Load Slot 1');
    expect(status().props.role).toBe('status');
    expect(status().props.children).toBe('');
    press();
    expect(button().props.label).toBe('Click again to load Slot 1');
    expect(tooltip().props.content).toBe('Click again to load Slot 1');
    expect(status().props.children).toBe('Click again to load Slot 1');
    const own = mount({ armedLabel: 'Press again to load' });
    own.press();
    expect(own.button().props.label).toBe('Press again to load');
  });

  it('is a ghost icon button, coloured by its tone, with the icon sized to the button', () => {
    const plain = mount();
    expect(plain.view.current.props.className).toBe('armed-icon-btn');
    expect(plain.button().props.variant).toBeUndefined();
    const toned = mount({ tone: 'warning', size: 'md', icon: 'save-state', className: 'row-tool' });
    expect(toned.view.current.props.className).toBe('armed-icon-btn armed-icon-btn--warning row-tool');
    expect(toned.button().props.size).toBe('md');
    expect(toned.button().props.children.props).toMatchObject({ name: 'save-state', size: 20 });
  });

  it('starts armed with defaultArmed', () => {
    const { button } = mount({ defaultArmed: true, timeout: false });
    expect(button().props.children.props.armed).toBe(true);
  });
});
