/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Span } from '../../../primitives/text-elements';
import { isChoice } from '../behavior/is-choice';
import { MenuColumnsContext } from '../behavior/menu-columns-context';
import { ChoiceMark } from './ChoiceMark';
import type { MenuMarkProps } from './MenuMark.type';

const MenuMark = (props: MenuMarkProps) => {
  const { kind, checked } = props;
  const { marks } = useContext(MenuColumnsContext);
  if (!marks) return null;
  return (
    <Span className={`dropdown__mark dropdown__mark--${kind}`} aria-hidden="true">
      {isChoice(kind) && <ChoiceMark kind={kind} checked={checked} />}
    </Span>
  );
};

export { MenuMark };
