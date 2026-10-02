/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { useScrollSpy } from './behavior/useScrollSpy';
import { NO_ANCHORS } from './SettingsPage.constants';
import { SettingsPageHead } from './sub-components/SettingsPageHead';
import { SettingsPageStrip } from './sub-components/SettingsPageStrip';
import type { SettingsPageProps } from './SettingsPage.type';
import '../../theme/page-card.css';
import './SettingsPage.css';

const SettingsPage = (props: SettingsPageProps) => {
  const { icon, title, backdrop, anchors = NO_ANCHORS, tabs, scroll = true, compact, actions, children, className = '' } = props;
  const ids = useMemo(() => anchors.map((a) => a.id), [anchors]);
  const { bodyRef, activeId, compact: scrolled, jumpTo } = useScrollSpy(ids);
  const classes = ['settings-page', 'page-card', (compact ?? scrolled) ? 'settings-page--compact' : '', className].filter(Boolean).join(' ');

  return (
    <Box as="section" className={classes} aria-label={title}>
      <SettingsPageHead icon={icon} title={title} backdrop={backdrop} actions={actions}>
        <SettingsPageStrip title={title} tabs={tabs} anchors={anchors} activeId={activeId} onJump={jumpTo} />
      </SettingsPageHead>
      {scroll
        ? <ScrollArea ref={bodyRef} className="settings-page__body">{children}</ScrollArea>
        : <Box ref={bodyRef} className="settings-page__body settings-page__body--fixed">{children}</Box>}
    </Box>
  );
};

export { SettingsPage };
