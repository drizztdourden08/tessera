/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Small } from '../../../primitives/text-elements';
import type { ControlMenuGroupProps } from '../ControlMenu.type';

const ControlMenuGroup = (props: ControlMenuGroupProps) => {
  const { label, children } = props;
  return (
    <Box className="control-menu__group" role="group" aria-label={label}>
      {label && <Small tone="muted" className="control-menu__group-label">{label}</Small>}
      {children}
    </Box>
  );
};

export { ControlMenuGroup };
