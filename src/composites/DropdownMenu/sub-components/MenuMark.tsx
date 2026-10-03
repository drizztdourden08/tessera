/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Glyph } from '../../../primitives/Glyph';
import { Span } from '../../../primitives/text-elements';
import { MenuColumnsContext } from '../behavior/menu-columns-context';
import type { MenuMarkProps } from './MenuMark.type';

const MenuMark = (props: MenuMarkProps) => {
  const { kind, checked } = props;
  const { marks } = useContext(MenuColumnsContext);
  if (kind === 'action' && !marks) return null;
  return (
    <Span className={`dropdown__mark dropdown__mark--${kind}`} aria-hidden="true">
      {checked && (kind === 'check' ? <Glyph name="check" /> : <Span className="dropdown__radio-dot" />)}
    </Span>
  );
};

export { MenuMark };
