/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { useReadoutVisible } from './behavior/useReadoutVisible';
import { READOUT_SHOW_MS } from './TransientReadout.constants';
import type { TransientReadoutProps } from './TransientReadout.type';
import './TransientReadout.css';

const TransientReadout = (props: TransientReadoutProps) => {
  const { value, corner = 'bottom-end', showMs = READOUT_SHOW_MS, onActivate, title, className } = props;
  const visible = useReadoutVisible(value, showMs);
  return (
    <Box
      aria-hidden="true"
      title={title}
      className={['transient-readout', `transient-readout--${corner}`, className].filter(Boolean).join(' ')}
      data-visible={visible || undefined}
      onDoubleClick={onActivate}
    >
      <Text as="span" variant="caption" numeric>{value}</Text>
    </Box>
  );
};

export { TransientReadout };
