/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { WindowTitleBar } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { brandLogoUri } from './brand-logo';
import { buildTitleMenu } from './data-title-menu';
import { historyActions } from './title-bar-actions';

const ignore = (): void => undefined;

const DisabledActions = {
  name: 'Disabled Undo and Redo, with a reason in the tooltip',
  render: () => (
    <Box className="story-frame window-title-bar-story__frame">
      <WindowTitleBar title="Brock Demo" logo={brandLogoUri('brock')} menu={buildTitleMenu(ignore, false)} actions={historyActions(ignore)} onControl={ignore} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export { DisabledActions };
