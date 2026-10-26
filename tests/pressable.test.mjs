/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { Pressable } from '../src/primitives/Pressable';

describe('Pressable menu pass-through', () => {
  it('hands onContextMenu and onKeyDown to its button, so Menu and Shift+F10 reach the app', () => {
    const onContextMenu = vi.fn();
    const onKeyDown = vi.fn();
    const element = Pressable.render({ onContextMenu, onKeyDown, children: 'Load' }, null);
    expect(element.type).toBe('button');
    expect(element.props.onContextMenu).toBe(onContextMenu);
    expect(element.props.onKeyDown).toBe(onKeyDown);
  });
});
