/* @layer renderer-components @kind component */
import { Badge } from '../../Badge';
import { Span } from '../../text-elements';
import { Tooltip } from '../../Tooltip';
import { tabBadgeColor } from '../behavior/tab-badge-color';
import { tabLabels } from '../behavior/tab-labels';
import type { TabsTabProps } from '../Tabs.type';

const TabsTab = (props: TabsTabProps) => {
  const { tab, active, iconOnly, hideZero, badgeFill, onTabChange, onKeyDown } = props;
  const disabled = tab.disabled === true;
  const { description, title, name } = tabLabels(tab, iconOnly);
  const button = (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      aria-description={description}
      aria-label={name}
      className={`tabs__tab focus-ring-inset ${active ? 'tabs__tab--active' : ''}`}
      title={title}
      onClick={disabled ? undefined : () => onTabChange(tab.id)}
      onKeyDown={onKeyDown}
    >
      {tab.icon && <span className="tabs__icon">{tab.icon}</span>}
      {!iconOnly && <Span className="tabs__label">{tab.label}</Span>}
      {tab.badge != null && <Badge variant={badgeFill === 'solid' ? 'number' : 'inline'} color={tabBadgeColor(tab.badgeTone, active)} value={tab.badge} hideZero={hideZero} />}
    </button>
  );
  return description ? <Tooltip content={description} placement="bottom" className="tabs__reason">{button}</Tooltip> : button;
};

export { TabsTab };
