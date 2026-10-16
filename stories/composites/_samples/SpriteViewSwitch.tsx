/* @layer stories @kind component */
import { SegmentedControl } from '../../../src/primitives';
import { VIEW_OPTIONS } from './studio-sample.constants';
import type { SpriteViewSwitchProps } from './studio-sample.type';

const SpriteViewSwitch = ({ value, onChange }: SpriteViewSwitchProps) => (
  <SegmentedControl size="sm" value={value} onChange={onChange} options={VIEW_OPTIONS} />
);

export { SpriteViewSwitch };
