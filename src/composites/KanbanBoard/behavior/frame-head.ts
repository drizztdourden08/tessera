/* @layer renderer-components @kind logic */
const frameHead = <Frame extends { part: string }>(frame: Frame | undefined): Frame | undefined =>
  frame?.part === 'first' || frame?.part === 'only' ? frame : undefined;

export { frameHead };
