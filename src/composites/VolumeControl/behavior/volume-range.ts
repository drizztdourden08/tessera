/* @layer renderer-components @kind util */
import type { VolumeControlProps, VolumeRange } from '../VolumeControl.type';

const volumeRange = (props: Pick<VolumeControlProps, 'min' | 'max' | 'step'>): VolumeRange => {
  const { min = 0, max = 100, step = 1 } = props;
  return { min, max, step };
};

export { volumeRange };
