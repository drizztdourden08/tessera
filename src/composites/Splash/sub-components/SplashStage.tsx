/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rawError } from '../../LoadError/behavior/raw-error';
import { SplashActions } from './SplashActions';
import { SplashError } from './SplashError';
import { SplashMark } from './SplashMark';
import type { SplashStageProps } from './SplashStage.type';

const SplashStage = (props: SplashStageProps) => {
  const { title, mark, status, detail, error, actions = [], failed, meter } = props;
  const raw = rawError(error);
  return (
    <Box className="ts-stage">
      {mark !== undefined && <SplashMark mark={mark} />}
      <Box as="h1" className="ts-title">{title}</Box>
      <Box as="p" className={failed ? 'ts-status ts-status--danger' : 'ts-status'} role={failed ? 'alert' : undefined} aria-live={failed ? undefined : 'polite'}>
        {status}
      </Box>
      {detail !== undefined && <Box as="p" className="ts-detail">{detail}</Box>}
      {raw !== null && <SplashError raw={raw} />}
      {meter}
      {actions.length > 0 && <SplashActions actions={actions} failed={failed} />}
    </Box>
  );
};

export { SplashStage };
