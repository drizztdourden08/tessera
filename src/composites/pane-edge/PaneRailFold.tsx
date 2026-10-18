/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import { useRailOverflow } from './useRailOverflow';
import type { PaneRailFoldProps } from './PaneRailFold.type';

const PaneRailFold = ({ rail }: PaneRailFoldProps) => {
  const { label, onUnfold, actions, content } = rail;
  const box = useRef<HTMLElement>(null);
  const list = useRef<HTMLElement>(null);
  const scrolls = useRailOverflow(box, list);
  return (
    <>
      {actions !== undefined && <Box className="pane-rail__actions">{actions}</Box>}
      <Box className="pane-rail__items">
        <Span className="pane-rail__label" aria-hidden="true" onClick={onUnfold}>{label}</Span>
        {content !== undefined && (
          <Box ref={box} className={scrolls ? 'pane-rail__content pane-rail__content--scroll' : 'pane-rail__content'}>
            <Box ref={list} className="pane-rail__list">{content}</Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export { PaneRailFold };
