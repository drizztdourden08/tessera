/* @layer renderer-components @kind component */
import { SplashActions } from './SplashActions';
import { SplashMark } from './SplashMark';
import type { SplashStageProps } from './SplashStage.type';

const SplashStage = (props: SplashStageProps) => {
  const { title, mark, status, detail, actions = [], failed, meter } = props;
  return (
    <div className="ts-stage">
      {mark !== undefined && <SplashMark mark={mark} />}
      <h1 className="ts-title">{title}</h1>
      <p className={failed ? 'ts-status ts-status--danger' : 'ts-status'} role={failed ? 'alert' : undefined} aria-live={failed ? undefined : 'polite'}>
        {status}
      </p>
      {detail !== undefined && <p className="ts-detail">{detail}</p>}
      {meter}
      {actions.length > 0 && <SplashActions actions={actions} failed={failed} />}
    </div>
  );
};

export { SplashStage };
