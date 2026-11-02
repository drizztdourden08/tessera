/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { smartChildren } from '../times-between-digits/smart-children';
import { foldClass } from './behavior/fold-class';
import { FoldLines } from './sub-components/FoldLines';
import { FoldMiddle } from './sub-components/FoldMiddle';
import type { FoldTextProps } from './FoldText.type';
import './FoldText.css';

const FoldText = (props: FoldTextProps) => {
  const { truncate, fill, hug, smartTimes, className, hint, children } = props;
  const text = smartChildren(children, smartTimes);
  const middle = truncate !== undefined && typeof text === 'string';

  return (
    <Box className={foldClass(fill === true || (middle && hug !== true), className)}>
      {middle ? (
        <Box className="fold-text__body"><FoldMiddle text={text} path={truncate === 'path'} hint={hint} hug={hug} /></Box>
      ) : (
        <FoldLines lines={props.lines} overflow={props.overflow} hint={hint}>{text}</FoldLines>
      )}
    </Box>
  );
};

export { FoldText };
