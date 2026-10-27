/* @layer renderer-components @kind util */
const measureFit = (node: HTMLElement): ((candidate: string) => boolean) => {
  const room = node.getBoundingClientRect().width;
  const context = node.ownerDocument.createElement('canvas').getContext('2d');
  const style = node.ownerDocument.defaultView?.getComputedStyle(node);
  if (room === 0 || context === null || style === undefined) return () => true;
  context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return (candidate) => context.measureText(candidate).width <= room;
};

export { measureFit };
