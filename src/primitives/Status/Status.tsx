/* @layer renderer-components @kind component */
import './Status.css';
import { Icon } from '../Icon';
import { drawStatus } from './behavior/draw-status';
import { statusClass } from './behavior/status-class';
import type { StatusMap, StatusProps } from './Status.type';

const Status = <Map extends StatusMap>(props: StatusProps<Map>) => {
  const drawn = drawStatus(props);
  if (!drawn) return null;
  const { variant = 'text', dot = false, className = '', map, value, fallback, tone, pulse, children, ...rest } = props;
  const withDot = dot && !drawn.icon;

  return (
    <span className={statusClass(drawn, variant, withDot, className)} data-status={drawn.key} {...rest}>
      {withDot && <span className="status__dot" aria-hidden />}
      {drawn.icon && <Icon name={drawn.icon} size={variant === 'pill' ? 10 : 12} aria-hidden />}
      {drawn.label}
    </span>
  );
};

export { Status };
