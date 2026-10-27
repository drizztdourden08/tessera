/* @layer renderer-components @kind component */
import type { SeatCardProps } from './SeatCard.type';
import { SeatCardAdd } from './sub-components/SeatCardAdd';
import { SeatCardEmpty } from './sub-components/SeatCardEmpty';
import { SeatCardFilled } from './sub-components/SeatCardFilled';
import './SeatCard.css';

const SeatCard = (props: SeatCardProps) => {
  if (props.state === 'add') return <SeatCardAdd {...props} />;
  if (props.state === 'empty') return <SeatCardEmpty {...props} />;
  return <SeatCardFilled {...props} />;
};

export { SeatCard };
