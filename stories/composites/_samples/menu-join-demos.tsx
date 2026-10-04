/* @layer stories @kind story */
import { DropdownMenu } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { JOIN_MENUS, MARKS_MENU } from './data-menu-joins';

const JoinDemos = () => (
  <Demonstrator
    rows={axis(Object.keys(JOIN_MENUS))}
    align="start"
    cell={(where) => <DropdownMenu inline groups={JOIN_MENUS[where] ?? []} />}
  />
);

const MarksDemo = () => <DropdownMenu inline groups={MARKS_MENU} />;

export { JoinDemos, MarksDemo };
