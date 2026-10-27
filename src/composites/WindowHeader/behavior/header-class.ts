/* @layer renderer-components @kind util */
const headerClass = (titleWrap: boolean | undefined, className: string): string =>
  ['window-header', titleWrap && 'window-header--wrap', className, 'window-chrome'].filter(Boolean).join(' ');

export { headerClass };
