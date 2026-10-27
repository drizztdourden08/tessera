/* @layer renderer-components @kind component */
import { badgeClass } from './behavior/badge-class';
import { badgeText } from './behavior/badge-text';
import { warnBadgeText } from './behavior/warn-badge-text';
import { BadgeIcon } from './sub-components/BadgeIcon';
import type { BadgeProps } from './Badge.type';
import './Badge.css';

const Badge = <S extends string = string>(props: BadgeProps<S>) => {
  const { label, value, max, hideZero, children, icon } = props;
  warnBadgeText(value);
  const text = badgeText(value, max, hideZero);
  const hosted = children !== undefined && children !== null;
  if (text === '' && props.variant !== 'dot') return hosted ? <>{children}</> : null;
  const badge = (
    <span
      className={badgeClass(props, text, hosted)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label || text ? undefined : true}
      title={label}
    >
      <BadgeIcon icon={icon} />
      {text}
    </span>
  );

  if (!hosted) return badge;
  return <span className="badge-host">{children}{badge}</span>;
};

export { Badge };
