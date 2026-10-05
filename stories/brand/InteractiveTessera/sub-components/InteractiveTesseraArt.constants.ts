/* @layer stories @kind data */
import { BRAND_FAMILY } from '../../../../src/brand/family.constants';
import { STAGE } from '../InteractiveTessera.constants';

const VIEW_BOX = `${STAGE.x} ${STAGE.y} ${STAGE.width} ${STAGE.height}`;
const PATHS = BRAND_FAMILY.tessera.mark.paths;

export { PATHS, VIEW_BOX };
