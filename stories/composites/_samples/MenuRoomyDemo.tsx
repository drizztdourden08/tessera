/* @layer stories @kind component */
import { DropdownMenu } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { EDIT_MENU } from './data-menu-features';

const MenuRoomyDemo = () => (
  <Demonstrator
    columns={axis(['default', 'roomy'] as const)}
    valign="start"
    cell={(_row, size) => <DropdownMenu inline itemSize={size} groups={EDIT_MENU} />}
  />
);

export { MenuRoomyDemo };
