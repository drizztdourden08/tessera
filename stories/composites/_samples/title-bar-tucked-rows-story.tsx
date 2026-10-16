/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import type { WindowTitleBarTucked } from '../../../src/composites';
import { brandLogoUri } from './brand-logo';
import { buildTitleMenu } from './data-title-menu';
import { titleBarActions } from './title-bar-actions';
import { TitleBarTuckedDemo } from './TitleBarTuckedDemo';

const ignore = (): void => undefined;

const TUCKED: WindowTitleBarTucked = {
  pin: { label: 'Keep on top', group: 'tools', position: 'end' },
  fullscreen: { label: 'Fill the screen', activeLabel: 'Leave full screen', group: 'screens', position: 'end' },
};

const CAPTION = "tucked renames the rows a 400 px bar lists with view={false}: Keep on top ends the tools group, Fill the screen the screens group.";

const TuckedRowsPlaced = {
  name: 'Tucked buttons renamed and moved in the main menu',
  render: () => (
    <TitleBarTuckedDemo
      title="Brock Demo"
      logo={brandLogoUri('brock')}
      menu={buildTitleMenu(ignore, false)}
      actions={titleBarActions(ignore)}
      rows={{ tucked: TUCKED, caption: CAPTION }}
    />
  ),
} satisfies StoryLiteStoryDefinition;

export { TuckedRowsPlaced };
