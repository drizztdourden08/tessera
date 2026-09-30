/* @layer renderer-components @kind component */
import { Anchored } from '../Anchored';
import { dropStyle } from './drop-style';
import type { ListboxDropViewProps } from './listbox-view.type';

const ListboxPanel = (props: ListboxDropViewProps) => {
  const { drop, invalid, size, className = '', children } = props;
  const { placement } = drop;
  const look = {
    ref: drop.dropRef,
    'data-attach': drop.attach,
    'data-fillet': drop.fillet || undefined,
    'data-invalid': invalid || undefined,
    'data-size': size,
    'data-placed': drop.inline || placement !== null || undefined,
    style: dropStyle(drop),
  };

  if (drop.inline) return <div className={`listbox-drop listbox-drop--inline ${className}`} {...look}>{children}</div>;
  return (
    <Anchored
      anchorRef={drop.anchorRef}
      placement={drop.attach === 'up' ? 'top-start' : 'bottom-start'}
      flip={false}
      fallback={placement && { top: placement.top, left: placement.left }}
      className={`listbox-drop ${className}`}
      {...look}
    >
      {children}
    </Anchored>
  );
};

export { ListboxPanel };
