/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { APP_REGION_ATTRIBUTE } from '../../../primitives/dom/app-region.constants';
import { Span } from '../../../primitives/text-elements';
import { widgetName } from '../behavior/widget-name';
import { WidgetActions } from './WidgetActions';
import { WidgetTabChip } from './WidgetTabChip';
import type { WidgetTitlebarProps } from './WidgetTitlebar.type';

const WidgetTitlebar = (props: WidgetTitlebarProps) => {
  const { tabs, activeId, paneKey, onActivateTab, titleId, dragRegion = false } = props;
  const label = widgetName(props);

  return (
    <Box
      className="widget__titlebar"
      data-drag-widget={activeId}
      data-pane-key={paneKey ?? ''}
      {...{ [APP_REGION_ATTRIBUTE]: dragRegion ? 'drag' : undefined }}
    >
      {tabs.length > 1 ? (
        <Box className="widget__tabs">
          {tabs.map((tab) => <WidgetTabChip key={tab.id} tab={tab} active={tab.id === activeId} onActivate={onActivateTab} />)}
        </Box>
      ) : (
        <Span id={titleId} className="widget__title">{label}</Span>
      )}
      <WidgetActions {...props} name={label} />
    </Box>
  );
};

export { WidgetTitlebar };
