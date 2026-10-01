/* @layer renderer-components @kind util */
import type { CaretPlace } from './pattern-field.type';

const applyCaret = (node: HTMLElement, place: CaretPlace): void => {
  if (node.tagName !== 'INPUT') return;
  const input = node as HTMLInputElement;
  if (place === 'all') {
    input.select();
    return;
  }
  const at = place === 'start' ? 0 : input.value.length;
  input.setSelectionRange(at, at);
};

export { applyCaret };
