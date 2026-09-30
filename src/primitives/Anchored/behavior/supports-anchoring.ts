/* @layer renderer-components @kind util */
const checked = new WeakMap<Window, boolean>();

const probe = (view: Window & typeof globalThis): boolean =>
  view.CSS.supports('anchor-name: --anchored')
  && view.CSS.supports('position-try-fallbacks: flip-block')
  && 'showPopover' in view.HTMLElement.prototype;

const supportsAnchoring = (view: Window): boolean => {
  const known = checked.get(view);
  if (known !== undefined) return known;
  const result = probe(view as Window & typeof globalThis);
  checked.set(view, result);
  return result;
};

export { supportsAnchoring };
