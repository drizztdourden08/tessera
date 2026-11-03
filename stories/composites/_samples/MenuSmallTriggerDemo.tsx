/* @layer stories @kind component */
import { DropdownMenu } from '../../../src/composites';
import type { MenuTrigger } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { buildTitleMenu } from './data-title-menu';

const ignore = (): void => undefined;

const triggerOf = (kind: string): MenuTrigger => (kind === 'Icon only' ? { label: 'More', icon: 'ellipsis', iconOnly: true } : { label: 'Menu', iconOnly: true });

const MenuSmallTriggerDemo = () => (
  <Demonstrator
    columns={axis(['Hamburger', 'Icon only'])}
    cell={(_row, kind) => <DropdownMenu trigger={triggerOf(kind)} size="2xs" variant="ghost" groups={buildTitleMenu(ignore)} />}
  />
);

export { MenuSmallTriggerDemo };
