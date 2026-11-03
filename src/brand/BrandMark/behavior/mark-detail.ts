/* @layer renderer-components @kind logic */
import type { BrandMarkData } from '../../brand.type';
import { MARK_DETAIL } from '../BrandMark.constants';
import type { BrandMarkSize } from '../BrandMark.type';

const markDetail = (mark: BrandMarkData, size: BrandMarkSize): BrandMarkData => {
  const level = MARK_DETAIL[size];
  return (level && mark.detail?.[level]) || mark;
};

export { markDetail };
