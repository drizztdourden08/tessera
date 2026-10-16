/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import type { PaneRailProps } from './PaneRail.type';
import './PaneRail.css';

const PaneRail = (props: PaneRailProps) => {
  const { rail, surface, className, children } = props;
  const classes = ['pane-rail', rail && 'pane-rail--folded', className].filter(Boolean).join(' ');
  return (
    <Box surface={rail ? surface : undefined} className={classes}>
      {children}
      {rail && <Span className="pane-rail__label" aria-hidden="true" onClick={rail.onUnfold}>{rail.label}</Span>}
    </Box>
  );
};

export { PaneRail };
