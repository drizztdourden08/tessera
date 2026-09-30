/* @layer renderer-components @kind component */
import './Badge.css';
import type { BadgeProps } from './Badge.type';

const Badge = (props: BadgeProps) => {
  const { variant = 'neutral', pulse = false, className = '', children, ...rest } = props;

  return (
    <span className={`badge badge--${variant}${pulse ? ' badge--pulse' : ''}${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </span>
  );
};

export {
  Badge,
};
