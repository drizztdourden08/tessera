/* @layer renderer-components @kind component */
import './Card.css';
import { cardClass } from './behavior/card-class';
import { CardHeader } from './sub-components/CardHeader';
import type { CardProps } from './Card.type';

const Card = (props: CardProps) => {
  const { variant, edgeTone, edge, fill, flush, container, header, title, subtitle, actions, count, hideZero, tone, level, children, className, ...rest } = props;
  const headed = (header ?? title) != null;
  const classes = cardClass(props, headed);

  if (!headed) return <div className={classes} {...rest}>{children}</div>;
  return (
    <div className={classes} {...rest}>
      <CardHeader header={header} title={title} subtitle={subtitle} actions={actions} count={count} hideZero={hideZero} tone={tone} level={level} />
      <div className="card__body">{children}</div>
    </div>
  );
};

export {
  Card,
};
