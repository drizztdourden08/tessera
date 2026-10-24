/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollStrip } from '../../primitives/scroll-strip/ScrollStrip';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../theme/visually-hidden.css';
import { useDocumentTabs } from './behavior/useDocumentTabs';
import { TAB_KEYS } from './DocumentTabs.constants';
import type { DocumentTabsProps } from './DocumentTabs.type';
import { DocumentTab } from './sub-components/DocumentTab';
import { DocumentTabsMenu } from './sub-components/DocumentTabsMenu';
import './DocumentTabs.css';

const DocumentTabs = (props: DocumentTabsProps) => {
  const { tabs, activeId, onActivate, label, overflowMenu = false, className } = props;
  const { documentTabs, fields } = useTesseraStrings();
  const hintId = useId();
  const { trackRef, drag, close, message, tabId, onKeyDown, onFocus } = useDocumentTabs(props);
  if (tabs.length === 0) return null;
  return (
    <Box className={['document-tabs', className].filter(Boolean).join(' ')} onKeyDown={onKeyDown} onFocus={onFocus}>
      <ScrollStrip
        className="document-tabs__strip"
        trackClassName="document-tabs__track"
        trackRole="tablist"
        trackRef={trackRef}
        trackProps={{
          'aria-label': label ?? documentTabs.label,
          'aria-orientation': 'horizontal',
          'aria-describedby': hintId,
          'aria-keyshortcuts': TAB_KEYS,
        }}
        pagerLabels={{ back: fields.earlierTabs, forward: fields.laterTabs }}
      >
        {tabs.map((tab, index) => (
          <DocumentTab
            key={tab.id}
            tab={tab}
            index={index}
            total={tabs.length}
            active={tab.id === activeId}
            tabbable={tab.id === tabId}
            drag={drag}
            onActivate={onActivate}
            onClose={close}
          />
        ))}
      </ScrollStrip>
      {overflowMenu && <DocumentTabsMenu tabs={tabs} activeId={activeId} onActivate={onActivate} />}
      <Box id={hintId} className="visually-hidden">{documentTabs.keysHint}</Box>
      <Box className="visually-hidden" aria-live="polite">{message}</Box>
    </Box>
  );
};

export { DocumentTabs };
