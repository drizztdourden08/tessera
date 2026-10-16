/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { brandLogoUri } from './brand-logo';
import { buildTitleMenu } from './data-title-menu';
import { titleBarActions } from './title-bar-actions';
import { TitleBarTuckedDemo } from './TitleBarTuckedDemo';

const ignore = (): void => undefined;

const ViewHiddenNarrow = {
  name: 'View hidden on a narrow window, tucked buttons in the main menu',
  render: () => <TitleBarTuckedDemo title="Brock Demo" logo={brandLogoUri('brock')} menu={buildTitleMenu(ignore, false)} actions={titleBarActions(ignore)} />,
} satisfies StoryLiteStoryDefinition;

export { ViewHiddenNarrow };
