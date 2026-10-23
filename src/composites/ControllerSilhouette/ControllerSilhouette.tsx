/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Svg, SvgPath } from '../../primitives/Svg';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { silhouetteOutline } from './behavior/silhouette-outline';
import { CONTROLLER_SILHOUETTE_VIEW_BOX } from './ControllerSilhouette.constants';
import type { ControllerSilhouetteProps } from './ControllerSilhouette.type';
import './ControllerSilhouette.css';

const ControllerSilhouette = (props: ControllerSilhouetteProps) => {
  const { variant, label, className = '', children } = props;
  const { controller } = useTesseraStrings();

  return (
    <Box
      as="figure"
      aria-label={label ?? controller.controller}
      className={`controller-silhouette${className ? ` ${className}` : ''}`}
      data-variant={variant}
    >
      <Svg className="controller-silhouette__art" viewBox={CONTROLLER_SILHOUETTE_VIEW_BOX} aria-hidden="true" focusable="false">
        <SvgPath className="controller-silhouette__outline" d={silhouetteOutline(variant)} />
        {children}
      </Svg>
    </Box>
  );
};

export { ControllerSilhouette };
