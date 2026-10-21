/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { Span } from '../../primitives/text-elements';
import { useRailOverflow } from './useRailOverflow';
import type { PaneRailFoldProps } from './PaneRailFold.type';

const contentClassOf = (empty: boolean, scrolls: boolean) => {
  if (empty) return 'pane-rail__content pane-rail__content--empty';
  if (scrolls) return 'pane-rail__content pane-rail__content--scroll';
  return 'pane-rail__content';
};

const PaneRailFold = ({ rail }: PaneRailFoldProps) => {
  const { label, onUnfold, action, items = [] } = rail;
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLElement>(null);
  const scrolls = useRailOverflow(box, list);
  const contentClass = contentClassOf(items.length === 0, scrolls);
  return (
    <>
      <Box className="pane-rail__actions">{action}</Box>
      <Box className="pane-rail__items">
        <Span className="pane-rail__label" aria-hidden="true" onClick={onUnfold}>{label}</Span>
        <ScrollArea
          ref={box}
          scrollbar="slim"
          className={contentClass}
        >
          <Box ref={list} className="pane-rail__list">{items}</Box>
        </ScrollArea>
      </Box>
    </>
  );
};

export { PaneRailFold };
