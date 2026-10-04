/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { StageBarProps } from '../StageScreen.type';

const StageBar = (props: StageBarProps) => {
  const { toolbar, done } = props;
  const { common } = useTesseraStrings();
  if (toolbar == null && !done) return null;

  return (
    <Box className="stage-screen__bar">
      <Box className="stage-screen__toolbar">{toolbar}</Box>
      {done && <Button variant="primary" disabled={done.disabled} onClick={done.onClick}>{done.label ?? common.done}</Button>}
    </Box>
  );
};

export { StageBar };
