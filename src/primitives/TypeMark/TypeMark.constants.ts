/* @layer renderer-components @kind constants */
import type { TypeMarkSize } from './TypeMark.type';

const TYPE_MARK_ICON_SIZE: Readonly<Record<TypeMarkSize, number>> = { xs: 12, sm: 14 };

const TYPE_MARK_OUTLINE_ICON_SIZE: Readonly<Record<TypeMarkSize, number>> = { xs: 16, sm: 20 };

export { TYPE_MARK_ICON_SIZE, TYPE_MARK_OUTLINE_ICON_SIZE };
