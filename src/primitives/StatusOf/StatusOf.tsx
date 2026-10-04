/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { Status } from '../Status';
import type { StatusMap, StatusOfProps } from './StatusOf.type';

const StatusOf = <Map extends StatusMap>(props: StatusOfProps<Map>) => {
  const { map, value, fallback, dot, ...rest } = props;
  const key = value ?? fallback;
  const def = (key === undefined ? undefined : map[key]) ?? (fallback === undefined ? undefined : map[fallback]);
  if (!def) return null;
  return (
    <Status {...rest} tone={def.tone} pulse={def.pulse} dot={dot && !def.icon} data-status={key}>
      {def.icon && <Icon name={def.icon} size={rest.variant === 'pill' ? 10 : 12} aria-hidden />}
      {def.label}
    </Status>
  );
};

export { StatusOf };
