/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollStrip } from '../../primitives/scroll-strip/ScrollStrip';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../theme/visually-hidden.css';
import { countStyle } from './behavior/count-style';
import { useDocumentTabs } from './behavior/useDocumentTabs';
import { TAB_KEYS } from './DocumentTabs.constants';
import type { DocumentTabsProps } from './DocumentTabs.type';
import { DocumentTab } from './sub-components/DocumentTab';
import { DocumentTabAdd } from './sub-components/DocumentTabAdd';
import { DocumentTabCloses } from './sub-components/DocumentTabCloses';
import { DocumentTabsMenu } from './sub-components/DocumentTabsMenu';
import './DocumentTabs.css';

const DocumentTabs = (props: DocumentTabsProps) => {
  const { tabs, activeId, onActivate, label, overflowMenu = false, onAdd, className } = props;
  const { documentTabs, fields } = useTesseraStrings();
  const hintId = useId();
  const tabIds = useId();
  const idOf = (index: number): string => `${tabIds}-${index}`;
  const { listRef, drag, close, message, tabId, liveId, hoverId, onKeyDown, onContextMenu, onFocus, onBlur, onPointerOver, onPointerLeave } = useDocumentTabs(props);
  if (tabs.length === 0) return null;
  return (
    <Box
      className={['document-tabs', className].filter(Boolean).join(' ')}
      onKeyDown={onKeyDown}
      onContextMenu={onContextMenu}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
    >
      <ScrollStrip
        className="document-tabs__strip"
        trackClassName="document-tabs__track"
        pagerLabels={{ back: fields.earlierTabs, forward: fields.laterTabs }}
      >
        <Box className="document-tabs__grid" style={countStyle(tabs.length)}>
          <Box
            ref={listRef}
            role="tablist"
            className="document-tabs__list"
            aria-label={label ?? documentTabs.label}
            aria-orientation="horizontal"
            aria-describedby={hintId}
            aria-keyshortcuts={TAB_KEYS}
          >
            {tabs.map((tab, index) => (
              <DocumentTab
                key={tab.id}
                tab={tab}
                index={index}
                domId={idOf(index)}
                total={tabs.length}
                active={tab.id === activeId}
                tabbable={tab.id === tabId}
                hover={tab.id === hoverId}
                drag={drag}
                onActivate={onActivate}
                onClose={close}
              />
            ))}
          </Box>
          <DocumentTabCloses tabs={tabs} hoverId={hoverId} liveId={liveId} onClose={close} />
        </Box>
        {onAdd && <DocumentTabAdd onAdd={onAdd} />}
      </ScrollStrip>
      {overflowMenu && <DocumentTabsMenu tabs={tabs} activeId={activeId} onActivate={onActivate} />}
      <Box id={hintId} className="visually-hidden">{documentTabs.keysHint}</Box>
      <Box className="visually-hidden" aria-live="polite">{message}</Box>
    </Box>
  );
};

export { DocumentTabs };
