/* @layer renderer-components @kind component */
import type { SplashMarkProps } from './SplashMark.type';

const SplashMark = (props: SplashMarkProps) => {
  const { mark } = props;
  if (typeof mark === 'string') return <img className="ts-mark" src={mark} alt="" />;
  return <div className="ts-mark" aria-hidden>{mark}</div>;
};

export { SplashMark };
