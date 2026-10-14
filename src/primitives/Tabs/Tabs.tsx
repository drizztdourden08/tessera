/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import './Tabs.css';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { tabIndexForKey } from './behavior/tab-index-for-key';
import { useTabStripOverflow } from './behavior/useTabStripOverflow';
import type { TabsProps } from './Tabs.type';
import { TabsPager } from './sub-components/TabsPager';
import { TabsTab } from './sub-components/TabsTab';
import type { KeyboardEvent } from 'react';
import { isHTMLElement } from '../dom/is-html-element';

const Tabs = (props: TabsProps) => {
  const { tabs, activeTab, onTabChange, iconOnly = false } = props;
  const strip = useTabStripOverflow(tabs.length);
  const { fields } = useTesseraStrings();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number): void => {
    const next = tabIndexForKey(event.key, index, tabs.map((tab) => tab.disabled !== true));
    if (next === null || next === index) return;
    event.preventDefault();
    const target = tabs[next];
    if (target) onTabChange(target.id);
    const sibling = strip.stripRef.current?.querySelectorAll('[role="tab"]')[next];
    if (!isHTMLElement(sibling)) return;
    sibling.focus({ preventScroll: true });
    strip.revealTab(sibling);
  };

  return (
    <nav className="tabs" ref={strip.rootRef} data-back={strip.canScrollBack || undefined} data-forward={strip.canScrollForward || undefined}>
      {strip.canScrollBack && <TabsPager side="back" label={fields.earlierTabs} onPage={() => strip.pageBy(-1)} />}

      <div className="tabs__strip" role="tablist" ref={strip.stripRef} onScroll={strip.handleScroll}>
        {tabs.map((tab, index) => (
          <TabsTab
            key={tab.id}
            tab={tab}
            active={activeTab === tab.id}
            iconOnly={iconOnly}
            onTabChange={onTabChange}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        ))}
      </div>

      {strip.canScrollForward && <TabsPager side="forward" label={fields.laterTabs} onPage={() => strip.pageBy(1)} />}
    </nav>
  );
};

export {
  Tabs,
};
