/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { brandLogoUri } from './brand-logo';
import { buildTitleMenu } from './data-title-menu';
import { titleBarActions } from './title-bar-actions';
import { TitleBarViewMarksDemo } from './TitleBarViewMarksDemo';

const ignore = (): void => undefined;

const ViewStates = {
  name: 'The View sub-menu with the pin off and on',
  render: () => <TitleBarViewMarksDemo title="Brock Demo" logo={brandLogoUri('brock')} menu={buildTitleMenu(ignore, false)} actions={titleBarActions(ignore)} />,
} satisfies StoryLiteStoryDefinition;

export { ViewStates };
