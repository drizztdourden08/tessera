/* @layer renderer-components @kind component */
import { useTesseraOverride } from '../TesseraProvider/behavior/useTesseraOverride';
import type { LinkProps } from './Link.type';

const Link = (props: LinkProps) => {
  const AppLink = useTesseraOverride('link');
  if (AppLink) return <AppLink {...props} />;
  return <a {...props} />;
};

export { Link };
