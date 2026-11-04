/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ResetButton } from '../ResetButton';
import type { OptionRowProps } from './OptionRow.type';
import { isResettable } from './behavior/is-resettable';
import { rowAttrs } from './behavior/row-attrs';
import { OptionRowText } from './sub-components/OptionRowText';
import './OptionRow.css';

const OptionRow = (props: OptionRowProps) => {
  const { label, onReset, control, aside } = props;
  return (
    <Box {...rowAttrs(props)}>
      <OptionRowText {...props} />
      <Box className="option-row__control">{control}</Box>
      {isResettable(props) && (
        <Box className="option-row__reset">
          <ResetButton label={label} changed onReset={onReset} />
        </Box>
      )}
      {aside !== undefined && <Box className="option-row__aside">{aside}</Box>}
    </Box>
  );
};

export { OptionRow };
