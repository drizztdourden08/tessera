/* @layer renderer-components @kind util */
import type { ButtonSize } from '../../../primitives/Button/Button.type';
import type { IconButtonSize } from '../../../primitives/IconButton/IconButton.type';

const chevronSizeOf = (size: ButtonSize): IconButtonSize => (size === 'lg' ? 'md' : size);

export { chevronSizeOf };
