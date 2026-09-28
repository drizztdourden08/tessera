/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import type { AddItemButtonProps } from './AddItemButton.type';

const AddItemButton = ({ label, disabled, onAdd }: AddItemButtonProps) => (
  <Flex justify="start">
    <Button size="sm" variant="tertiary" disabled={disabled} onClick={onAdd}>
      {label}
    </Button>
  </Flex>
);

export { AddItemButton };
