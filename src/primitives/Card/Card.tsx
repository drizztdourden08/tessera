/* @layer renderer-components @kind component */
import './Card.css';
import { CardHeader } from './sub-components/CardHeader';
import { cardClass } from './behavior/card-class';
import type { CardProps } from './Card.type';

const Card = (props: CardProps) => {
  const { variant, edgeTone, edge, fill, flush, title, subtitle, actions, count, hideZero, tone, level, children, className, ...rest } = props;
  const headed = title !== undefined && title !== null;
  const classes = cardClass(props, headed);

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
