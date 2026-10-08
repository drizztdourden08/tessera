/* @layer renderer-components @kind logic */
import { SEGMENT_MAX, TAG_MAX } from '../sub-components/EnumEditorControl.constants';
import type { ClosedSetTier } from '../sub-components/EnumEditorControl.type';

const closedSetTier = (count: number): ClosedSetTier => {
  if (count > 0 && count <= SEGMENT_MAX) return 'segments';
  if (count > 0 && count <= TAG_MAX) return 'chips';
  return 'list';
};

export { closedSetTier };
