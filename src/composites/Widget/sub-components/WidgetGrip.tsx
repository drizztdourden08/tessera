/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { APP_REGION_ATTRIBUTE } from '../../../primitives/dom/app-region.constants';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { WidgetGripProps } from './WidgetGrip.type';

const WidgetGrip = ({ id, name, dragRegion }: WidgetGripProps) => {
  const { widgets } = useTesseraStrings();
  return (
    <Box
      className="widget__grip"
      data-drag-widget={id}
      title={widgets.moveNamed(name)}
      aria-hidden="true"
      {...{ [APP_REGION_ATTRIBUTE]: dragRegion ? 'drag' : undefined }}
    >
      <Icon name="grip-vertical" size={14} />
    </Box>
  );
};

export { WidgetGrip };
