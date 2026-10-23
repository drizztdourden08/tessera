/* @layer renderer-components @kind logic */
import type { ScreenWindowProps, WindowName } from '../ScreenWindow.type';

const isBare = (props: ScreenWindowProps): boolean => props.titleRow === false && props.header === undefined;

const windowName = (props: ScreenWindowProps, titleId: string): WindowName => {
  const { title, icon, cornerTitle } = props;
  const bare = isBare(props);
  const legend = bare && cornerTitle !== false ? { title, icon, titleId } : undefined;
  const label = bare && !legend && typeof title === 'string' ? title : undefined;
  return { bare, legend, label, named: legend !== undefined || label !== undefined };
};

export { windowName };
