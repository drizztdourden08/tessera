/* @layer renderer-components @kind component */
import { Badge } from '../../Badge';
import { Span } from '../../text-elements';
import { Tooltip } from '../../Tooltip';
import { tabLabels } from '../behavior/tab-labels';
import type { TabsTabProps } from '../Tabs.type';

const TabsTab = (props: TabsTabProps) => {
  const { tab, active, iconOnly, onTabChange, onKeyDown } = props;
  const disabled = tab.disabled === true;
  const { reason, title, name } = tabLabels(tab, iconOnly);
  const button = (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      aria-description={reason}
      aria-label={name}
      className={`tabs__tab focus-ring-inset ${active ? 'tabs__tab--active' : ''}`}
      title={title}
      onClick={disabled ? undefined : () => onTabChange(tab.id)}
      onKeyDown={onKeyDown}
    >
      {tab.icon && <span className="tabs__icon">{tab.icon}</span>}
      {!iconOnly && <Span className="tabs__label">{tab.label}</Span>}
      {tab.badge != null && <Badge variant="inline" color={active ? 'primary' : 'tame'} value={tab.badge} />}
    </button>
  );
  return reason ? <Tooltip content={reason} placement="bottom" className="tabs__reason">{button}</Tooltip> : button;
};

export { TabsTab };
