/* @layer renderer-components @kind logic */
import { Fragment, createElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

const menuMark = (mark: ReactNode): ReactElement => createElement(Fragment, null, mark);

export { menuMark };
