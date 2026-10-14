/* @layer stories @kind component */
import { Box, Pressable } from '../../../../src/primitives';
import { useRatingPick } from '../behavior/useRatingPick';
import { starFill } from '../behavior/star-fill';
import { RATING_STRINGS } from '../rating-strings.constants';
import type { RatingPickerProps } from '../Rating.type';
import { RatingStar } from './RatingStar';

const RatingPicker = (props: RatingPickerProps) => {
  const { value, max, size, label, disabled, onChange } = props;
  const pick = useRatingPick(value, max, onChange);
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <Box
      as="span"
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={`rating rating--${size} rating--pick`}
      onKeyDown={disabled ? undefined : pick.onKeyDown}
      onMouseLeave={() => pick.hover(null)}
    >
      {stars.map((star) => (
        <Pressable
          key={star}
          role="radio"
          aria-checked={value === star}
          aria-label={RATING_STRINGS.star(star)}
          data-star={star}
          tabIndex={star === pick.tabStop ? 0 : -1}
          disabled={disabled}
          className="rating__pick"
          onMouseEnter={() => pick.hover(star)}
          onClick={() => onChange(star)}
        >
          <RatingStar fill={starFill(pick.shown, star)} size={size} />
        </Pressable>
      ))}
    </Box>
  );
};

export { RatingPicker };
