/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import { Icon } from '../../../primitives/Icon';
import type { ReactElement } from 'react';
import type { IconName } from '../../../primitives/Icon';

const menuIcon = (name: IconName): ReactElement => createElement(Icon, { name });

export { menuIcon };
