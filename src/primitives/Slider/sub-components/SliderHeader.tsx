/* @layer renderer-components @kind component */
import type { SliderHeaderProps } from './SliderHeader.type';

const SliderHeader = (props: SliderHeaderProps) => {
  const { label, description } = props;
  if (![label, description].some(Boolean)) return null;
  return (
    <div className="slider__header">
      <span className="slider__text">
        {label && <span className="slider__label">{label}</span>}
        {description && <span className="slider__description">{description}</span>}
      </span>
    </div>
  );
};

export { SliderHeader };
