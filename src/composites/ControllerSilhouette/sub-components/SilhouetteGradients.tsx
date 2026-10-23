/* @layer renderer-components @kind component */
import { SvgLinearGradient, SvgStop } from '../../../primitives/Svg';
import { GRADIENTS } from '../behavior/gradients.constants';
import type { SilhouetteGradientsProps } from '../ControllerSilhouette.type';

const SilhouetteGradients = (props: SilhouetteGradientsProps) => {
  const { ids } = props;

  return (
    <>
      {GRADIENTS.map((gradient) => (
        <SvgLinearGradient key={gradient.key} id={ids[gradient.key]} x1={0} y1={0} x2={0} y2={1}>
          {gradient.stops.map((stop) => (
            <SvgStop key={stop.offset} offset={stop.offset} className={`controller-silhouette__stop controller-silhouette__stop--${stop.tone}`} />
          ))}
        </SvgLinearGradient>
      ))}
    </>
  );
};

export { SilhouetteGradients };
