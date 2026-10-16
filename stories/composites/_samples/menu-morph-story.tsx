/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { DropdownMenu } from '../../../src/composites';
import type { MenuVariant } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { buildTitleMenu } from './data-title-menu';
import { MorphToggle } from './MorphToggle';

const ROWS = [{ key: 'primary', label: 'Title bar' }, { key: 'ghost', label: 'Site header' }] as const;
const COLUMNS = ['Closed', 'Open', 'Click to switch', 'With its menu'] as const;
const ignore = (): void => undefined;

const cell = (variant: MenuVariant, column: string) => {
  if (column === 'Closed') return <MorphToggle variant={variant} open={false} />;
  if (column === 'Open') return <MorphToggle variant={variant} open />;
  if (column === 'Click to switch') return <MorphToggle variant={variant} />;
  return <DropdownMenu trigger={{ label: 'Menu', iconOnly: true }} variant={variant} groups={buildTitleMenu(ignore)} />;
};

const Morph = {
  name: 'The hamburger turns into an X while its menu is open',
  render: () => <Demonstrator corner="Used in" rows={ROWS} columns={axis(COLUMNS)} cell={cell} />,
} satisfies StoryLiteStoryDefinition;

export { Morph };
