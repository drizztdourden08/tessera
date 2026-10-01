/* @layer renderer-components @kind component */
import { Icon } from '../../../../../primitives/Icon';
import { IconButton } from '../../../../../primitives/IconButton';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { placementChoice } from '../behavior/placement-choice';
import { PLACEMENT_CHOICES } from '../WidgetOptions.constants';
import type { PlacementChoice, PlacementRowProps } from '../WidgetOptions.type';
import { ChoiceRow } from './ChoiceRow';

const PlacementRow = (props: PlacementRowProps) => {
  const { placement, dockEdge, onDock, onFloat, onPopOut, canPopOut = true } = props;
  const { common, widgets } = useTesseraStrings();
  const popped = placement === 'popped';
  const windowShown = onPopOut !== undefined && (popped || canPopOut);
  const choices = windowShown ? PLACEMENT_CHOICES : PLACEMENT_CHOICES.filter((choice) => choice.value !== 'window');
  const choose = (next: PlacementChoice) => {
    if (next === 'float') onFloat();
    else if (next !== 'window') onDock(next);
    else if (!popped) onPopOut?.();
  };

  return (
    <ChoiceRow<PlacementChoice> label={widgets.placement} value={placementChoice(placement, dockEdge)} choices={choices} words={widgets} onChange={choose}>
      {popped && onPopOut && (
        <IconButton size="xs" label={common.popIn} hint={{ label: common.popIn, description: widgets.popInHint }} onClick={onPopOut}>
          <Icon name="minimize-2" size={12} />
        </IconButton>
      )}
    </ChoiceRow>
  );
};

export { PlacementRow };
