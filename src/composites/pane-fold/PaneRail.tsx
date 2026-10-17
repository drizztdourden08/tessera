/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { PaneRailFold } from './PaneRailFold';
import type { PaneRailProps } from './PaneRail.type';
import './PaneRail.css';

const PaneRail = (props: PaneRailProps) => {
  const { rail, className, children } = props;
  const classes = ['pane-rail', rail && `pane-rail--folded pane-rail--${rail.side}`, className].filter(Boolean).join(' ');
  return (
    <Box surface={rail ? 'sunken' : undefined} className={classes}>
      {children}
      {rail && <PaneRailFold rail={rail} />}
    </Box>
  );
};

export { PaneRail };
