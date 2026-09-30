/* @layer renderer-components @kind component */
import './Status.css';
import type { StatusProps } from './Status.type';

const Status = (props: StatusProps) => {
  const { tone = 'neutral', variant = 'text', dot = false, pulse = false, className = '', children, ...rest } = props;
  const cls = [
    'status', `status--${variant}`, `status--${tone}`, dot && 'status--dot', pulse && 'status--pulse', className,
  ].filter(Boolean).join(' ');

  return (
    <span className={cls} {...rest}>
      {dot && <span className="status__dot" aria-hidden />}
      {children}
    </span>
  );
};

export { Status };
