/* @layer renderer-components @kind logic */
import { adviseTag } from './tag-convention';
import type { BlockParams } from './tag-convention.type';

const blocksCreate = (params: BlockParams): boolean => {
  const { raw, isNew, enforce, validate } = params;
  return enforce && isNew && !adviseTag(raw, validate).ok;
};

export { blocksCreate };
