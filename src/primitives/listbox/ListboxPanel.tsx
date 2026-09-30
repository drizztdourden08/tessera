/* @layer renderer-components @kind component */
import { Portal } from '../Portal';
import { dropStyle } from './drop-style';
import type { ListboxDropViewProps } from './listbox-view.type';

const ListboxPanel = (props: ListboxDropViewProps) => {
  const { drop, invalid, size, className = '', children } = props;

  const panel = (
    <div
      ref={drop.dropRef}
      className={`listbox-drop${drop.inline ? ' listbox-drop--inline' : ''}${className ? ` ${className}` : ''}`}
      data-attach={drop.attach}
      data-fillet={drop.fillet || undefined}
      data-invalid={invalid || undefined}
      data-size={size}
      data-placed={drop.inline || drop.placement !== null || undefined}
      style={dropStyle(drop)}
    >
      {children}
    </div>
  );

  return drop.inline ? panel : <Portal layer="popover">{panel}</Portal>;
};

export { ListboxPanel };
