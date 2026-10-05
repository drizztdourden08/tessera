/* @layer stories @kind component */
import { Splash } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { SplashFrame } from './SplashFrame';
import { LiveSplash } from './LiveSplash';
import { SPLASH_MARK, SPLASH_SAMPLES, SPLASH_TITLE, SPLASH_VERSION } from './splash-states.constants';
import type { SplashPairProps } from './splash-states.type';
import { staticSplashHtml } from './static-splash-html';

const SIDES = ['Static HTML', 'Splash'] as const;

const noop = () => undefined;

const SplashPair = (props: SplashPairProps) => {
  const { state } = props;
  const sample = SPLASH_SAMPLES[state];
  const actions = sample.actions.map((action) => ({ ...action, onSelect: noop }));
  return (
    <Demonstrator
      className="splash-pair"
      columns={axis(SIDES)}
      cell={(_row, side) => (side === 'Static HTML'
        ? <SplashFrame body={staticSplashHtml(sample)} palette="archipelia" label={`Static splash page, ${state}`} />
        : (
          <LiveSplash label={`Splash component, ${state}`}>
            <Splash
              title={SPLASH_TITLE}
              mark={SPLASH_MARK}
              status={sample.status}
              detail={sample.detail}
              failed={sample.failed}
              progress={sample.progress}
              actions={actions}
              version={SPLASH_VERSION}
            />
          </LiveSplash>
        ))}
    />
  );
};

export { SplashPair };
