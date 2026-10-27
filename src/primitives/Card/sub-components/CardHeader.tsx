/* @layer renderer-components @kind component */
import { SectionHeader } from '../../SectionHeader';
import type { CardHeaderProps } from './CardHeader.type';
import './CardHeader.css';

const CardHeader = (props: CardHeaderProps) => {
  const { header, title, subtitle, actions, count, hideZero, tone = 'neutral', level } = props;
  const className = `card__header card__header--${tone}`;
  if (header != null) return <div className={`${className} card__header--free`}>{header}</div>;
  return (
    <SectionHeader
      title={title}
      subtitle={subtitle}
      action={actions}
      count={count}
      hideZero={hideZero}
      level={level}
      className={className}
    />
  );
};

export { CardHeader };
