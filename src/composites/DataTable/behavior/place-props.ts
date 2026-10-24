/* @layer renderer-components @kind logic */
import { INDEX_ATTRIBUTE } from './useVirtualRows.constants';
import { INDEX_PROPERTY, STRIPE_CLASS } from './place-props.constants';
import type { CSSProperties } from 'react';
import type { PlaceProps } from './place-props.type';

const placeProps = (className: string, index: number | undefined, striped: boolean): PlaceProps => {
  if (index === undefined) return { className };
  return {
    className: striped && index % 2 === 0 ? `${className} ${STRIPE_CLASS}` : className,
    style: { [INDEX_PROPERTY]: index } as CSSProperties,
    [INDEX_ATTRIBUTE]: index,
  };
};

export { placeProps };
