/* @layer stories @kind component */
import { useState } from 'react';
import { VolumeControl } from '../../../src/composites';
import type { ControlSize } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';

type StatefulVolumeProps = {
  initial: number;
  flag?: boolean;
  label?: string;
  description?: string;
  showValue?: boolean;
  disabled?: boolean;
  size?: ControlSize;
};

const StatefulVolume = (props: StatefulVolumeProps) => {
  const { initial, flag = false, ...rest } = props;
  const [value, setValue] = useState(initial);
  const [muted, setMuted] = useState(false);
  return (
    <ValueReadout value={flag ? `${value}, muted ${String(muted)}` : value}>
      <VolumeControl {...rest} value={value} onChange={setValue} muted={flag ? muted : undefined} onMutedChange={flag ? setMuted : undefined} />
    </ValueReadout>
  );
};

export { StatefulVolume };
