/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Card } from '../../../primitives/Card';
import { Span } from '../../../primitives/text-elements';
import { Title } from '../../../primitives/Title';
import { ActionBar } from '../../ActionBar';
import type { SeatCardHeldProps } from '../SeatCard.type';

const SeatCardHeld = ({ label, hint, actions = [], level = 3, className }: SeatCardHeldProps) => (
  <Card className={className ? `seat-card ${className}` : 'seat-card'} data-state="held">
    <Box className="seat-card__text">
      <Title level={level} className="seat-card__name">{label}</Title>
      {hint !== undefined && <Span className="seat-card__meta">{hint}</Span>}
    </Box>
    {actions.length > 0 && <Box className="seat-card__actions"><ActionBar actions={actions} size="sm" keep={1} /></Box>}
  </Card>
);

export { SeatCardHeld };
