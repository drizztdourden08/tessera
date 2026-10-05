/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import { MenuColumnsContext } from '../behavior/menu-columns-context';
import type { MenuMarkProps } from './MenuMark.type';

const MenuMark = (props: MenuMarkProps) => {
  const { kind, checked } = props;
  const { marks } = useContext(MenuColumnsContext);
  if (!marks) return null;
  const state = kind !== 'action' && !checked ? ' dropdown__mark--off' : '';
  return (
    <Span className={`dropdown__mark dropdown__mark--${kind}${state}`} aria-hidden="true">
      {kind === 'check' && <Icon name="check" />}
      {kind === 'radio' && <Span className="dropdown__radio-ring">{checked && <Span className="dropdown__radio-dot" />}</Span>}
    </Span>
  );
};

export { MenuMark };
