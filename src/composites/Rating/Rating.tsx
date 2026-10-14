/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { RATING_MAX } from './Rating.constants';
import type { RatingProps } from './Rating.type';
import { RatingPicker } from './sub-components/RatingPicker';
import { RatingShow } from './sub-components/RatingShow';
import './Rating.css';

const Rating = (props: RatingProps) => {
  const { value, count, showValue = false, max = RATING_MAX, size = 'md', onChange, disabled = false, label, className } = props;
  const { rating } = useTesseraStrings();
  if (!onChange) return <RatingShow value={value} count={count} showValue={showValue} max={max} size={size} label={label} className={className} />;
  return <RatingPicker value={value} max={max} size={size} label={label ?? rating.pickLabel} disabled={disabled} onChange={onChange} className={className} />;
};

export { Rating };
