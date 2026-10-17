/* @layer renderer-components @kind component */
import { SectionHeader } from '../../SectionHeader';
import type { CardHeaderProps } from './CardHeader.type';
import './CardHeader.css';

const CardHeader = (props: CardHeaderProps) => {
  const { title, subtitle, actions, count, hideZero, tone = 'neutral', level } = props;
  return (
    <SectionHeader
      title={title}
      subtitle={subtitle}
      action={actions}
      count={count}
      hideZero={hideZero}
      level={level}
      className={`card__header card__header--${tone}`}
    />
  );
};

export { CardHeader };
