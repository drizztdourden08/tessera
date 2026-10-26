/* @layer renderer-components @kind util */
const menuClasses = (look: string, inline: boolean, className: string | undefined): string =>
  ['dropdown-menu', 'dropdown-surface', look, inline && 'dropdown-menu--inline', className].filter(Boolean).join(' ');

export { menuClasses };
