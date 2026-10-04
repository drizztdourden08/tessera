/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { WidgetActions } from './WidgetActions';
import { WidgetTabChip } from './WidgetTabChip';
import type { WidgetTitlebarProps } from './WidgetTitlebar.type';

const WidgetTitlebar = (props: WidgetTitlebarProps) => {
  const { id, tabs, activeId, paneKey, mode = 'in', onActivateTab } = props;
  const { widgets } = useTesseraStrings();
  const label = tabs.find((tab) => tab.id === activeId)?.label ?? tabs[0]?.label ?? id;

  return (
    <Box
      className="widget__titlebar"
      data-drag-widget={activeId}
      data-pane-key={paneKey ?? ''}
      title={mode === 'out' ? widgets.outHint : widgets.titlebarHint}
    >
      {tabs.length > 1 ? (
        <Box className="widget__tabs">
          {tabs.map((tab) => <WidgetTabChip key={tab.id} tab={tab} active={tab.id === activeId} onActivate={onActivateTab} />)}
        </Box>
      ) : (
        <Span className="widget__title">{label}</Span>
      )}
      <WidgetActions {...props} />
    </Box>
  );
};

export { WidgetTitlebar };
