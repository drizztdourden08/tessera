/* @layer renderer-components @kind component */
import './Card.css';
import { CardHeader } from './sub-components/CardHeader';
import type { CardProps } from './Card.type';

const Card = (props: CardProps) => {
  const { variant = 'default', fill = false, flush = false, title, subtitle, actions, count, hideZero, tone, level, children, className = '', ...rest } = props;
  const headed = title !== undefined && title !== null;
  const classes = ['card', `card--${variant}`, headed && 'card--headed', fill && 'card--fill', flush && 'card--flush', className].filter(Boolean).join(' ');

  if (!headed) return <div className={classes} {...rest}>{children}</div>;
  return (
    <div className={classes} {...rest}>
      <CardHeader title={title} subtitle={subtitle} actions={actions} count={count} hideZero={hideZero} tone={tone} level={level} />
      <div className="card__body">{children}</div>
    </div>
  );
};

export {
  Card,
};
