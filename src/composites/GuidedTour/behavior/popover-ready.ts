/* @layer renderer-components @kind util */
const popoverReady = (): boolean => typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;

export { popoverReady };
