/* @layer renderer-components @kind component */
import { HIT_AREA_CLASS } from '../../primitives/dom/hit-area.constants';
import { Pressable } from '../../primitives/Pressable';
import type { EdgeButtonProps } from './EdgeButton.type';
import './EdgeButton.css';

const EdgeButton = (props: EdgeButtonProps) => {
  const { label, className, children, ...rest } = props;
  return (
    <Pressable className={['edge-button', HIT_AREA_CLASS, className].filter(Boolean).join(' ')} aria-label={label} {...rest}>
      {children}
    </Pressable>
  );
};

export { EdgeButton };
