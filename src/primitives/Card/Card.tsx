/* @layer renderer-components @kind component */
import './Card.css';
import '../../theme/glass-panel.css';
import { cardActivation } from './behavior/card-activation';
import { cardClass } from './behavior/card-class';
import { CardHeader } from './sub-components/CardHeader';
import type { CardProps } from './Card.type';

const Card = (props: CardProps) => {
  const { variant, surface: look, edgeTone, edge, fill, flush, container, header, title, subtitle, actions, count, hideZero, tone, level, children, className, onActivate, ...rest } = props;
  const headed = (header ?? title) != null;
  const classes = cardClass({ ...props, variant: variant ?? (onActivate === undefined ? undefined : 'interactive') }, headed);
  const surface = { ...rest, ...cardActivation(onActivate, rest) };

  if (!headed) return <div className={classes} {...surface}>{children}</div>;
  return (
    <div className={classes} {...surface}>
      <CardHeader header={header} title={title} subtitle={subtitle} actions={actions} count={count} hideZero={hideZero} tone={tone} level={level} />
      <div className="card__body">{children}</div>
    </div>
  );
};

export {
  Card,
};
