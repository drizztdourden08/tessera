/* @layer renderer-components @kind util */
import type { WindowHeaderProps } from '../WindowHeader.type';

const actionsInEyebrow = ({ actionsRow, eyebrow, actions }: WindowHeaderProps): boolean =>
  actionsRow === 'eyebrow' && eyebrow != null && actions != null;

export { actionsInEyebrow };
