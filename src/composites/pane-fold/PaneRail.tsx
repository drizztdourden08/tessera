/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import type { PaneRailProps } from './PaneRail.type';
import '../../theme/page-card.css';
import './PaneRail.css';

const PaneRail = (props: PaneRailProps) => {
  const { rail, className, children } = props;
  const classes = ['pane-rail', rail && 'pane-rail--folded page-card', className].filter(Boolean).join(' ');
  const label = rail && <Span className="pane-rail__label" aria-hidden="true" onClick={rail.onUnfold}>{rail.label}</Span>;
  return (
    <Box className={classes}>
      {children}
      {rail && (rail.content === undefined ? label : <Box className="pane-rail__content">{rail.content}</Box>)}
    </Box>
  );
};

export { PaneRail };
