/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import type { MenuIconProps } from './MenuIcon.type';

const MenuIcon = (props: MenuIconProps) => {
  const { icon } = props;
  return (
    <Span className="dropdown__icon" aria-hidden="true">
      {typeof icon === 'string' ? <Icon name={icon} /> : icon}
    </Span>
  );
};

export { MenuIcon };
