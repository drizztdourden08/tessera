/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { APP_REGION_ATTRIBUTE } from '../../../primitives/dom/app-region.constants';
import { Span } from '../../../primitives/text-elements';
import { widgetChrome } from '../behavior/widget-chrome';
import { widgetIcon } from '../behavior/widget-icon';
import { widgetName } from '../behavior/widget-name';
import { WidgetActions } from './WidgetActions';
import { WidgetGrip } from './WidgetGrip';
import { WidgetIcon } from './WidgetIcon';
import { WidgetTabChip } from './WidgetTabChip';
import type { WidgetTitlebarProps } from './WidgetTitlebar.type';
import '../../../theme/visually-hidden.css';
import '../../../theme/window-chrome.css';
import './WidgetTitlebar.css';

const WidgetTitlebar = (props: WidgetTitlebarProps) => {
  const { tabs, activeId, paneKey, onActivateTab, titleId, dragRegion = false } = props;
  const label = widgetName(props);
  const bare = widgetChrome(props) === 'none';
  const heading = tabs.length > 1 ? (
    <Box className="widget__tabs">
      {tabs.map((tab) => <WidgetTabChip key={tab.id} tab={tab} active={tab.id === activeId} onActivate={onActivateTab} />)}
    </Box>
  ) : (
    <Span id={titleId} className={bare ? 'widget__title visually-hidden' : 'widget__title'}><WidgetIcon name={widgetIcon(props)} />{label}</Span>
  );

  return (
    <Box
      className="widget__titlebar window-chrome"
      data-drag-widget={bare ? undefined : activeId}
      data-pane-key={paneKey ?? ''}
      {...{ [APP_REGION_ATTRIBUTE]: dragRegion && !bare ? 'drag' : undefined }}
    >
      {bare ? <Box className="widget__lead"><WidgetGrip id={activeId} name={label} dragRegion={dragRegion} />{heading}</Box> : heading}
      <WidgetActions {...props} name={label} />
    </Box>
  );
};

export { WidgetTitlebar };
