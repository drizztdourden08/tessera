/* @layer renderer-components @kind util */
const nextFrame = (view: Window) => (): Promise<void> =>
  new Promise((resolve) => { view.requestAnimationFrame(() => resolve()); });

export { nextFrame };
