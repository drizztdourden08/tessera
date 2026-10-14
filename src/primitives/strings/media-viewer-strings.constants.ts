/* @layer renderer-components @kind data */
const MEDIA_VIEWER_STRINGS = {
  fit: 'Fit',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  fitOrActual: 'Switch between fit and actual size',
  previous: 'Previous',
  next: 'Next',
  percent: (zoom: number) => `${Math.round(zoom * 100)}%`,
  position: (at: number, count: number) => `${at} of ${count}`,
};

export { MEDIA_VIEWER_STRINGS };
