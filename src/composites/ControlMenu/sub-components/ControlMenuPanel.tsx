/* @layer renderer-components @kind component */
import { useEffect, useMemo, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { HintLine } from '../../../primitives/HintLine';
import { HintScope } from '../../../primitives/HintScope';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small } from '../../../primitives/text-elements';
import { ControlMenuContext } from '../behavior/control-menu-context';
import { focusFirst } from '../behavior/focus-first';
import { ControlMenuFilter } from './ControlMenuFilter';
import type { ControlMenuPanelProps } from '../ControlMenu.type';

const ControlMenuPanel = (props: ControlMenuPanelProps) => {
  const { id, label, header, filter, filterPlaceholder, hints, query, look, onQueryChange, children } = props;
  const { navigation } = useTesseraStrings();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const context = useMemo(() => ({ query, look }), [query, look]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (inputRef.current) inputRef.current.focus();
      else focusFirst(bodyRef.current);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Box id={id} role="dialog" aria-label={label} className="control-menu__panel">
      <ControlMenuContext value={context}>
        <HintScope>
          {header != null && <Box className="control-menu__header">{header}</Box>}
          {filter && (
            <ControlMenuFilter inputRef={inputRef} bodyRef={bodyRef} panelId={id} value={query} placeholder={filterPlaceholder} onChange={onQueryChange} />
          )}
          <Box ref={bodyRef} className="control-menu__body">
            {children}
            {query.trim() !== '' && <Small tone="muted" className="control-menu__empty" role="status">{navigation.noResultsFor(query)}</Small>}
          </Box>
          {hints && <HintLine className="control-menu__hint" />}
        </HintScope>
      </ControlMenuContext>
    </Box>
  );
};

export { ControlMenuPanel };
