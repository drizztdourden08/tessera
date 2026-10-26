/* @layer renderer-components @kind util */
const scrollToCenter = (target: HTMLElement): void => {
  target.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
};

export { scrollToCenter };
