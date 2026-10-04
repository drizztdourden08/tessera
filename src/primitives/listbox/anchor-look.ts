/* @layer renderer-components @kind util */
const pixels = (text: string | undefined): number => Number.parseFloat(text ?? '') || 0;

const anchorLook = (anchor: HTMLElement | null, view: Window): { line: number; radius: number } => {
  const style = anchor ? view.getComputedStyle(anchor) : null;
  return {
    line: pixels(style?.borderBottomWidth),
    radius: Math.max(pixels(style?.borderTopLeftRadius), pixels(style?.borderBottomLeftRadius)),
  };
};

export { anchorLook };
