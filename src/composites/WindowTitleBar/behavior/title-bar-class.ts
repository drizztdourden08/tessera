/* @layer renderer-components @kind logic */
const titleBarClass = (tucked: boolean, peeking: boolean, className: string): string =>
  ['window-title-bar', 'window-chrome', tucked && 'window-title-bar--concealed', tucked && peeking && 'window-title-bar--peek', className]
    .filter(Boolean)
    .join(' ');

export { titleBarClass };
