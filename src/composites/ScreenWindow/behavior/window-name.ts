/* @layer renderer-components @kind logic */
import type { ScreenWindowProps, WindowName } from '../ScreenWindow.type';

const isBare = (props: ScreenWindowProps): boolean => props.titleRow === false && props.header === undefined;

const windowName = (props: ScreenWindowProps, titleId: string): WindowName => {
  const { title, icon, cornerTitle } = props;
  const bare = isBare(props);
  const chip = bare && cornerTitle !== false ? { title, icon, titleId } : undefined;
  const label = bare && !chip && typeof title === 'string' ? title : undefined;
  return { bare, chip, label, named: chip !== undefined || label !== undefined };
};

export { windowName };
