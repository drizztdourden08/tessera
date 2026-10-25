/* @layer renderer-components @kind data */
const CONTROLLER_SILHOUETTE_VARIANTS = ['offset', 'symmetric', 'nintendo', 'pad'] as const;

const VIEW_W = 400;
const VIEW_H = 260;
const CONTROLLER_SILHOUETTE_VIEW_BOX = `0 0 ${VIEW_W} ${VIEW_H}`;

export { CONTROLLER_SILHOUETTE_VARIANTS, CONTROLLER_SILHOUETTE_VIEW_BOX, VIEW_W };
