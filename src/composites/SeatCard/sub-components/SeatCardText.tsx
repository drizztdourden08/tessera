/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { Status } from '../../../primitives/Status';
import { Span } from '../../../primitives/text-elements';
import { Title } from '../../../primitives/Title';
import type { SeatCardTextProps } from '../SeatCard.type';

const SeatCardText = ({ name, meta, reason, onSelect, level }: SeatCardTextProps) => (
  <Box className="seat-card__text">
    <Title level={level} className="seat-card__name">
      {onSelect ? <Pressable className="seat-card__open" onClick={onSelect}>{name}</Pressable> : name}
    </Title>
    {meta !== undefined && <Span className="seat-card__meta">{meta}</Span>}
    {reason !== undefined && <Status dot tone="warning" className="seat-card__reason">{reason}</Status>}
  </Box>
);

export { SeatCardText };
