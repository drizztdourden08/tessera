/* @layer renderer-components @kind component */
import { Anchored } from '../Anchored';
import { dropAnchoring } from './drop-anchoring';
import { dropStyle } from './drop-style';
import type { ListboxDropViewProps } from './listbox-view.type';

const ListboxPanel = (props: ListboxDropViewProps) => {
  const { drop, invalid, size, className = '', data, children } = props;
  const { placement } = drop;
  const look = {
    ref: drop.dropRef,
    'data-attach': drop.attach,
    'data-align': drop.end ? 'end' : undefined,
    'data-fillet': drop.fillet || undefined,
    'data-invalid': invalid || undefined,
    'data-size': size,
    'data-placed': drop.inline || placement !== null || undefined,
    style: dropStyle(drop),
  };

  const anchoring = dropAnchoring(drop);
  if (drop.inline) return <div className={`listbox-drop listbox-drop--inline ${className}`} {...data} {...look}>{children}</div>;
  return (
    <Anchored
      anchorRef={drop.anchorRef}
      placement={anchoring.place}
      flip={false}
      fallback={anchoring.fallback}
      className={`listbox-drop ${className}`}
      {...data}
      {...look}
    >
      {children}
    </Anchored>
  );
};

export { ListboxPanel };
