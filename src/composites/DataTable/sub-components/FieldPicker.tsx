/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { Small } from '../../../primitives/text-elements';
import { buildPickerNodes } from '../behavior/field-picker-nodes';
import { FieldPickerNode } from './FieldPickerNode';
import type { FieldPickerProps } from './FieldPicker.type';
import '../../../theme/dropdown-menu.css';
import '../../../theme/field-picker.css';

const FieldPicker = (props: FieldPickerProps) => {
  const { schema, onPick, excludePaths, emptyMessage = 'No fields left to add' } = props;
  const nodes = useMemo(() => buildPickerNodes(schema, excludePaths), [schema, excludePaths]);

  return (
    <Box className="field-picker" role="menu">
      {nodes.length === 0 && <Small tone="muted" className="field-picker__empty">{emptyMessage}</Small>}
      {nodes.map((node) => (
        <FieldPickerNode key={node.path} node={node} onPick={onPick} />
      ))}
    </Box>
  );
};

export { FieldPicker };
