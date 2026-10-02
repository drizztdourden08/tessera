/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Link } from '../Link';
import { isPlainClick } from './behavior/is-plain-click';
import type { RouterLinkProps } from './RouterLink.type';

const RouterLink = (props: RouterLinkProps) => {
  const { to, onNavigate, href = to, onClick, ...rest } = props;
  const follow = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onNavigate(to);
  };
  return <Link {...rest} href={href} onClick={follow} />;
};

export { RouterLink };
