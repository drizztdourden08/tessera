/* @layer renderer-components @kind component */
import './Card.css';
import { CardHeader } from './sub-components/CardHeader';
import type { CardProps } from './Card.type';

const Card = (props: CardProps) => {
  const { variant = 'default', title, subtitle, actions, count, tone, level, children, className = '', ...rest } = props;
  const headed = title !== undefined && title !== null;
  const classes = ['card', `card--${variant}`, headed && 'card--headed', className].filter(Boolean).join(' ');

  if (!headed) return <div className={classes} {...rest}>{children}</div>;
  return (
    <div className={classes} {...rest}>
      <CardHeader title={title} subtitle={subtitle} actions={actions} count={count} tone={tone} level={level} />
      <div className="card__body">{children}</div>
    </div>
  );
};

export {
  Card,
};
