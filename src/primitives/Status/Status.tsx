/* @layer renderer-components @kind component */
import './Status.css';
import { Icon } from '../Icon';
import { drawStatus } from './behavior/draw-status';
import { statusClass } from './behavior/status-class';
import { statusLook } from './behavior/status-look';
import type { StatusMap, StatusProps } from './Status.type';

const Status = <Map extends StatusMap>(props: StatusProps<Map>) => {
  const drawn = drawStatus(props);
  if (!drawn) return null;
  const { variant, size, dot, dotSize, halo, className = '', map, value, fallback, tone, pulse, children, ...rest } = props;
  const look = statusLook({ variant, size, dot, dotSize, halo }, drawn);

  return (
    <span className={statusClass(drawn, look, className)} data-status={drawn.key} {...rest}>
      {look.withDot && <span className="status__dot" aria-hidden />}
      {drawn.icon && <Icon name={drawn.icon} size={look.variant === 'pill' ? 10 : 12} aria-hidden />}
      {drawn.label}
    </span>
  );
};

export { Status };
