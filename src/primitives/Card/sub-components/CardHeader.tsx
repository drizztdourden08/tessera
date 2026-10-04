/* @layer renderer-components @kind component */
import { SectionHeader } from '../../SectionHeader';
import type { CardHeaderProps } from './CardHeader.type';

const CardHeader = (props: CardHeaderProps) => {
  const { title, subtitle, actions, count, tone = 'neutral', level } = props;
  return (
    <SectionHeader
      title={title}
      subtitle={subtitle}
      action={actions}
      count={count}
      level={level}
      className={`card__header card__header--${tone}`}
    />
  );
};

export { CardHeader };
