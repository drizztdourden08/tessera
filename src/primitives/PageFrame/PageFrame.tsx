/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { ScrollArea } from '../ScrollArea';
import type { PageFrameProps } from './PageFrame.type';
import './PageFrame.css';

const PageFrame = (props: PageFrameProps) => {
  const { width, padding = 'lg', fill = false, className, children, ...rest } = props;
  return (
    <ScrollArea
      {...rest}
      className={className ? `page-frame ${className}` : 'page-frame'}
      data-width={width}
      data-padding={padding === 'md' ? padding : undefined}
      data-fill={fill ? 'true' : undefined}
    >
      <Box className="page-frame__content">{children}</Box>
    </ScrollArea>
  );
};

export { PageFrame };
