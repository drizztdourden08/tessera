/* @layer renderer-components @kind component */
import { SvgGroup } from '../../../primitives/Svg';
import { SilhouetteWell } from './SilhouetteWell';
import type { SilhouetteWellsProps } from '../ControllerSilhouette.type';

const SilhouetteWells = (props: SilhouetteWellsProps) => {
  const { wells, ids } = props;

  return (
    <SvgGroup className="controller-silhouette__wells">
      {wells.map((well) => <SilhouetteWell key={well.id} well={well} ids={ids} />)}
    </SvgGroup>
  );
};

export { SilhouetteWells };
