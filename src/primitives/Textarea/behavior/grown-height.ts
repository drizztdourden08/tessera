/* @layer renderer-components @kind logic */
const pixels = (value: string): number => Number.parseFloat(value) || 0;

const lineOf = (style: CSSStyleDeclaration): number => {
  const line = pixels(style.lineHeight);
  return line > 0 ? line : pixels(style.fontSize) * 1.2;
};

const bordersOf = (style: CSSStyleDeclaration): number => pixels(style.borderTopWidth) + pixels(style.borderBottomWidth);

const paddingOf = (style: CSSStyleDeclaration): number => pixels(style.paddingTop) + pixels(style.paddingBottom);

const grownHeight = (area: HTMLTextAreaElement, maxRows: number | undefined): number => {
  const style = getComputedStyle(area);
  const outer = style.boxSizing === 'border-box' ? bordersOf(style) : 0;
  const wanted = area.scrollHeight + outer;
  if (maxRows === undefined) return wanted;
  return Math.min(wanted, lineOf(style) * maxRows + paddingOf(style) + outer);
};

export { grownHeight };
