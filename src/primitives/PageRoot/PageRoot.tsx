/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { useDocumentScroll } from './behavior/useDocumentScroll';
import type { PageRootProps } from './PageRoot.type';

const PageRoot = (props: PageRootProps) => {
  useDocumentScroll();
  return <Box {...props} />;
};

export { PageRoot };
