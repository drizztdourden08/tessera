/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ResetButton } from '../../ResetButton';

interface FormRowResetProps {
  label: string;
  onReset?: () => void;
}

const FormRowReset = (props: FormRowResetProps) => {
  const { label, onReset } = props;
  if (!onReset) return null;
  return (
    <Box className="form-row__reset">
      <ResetButton label={label} changed onReset={onReset} />
    </Box>
  );
};

export { FormRowReset };
