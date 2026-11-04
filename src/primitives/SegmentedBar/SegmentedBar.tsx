/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { Span } from '../text-elements';
import { Tooltip } from '../Tooltip';
import { pressKeys } from './behavior/press-keys';
import type { SegmentedBarProps } from './SegmentedBar.type';
import './SegmentedBar.css';

const SegmentedBar = (props: SegmentedBarProps) => {
  const { segments, label, onClick, className } = props;
  const action = onClick ? { role: 'button', tabIndex: 0, onClick, onKeyDown: pressKeys(onClick) } : { role: 'group' };
  return (
    <Box className={className ? `segmented-bar ${className}` : 'segmented-bar'} aria-label={label} data-pressable={onClick ? 'yes' : 'no'} {...action}>
      {segments.map((segment, index) => (
        <Tooltip key={index} content={segment.label} className="segmented-bar__segment">
          <Span className="segmented-bar__fill" data-tone={segment.tone} />
        </Tooltip>
      ))}
    </Box>
  );
};

export { SegmentedBar };
