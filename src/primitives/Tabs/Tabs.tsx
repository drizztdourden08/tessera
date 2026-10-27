/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import './Tabs.css';
import { useRef } from 'react';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { rovingIndex } from '../field-control/roving-index';
import { ScrollStrip } from '../scroll-strip/ScrollStrip';
import { STEP_BY_KEY } from './behavior/tab-steps.constants';
import type { TabsProps } from './Tabs.type';
import { TabsTab } from './sub-components/TabsTab';
import type { KeyboardEvent } from 'react';
import { isHTMLElement } from '../dom/is-html-element';

const Tabs = (props: TabsProps) => {
  const { tabs, activeTab, onTabChange, iconOnly = false, hideZero = false, size = 'md' } = props;
  const trackRef = useRef<HTMLElement | null>(null);
  const { fields } = useTesseraStrings();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number): void => {
    const next = rovingIndex(event.key, index, tabs.map((tab) => tab.disabled !== true), STEP_BY_KEY);
    if (next === null || next === index) return;
    event.preventDefault();
    const target = tabs[next];
    if (target) onTabChange(target.id);
    const sibling = trackRef.current?.querySelectorAll('[role="tab"]')[next];
    if (!isHTMLElement(sibling)) return;
    sibling.focus({ preventScroll: true });
    sibling.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  return (
    <ScrollStrip
      as="nav"
      className={size === 'lg' ? 'tabs tabs--lg' : 'tabs'}
      trackClassName="tabs__strip"
      trackRole="tablist"
      trackRef={trackRef}
      pagerLabels={{ back: fields.earlierTabs, forward: fields.laterTabs }}
    >
      {tabs.map((tab, index) => (
        <TabsTab
          key={tab.id}
          tab={tab}
          active={activeTab === tab.id}
          iconOnly={iconOnly}
          hideZero={hideZero}
          onTabChange={onTabChange}
          onKeyDown={(event) => handleKeyDown(event, index)}
        />
      ))}
    </ScrollStrip>
  );
};

export {
  Tabs,
};
