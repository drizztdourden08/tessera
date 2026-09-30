/* @layer renderer-components @kind component */
import { Small, Span } from '../../text-elements';
import type { SliderHeaderProps } from './SliderHeader.type';

const SliderHeader = (props: SliderHeaderProps) => {
  const { label, description } = props;
  if (![label, description].some(Boolean)) return null;
  return (
    <div className="slider__header">
      <span className="slider__text">
        {label && <Span className="slider__label">{label}</Span>}
        {description && <Small tone="dim" className="slider__description">{description}</Small>}
      </span>
    </div>
  );
};

export { SliderHeader };
