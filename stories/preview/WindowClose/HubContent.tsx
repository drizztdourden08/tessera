/* @layer stories @kind component */
import { useState } from 'react';
import { ScreenPage, SideNavLayout } from '../../../src/composites';
import { EmptyState, Icon } from '../../../src/primitives';
import { ProfilesBody } from './ProfilesBody';
import { DATA_NAV, DATA_PAGES } from './window-close.constants';
import type { HubContentProps } from './window-close.type';

const HubContent = ({ close }: HubContentProps) => {
  const [pageId, setPageId] = useState('profiles');
  const page = DATA_PAGES.find((entry) => entry.id === pageId) ?? DATA_PAGES[0];
  return (
    <SideNavLayout paneScroll="none" nav={{ config: DATA_NAV, activeId: pageId, onSelect: setPageId, defaultOpen: false, ariaLabel: 'Data pages' }}>
      <ScreenPage icon={<Icon name={page?.icon ?? 'users'} />} title={page?.label ?? ''} scroll={false} actions={close}>
        {pageId === 'profiles' ? <ProfilesBody /> : <EmptyState message="Only Profiles is drawn in this preview." />}
      </ScreenPage>
    </SideNavLayout>
  );
};

export { HubContent };
