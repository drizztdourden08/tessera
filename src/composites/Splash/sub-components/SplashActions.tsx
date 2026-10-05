/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { useFocusOnFail } from '../behavior/useFocusOnFail';
import type { SplashActionsProps } from './SplashActions.type';

const SplashActions = (props: SplashActionsProps) => {
  const { actions, failed } = props;
  const row = useFocusOnFail(failed);
  return (
    <Box className="ts-actions" ref={row}>
      {actions.map((action) => (
        <Pressable
          key={action.label}
          className={action.primary ? 'ts-button ts-button--primary' : 'ts-button'}
          disabled={action.disabled}
          onClick={action.onSelect}
        >
          {action.label}
        </Pressable>
      ))}
    </Box>
  );
};

export { SplashActions };
