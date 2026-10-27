/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Tooltip } from '../../primitives/Tooltip';
import { useClipped } from './behavior/useClipped';
import type { TitleStripProps } from './TitleStrip.type';
import './TitleStrip.css';

const TitleStrip = (props: TitleStripProps) => {
  const { title, sublabel, className } = props;
  const titleRef = useRef<HTMLElement>(null);
  const sublabelRef = useRef<HTMLElement>(null);
  const hasSublabel = sublabel != null && sublabel !== '';
  const clipped = useClipped(titleRef, sublabelRef, title, hasSublabel ? sublabel : null);
  const full = hasSublabel ? <>{title} <Box as="span" className="title-strip__full">{sublabel}</Box></> : title;

  return (
    <Tooltip content={clipped ? full : null} className={['title-strip', className].filter(Boolean).join(' ')}>
      <Box as="span" ref={titleRef} className="title-strip__title">{title}</Box>
      {hasSublabel && <Box as="span" ref={sublabelRef} className="title-strip__sublabel">{sublabel}</Box>}
    </Tooltip>
  );
};

export { TitleStrip };
