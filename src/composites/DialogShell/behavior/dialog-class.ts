/* @layer renderer-components @kind logic */
import type { DialogShellProps } from '../DialogShell.type';

const dialogClass = (props: Pick<DialogShellProps, 'size' | 'steady' | 'className'>): string => {
  const { size = 'sm', steady = false, className = '' } = props;
  return ['dialog', `dialog--${size}`, steady ? 'dialog--steady' : '', className].filter(Boolean).join(' ');
};

export { dialogClass };
