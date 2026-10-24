/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import type { MenuNode } from '../../../src/composites';
import { brandLogoUri } from './brand-logo';
import { buildTitleMenu } from './data-title-menu';
import { titleBarActions } from './title-bar-actions';
import { TitleBarViewDemo } from './TitleBarViewDemo';
import { TitleBarViewMarksDemo } from './TitleBarViewMarksDemo';

const ignore = (): void => undefined;

const APP_VIEW_ITEMS: MenuNode[] = [
  { id: 'grid', kind: 'check', label: 'Show grid', checked: true, onSelect: ignore },
  { id: 'rulers', kind: 'check', label: 'Show rulers', checked: false, onSelect: ignore },
];

const ViewStates = {
  name: 'The View sub-menu with the pin off and on',
  render: () => <TitleBarViewMarksDemo title="Brock Demo" logo={brandLogoUri('brock')} menu={buildTitleMenu(ignore, false)} actions={titleBarActions(ignore)} />,
} satisfies StoryLiteStoryDefinition;

const ViewAppEntries = {
  name: 'App entries in the View sub-menu',
  render: () => (
    <TitleBarViewDemo
      title="Brock Demo"
      logo={brandLogoUri('brock')}
      menu={buildTitleMenu(ignore, false)}
      actions={titleBarActions(ignore)}
      view={undefined}
      viewItems={APP_VIEW_ITEMS}
      code="viewItems"
      caption="viewItems adds Show grid and Show rulers to View, after the pin and full screen rows and a separator."
    />
  ),
} satisfies StoryLiteStoryDefinition;

export { ViewAppEntries, ViewStates };
