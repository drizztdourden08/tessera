/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PickerActionsProps } from './PickerParts.type';

const PickerActions = ({ onReset, onClose, footer }: PickerActionsProps) => {
  const { common } = useTesseraStrings();
  return (
    <>
      <Box className="color-picker__actions">
        {onReset && <Button variant="secondary" size="sm" onClick={onReset}>{common.reset}</Button>}
        {onClose && <Button variant="primary" size="sm" onClick={onClose}>{common.done}</Button>}
      </Box>
      {footer !== undefined && <Box className="color-picker__footer">{footer}</Box>}
    </>
  );
};

export { PickerActions };
