/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { ScreenPage } from '../ScreenPage';
import { useScrollSpy } from './behavior/useScrollSpy';
import { NO_ANCHORS } from './SettingsPage.constants';
import { SettingsPageStrip } from './sub-components/SettingsPageStrip';
import type { SettingsPageProps } from './SettingsPage.type';
import './SettingsPage.css';

const SettingsPage = (props: SettingsPageProps) => {
  const { icon, title, back, backdrop = null, anchors = NO_ANCHORS, tabs, scroll = true, compact, actions, children, className = '' } = props;
  const ids = useMemo(() => anchors.map((a) => a.id), [anchors]);
  const { bodyRef, activeId, jumpTo } = useScrollSpy(ids);

  return (
    <ScreenPage
      icon={icon}
      title={title}
      back={back}
      backdrop={backdrop}
      strip={<SettingsPageStrip title={title} tabs={tabs} anchors={anchors} activeId={activeId} onJump={jumpTo} />}
      actions={actions}
      scroll={scroll}
      compact={compact}
      bodyRef={bodyRef}
      className={['settings-page', className].filter(Boolean).join(' ')}
    >
      {children}
    </ScreenPage>
  );
};

export { SettingsPage };
