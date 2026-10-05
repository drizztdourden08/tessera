/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { MORE_CLASS } from '../ActionBar.constants';
import type { ActionBarMeasureProps } from '../ActionBar.type';
import { ActionBarButton } from './ActionBarButton';

const ActionBarMeasure = (props: ActionBarMeasureProps) => {
  const { measureRef, rest, primary, size, label } = props;
  return (
    <Box className="action-bar__measure" aria-hidden inert>
      <Box ref={measureRef} className="action-bar__measure-row">
        {rest.map((action) => <ActionBarButton key={action.id} action={action} size={size} />)}
        <IconButton size={size} variant="secondary" className={MORE_CLASS} label={label} tabIndex={-1}><Icon name="ellipsis" /></IconButton>
        {primary.map((action) => <ActionBarButton key={action.id} action={action} size={size} />)}
      </Box>
    </Box>
  );
};

export { ActionBarMeasure };
