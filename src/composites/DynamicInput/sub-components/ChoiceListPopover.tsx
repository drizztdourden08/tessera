/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ListboxList } from '../../../primitives/listbox/ListboxList';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PanelSection } from './PanelSection';
import { SlotPopover } from './SlotPopover';
import type { ChoiceListPopoverProps } from './ChoiceListPopover.type';
import '../../../theme/listbox.css';
import '../../../theme/listbox-drop.css';

const ChoiceListPopover = (props: ChoiceListPopoverProps) => {
  const { field, anchorRef, label, view } = props;
  const { fields } = useTesseraStrings();

  return (
    <SlotPopover field={field} anchorRef={anchorRef} variant="list">
      <PanelSection title={label} fill>
        <Box className="dynamic-input__bleed">
          <ListboxList view={view} loading={false} emptyText={fields.noOptions} label={label} />
        </Box>
      </PanelSection>
    </SlotPopover>
  );
};

export { ChoiceListPopover };
