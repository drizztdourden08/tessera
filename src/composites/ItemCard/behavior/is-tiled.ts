/* @layer renderer-components @kind util */
import type { ItemCardProps } from '../ItemCard.type';

const isTiled = (props: Pick<ItemCardProps, 'density' | 'mediaSize'>): boolean => (props.mediaSize ?? (props.density === 'compact' ? 'sm' : 'band')) === 'sm';

export { isTiled };
