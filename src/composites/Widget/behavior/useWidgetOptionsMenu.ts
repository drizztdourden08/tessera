/* @layer renderer-components @kind hook */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { MenuGroup } from '../../DropdownMenu';
import { widgetOptionsMenu } from './widget-options-menu';
import type { WidgetOptionsMenuInput } from './widget-options-menu.type';

const useWidgetOptionsMenu = (input: WidgetOptionsMenuInput): MenuGroup[] => {
  const { widgets, common } = useTesseraStrings();
  return widgetOptionsMenu(input, { widgets, common });
};

export { useWidgetOptionsMenu };
