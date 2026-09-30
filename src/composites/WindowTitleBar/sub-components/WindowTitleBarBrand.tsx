/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { Image } from '../../../primitives/Image';
import { Span } from '../../../primitives/text-elements';
import type { WindowTitleBarBrandProps } from './WindowTitleBarBrand.type';

const WindowTitleBarBrand = (props: WindowTitleBarBrandProps) => {
  const { title, logo, instance } = props;
  const shown = instance?.logo ?? logo;
  const mark = shown ? <Image className="window-title-bar__logo" src={shown} alt="" placeholder="none" /> : null;

  return (
    <Box className="window-title-bar__brand">
      {mark}
      <Span tone="dim" className="window-title-bar__title">{title}</Span>
      {instance && <Badge pulse={instance.pulse} className="window-title-bar__instance">{instance.name}</Badge>}
      {mark}
    </Box>
  );
};

export { WindowTitleBarBrand };
