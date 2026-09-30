/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Tag } from '../Tag';
import { Tooltip } from '../Tooltip';
import { ListboxCount } from './ListboxCount';
import { ListboxNames } from './ListboxNames';
import { useTagFit } from './useTagFit';
import type { ListboxCountProps } from './listbox-view.type';

const ListboxTags = <T,>(props: ListboxCountProps<T>) => {
  const { displays } = props;
  const rowRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const fit = useTagFit(rowRef, measureRef, displays.map((display) => display.key).join('|'));
  const hidden = displays.slice(fit);

  return (
    <span ref={rowRef} className="listbox-tags">
      {fit === 0 ? <ListboxCount displays={displays} /> : displays.slice(0, fit).map((display) => (
        <Tag key={display.key} color="primary">{display.tag}</Tag>
      ))}
      {fit > 0 && hidden.length > 0 && (
        <Tooltip content={<ListboxNames displays={hidden} />} placement="bottom">
          <Tag color="primary">{`+${hidden.length}`}</Tag>
        </Tooltip>
      )}
      <span ref={measureRef} className="listbox-tags__measure" aria-hidden>
        {displays.map((display) => <Tag key={display.key} color="primary">{display.tag}</Tag>)}
        <Tag color="primary">{`+${displays.length}`}</Tag>
      </span>
    </span>
  );
};

export { ListboxTags };
