/* @layer renderer-components @kind component */
import { badgeClass } from './behavior/badge-class';
import { badgeText } from './behavior/badge-text';
import { warnBadgeText } from './behavior/warn-badge-text';
import type { BadgeProps } from './Badge.type';
import './Badge.css';

const Badge = <S extends string = string>(props: BadgeProps<S>) => {
  const { label, value, max, children } = props;
  warnBadgeText(value);
  const text = badgeText(value, max);
  const hosted = children !== undefined && children !== null;
  const badge = (
    <span
      className={badgeClass(props, text, hosted)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label || text ? undefined : true}
      title={label}
    >
      {text}
    </span>
  );

  if (!hosted) return badge;
  return <span className="badge-host">{children}{badge}</span>;
};

export { Badge };
