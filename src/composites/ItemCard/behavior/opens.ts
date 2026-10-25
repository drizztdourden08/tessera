/* @layer renderer-components @kind util */
import type { ItemCardProps } from '../ItemCard.type';

const opens = (props: Pick<ItemCardProps, 'href' | 'onOpen'>): boolean => props.href !== undefined || props.onOpen !== undefined;

export { opens };
