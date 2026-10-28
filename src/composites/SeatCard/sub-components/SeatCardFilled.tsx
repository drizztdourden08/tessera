/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Card } from '../../../primitives/Card';
import { ActionBar } from '../../ActionBar';
import { flag } from '../behavior/flag';
import type { SeatCardFilledProps } from '../SeatCard.type';
import { SeatCardText } from './SeatCardText';

const SeatCardFilled = (props: SeatCardFilledProps) => {
  const { state, name, lead, meta, reason, actions = [], onSelect, selected, level = 3, className } = props;
  const attention = state === 'attention';
  return (
    <Card
      className={className ? `seat-card ${className}` : 'seat-card'}
      edge={attention ? 'border' : undefined}
      edgeTone={attention ? 'warning' : undefined}
      data-state={state}
      data-opens={flag(onSelect !== undefined)}
      data-selected={flag(selected)}
    >
      <Box className="seat-card__seat">
        {lead !== undefined && <Box className="seat-card__lead">{lead}</Box>}
        <SeatCardText name={name} meta={meta} reason={attention ? reason : undefined} onSelect={onSelect} selected={selected} level={level} />
      </Box>
      {actions.length > 0 && <Box className="seat-card__actions"><ActionBar actions={actions} size="sm" keep={1} /></Box>}
    </Card>
  );
};

export { SeatCardFilled };
