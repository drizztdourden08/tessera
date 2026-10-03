/* @layer stories @kind data */
import type { WorkspaceContent, WorkspacePage } from '../../../src/composites';
import { Icon, Paragraph } from '../../../src/primitives';
import type { IconName } from '../../../src/primitives';
import {
  accountSections, audioSections, controlsSections, displaySections, generalSections,
} from './settings-sample-sections';
import type { SampleState } from './settings-sample-state';

const icon = (name: IconName) => <Icon name={name} />;

const HOME: WorkspacePage = {
  id: 'home',
  title: 'Overview',
  icon: icon('house'),
  keywords: 'start summary',
  content: <Paragraph tone="muted">The overview page takes any content. The other pages are built from the settings model, which also feeds the side nav, the header pills and the search.</Paragraph>,
};

const workspaceSample = (state: SampleState): WorkspaceContent => ({
  home: HOME,
  groups: [
    {
      id: 'app',
      label: 'App',
      pages: [
        { id: 'general', title: 'General', icon: icon('settings'), sections: generalSections(state) },
        { id: 'display', title: 'Display', icon: icon('monitor'), sections: displaySections(state) },
        { id: 'audio', title: 'Audio', icon: icon('volume-2'), sections: audioSections(state) },
      ],
    },
    {
      id: 'you',
      label: 'You',
      pages: [
        { id: 'account', title: 'Account', icon: icon('user'), sections: accountSections(state) },
        { id: 'controls', title: 'Controls', icon: icon('keyboard'), sections: controlsSections(state) },
      ],
    },
  ],
});

export { workspaceSample };
