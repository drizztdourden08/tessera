/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { WindowGuideOverlay } from '../../WindowGuideOverlay';
import { toolbarKeyHints } from '../behavior/toolbar-key-hints';
import type { ToolbarDockGuideProps } from './ToolbarDockGuide.type';

const ToolbarDockGuide = ({ open, message }: ToolbarDockGuideProps) => {
  const { toolbars } = useTesseraStrings();
  return (
    <>
      <WindowGuideOverlay open={open} mode="moving" snapping defaultHints={false} hints={toolbarKeyHints(toolbars)} />
      <Box as="span" className="visually-hidden" role="status" aria-live="polite">{message}</Box>
    </>
  );
};

export { ToolbarDockGuide };
