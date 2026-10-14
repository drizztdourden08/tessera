/* @layer stories @kind component */
import { RATING_MAX } from './Rating.constants';
import type { RatingProps } from './Rating.type';
import { RATING_STRINGS } from './rating-strings.constants';
import { RatingPicker } from './sub-components/RatingPicker';
import { RatingShow } from './sub-components/RatingShow';
import './Rating.css';

const Rating = (props: RatingProps) => {
  const { value, count, showValue = false, max = RATING_MAX, size = 'md', onChange, disabled = false, label, className } = props;
  if (!onChange) return <RatingShow value={value} count={count} showValue={showValue} max={max} size={size} label={label} className={className} />;
  return <RatingPicker value={value} max={max} size={size} label={label ?? RATING_STRINGS.pickLabel} disabled={disabled} onChange={onChange} />;
};

export { Rating };
