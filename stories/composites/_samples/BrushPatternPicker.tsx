/* @layer stories @kind component */
import { ChoiceGrid } from '../../../src/composites/ChoiceGrid';
import { Button } from '../../../src/primitives';
import { useBrushCells } from './useBrushCells';

interface BrushPatternPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const BrushPatternPicker = ({ value, onChange }: BrushPatternPickerProps) => {
  const { sections, addFromSelection } = useBrushCells();
  return (
    <ChoiceGrid
      label="Brush"
      columns={4}
      value={value}
      onChange={onChange}
      sections={sections}
      footer={<Button size="sm" variant="secondary" onClick={() => onChange(addFromSelection())}>Add from selection</Button>}
    />
  );
};

export { BrushPatternPicker };
