/* @layer renderer-components @kind data */
import type { BrandMarkData } from '../brand.type';
import { ARGUS_STONE_FULL, ARGUS_STONE_MEDIUM, ARGUS_STONE_SMALL } from './argus-stone.constants';
import { ARGUS_TWIN_FULL, ARGUS_TWIN_MEDIUM, ARGUS_TWIN_SMALL } from './argus-twin.constants';

const ARGUS_MARK: BrandMarkData = {
  viewBox: '0 0 64 64',
  paths: ARGUS_STONE_FULL,
  detail: {
    medium: { viewBox: '0 0 32 32', paths: ARGUS_STONE_MEDIUM },
    small: { viewBox: '0 0 16 16', paths: ARGUS_STONE_SMALL, pixelArt: true },
  },
};

const ARGUS_TWIN_MARK: BrandMarkData = {
  viewBox: '0 0 64 64',
  paths: ARGUS_TWIN_FULL,
  detail: {
    medium: { viewBox: '0 0 32 32', paths: ARGUS_TWIN_MEDIUM },
    small: { viewBox: '0 0 16 16', paths: ARGUS_TWIN_SMALL, pixelArt: true },
  },
};

export { ARGUS_MARK, ARGUS_TWIN_MARK };
