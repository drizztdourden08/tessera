/* @layer renderer-components @kind component */
import './ButtonGroup.css';
import type { ButtonGroupProps } from './ButtonGroup.type';

const ButtonGroup = (props: ButtonGroupProps) => {
  const { orientation = 'horizontal', className = '', children, ...rest } = props;
  const cls = ['btn-group', `btn-group--${orientation}`, className].filter(Boolean).join(' ');
  return (
    <div role="group" className={cls} {...rest}>
      {children}
    </div>
  );
};

export { ButtonGroup };
