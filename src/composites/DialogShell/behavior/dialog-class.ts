/* @layer renderer-components @kind logic */
import type { DialogShellProps } from '../DialogShell.type';

const dialogClass = (props: Pick<DialogShellProps, 'size' | 'steady' | 'surface' | 'className'>): string => {
  const { size = 'sm', steady = false, surface = 'solid', className = '' } = props;
  return ['dialog', `dialog--${size}`, steady ? 'dialog--steady' : '', surface === 'glass' ? 'surface-glass' : '', className].filter(Boolean).join(' ');
};

export { dialogClass };
