/* @layer renderer-components @kind component */
import { REVIEW_MASK } from '../../../primitives/dom/review-mask.constants';
import { Small, Span } from '../../../primitives/text-elements';
import { stickReadout } from '../behavior/stick-readout';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { StickPlotReadoutProps } from './StickPlotReadout.type';

const StickPlotReadout = (props: StickPlotReadoutProps) => {
  const { x, y, calibrated } = props;
  const { panels } = useTesseraStrings();
  return (
    <Span tone="dim" className="stick-plot__value" {...REVIEW_MASK}>
      {stickReadout(x, y)}
      {calibrated && <Small tone="muted" className="stick-plot__cal">{panels.calibrated}</Small>}
    </Span>
  );
};

export { StickPlotReadout };
