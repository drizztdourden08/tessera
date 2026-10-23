/* @layer stories @kind component */
import { CONTROLLER_SILHOUETTE_ANCHORS, ControllerSilhouette } from '../../../src/composites';
import { SvgCircle, SvgGroup, SvgLine, SvgText } from '../../../src/primitives';

const ANCHORS = CONTROLLER_SILHOUETTE_ANCHORS.offset;
const LABEL_X = 352;
const LABEL_Y = 196;
const CAP_RATIO = 0.62;
const TIP_GAP = 4;

const SilhouetteOverlay = () => {
  const left = ANCHORS['stick.left'];
  const right = ANCHORS['stick.right'];
  const face = ANCHORS.face;
  if (!left?.r || !right?.r || !face?.r) return null;

  return (
    <ControllerSilhouette variant="offset" label="Move and jump">
      <SvgGroup className="silhouette-overlay">
        <SvgCircle className="silhouette-overlay__cap" cx={left.x} cy={left.y} r={left.r * CAP_RATIO} />
        <SvgCircle className="silhouette-overlay__cap" cx={right.x} cy={right.y} r={right.r * CAP_RATIO} />
        <SvgCircle className="silhouette-overlay__mark" cx={face.x} cy={face.y + face.r / 2} r={face.r / 3} />
        <SvgLine className="silhouette-overlay__leader" x1={face.x + face.r / 3} y1={face.y + face.r / 2} x2={LABEL_X} y2={LABEL_Y} />
        <SvgText className="silhouette-overlay__label" x={LABEL_X} y={LABEL_Y + TIP_GAP * 3}>Jump</SvgText>
        <SvgText className="silhouette-overlay__label" x={left.x} y={left.y + left.r + TIP_GAP * 3} textAnchor="middle">Move</SvgText>
      </SvgGroup>
    </ControllerSilhouette>
  );
};

export { SilhouetteOverlay };
