/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Status } from '../../../primitives/Status';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { TREND_ICON_SIZE, TREND_ICONS, TREND_WORDS } from '../StatTile.constants';
import type { StatTileDeltaProps } from './StatTileDelta.type';

const StatTileDelta = (props: StatTileDeltaProps) => {
  const { delta, trend, tone } = props;
  const { charts } = useTesseraStrings();
  return (
    <Status tone={tone} className="stat-tile__delta">
      {trend && <Icon name={TREND_ICONS[trend]} size={TREND_ICON_SIZE} label={charts[TREND_WORDS[trend]]} />}
      {delta}
    </Status>
  );
};

export { StatTileDelta };
