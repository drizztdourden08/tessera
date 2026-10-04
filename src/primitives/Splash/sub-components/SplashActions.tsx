/* @layer renderer-components @kind component */
import { useFocusOnFail } from '../behavior/useFocusOnFail';
import type { SplashActionsProps } from './SplashActions.type';

const SplashActions = (props: SplashActionsProps) => {
  const { actions, failed } = props;
  const row = useFocusOnFail(failed);
  return (
    <div className="ts-actions" ref={row}>
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className={action.primary ? 'ts-button ts-button--primary' : 'ts-button'}
          disabled={action.disabled}
          onClick={action.onSelect}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export { SplashActions };
