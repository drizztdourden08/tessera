/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { PaneRailFold } from './PaneRailFold';
import type { PaneRailProps } from './PaneRail.type';
import './PaneRail.css';

const PaneRail = (props: PaneRailProps) => {
  const { rail, className, children, ...rest } = props;
  const across = rail?.orientation === 'vertical' && 'pane-rail--across';
  const classes = ['pane-rail', rail && `pane-rail--folded pane-rail--${rail.side}`, across, className].filter(Boolean).join(' ');
  return (
    <Box {...rest} surface={rail ? 'sunken' : undefined} className={classes}>
      {children}
      {rail && <PaneRailFold rail={rail} />}
    </Box>
  );
};

export { PaneRail };
