/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { foldClass } from './behavior/fold-class';
import { FoldLines } from './sub-components/FoldLines';
import { FoldMiddle } from './sub-components/FoldMiddle';
import type { FoldTextProps } from './FoldText.type';
import './FoldText.css';

const FoldText = (props: FoldTextProps) => {
  const { truncate, fill, className, hint, children } = props;
  const middle = truncate === 'middle' && typeof children === 'string';

  return (
    <Box className={foldClass(fill === true || middle, className)}>
      {middle ? (
        <Box className="fold-text__body"><FoldMiddle text={children} hint={hint} /></Box>
      ) : (
        <FoldLines lines={props.lines} overflow={props.overflow} hint={hint}>{children}</FoldLines>
      )}
    </Box>
  );
};

export { FoldText };
