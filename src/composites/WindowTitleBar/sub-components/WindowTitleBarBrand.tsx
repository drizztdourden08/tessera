/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Image } from '../../../primitives/Image';
import { Status } from '../../../primitives/Status';
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
      {instance && <Status tone="info" variant="pill" pulse={instance.pulse} className="window-title-bar__instance">{instance.name}</Status>}
      {mark}
    </Box>
  );
};

export { WindowTitleBarBrand };
