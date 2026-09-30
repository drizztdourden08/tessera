/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import { Icon } from '../../../primitives/Icon';
import type { ReactNode } from 'react';
import type { IconName } from '../../../primitives/Icon';

const menuIcon = (name: IconName): ReactNode => createElement(Icon, { name });

export { menuIcon };
