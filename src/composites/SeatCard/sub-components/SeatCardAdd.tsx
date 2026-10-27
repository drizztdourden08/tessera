/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { ADD_ICON_SIZE } from '../SeatCard.constants';
import type { SeatCardAddProps } from '../SeatCard.type';

const SeatCardAdd = ({ label, onSelect, disabled, className }: SeatCardAddProps) => (
  <Pressable
    className={className ? `seat-card seat-card--add ${className}` : 'seat-card seat-card--add'}
    data-state="add"
    disabled={disabled}
    onClick={onSelect}
  >
    <Icon name="plus" size={ADD_ICON_SIZE} aria-hidden />
    <Span className="seat-card__add-label">{label}</Span>
  </Pressable>
);

export { SeatCardAdd };
