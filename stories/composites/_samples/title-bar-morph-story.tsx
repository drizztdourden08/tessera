/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { DropdownMenu, WindowTitleBar } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { buildTitleMenu } from './data-title-menu';
import { MorphToggle } from './MorphToggle';

const ROWS = [{ key: 'title', label: 'Title bar main menu' }, { key: 'other', label: 'Any other menu button' }] as const;
const COLUMNS = ['Closed', 'Open', 'Click to switch', 'With its menu'] as const;
const ignore = (): void => undefined;
const MENU = buildTitleMenu(ignore, false);

const withMenu = (row: string) => (row === 'title'
  ? (
    <Box className="window-title-bar-story__strip window-title-bar-story__strip--260">
      <WindowTitleBar title="Brock" menu={MENU} controls={false} onControl={ignore} />
    </Box>
  )
  : <DropdownMenu trigger={{ label: 'Menu', iconOnly: true }} groups={MENU} />);

const cell = (row: string, column: string) => {
  const titleBar = row === 'title';
  if (column === 'Closed') return <MorphToggle titleBar={titleBar} open={false} />;
  if (column === 'Open') return <MorphToggle titleBar={titleBar} open />;
  if (column === 'Click to switch') return <MorphToggle titleBar={titleBar} />;
  return withMenu(row);
};

const Morph = {
  name: 'The main menu button turns into an X while its menu is open',
  render: () => <Demonstrator corner="Button" rows={ROWS} columns={axis(COLUMNS)} cell={cell} />,
} satisfies StoryLiteStoryDefinition;

export { Morph };
