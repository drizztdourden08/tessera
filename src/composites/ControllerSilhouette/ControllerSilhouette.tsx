/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Svg } from '../../primitives/Svg';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { silhouetteDrawing } from './behavior/silhouette-drawing';
import { silhouetteIds } from './behavior/silhouette-ids';
import { silhouetteWells } from './behavior/silhouette-wells';
import { SilhouetteBody } from './sub-components/SilhouetteBody';
import { SilhouetteGradients } from './sub-components/SilhouetteGradients';
import { SilhouetteWells } from './sub-components/SilhouetteWells';
import { CONTROLLER_SILHOUETTE_VIEW_BOX } from './ControllerSilhouette.constants';
import type { ControllerSilhouetteProps } from './ControllerSilhouette.type';
import './ControllerSilhouette.css';

const ControllerSilhouette = (props: ControllerSilhouetteProps) => {
  const { variant, label, className = '', children } = props;
  const { controller } = useTesseraStrings();
  const ids = silhouetteIds(useId());

  return (
    <Box
      as="figure"
      aria-label={label ?? controller.controller}
      className={`controller-silhouette${className ? ` ${className}` : ''}`}
      data-variant={variant}
    >
      <Svg className="controller-silhouette__art" viewBox={CONTROLLER_SILHOUETTE_VIEW_BOX} aria-hidden="true" focusable="false">
        <SilhouetteGradients ids={ids} />
        <SilhouetteBody drawing={silhouetteDrawing(variant)} ids={ids} />
        <SilhouetteWells wells={silhouetteWells(variant)} ids={ids} />
        {children}
      </Svg>
    </Box>
  );
};

export { ControllerSilhouette };
