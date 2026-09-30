/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import './TabBar.css';
import { Badge } from '../Badge';
import { Glyph } from '../Glyph';
import { IconButton } from '../IconButton';
import { Span } from '../text-elements';
import { tabIndexForKey } from './behavior/tab-index-for-key';
import { useTabStripOverflow } from './behavior/useTabStripOverflow';
import type { TabBarProps } from './TabBar.type';
import type { KeyboardEvent } from 'react';
import { isHTMLElement } from '../dom/is-html-element';

const pagerClass = (enabled: boolean): string =>
  `tab-bar__pager${enabled ? '' : ' tab-bar__pager--idle'}`;

const TabBar = (props: TabBarProps) => {
  const { tabs, activeTab, onTabChange, iconOnly = false } = props;
  const strip = useTabStripOverflow(tabs.length);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number): void => {
    const next = tabIndexForKey(event.key, index, tabs.length);
    if (next === null || next === index) return;
    event.preventDefault();
    const target = tabs[next];
    if (target) onTabChange(target.id);
    const sibling = event.currentTarget.parentElement?.children[next];
    if (!isHTMLElement(sibling)) return;
    sibling.focus({ preventScroll: true });
    strip.revealTab(sibling);
  };

  return (
    <nav className="tab-bar" ref={strip.rootRef}>
      {strip.isOverflowing && (
        <IconButton
          type="button"
          className={pagerClass(strip.canScrollBack)}
          label="Show earlier tabs"
          disabled={!strip.canScrollBack}
          onClick={() => strip.pageBy(-1)}
        >
          <Glyph name="chevronLeft" />
        </IconButton>
      )}

      <div className="tab-bar__strip" role="tablist" ref={strip.stripRef} onScroll={strip.handleScroll}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab-bar__tab focus-ring-inset ${activeTab === tab.id ? 'tab-bar__tab--active' : ''}`}
            title={iconOnly ? tab.label : undefined}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.icon && <span className="tab-bar__icon">{tab.icon}</span>}
            {!iconOnly && <Span className="tab-bar__label">{tab.label}</Span>}
            {tab.badge != null && <Badge variant="inline" color={activeTab === tab.id ? 'primary' : 'tame'} value={tab.badge} />}
          </button>
        ))}
      </div>

      {strip.isOverflowing && (
        <IconButton
          type="button"
          className={pagerClass(strip.canScrollForward)}
          label="Show later tabs"
          disabled={!strip.canScrollForward}
          onClick={() => strip.pageBy(1)}
        >
          <Glyph name="chevronRight" />
        </IconButton>
      )}
    </nav>
  );
};

export {
  TabBar,
};
