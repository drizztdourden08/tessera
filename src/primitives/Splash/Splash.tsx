/* @layer renderer-components @kind component */
import './Splash.css';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { SplashMeter } from './sub-components/SplashMeter';
import { SplashStage } from './sub-components/SplashStage';
import type { SplashProps } from './Splash.type';

const Splash = (props: SplashProps) => {
  const { title, mark, status, detail, failed = false, progress, bar = 'edge', progressLabel, actions, version, className, ...rest } = props;
  const { common } = useTesseraStrings();
  const meter = progress === undefined ? null : <SplashMeter progress={progress} bar={bar} failed={failed} label={progressLabel ?? common.loading} />;
  return (
    <div className={className ? `ts-splash ts-splash--layer ${className}` : 'ts-splash ts-splash--layer'} {...rest}>
      <SplashStage title={title} mark={mark} status={status} detail={detail} actions={actions} failed={failed} meter={bar === 'inline' ? meter : null} />
      {version !== undefined && <span className="ts-version">{version}</span>}
      {bar === 'edge' && meter}
    </div>
  );
};

export { Splash };
