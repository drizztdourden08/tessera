/* @layer renderer-components @kind util */
import type { JoinAlign, JoinSpan, SubMenuJoinInput } from './sub-menu-join.type';

const tunnelSpan = (input: SubMenuJoinInput, align: JoinAlign, top: number, height: number): JoinSpan => {
  const { row, line } = input;
  return {
    tunnelTop: align === 'top' ? line : row.top - top,
    tunnelBottom: align === 'bottom' ? height - line : row.bottom - top,
  };
};

export { tunnelSpan };
