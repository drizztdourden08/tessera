/* @layer renderer-components @kind component */
import { Badge } from '../../primitives/Badge';
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { FilterBar } from '../FilterBar';
import { GroupControl } from '../GroupControl';
import { SortControl } from '../SortControl';
import { activeCount } from './behavior/active-count';
import { useOpenState } from './behavior/useOpenState';
import type { ViewControlsProps } from './ViewControls.type';
import '../../theme/view-controls.css';

const ViewControls = (props: ViewControlsProps) => {
  const { filter, group, sort, open, defaultOpen = true, onOpenChange, label, className } = props;
  const { views } = useTesseraStrings();
  const state = useOpenState(open, defaultOpen, onOpenChange);
  const count = state.open ? 0 : activeCount({ filter, group, sort });
  const name = state.open ? views.hideControls : views.showControls;

  return (
    <Box className={`view-controls${className ? ` ${className}` : ''}`}>
      <Button
        variant="tertiary"
        size="sm"
        className="view-controls__toggle"
        icon={<Icon name="sliders-horizontal" />}
        iconEnd={<Badge value={count} hideZero color="primary" label={views.activeCount(count)} />}
        aria-expanded={state.open}
        aria-label={label ?? name}
        title={name}
        onClick={() => state.setOpen(!state.open)}
      >
        {label ?? views.controls}
      </Button>
      {state.open && (
        <Box className="view-controls__row">
          {filter !== undefined && <FilterBar {...filter} />}
          {group !== undefined && <GroupControl {...group} />}
          {sort !== undefined && <SortControl {...sort} />}
        </Box>
      )}
    </Box>
  );
};

export { ViewControls };
