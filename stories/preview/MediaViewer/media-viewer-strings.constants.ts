/* @layer stories @kind constants */
const MEDIA_VIEWER_STRINGS = {
  fit: 'Fit',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  zoomTo: 'Switch between fit and actual size',
  previous: 'Previous',
  next: 'Next',
  percent: (zoom: number) => `${Math.round(zoom * 100)}%`,
  position: (at: number, count: number) => `${at} of ${count}`,
} as const;

export { MEDIA_VIEWER_STRINGS };
