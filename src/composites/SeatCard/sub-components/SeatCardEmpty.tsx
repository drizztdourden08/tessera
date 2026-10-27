/* @layer renderer-components @kind component */
import { Card } from '../../../primitives/Card';
import { EmptyState } from '../../../primitives/EmptyState';
import type { SeatCardEmptyProps } from '../SeatCard.type';

const SeatCardEmpty = ({ label, hint, className }: SeatCardEmptyProps) => (
  <Card className={className ? `seat-card ${className}` : 'seat-card'} data-state="empty">
    <EmptyState size="sm" message={label} hint={hint} />
  </Card>
);

export { SeatCardEmpty };
