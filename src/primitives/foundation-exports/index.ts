/* @layer renderer-components @kind barrel */
export { TesseraProvider, useCopy, useTesseraStrings } from '../TesseraProvider';
export type {
  ClipboardWriter, ErrorFallbackProps, TesseraOverrides, TesseraPart, TesseraProviderProps,
} from '../TesseraProvider';
export { TESSERA_STRINGS } from '../strings';
export type { TesseraStringGroup, TesseraStrings, TesseraStringsOverride } from '../strings';
export { APP_REGION_ATTRIBUTE, POPUP_OPEN_ATTRIBUTE } from '../dom/app-region.constants';
export type { DataAttributes } from '../dom/data-attributes.type';
export { REVIEW_MASK_ATTRIBUTE } from '../dom/review-mask.constants';
export { useReducedMotion } from '../dom/useReducedMotion';
export { useInView } from '../dom/useInView';
export type { InViewOptions } from '../dom/in-view.type';
export { ownerDocumentOf } from '../dom/owner-document';
export { ownerWindowOf } from '../dom/owner-window';
export { observeResize } from '../dom/observe-resize';
