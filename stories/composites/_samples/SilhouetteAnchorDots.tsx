/* @layer stories @kind component */
import { CONTROLLER_SILHOUETTE_ANCHORS } from '../../../src/composites';
import type { ControllerSilhouetteAnchorId, ControllerSilhouetteVariant } from '../../../src/composites';
import { SvgCircle, SvgGroup, SvgText } from '../../../src/primitives';

interface SilhouetteAnchorDotsProps {
  variant: ControllerSilhouetteVariant;
  names?: boolean;
}

const DOT_R = 2.5;
const NAME_GAP = 5;

const SilhouetteAnchorDots = ({ variant, names = true }: SilhouetteAnchorDotsProps) => {
  const anchors = CONTROLLER_SILHOUETTE_ANCHORS[variant];
  const ids = Object.keys(anchors) as ControllerSilhouetteAnchorId[];

  return (
    <SvgGroup className="silhouette-dots">
      {ids.map((id) => {
        const anchor = anchors[id];
        if (!anchor) return null;
        return (
          <SvgGroup key={id}>
            {anchor.r ? <SvgCircle className="silhouette-dots__ring" cx={anchor.x} cy={anchor.y} r={anchor.r} /> : null}
            <SvgCircle className="silhouette-dots__dot" cx={anchor.x} cy={anchor.y} r={DOT_R} />
            {names ? <SvgText className="silhouette-dots__name" x={anchor.x + NAME_GAP} y={anchor.y - NAME_GAP}>{id}</SvgText> : null}
          </SvgGroup>
        );
      })}
    </SvgGroup>
  );
};

export { SilhouetteAnchorDots };
