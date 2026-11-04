/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ResetButton } from '../ResetButton';
import type { OptionRowProps } from './OptionRow.type';
import { OptionRowText } from './sub-components/OptionRowText';
import './OptionRow.css';

const OptionRow = (props: OptionRowProps) => {
  const { locked = false, forced = false, changed = false, onReset, control, aside, className } = props;
  const resettable = changed && onReset !== undefined;
  return (
    <Box
      className={['option-row', className].filter(Boolean).join(' ')}
      data-locked={locked || undefined}
      data-forced={forced || undefined}
      data-changed={changed || undefined}
      data-resettable={resettable || undefined}
      data-aside={aside !== undefined || undefined}
    >
      <OptionRowText {...props} />
      <Box className="option-row__control">{control}</Box>
      {resettable && (
        <Box className="option-row__reset">
          <ResetButton label={props.label} changed onReset={onReset} />
        </Box>
      )}
      {aside !== undefined && <Box className="option-row__aside">{aside}</Box>}
    </Box>
  );
};

export { OptionRow };
